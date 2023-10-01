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
exports.HandHistorySchema = exports.HandHistory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let HandHistory = exports.HandHistory = class HandHistory {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ seatNumber: Number, playerName: String, chipCount: Number }],
        _id: false,
    }),
    __metadata("design:type", Array)
], HandHistory.prototype, "players", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                playerName: String,
                action: String,
                actionAmount: Number,
                street: String,
            },
        ],
        _id: false,
    }),
    __metadata("design:type", Array)
], HandHistory.prototype, "actions", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ playerName: String, cards: (Array) }],
        _id: false,
    }),
    __metadata("design:type", Array)
], HandHistory.prototype, "holeCards", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ rank: String, suit: String }], _id: false }),
    __metadata("design:type", Array)
], HandHistory.prototype, "communityCards", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            shows: (Array),
            mucks: (Array),
            collected: (Array),
        },
        _id: false,
    }),
    __metadata("design:type", Object)
], HandHistory.prototype, "summary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "handId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], HandHistory.prototype, "tournamentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "gameFormat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "pokerRoomId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "pokerForm", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "pokerType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "handDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "handTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "handTimezone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "regionalHandDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "regionalHandTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "regionalHandTimezone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "blindLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], HandHistory.prototype, "tournamentBuyIn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], HandHistory.prototype, "tournamentFee", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "wagerType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "tournamentSpeed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "tournamentTableNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], HandHistory.prototype, "maxTableSeats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], HandHistory.prototype, "buttonSeat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], HandHistory.prototype, "smallBlind", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], HandHistory.prototype, "smallBlindSeat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], HandHistory.prototype, "bigBlind", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], HandHistory.prototype, "bigBlindSeat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], HandHistory.prototype, "ante", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], HandHistory.prototype, "rawData", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: Date.now }),
    __metadata("design:type", Date)
], HandHistory.prototype, "date", void 0);
exports.HandHistory = HandHistory = __decorate([
    (0, mongoose_1.Schema)()
], HandHistory);
exports.HandHistorySchema = mongoose_1.SchemaFactory.createForClass(HandHistory);
//# sourceMappingURL=hand-history.schema.js.map