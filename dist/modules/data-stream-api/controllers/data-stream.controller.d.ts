/// <reference types="multer" />
import { DetectorService } from '../../poker-room-detection/services/detector.service';
import { HandHistoryDataWriterService } from '../../database-storage/services/hand-history-data-writer.service';
import { RoomStrategyFactory } from '../../hand-history-parsing/factories/room-strategy.factory';
import { RoomTypes } from 'src/common/constants/common.constants';
export declare class DataStreamController {
    private roomDetection;
    private readonly handModelService;
    private readonly roomStrategyFactory;
    private readonly roomType;
    constructor(roomDetection: DetectorService, handModelService: HandHistoryDataWriterService, roomStrategyFactory: RoomStrategyFactory, roomType: RoomTypes);
    getHands(body: any): Promise<any>;
    getHand(handId: string): Promise<string>;
    receiveHistory(files: Express.Multer.File[]): Promise<{
        status: string;
        msg: any;
    }>;
    private readFileContent;
    streamOne(request: Request): Promise<import("rxjs").Observable<never> | {
        status: string;
        message: string;
        correctFiles: number;
        wrongFiles: number;
        parsedFiles: number;
        notParsedFiles: number;
    }>;
}
