"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GgPokerStrategyService = void 0;
const base_1 = require("./base");
const { parseStringInt, parseStringFloat, } = require('../../../common/utility/stringUtils');
class GgPokerStrategyService extends base_1.BaseParser {
    constructor() {
        super();
    }
    parsePlayer(line) {
        const match = line.match(/Seat (\d+): ([^\(]+) \(\$?([\d,|\d.]+) in chips\)/);
        return match
            ? {
                seatNumber: +match[1],
                playerName: match[2].trim(),
                chipCount: +match[3].replace(/,/g, ''),
            }
            : null;
    }
    parseHoleCards(line) {
        const match = line.match(/Dealt to ([^\[]+) \[([^\]]+)\]/);
        if (match)
            this.handData.holeCards.push({
                playerName: match[1].trim(),
                cards: this.getCardsDetail(match[2].trim().split(' ')),
            });
    }
    parseAction(line, actionFlag) {
        if (actionFlag.includes('posts')) {
            const actionRegexMap = new Map([
                [this.actionTypes.postAnte, /^(.+): posts the ante \$?([\d,|\d.]+)/],
                [
                    this.actionTypes.postSmallBlind,
                    /^(.+): posts small blind \$?([\d,|\d.]+)/,
                ],
                [
                    this.actionTypes.postBigBlind,
                    /^(.+): posts big blind \$?([\d,|\d.]+)/,
                ],
            ]);
            for (const [actionType, regex] of actionRegexMap.entries()) {
                const match = line.match(regex);
                if (match) {
                    if (actionType === this.actionTypes.postAnte && !this.handData.ante) {
                        this.handData = {
                            ...this.handData,
                            ante: parseStringFloat(match[2]),
                        };
                    }
                }
            }
        }
        else if (line.includes('collected')) {
            const winnerRegex = /^(.+) collected \$?([\d,|\d.]+)(?: from pot)/;
            const match = line.trim().match(winnerRegex);
            if (match)
                this.handData.summary.collected.push({
                    amount: parseStringFloat(match[2]),
                    playerName: this.findPlayer(match[1]),
                });
        }
        else {
            const summaryActionRegexMap = new Map([
                [this.actionTypes.fold, /^(\w+): folds/],
                [
                    this.actionTypes.raise,
                    /^([^:]+): raises \$?(?:[\d,|\d.]+) to \$?([\d,|\d.]+)$/,
                ],
                [
                    this.actionTypes.allIn,
                    /([^:]+): \w+ \$?(?:[\d,|\d.]+) to \$?([\d,|\d.]+) and is all-in$/,
                ],
                [this.actionTypes.check, /^([^:]+): checks/],
                [this.actionTypes.bet, /^([^:]+): bets \$?([\d,|\d.]+)/],
                [this.actionTypes.call, /^([^:]+): calls \$?([\d,|\d.]+)/],
                [this.actionTypes.show, /^([^:]+): shows \[(\w+\s+\w+)\]/],
            ]);
            for (const [actionType, regex] of summaryActionRegexMap.entries()) {
                const match = line.trim().match(regex);
                if (match) {
                    let actionAmount = null;
                    let __actionType = actionType;
                    if (actionType === this.actionTypes.fold ||
                        actionType === this.actionTypes.check ||
                        actionType === this.actionTypes.show) {
                        actionAmount = null;
                    }
                    else {
                        actionAmount = parseStringFloat(match[2]);
                    }
                    if (line.includes('all-in')) {
                        if (match[0].includes('call')) {
                            __actionType = this.actionTypes.allInWithCall;
                        }
                        else if (match[0].includes('raise')) {
                            __actionType = this.actionTypes.allInWithRaise;
                        }
                        else if (match[0].includes('bet')) {
                            __actionType = this.actionTypes.allInWithBet;
                        }
                    }
                    if (actionType === this.actionTypes.show) {
                        this.handData.summary.shows.push({
                            playerName: match[1],
                            cards: this.getCardsDetail(match[2].split(' ')),
                        });
                    }
                    else {
                        this.handData.actions.push({
                            playerName: this.findPlayer(match[1]),
                            action: __actionType,
                            actionAmount: actionAmount,
                            street: this.currentStreet,
                        });
                    }
                }
            }
        }
    }
    parseSummary(line) {
        const totalPlotMatch = line.match(/Total pot ([\d,]+)/);
        const boardMatch = line.match(/Board \[([\w\s]+)\]/);
        if (line.startsWith('Seat ')) {
            const [_, seatNum, name, btnInfo, btnContent, action] = line.match(/^Seat (\d+): (\w+)\s*(\(([^()]*)\))?\s*(\w+)/);
            if (btnInfo && !btnInfo.includes('button')) {
                this.handData = {
                    ...this.handData,
                    smallBlindSeat: btnInfo.includes('small blind')
                        ? parseStringInt(seatNum)
                        : this.handData.smallBlindSeat,
                    bigBlindSeat: btnInfo.includes('big blind')
                        ? parseStringInt(seatNum)
                        : this.handData.bigBlindSeat,
                };
            }
        }
    }
    parsePokerHand(line) {
        const feePattern = /Tournament #(?:\d+), (?:32-KO: |Daily Big |T\$ Builder )?\$([\d,|\d.]+)\s(?:[\+\s]\$)?([\d,|\d.]+)?/;
        const gamePattern = /(\w+)'em/;
        const handIdRegex = /Hand #(\w+\d+):\s/;
        const tournamentIdRegex = /Tournament #(\d+)/;
        const dateTimeRegex = /(\d{4}\/\d{2}\/\d{2})\s(\d{2}:\d{2}:\d{2})\s?(\w+)?/;
        const buttonSeatRegex = /Seat #(\d+)/;
        const levelRegex = /Level(\d+)/;
        const blindRegex = /\(\$?([\d,|\d.]+)\/\$?([\d,|\d.]+)\)/;
        const tableNumberRegex = /Table '(?:.+)?(?:[^\d]+)(\d+)'/;
        const maxTableSeatRegex = /(\d+)-max/;
        const regionalRegex = /\[(\d{4}\/\d{2}\/\d{2}) (\d{2}:\d{2}:\d{2}) (\w+)\]/;
        const handId = handIdRegex.exec(line);
        if (handId) {
            this.handData.handId = handId[1];
        }
        const tournamentId = tournamentIdRegex.exec(line);
        if (tournamentId) {
            this.handData.tournamentId = parseStringInt(tournamentId[1]);
            this.handData.gameFormat = 'Tournament';
            this.handData.pokerRoomId = 'GGPoker';
        }
        const dateTime = dateTimeRegex.exec(line);
        if (dateTime) {
            this.handData.handDate = dateTime[1];
            this.handData.handTime = dateTime[2];
            this.handData.handTimezone = dateTime[3];
        }
        const regionalMatch = line.match(regionalRegex);
        if (regionalMatch) {
            this.handData.regionalHandDate = regionalMatch[1];
            this.handData.regionalHandTime = regionalMatch[2];
            this.handData.regionalHandTimezone = regionalMatch[3];
        }
        const blindLevel = levelRegex.exec(line);
        if (blindLevel) {
            this.handData.blindLevel = `Level ${blindLevel[1]}`;
        }
        const blindMatch = blindRegex.exec(line);
        if (blindMatch) {
            this.handData.smallBlind = parseStringFloat(blindMatch[1]);
            this.handData.bigBlind = parseStringFloat(blindMatch[2]);
        }
        const feeMatch = line.match(feePattern);
        if (feeMatch) {
            if (feeMatch[1])
                this.handData.tournamentBuyIn = parseStringFloat(feeMatch[1]);
            if (feeMatch[2])
                this.handData.tournamentFee = parseStringFloat(feeMatch[2]);
        }
        if (line.includes('$')) {
            this.handData.wagerType = '$';
            this.handData.currency = null;
        }
        const gameMatch = line.match(gamePattern);
        if (gameMatch) {
            this.handData.pokerForm = gameMatch[0];
            this.handData.pokerType = 'No Limit';
        }
        const tableInfo = tableNumberRegex.exec(line);
        if (tableInfo) {
            let tableNumber = tableInfo[1];
            this.handData.tournamentTableNumber = parseInt(tableNumber);
        }
        const maxTableSeatsInfo = maxTableSeatRegex.exec(line);
        if (maxTableSeatsInfo) {
            this.handData.maxTableSeats = parseInt(maxTableSeatsInfo[1]);
        }
        const buttonSeat = buttonSeatRegex.exec(line);
        if (buttonSeat) {
            this.handData.buttonSeat = parseInt(buttonSeat[1]);
        }
    }
    parseTable(line) {
        const match = line.match(/Table\s+'(\d+)'\s+(\d+)-max\s+Seat\s+#(\d+)\s+is the button/);
        if (match) {
            const [_, tableNumber, seatMax, dealerPosition] = match;
            this.handData = {
                ...this.handData,
                tournamentTableNumber: Number(tableNumber),
                maxTableSeats: Number(seatMax),
                buttonSeat: Number(dealerPosition),
            };
        }
    }
    parseCommunityCards(line) {
        const boardRegex = /Board \[(.+)\]/;
        const board = boardRegex.exec(line);
        if (board) {
            let cards = this.getCardsDetail(board[1].split(' '));
            cards.forEach((card) => {
                this.handData.communityCards.push(card);
            });
        }
    }
    parsePlayerSeat(line) {
        const player = this.parsePlayer(line);
        if (player)
            this.handData.players.push(player);
    }
    handleStreet(line) {
        const streetMappings = {
            '*** HOLE CARDS ***': this.street.preFlop,
            '*** FLOP ***': this.street.flop,
            '*** TURN ***': this.street.turn,
            '*** RIVER ***': this.street.river,
        };
        const startingString = Object.keys(streetMappings).find((start) => line.startsWith(start));
        if (startingString) {
            this.currentStreet = streetMappings[startingString];
        }
    }
    parse(sections) {
        let data = {
            data: [],
            parsedNumber: 0,
            rejectedNumber: 0,
            rejectedTournamentPlo: 0,
            rejectedCashNlh: 0,
            rejectedCashPlo: 0,
            rejectedCashOther: 0,
            rejectedTournamentOther: 0,
            rejectedOther: 0,
        };
        for (const section of sections) {
            this.initHandData();
            let sectionData = this.ggPokerSectionParser(section);
            if (sectionData) {
                data.data.push(sectionData);
                data.parsedNumber++;
            }
            else {
                const lines = section.split('\n');
                if (!lines[0].match(/.+/))
                    break;
                data.rejectedNumber++;
            }
        }
        return data;
    }
    ggPokerSectionParser(data) {
        this.currentStreet = this.street.preFlop;
        const lines = data.split('\n');
        const emptyRegex = /Poker Hand #TM(?:\d+)/;
        const emptyLine = emptyRegex.exec(lines[0]);
        const headLine = lines[0].toLowerCase();
        if (!emptyLine ||
            !headLine.includes('tournament') ||
            !headLine.includes('hold') ||
            !headLine.includes('no limit')) {
            return null;
        }
        for (const line of lines) {
            if (line.includes('Hand')) {
                this.parsePokerHand(line);
            }
            if (line.includes('Table')) {
                this.parseTable(line);
            }
            this.parsePlayerSeat(line);
            this.parseCommunityCards(line);
            const actionLineFlag = this.actionNames.find((action) => line.includes(action));
            if (actionLineFlag) {
                this.parseAction(line, actionLineFlag);
            }
            this.parseHoleCards(line);
            this.handleStreet(line);
            this.parseSummary(line);
        }
        return this.handData;
    }
}
exports.GgPokerStrategyService = GgPokerStrategyService;
//# sourceMappingURL=gg-poker-strategy.service.js.map