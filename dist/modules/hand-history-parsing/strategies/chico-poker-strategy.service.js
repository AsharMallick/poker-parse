"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChicoPokerStrategyService = void 0;
const base_1 = require("./base");
const { parseStringInt } = require('../../../common/utility/stringUtils');
class ChicoPokerStrategyService extends base_1.BaseParser {
    constructor() {
        super();
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
            const lines = section.split('\n');
            let lineData = this.sectionParser(lines);
            if (lineData) {
                data.data.push(lineData);
                data.parsedNumber++;
            }
            else {
                if (!lines[0].match(/.+/))
                    break;
                data.rejectedNumber++;
            }
        }
        return data;
    }
    parsePokerHand(line) {
        const handIdRegex = /Hand #(\d+)/;
        const tournamentIdRegex = /Tournament #(\d+)/;
        const dateTimeRegex = /(\d{4}\/\d{2}\/\d{2})\s(\d{2}:\d{2}:\d{2})\s(\w+)/;
        const gamePattern = /(\w+)'em/;
        const levelRegex = /Level (\S+)/;
        const feePattern = /\$(\d+\.\d+|\d+)\+\$(\d+\.\d+|\d+)/;
        const blindRegex = /Level \w+ \((\d+)\/(\d+)\)/;
        const regionalRegex = /(\d{4}\/\d{2}\/\d{2}) (\d{2}:\d{2}:\d{2}) (\w+)/;
        const handId = handIdRegex.exec(line);
        if (handId) {
            this.handData.handId = handId[1];
        }
        const tournamentId = tournamentIdRegex.exec(line);
        if (tournamentId) {
            this.handData.tournamentId = parseStringInt(tournamentId[1]);
            this.handData.gameFormat = 'Tournament';
            this.handData.pokerRoomId = 'BetOnline';
        }
        const dateTime = dateTimeRegex.exec(line);
        if (dateTime) {
            this.handData.handDate = dateTime[1];
            this.handData.handTime = dateTime[2];
            this.handData.handTimezone = dateTime[3];
        }
        const regionalMatch = line.match(regionalRegex);
        if (regionalMatch) {
            this.handData.regionalHandDate = null;
            this.handData.regionalHandTime = null;
            this.handData.regionalHandTimezone = null;
        }
        const blindLevel = levelRegex.exec(line);
        if (blindLevel) {
            this.handData.blindLevel = `Level ${blindLevel[1]}`;
        }
        const blindMatch = blindRegex.exec(line);
        if (blindMatch) {
            this.handData.smallBlind = parseInt(blindMatch[1]);
            this.handData.bigBlind = parseInt(blindMatch[2]);
        }
        const feeMatch = line.match(feePattern);
        if (feeMatch) {
            this.handData.wagerType = '$';
            this.handData.tournamentBuyIn = parseFloat(feeMatch[1]);
            this.handData.tournamentFee = parseFloat(feeMatch[2]);
        }
        const gameMatch = line.match(gamePattern);
        if (gameMatch) {
            this.handData.pokerForm = gameMatch[0];
            this.handData.pokerType = 'No Limit';
        }
    }
    parseAction(line, actionFlag) {
        if (actionFlag.includes('posts')) {
            const actionRegexMap = new Map([
                [this.actionTypes.postAnte, /^(.+): posts the ante (\d+)/],
                [this.actionTypes.postSmallBlind, /^(.+): posts small blind (\d+)/],
                [this.actionTypes.postBigBlind, /^(.+): posts big blind (\d+)/],
            ]);
            for (const [actionType, regex] of actionRegexMap.entries()) {
                const match = line.match(regex);
                if (match) {
                    if (actionType === this.actionTypes.postAnte && !this.handData.ante) {
                        this.handData = {
                            ...this.handData,
                            ante: parseStringInt(match[2]),
                        };
                    }
                }
            }
        }
        else if (line.includes('collected') && line.includes('from pot')) {
            const winnerRegex = /^(.+) collected (\d{1,3}(?:,\d{3})*|\d+)(?: from pot)$/;
            const match = line.trim().match(winnerRegex);
            if (match) {
                this.handData.summary.collected.push({
                    amount: parseStringInt(match[2]),
                    playerName: this.findPlayer(match[1]),
                });
            }
        }
        else {
            const summaryActionRegexMap = new Map([
                [this.actionTypes.fold, /^([^:]+): folds/],
                [this.actionTypes.raise, /^([^:]+): raises (?:\d+) to (\d+)/],
                [
                    this.actionTypes.allIn,
                    /([^:]+): \w+ (?:\d+) to (\d+) and is all-in$/,
                ],
                [this.actionTypes.check, /^([^:]+): checks/],
                [this.actionTypes.bet, /^([^:]+): bets (\d+)/],
                [this.actionTypes.call, /^([^:]+): calls (\d+)/],
                [this.actionTypes.show, /^([^:]+): shows \[(.+)\]/],
            ]);
            for (const [actionType, regex] of summaryActionRegexMap.entries()) {
                const match = line.match(regex);
                if (match) {
                    let actionAmount = null;
                    let __actionType = actionType;
                    if (actionType === this.actionTypes.fold ||
                        actionType === this.actionTypes.check ||
                        actionType === this.actionTypes.show) {
                        actionAmount = null;
                    }
                    else {
                        actionAmount = parseStringInt(match[2]);
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
    parseTable(line) {
        const match = line.match(/Table\s+'(.+)'\s+(\d+)-max\s+Seat\s+#(\d+)\s+is the button/);
        if (match) {
            const [_, tableNumber, seatMax, dealerPosition] = match;
            this.handData = {
                ...this.handData,
                tournamentTableNumber: parseStringInt(tableNumber.split(' ')[1]),
                maxTableSeats: Number(seatMax),
                buttonSeat: Number(dealerPosition),
            };
        }
    }
    parseSummary(line) {
        if (line.startsWith('Seat ')) {
            const summaryRegex = line.match(/^Seat (\d+): ([^\s]+) (\(([^()]*)\))?\s*(\w+)/);
            if (!summaryRegex)
                return;
            const [_, seatNum, name, btnInfo, btnContent, action] = summaryRegex;
            if (this.findPlayer(name)) {
                if (btnInfo &&
                    !btnInfo.includes('button') &&
                    btnInfo.includes('small blind')) {
                    this.handData = {
                        ...this.handData,
                        smallBlindSeat: btnInfo.includes('small blind')
                            ? parseStringInt(seatNum)
                            : null,
                    };
                }
                else if (btnInfo &&
                    !btnInfo.includes('button') &&
                    btnInfo.includes('big blind')) {
                    this.handData = {
                        ...this.handData,
                        bigBlindSeat: btnInfo.includes('big blind')
                            ? parseStringInt(seatNum)
                            : null,
                    };
                }
            }
        }
    }
    sectionParser(chunks) {
        const playerRegex = /Seat (\d+): (.+) \((\d+) in chips\)/;
        const holeCardsRegex = /Dealt to (.+) \[(.+)\]/;
        const boardRegex = /Board \[(.+)\]/;
        this.currentStreet = this.street.preFlop;
        const emptyRegex = /(\w+) Hand/;
        const emptyLine = emptyRegex.exec(chunks[0]);
        const headLine = chunks[0].toLowerCase();
        if (!emptyLine ||
            !headLine.includes('tournament') ||
            !headLine.includes('hold') ||
            !headLine.includes('no limit') ||
            emptyLine[1] !== 'BetOnline') {
            return null;
        }
        for (let line of chunks) {
            if (line.includes('Hand')) {
                this.parsePokerHand(line);
            }
            if (line.includes('Table')) {
                this.parseTable(line);
            }
            const players = line.match(new RegExp(playerRegex, 'g'));
            if (players) {
                players.forEach((player) => {
                    const [, seatNumber, playerName, chipCount] = playerRegex.exec(player);
                    this.handData.players.push({
                        seatNumber: parseStringInt(seatNumber),
                        playerName,
                        chipCount: parseStringInt(chipCount),
                    });
                });
            }
            const holeCards = holeCardsRegex.exec(line);
            if (holeCards) {
                this.handData.holeCards.push({
                    playerName: holeCards[1],
                    cards: this.getCardsDetail(holeCards[2].split(' ')),
                });
            }
            const board = boardRegex.exec(line);
            if (board) {
                let cards = this.getCardsDetail(board[1].split(' '));
                cards.forEach((card) => {
                    this.handData.communityCards.push(card);
                });
            }
            this.handleStreet(line);
            this.parseSummary(line);
            const actionLineFlag = this.actionNames.find((action) => line.includes(action));
            if (actionLineFlag) {
                this.parseAction(line, actionLineFlag);
            }
        }
        return this.handData;
    }
}
exports.ChicoPokerStrategyService = ChicoPokerStrategyService;
//# sourceMappingURL=chico-poker-strategy.service.js.map