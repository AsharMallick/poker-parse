"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParser = void 0;
const common_1 = require("@nestjs/common");
const common_constants_1 = require("../../../common/constants/common.constants");
const { safeTrim, safeFirstUpper, } = require('../../../common/utility/stringUtils');
class BaseParser {
    constructor() {
        this.actionNames = [
            'folds',
            'checks',
            'calls',
            'bets',
            'raises',
            'all-in',
            'shows',
            'posts',
            'posts small blind',
            'posts big blind',
            'collected',
        ];
    }
    findPlayer(nickname) {
        return this.handData.players.find((player) => player.playerName === nickname)?.playerName;
    }
    findPlayerSeatNumber(nickname) {
        return this.handData.players.find((player) => player.playerName === nickname)?.seatNumber;
    }
    findPlayerCards(nickname) {
        let __playerName = this.handData.players.find((player) => player.playerName === nickname)?.playerName;
        return this.handData.holeCards.find((card) => card.playerName === __playerName).cards;
    }
    initHandData() {
        this.handData = {
            players: [],
            actions: [],
            holeCards: [],
            communityCards: [],
            summary: {
                shows: [],
                mucks: [],
                collected: [],
            },
            handId: null,
            tournamentId: null,
            gameFormat: null,
            pokerRoomId: null,
            pokerForm: null,
            pokerType: null,
            handDate: null,
            handTime: null,
            handTimezone: null,
            regionalHandDate: null,
            regionalHandTime: null,
            regionalHandTimezone: null,
            blindLevel: null,
            currency: null,
            tournamentBuyIn: null,
            tournamentFee: null,
            wagerType: null,
            tournamentSpeed: null,
            tournamentTableNumber: null,
            maxTableSeats: null,
            buttonSeat: null,
            smallBlind: null,
            smallBlindSeat: null,
            bigBlind: null,
            bigBlindSeat: null,
            ante: null,
        };
    }
    showAction(match, type, line, lineno) {
        const action = {
            player: safeTrim(match[1]),
            type: type,
            card1: safeFirstUpper(safeTrim(match[2])),
            card2: safeFirstUpper(safeTrim(match[3])),
            metadata: {
                lineno: lineno,
                raw: line,
            },
            desc: undefined,
        };
        if (match[4] != null)
            action.desc = match[4];
        return action;
    }
    actionType(s) {
        s = s.replace(/(ed|s)$/, '').toLowerCase();
        if (/^fold/.test(s))
            return 'fold';
        if (/all-in\(raise\)/.test(s))
            return 'raise';
        if (/all-in\(bet\)/.test(s))
            return 'bet';
        if (/all-in/i.test(s))
            return 'call';
        return s;
    }
    getCardsDetail(cards) {
        let result = [];
        cards.forEach((card) => {
            result.push({
                rank: card.slice(0, -1),
                suit: card.slice(-1),
            });
        });
        return result;
    }
}
exports.BaseParser = BaseParser;
__decorate([
    (0, common_1.Inject)(common_constants_1.RoomTypes),
    __metadata("design:type", common_constants_1.RoomTypes)
], BaseParser.prototype, "constants", void 0);
__decorate([
    (0, common_1.Inject)(common_constants_1.Street),
    __metadata("design:type", common_constants_1.Street)
], BaseParser.prototype, "street", void 0);
__decorate([
    (0, common_1.Inject)(common_constants_1.ActionType),
    __metadata("design:type", common_constants_1.ActionType)
], BaseParser.prototype, "actionTypes", void 0);
//# sourceMappingURL=base.js.map