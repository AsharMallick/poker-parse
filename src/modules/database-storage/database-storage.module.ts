import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbClientService } from './services/mongodb-client.service';
import { HandHistoryDataWriterService } from './services/hand-history-data-writer.service';
import { DatabaseController } from './controllers/database.controller';
import { RoomTypes } from 'src/common/constants/common.constants';
import { HandHistoryRepository } from './services/hand-history-strategy.service';
import { HandHistory, HandHistorySchema } from './schemas/hand-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HandHistory.name, schema: HandHistorySchema },
    ]),
  ],

  controllers: [DatabaseController],
  providers: [
    MongodbClientService,
    HandHistoryDataWriterService,
    HandHistoryRepository,
    RoomTypes,
  ],
  exports: [HandHistoryDataWriterService, HandHistoryRepository],
})
export class DatabaseStorageModule {}
