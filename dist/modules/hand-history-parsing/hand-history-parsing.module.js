"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandHistoryParsingModule = void 0;
const common_1 = require("@nestjs/common");
const hand_history_controller_1 = require("./controllers/hand-history.controller");
const hand_history_parser_service_1 = require("./services/hand-history-parser.service");
let HandHistoryParsingModule = exports.HandHistoryParsingModule = class HandHistoryParsingModule {
};
exports.HandHistoryParsingModule = HandHistoryParsingModule = __decorate([
    (0, common_1.Module)({
        controllers: [hand_history_controller_1.HandHistoryController],
        providers: [hand_history_parser_service_1.HandHistoryParserService]
    })
], HandHistoryParsingModule);
//# sourceMappingURL=hand-history-parsing.module.js.map