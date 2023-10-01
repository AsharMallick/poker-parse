"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnitionPokerService = void 0;
const base_1 = require("./base");
const { parseStringInt } = require('../../../common/utility/stringUtils');
class IgnitionPokerService extends base_1.BaseParser {
    constructor() {
        super();
    }
    parse(sections) {
        const data = [];
        for (const section of sections) {
            this.initHandData();
            const lines = section.split('\n');
            let lineData = this.ignitionPokerSectionParser(lines);
            if (lineData) {
                data.push(lineData);
            }
        }
        return data;
    }
    parseAction(line, actionFlag) {
        if (actionFlag.includes('Ante') ||
            actionFlag.includes('Small blind') ||
            actionFlag.includes('Big blind')) {
            const actionRegexMap = new Map([
                [this.actionTypes.postAnte, /^(.+) : Ante chip (\d+)/],
                [this.actionTypes.postSmallBlind, /^(.+) : Small blind (\d+)/],
                [this.actionTypes.postBigBlind, /^(.+) : Big blind (\d+)/],
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
        else {
            const summaryActionRegexMap = new Map([
                [this.actionTypes.fold, /^(.+) : Folds/],
                [this.actionTypes.raise, /^(.+) : Raises (?:\d+) to (\d+)/],
                [this.actionTypes.allIn, /(.+) : All-in(?:.+)?(?:[\d,]+ to)? (\d+)/],
                [this.actionTypes.check, /^(.+) : Checks/],
                [this.actionTypes.bet, /^(.+) : Bets (\d+)/],
                [this.actionTypes.call, /^(.+) : Call (\d+)/],
                [this.actionTypes.show, /^(.+) : Showdown \[(.+)\]/],
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
                        actionAmount = parseStringInt(match[2]);
                    }
                    if (line.includes('All-in')) {
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
                            cards: this.findPlayerCards(match[1]),
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
    parsePokerHand(line) {
        const handIdRegex = /Hand #(\d+)/;
        const tournamentIdRegex = /Tournament #(\d+)/;
        const dateTimeRegex = /(\d{4}\-\d{2}\-\d{2})\s(\d{2}:\d{2}:\d{2})\s(\w+)/;
        const levelRegex = /Level (\S+)/;
        const feePattern = /\$(\d+\.\d+)\+\$(\d+\.\d+)/;
        const blindRegex = /Level \w+ \((\d+)\/(\d+)\)/;
        const tableInfoMatch = line.match(/TBL#(\d+), (\w+)- Level/);
        const gamePattern = /(\w+)\sTournament/;
        const regionalRegex = /\[(\d{4}\/\d{2}\/\d{2}) (\d{2}:\d{2}:\d{2}) (\w+)\]/;
        const handId = handIdRegex.exec(line);
        if (handId) {
            this.handData.handId = handId[1];
        }
        const tournamentId = tournamentIdRegex.exec(line);
        if (tournamentId) {
            this.handData.tournamentId = parseStringInt(tournamentId[1]);
            this.handData.gameFormat = 'Tournament';
            this.handData.pokerRoomId = 'Ignition';
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
        else {
            this.handData.handTimezone = null;
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
        else {
            this.handData.wagerType = null;
            this.handData.tournamentBuyIn = null;
            this.handData.tournamentFee = null;
        }
        if (tableInfoMatch) {
            const [_, tableNumber, tournamentSpeed] = tableInfoMatch;
            this.handData = {
                ...this.handData,
                tournamentTableNumber: isNaN(Number(tableNumber))
                    ? tableNumber
                    : Number(tableNumber),
                tournamentSpeed: tournamentSpeed,
            };
        }
        const gameMatch = line.match(gamePattern);
        if (gameMatch) {
            this.handData.pokerForm = gameMatch[1];
            this.handData.pokerType = 'No Limit';
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
    parseHandInfo(line) {
        const buttonSeatInfo = line.match(/(.+) : Set dealer (\[.+\])/);
        if (buttonSeatInfo) {
            const seatNumber = this.findPlayerSeatNumber(buttonSeatInfo[1]);
            let __seatMax = this.handData.players.length;
            this.handData = {
                ...this.handData,
                buttonSeat: parseStringInt(seatNumber),
                maxTableSeats: Number(__seatMax),
            };
        }
        const smallBlindSeatInfo = line.match(/(.+) (\d+): Small Blind (.+)/);
        const bigBlindSeatInfo = line.match(/(.+) (\d+): Big Blind (.+)/);
        if (smallBlindSeatInfo) {
            this.handData = {
                ...this.handData,
                smallBlindSeat: parseStringInt(smallBlindSeatInfo[2]),
            };
        }
        else if (bigBlindSeatInfo) {
            this.handData = {
                ...this.handData,
                bigBlindSeat: parseStringInt(bigBlindSeatInfo[2]),
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
    parseSummary(line) {
        const totalPlotMatch = line.trim().match(/(.+) : Hand Result ([\d,]+)/);
        const boardMatch = line.match(/Board \[([\w\s]+)\]/);
        this.handData.summary = {
            ...this.handData.summary,
            collected: totalPlotMatch
                ? [
                    ...this.handData.summary.collected,
                    {
                        playerName: totalPlotMatch[1],
                        amount: parseStringInt(totalPlotMatch[2]),
                    },
                ]
                : this.handData.summary.collected,
        };
    }
    ignitionPokerSectionParser(chunks) {
        this.currentStreet = this.street.preFlop;
        const playerRegex = /Seat (\d+): (.+) \((\d+|\d{1,3},\d{3}) in chips\)/;
        const holeCardsRegex = /(.+) : Card dealt to a spot \[(.+)\]/;
        const muckRegex = /(.+) : (?:Does not show|Mucks) \[(.+)\] \((.+)\)/;
        const boardRegex = /Board \[(.+)\]/;
        const emptyRegex = /(\w+) Hand/;
        const emptyLine = emptyRegex.exec(chunks[0]);
        const headLine = chunks[0].toLowerCase();
        if (!emptyLine ||
            !headLine.includes('tournament') ||
            !headLine.includes('hold') ||
            emptyLine[1] !== 'Ignition') {
            return null;
        }
        for (let line of chunks) {
            if (line.includes('Hand')) {
                this.parsePokerHand(line);
            }
            const players = line.match(new RegExp(playerRegex, 'g'));
            if (players) {
                players.forEach((player) => {
                    const [, seatNumber, playerName, chipCount] = playerRegex.exec(player);
                    this.handData.players.push({
                        seatNumber,
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
                let cards = this.getCardsDetail(board[1].trim().split(' '));
                cards.forEach((card) => {
                    this.handData.communityCards.push(card);
                });
            }
            const mucks = muckRegex.exec(line);
            if (mucks) {
                this.handData.summary.mucks.push({
                    playerName: mucks[1],
                    cards: this.getCardsDetail(mucks[2].split(' ')),
                });
            }
            this.handleStreet(line);
            this.parseSummary(line);
            this.parseHandInfo(line);
            const actionNames = [
                'Ante',
                'Small blind',
                'Big blind',
                'Folds',
                'Checks',
                'Call',
                'Bets',
                'Raises',
                'All-in',
                'Showdown',
            ];
            const actionLineFlag = actionNames.find((action) => line.includes(action));
            if (actionLineFlag) {
                this.parseAction(line, actionLineFlag);
            }
        }
        return this.handData;
    }
}
exports.IgnitionPokerService = IgnitionPokerService;
//# sourceMappingURL=ignition-poker.service.js.map