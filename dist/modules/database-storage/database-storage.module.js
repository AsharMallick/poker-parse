"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseStorageModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_client_service_1 = require("./services/mongodb-client.service");
const hand_history_data_writer_service_1 = require("./services/hand-history-data-writer.service");
const database_controller_1 = require("./controllers/database.controller");
const common_constants_1 = require("../../common/constants/common.constants");
const hand_history_strategy_service_1 = require("./services/hand-history-strategy.service");
const hand_history_schema_1 = require("./schemas/hand-history.schema");
let DatabaseStorageModule = exports.DatabaseStorageModule = class DatabaseStorageModule {
};
exports.DatabaseStorageModule = DatabaseStorageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: hand_history_schema_1.HandHistory.name, schema: hand_history_schema_1.HandHistorySchema },
            ]),
        ],
        controllers: [database_controller_1.DatabaseController],
        providers: [
            mongodb_client_service_1.MongodbClientService,
            hand_history_data_writer_service_1.HandHistoryDataWriterService,
            hand_history_strategy_service_1.HandHistoryRepository,
            common_constants_1.RoomTypes,
        ],
        exports: [hand_history_data_writer_service_1.HandHistoryDataWriterService, hand_history_strategy_service_1.HandHistoryRepository],
    })
], DatabaseStorageModule);
//# sourceMappingURL=database-storage.module.js.map