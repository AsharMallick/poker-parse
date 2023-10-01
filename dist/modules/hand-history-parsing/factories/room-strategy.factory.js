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
exports.RoomStrategyFactory = void 0;
const common_1 = require("@nestjs/common");
const eight_star_strategy_service_1 = require("../../hand-history-parsing/strategies/eight-star-strategy.service");
const gg_poker_strategy_service_1 = require("../strategies/gg-poker-strategy.service");
const poker_stars_strategy_service_1 = require("../../hand-history-parsing/strategies/poker-stars-strategy.service");
const ignition_poker_strategy_service_1 = require("../strategies/ignition-poker-strategy.service");
const common_constants_1 = require("../../../common/constants/common.constants");
const chico_poker_strategy_service_1 = require("../strategies/chico-poker-strategy.service");
const party_poker_strategy_services_1 = require("../strategies/party-poker-strategy.services");
const winamax_poker_strategy_service_1 = require("../strategies/winamax-poker-strategy.service");
const wpn_poker_strategy_service_1 = require("../strategies/wpn-poker-strategy.service");
const ipoker_strategy_service_1 = require("../strategies/ipoker-strategy.service");
let RoomStrategyFactory = exports.RoomStrategyFactory = class RoomStrategyFactory {
    constructor(constants, eightStarStrategyService, ggPokerStrategyService, pokerStarStrategyService, ignitionPokerStrategyService, chicoPokerStrategyService, partyPokerStrategyService, winamaxPokerStrategyService, wpnPokerStrategyService, iPokerStrategyService) {
        this.constants = constants;
        this.eightStarStrategyService = eightStarStrategyService;
        this.ggPokerStrategyService = ggPokerStrategyService;
        this.pokerStarStrategyService = pokerStarStrategyService;
        this.ignitionPokerStrategyService = ignitionPokerStrategyService;
        this.chicoPokerStrategyService = chicoPokerStrategyService;
        this.partyPokerStrategyService = partyPokerStrategyService;
        this.winamaxPokerStrategyService = winamaxPokerStrategyService;
        this.wpnPokerStrategyService = wpnPokerStrategyService;
        this.iPokerStrategyService = iPokerStrategyService;
    }
    createStrategy(roomType) {
        switch (roomType) {
            case this.constants.poker888:
                return this.eightStarStrategyService;
            case this.constants.pokerStars:
                return this.pokerStarStrategyService;
            case this.constants.ggPoker:
                return this.ggPokerStrategyService;
            case this.constants.ignitionPoker:
                return this.ignitionPokerStrategyService;
            case this.constants.chico:
                return this.chicoPokerStrategyService;
            case this.constants.partyPoker:
                return this.partyPokerStrategyService;
            case this.constants.winamaxPoker:
                return this.winamaxPokerStrategyService;
            case this.constants.wpn:
                return this.wpnPokerStrategyService;
            case this.constants.iPoker:
                return this.iPokerStrategyService;
            default:
                return null;
        }
    }
};
exports.RoomStrategyFactory = RoomStrategyFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_constants_1.RoomTypes,
        eight_star_strategy_service_1.EightStarStrategyService,
        gg_poker_strategy_service_1.GgPokerStrategyService,
        poker_stars_strategy_service_1.PokerStarsStrategyService,
        ignition_poker_strategy_service_1.IgnitionPokerStrategyService,
        chico_poker_strategy_service_1.ChicoPokerStrategyService,
        party_poker_strategy_services_1.PartyPokerStrategyService,
        winamax_poker_strategy_service_1.WinamaxPokerStrategyService,
        wpn_poker_strategy_service_1.WpnPokerStrategyService,
        ipoker_strategy_service_1.IPokerStrategyService])
], RoomStrategyFactory);
//# sourceMappingURL=room-strategy.factory.js.map