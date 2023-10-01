"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionType = exports.Street = exports.RoomTypes = void 0;
const common_1 = require("@nestjs/common");
let RoomTypes = exports.RoomTypes = class RoomTypes {
    constructor() {
        this.poker888 = '888 Poker';
        this.chico = 'Bet Online Poker';
        this.ggPoker = 'GG Poker';
        this.ignitionPoker = 'Ignition Poker';
        this.acr = 'ACR';
        this.partyPoker = 'Party Poker';
        this.pokerStars = 'Poker Stars';
        this.iPoker = 'I Poker';
        this.winamaxPoker = 'Winamax Poker';
        this.wpn = 'WPN';
        this.noType = 'Not Recognized';
    }
};
exports.RoomTypes = RoomTypes = __decorate([
    (0, common_1.Injectable)()
], RoomTypes);
let Street = exports.Street = class Street {
    constructor() {
        this.preFlop = 'preFlop';
        this.flop = 'Flop';
        this.turn = 'Turn';
        this.river = 'River';
        this.showdown = 'Showdown';
        this.summary = 'Summary';
    }
};
exports.Street = Street = __decorate([
    (0, common_1.Injectable)()
], Street);
let ActionType = exports.ActionType = class ActionType {
    constructor() {
        this.postAnte = 'postAnte';
        this.postSmallBlind = 'postSmallBlind';
        this.postBigBlind = 'postBigBlind';
        this.fold = 'fold';
        this.raise = 'raise';
        this.allIn = 'all in';
        this.allInWithRaise = 'all in, raise';
        this.allInWithCall = 'all in, call';
        this.allInWithBet = 'all in, bet';
        this.check = 'check';
        this.bet = 'bet';
        this.show = 'show';
        this.call = 'call';
    }
};
exports.ActionType = ActionType = __decorate([
    (0, common_1.Injectable)()
], ActionType);
//# sourceMappingURL=common.constants.js.map