import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_FILTER } from '@nestjs/core';
import { join } from "path";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { DataStreamApiModule } from './modules/data-stream-api/data-stream-api.module';
import { StreamReceiverService } from './modules/data-stream-api/services/stream-receiver.service';
import { DataBufferService } from './modules/data-stream-api/services/data-buffer.service';
import { ChunkParserService } from './modules/data-stream-api/services/chunk-parser.service';
import { HandHistoryValidatorService } from './modules/data-stream-api/services/hand-history-validator.service';
import { PokerRoomDetectionModule } from './modules/poker-room-detection/poker-room-detection.module';
import { HandHistoryParsingModule } from './modules/hand-history-parsing/hand-history-parsing.module';
import { DatabaseStorageModule } from './modules/database-storage/database-storage.module';
import { ErrorHandlingModule } from './modules/error-handling/error-handling.module';
import { ReportingModule } from './modules/reporting/reporting.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/services/config.service';

@Module({
  imports: [
    ConfigModule,
    // MongoDB Connection
    MongooseModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/v1/*'],
    }),

    DatabaseStorageModule,
    DataStreamApiModule,
    HandHistoryParsingModule,
    PokerRoomDetectionModule,
    ErrorHandlingModule,
    ReportingModule,
  ],
  
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    StreamReceiverService,
    DataBufferService,
    ChunkParserService,
    HandHistoryValidatorService,
  ],
})
export class AppModule { }
