"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerRoomDetectionModule = void 0;
const common_1 = require("@nestjs/common");
const poker_room_controller_1 = require("./controllers/poker-room.controller");
const detector_service_1 = require("./services/detector.service");
const detector_cache_service_1 = require("./services/detector-cache.service");
const common_constants_1 = require("../../common/constants/common.constants");
let PokerRoomDetectionModule = exports.PokerRoomDetectionModule = class PokerRoomDetectionModule {
};
exports.PokerRoomDetectionModule = PokerRoomDetectionModule = __decorate([
    (0, common_1.Module)({
        controllers: [poker_room_controller_1.PokerRoomController],
        providers: [
            detector_service_1.DetectorService,
            detector_cache_service_1.DetectorCacheService,
            common_constants_1.RoomTypes
        ]
    })
], PokerRoomDetectionModule);
//# sourceMappingURL=poker-room-detection.module.js.map