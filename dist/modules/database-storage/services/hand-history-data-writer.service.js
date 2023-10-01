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
exports.HandHistoryDataWriterService = void 0;
const common_1 = require("@nestjs/common");
const common_constants_1 = require("../../../common/constants/common.constants");
const hand_history_strategy_service_1 = require("./hand-history-strategy.service");
let HandHistoryDataWriterService = exports.HandHistoryDataWriterService = class HandHistoryDataWriterService {
    constructor(constants, handHistoryRepository) {
        this.constants = constants;
        this.handHistoryRepository = handHistoryRepository;
    }
    async saveHistory(data, roomType, sections) {
        if (roomType === this.constants.poker888) {
            return this.savePokerHandHistory(data, sections);
        }
        else if (roomType === this.constants.ggPoker) {
            return this.saveGGPokerHistory(data, sections);
        }
        else if (roomType === this.constants.pokerStars) {
            return this.savePokerStarHistory(data, sections);
        }
        else if (roomType === this.constants.chico) {
            return this.saveChicoHistory(data, sections);
        }
        else if (roomType === this.constants.ignitionPoker) {
            return this.saveIgnitionHistory(data, sections);
        }
        else if (roomType === this.constants.iPoker) {
            return this.saveIPokerHistory(data, sections);
        }
        else if (roomType === this.constants.partyPoker) {
            return this.savePartyPokerHistory(data, sections);
        }
        else if (roomType === this.constants.winamaxPoker) {
            return this.saveWinamaxPokerHistory(data, sections);
        }
        else if (roomType === this.constants.wpn) {
            return this.saveWpnHistory(data, sections);
        }
    }
    async getHands(pageData) {
        return this.getHandsHistory(pageData);
    }
    async getHand(handId) {
        return this.getEachHandHistory(handId);
    }
    async savePokerHandHistory(handHistories, sections) {
        return await this.handHistoryRepository.createHandHistory(handHistories, sections);
    }
    async saveGGPokerHistory(handHistories, sections) {
        return await this.handHistoryRepository.createHandHistory(handHistories, sections);
    }
    async savePokerStarHistory(pokerStarHistories, sections) {
        return await this.handHistoryRepository.createHandHistory(pokerStarHistories, sections);
    }
    async saveChicoHistory(PokerHistories, sections) {
        return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
    }
    async saveIgnitionHistory(PokerHistories, sections) {
        return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
    }
    async saveIPokerHistory(PokerHistories, sections) {
        return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
    }
    async savePartyPokerHistory(PokerHistories, sections) {
        return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
    }
    async saveWinamaxPokerHistory(PokerHistories, sections) {
        return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
    }
    async saveWpnHistory(PokerHistories, sections) {
        return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
    }
    async getHandsHistory(pageData) {
        return await this.handHistoryRepository.getHandsHistory(pageData);
    }
    async getEachHandHistory(hand) {
        return await this.handHistoryRepository.getEachHandHistory(hand);
    }
};
exports.HandHistoryDataWriterService = HandHistoryDataWriterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_constants_1.RoomTypes,
        hand_history_strategy_service_1.HandHistoryRepository])
], HandHistoryDataWriterService);
//# sourceMappingURL=hand-history-data-writer.service.js.map