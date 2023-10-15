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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandHistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hand_history_schema_1 = require("../schemas/hand-history.schema");
let HandHistoryRepository = exports.HandHistoryRepository = class HandHistoryRepository {
    constructor(handHistoryModel) {
        this.handHistoryModel = handHistoryModel;
    }
    async getHistoryByGameId(handId) {
        let history;
        try {
            history = await this.handHistoryModel.findOne({ handId });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('');
        }
        if (!history) {
            return null;
        }
        return history;
    }
    async getHandsHistory(pageData) {
        const { pageNumber, pageSize } = pageData;
        const skip = (pageNumber - 1) * pageSize;
        const limit = pageSize;
        const hands = await this.handHistoryModel.find().skip(skip).limit(limit).exec();
        return hands;
    }
    async getEachHandHistory(handId) {
        const hands = await this.handHistoryModel.findOne({ handId: handId }).exec();
        return hands;
    }
    async createHandHistory(handHistories, sections) {
        try {
            for (const [index, query] of handHistories.entries()) {
                let client = await this.getHistoryByGameId(query.handId);
                if (!client && query.handId != null) {
                    client = new this.handHistoryModel({ ...query, rawData: sections[index] });
                    await client
                        .save()
                        .then((res) => { })
                        .catch((err) => {
                        console.log(err);
                    });
                }
                else {
                    await this.handHistoryModel
                        .findOneAndUpdate({ handId: query.handId }, query, { new: true })
                        .exec()
                        .then((res) => { })
                        .catch((err) => {
                        console.log(err);
                    });
                }
            }
            return 'Database Success';
        }
        catch (error) {
            return 'Database Error';
        }
    }
};
exports.HandHistoryRepository = HandHistoryRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(hand_history_schema_1.HandHistory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HandHistoryRepository);
//# sourceMappingURL=hand-history-strategy.service.js.map