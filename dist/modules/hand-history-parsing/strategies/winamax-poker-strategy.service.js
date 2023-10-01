"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinamaxPokerStrategyService = void 0;
const base_1 = require("./base");
const { parseStringInt, parseStringFloat, } = require('../../../common/utility/stringUtils');
class WinamaxPokerStrategyService extends base_1.BaseParser {
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
            let lineData = this.winamaxSectionParser(lines);
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
        const handIdRegex = /HandId: #([\d]+\-[\d]+\-[\d]+)/;
        const tournamentIdRegex = /Winamax Poker - Tournament/;
        const dateTimeRegex = /(\d{4}\/\d{2}\/\d{2})\s(\d+:\d+:\d+)\s(\w+)/;
        const levelRegex = /level: (\d+)/;
        const feePattern = /buyIn:\s([\d,|\d.]+)(\S)\s\+\s([\d,|\d.]+)(\S)/;
        const blindRegex = /\((\d+)\/(\d+)\/(\d+)\)/;
        const gamePattern = /(Holdem) (no limit)/;
        const regionalRegex = /\[(\d{4}\/\d{2}\/\d{2}) (\d{2}:\d{2}:\d{2}) (\w+)\]/;
        const handId = handIdRegex.exec(line);
        if (handId) {
            this.handData.handId = handId[1];
        }
        const tournamentId = tournamentIdRegex.exec(line);
        if (tournamentId) {
            this.handData.gameFormat = 'Tournament';
            this.handData.pokerRoomId = 'Winamax';
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
            this.handData.ante = parseInt(blindMatch[1]);
            this.handData.smallBlind = parseInt(blindMatch[2]);
            this.handData.bigBlind = parseInt(blindMatch[3]);
        }
        const feeMatch = line.match(feePattern);
        if (feeMatch) {
            this.handData.currency = null;
            this.handData.tournamentBuyIn = parseFloat(feeMatch[1]);
            this.handData.tournamentFee = parseFloat(feeMatch[3]);
        }
        const gameMatch = line.match(gamePattern);
        if (gameMatch) {
            this.handData.pokerForm = gameMatch[1];
            this.handData.pokerType = gameMatch[2];
        }
    }
    parseAction(line, actionFlag) {
        if (actionFlag.includes('posts')) {
            const actionRegexMap = new Map([
                [this.actionTypes.postAnte, /^(.+) posts ante \$?([\d,|\d.]+)/],
                [
                    this.actionTypes.postSmallBlind,
                    /^(.+) posts small blind \$?([\d,|\d.]+)/,
                ],
                [
                    this.actionTypes.postBigBlind,
                    /^(.+) posts big blind \$?([\d,|\d.]+)/,
                ],
            ]);
            for (const [actionType, regex] of actionRegexMap.entries()) {
                const match = line.match(regex);
                if (match) {
                    if (actionType === this.actionTypes.postAnte && !this.handData.ante) {
                    }
                    else if (actionType === this.actionTypes.postSmallBlind) {
                        this.handData = {
                            ...this.handData,
                            smallBlindSeat: match[1]
                                ? this.findPlayerSeatNumber(match[1])
                                : null,
                        };
                    }
                    else if (actionType === this.actionTypes.postBigBlind) {
                        this.handData = {
                            ...this.handData,
                            bigBlindSeat: match[1]
                                ? this.findPlayerSeatNumber(match[1])
                                : null,
                        };
                    }
                }
            }
        }
        else if (line.includes('collected') && line.includes('pot')) {
            const winnerRegex = /^(.+) collected \$?([\d,|\d.]+)(?: from(.+)pot)$/;
            const match = line.trim().match(winnerRegex);
            if (match) {
                this.handData.summary.collected.push({
                    amount: parseStringFloat(match[2]),
                    playerName: this.findPlayer(match[1]),
                });
            }
        }
        else {
            const summaryActionRegexMap = new Map([
                [this.actionTypes.fold, /^([^:]+) folds/],
                [
                    this.actionTypes.raise,
                    /^([^:]+) raises \$?(?:[\d,|\d.]+) to \$?([\d,|\d.]+)$/,
                ],
                [this.actionTypes.check, /^([^:]+) checks/],
                [this.actionTypes.bet, /^([^:]+) bets \$?([\d,|\d.]+)/],
                [this.actionTypes.call, /^([^:]+) calls \$?([\d,|\d.]+)/],
                [
                    this.actionTypes.allIn,
                    /([^:]+) \w+ \$?(?:[\d,|\d.]+) to \$?([\d,|\d.]+) and is all-in$/,
                ],
                [this.actionTypes.show, /^([^:]+) shows \[(.+)\]/],
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
        const match = line.match(/^Table:\s+\'(?:.+)\((\d+)\)#(\d+)\'\s+(\d+)-max\s+\((.+)\)\s+Seat\s+#(\d+)\s+is the button/);
        if (match) {
            const [_, tournamentId, tableNumber, seatMax, wagerType, dealerPosition] = match;
            this.handData = {
                ...this.handData,
                tournamentId: parseStringInt(tournamentId),
                tournamentTableNumber: parseStringInt(tableNumber),
                maxTableSeats: Number(seatMax),
                wagerType: wagerType,
                buttonSeat: Number(dealerPosition),
            };
        }
    }
    parseHoleCards(line) {
        const match = line.match(/Dealt to ([^\[]+) \[([^\]]+)\]/);
        if (match)
            this.handData.holeCards.push({
                playerName: match[1].trim(),
                cards: this.getCardsDetail(match[2].trim().split(' ')),
            });
    }
    winamaxSectionParser(chunks) {
        this.currentStreet = this.street.preFlop;
        const playerRegex = /Seat (\d+): (.+) \(([\d,|\d.]+)(?:, ([\d,|\d.]+)\S bounty)?\)/;
        const holeCardsRegex = /Dealt to (.+) \[(.+)\]/;
        const boardRegex = /Board: \[(.+)\]/;
        const emptyRegex = /^Winamax Poker - Tournament/;
        const emptyLine = emptyRegex.exec(chunks[0]);
        const headLine = chunks[0].toLowerCase();
        if (!emptyLine ||
            !headLine.includes('tournament') ||
            !headLine.includes('hold') ||
            !headLine.includes('no limit')) {
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
                    if (!line.includes('out of hand')) {
                        this.handData.players.push({
                            seatNumber: parseStringInt(seatNumber),
                            playerName,
                            chipCount: parseStringFloat(chipCount),
                        });
                    }
                });
            }
            const holeCards = holeCardsRegex.exec(line);
            if (holeCards) {
                this.handData.holeCards.push({
                    playerName: holeCards[1],
                    cards: this.getCardsDetail(holeCards[2].split(' ')),
                });
            }
            const board = boardRegex.exec(line.trim());
            if (board) {
                let cards = this.getCardsDetail(board[1].split(' '));
                cards.forEach((card) => {
                    this.handData.communityCards.push(card);
                });
            }
            this.handleStreet(line);
            const actionLineFlag = this.actionNames.find((action) => line.includes(action));
            if (actionLineFlag) {
                this.parseAction(line, actionLineFlag);
            }
        }
        return this.handData;
    }
}
exports.WinamaxPokerStrategyService = WinamaxPokerStrategyService;
//# sourceMappingURL=winamax-poker-strategy.service.js.map