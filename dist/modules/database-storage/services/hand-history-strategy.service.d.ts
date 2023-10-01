import { Model } from 'mongoose';
import { PokerHistoryDto } from 'src/modules/database-storage/dtos/history.dto';
import { HandHistory } from 'src/modules/database-storage/schemas/hand-history.schema';
export declare class HandHistoryRepository {
    private readonly handHistoryModel;
    constructor(handHistoryModel: Model<HandHistory>);
    getHistoryByGameId(handId: string): Promise<any>;
    getHandsHistory(pageData: any): Promise<any>;
    getEachHandHistory(handId: string): Promise<any>;
    createHandHistory(handHistories: PokerHistoryDto[], sections: any): Promise<"Database Success" | "Database Error">;
}
