"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStreamApiModule = void 0;
const common_1 = require("@nestjs/common");
const data_stream_controller_1 = require("./controllers/data-stream.controller");
const hand_history_parser_service_1 = require("../hand-history-parsing/services/hand-history-parser.service");
const detector_service_1 = require("../poker-room-detection/services/detector.service");
const common_constants_1 = require("../../common/constants/common.constants");
const eight_star_strategy_service_1 = require("../hand-history-parsing/strategies/eight-star-strategy.service");
const gg_poker_strategy_service_1 = require("../hand-history-parsing/strategies/gg-poker-strategy.service");
const poker_stars_strategy_service_1 = require("../hand-history-parsing/strategies/poker-stars-strategy.service");
const hand_history_data_writer_service_1 = require("../database-storage/services/hand-history-data-writer.service");
const ignition_poker_strategy_service_1 = require("../hand-history-parsing/strategies/ignition-poker-strategy.service");
const chico_poker_strategy_service_1 = require("../hand-history-parsing/strategies/chico-poker-strategy.service");
const database_storage_module_1 = require("../database-storage/database-storage.module");
const room_strategy_factory_1 = require("../hand-history-parsing/factories/room-strategy.factory");
const party_poker_strategy_services_1 = require("../hand-history-parsing/strategies/party-poker-strategy.services");
const winamax_poker_strategy_service_1 = require("../hand-history-parsing/strategies/winamax-poker-strategy.service");
const wpn_poker_strategy_service_1 = require("../hand-history-parsing/strategies/wpn-poker-strategy.service");
const ipoker_strategy_service_1 = require("../hand-history-parsing/strategies/ipoker-strategy.service");
const hand_history_schema_1 = require("../database-storage/schemas/hand-history.schema");
let DataStreamApiModule = exports.DataStreamApiModule = class DataStreamApiModule {
};
exports.DataStreamApiModule = DataStreamApiModule = __decorate([
    (0, common_1.Module)({
        imports: [database_storage_module_1.DatabaseStorageModule],
        controllers: [
            data_stream_controller_1.DataStreamController,
        ],
        providers: [
            hand_history_data_writer_service_1.HandHistoryDataWriterService,
            hand_history_parser_service_1.HandHistoryParserService,
            detector_service_1.DetectorService,
            common_constants_1.RoomTypes,
            common_constants_1.Street,
            common_constants_1.ActionType,
            eight_star_strategy_service_1.EightStarStrategyService,
            gg_poker_strategy_service_1.GgPokerStrategyService,
            poker_stars_strategy_service_1.PokerStarsStrategyService,
            ignition_poker_strategy_service_1.IgnitionPokerStrategyService,
            chico_poker_strategy_service_1.ChicoPokerStrategyService,
            party_poker_strategy_services_1.PartyPokerStrategyService,
            winamax_poker_strategy_service_1.WinamaxPokerStrategyService,
            wpn_poker_strategy_service_1.WpnPokerStrategyService,
            ipoker_strategy_service_1.IPokerStrategyService,
            room_strategy_factory_1.RoomStrategyFactory,
            hand_history_schema_1.HandHistory,
        ],
    })
], DataStreamApiModule);
//# sourceMappingURL=data-stream-api.module.js.map