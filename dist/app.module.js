"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const http_exception_filter_1 = require("./shared/filters/http-exception.filter");
const data_stream_api_module_1 = require("./modules/data-stream-api/data-stream-api.module");
const stream_receiver_service_1 = require("./modules/data-stream-api/services/stream-receiver.service");
const data_buffer_service_1 = require("./modules/data-stream-api/services/data-buffer.service");
const chunk_parser_service_1 = require("./modules/data-stream-api/services/chunk-parser.service");
const hand_history_validator_service_1 = require("./modules/data-stream-api/services/hand-history-validator.service");
const poker_room_detection_module_1 = require("./modules/poker-room-detection/poker-room-detection.module");
const hand_history_parsing_module_1 = require("./modules/hand-history-parsing/hand-history-parsing.module");
const database_storage_module_1 = require("./modules/database-storage/database-storage.module");
const error_handling_module_1 = require("./modules/error-handling/error-handling.module");
const reporting_module_1 = require("./modules/reporting/reporting.module");
const config_module_1 = require("./config/config.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_service_1 = require("./config/services/config.service");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_service_1.ConfigService],
                useFactory: async (configService) => configService.getMongoConfig(),
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                exclude: ['/api/v1/*'],
            }),
            database_storage_module_1.DatabaseStorageModule,
            data_stream_api_module_1.DataStreamApiModule,
            hand_history_parsing_module_1.HandHistoryParsingModule,
            poker_room_detection_module_1.PokerRoomDetectionModule,
            error_handling_module_1.ErrorHandlingModule,
            reporting_module_1.ReportingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            stream_receiver_service_1.StreamReceiverService,
            data_buffer_service_1.DataBufferService,
            chunk_parser_service_1.ChunkParserService,
            hand_history_validator_service_1.HandHistoryValidatorService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map