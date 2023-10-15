import { RoomTypes } from '../../../common/constants/common.constants';
import { HandHistoryDataWriterInterface } from 'src/modules/data-stream-api/interfaces/hand-history-data-writer.interface';
import { HandHistoryRepository } from './hand-history-strategy.service';
import { PokerHistoryDto } from '../dtos/history.dto';
export declare class HandHistoryDataWriterService implements HandHistoryDataWriterInterface {
    private constants;
    private readonly handHistoryRepository;
    constructor(constants: RoomTypes, handHistoryRepository: HandHistoryRepository);
    saveHistory(data: any[], roomType: string, sections: any): Promise<any>;
    getHands(pageData: any): Promise<any>;
    getHand(handId: string): Promise<any>;
    savePokerHandHistory(handHistories: PokerHistoryDto[], sections: any): Promise<"Database Success" | "Database Error">;
    saveGGPokerHistory(handHistories: PokerHistoryDto[], sections: any): Promise<"Database Success" | "Database Error">;
    savePokerStarHistory(pokerStarHistories: PokerHistoryDto[], sections: any): Promise<"Database Success" | "Database Error">;
    saveChicoHistory(PokerHistories: PokerHistoryDto[], sections: any): Promise<"Database Success" | "Database Error">;
    saveIgnitionHistory(PokerHistories: PokerHistoryDto[], sections: any): Promise<"Database Success" | "Database Error">;
    saveIPokerHistory(PokerHistories: PokerHistoryDto[], sections: any): Promise<"Database Success" | "Database Error">;
    savePartyPokerHistory(PokerHistories: PokerHistoryDto[], sections: any): Promise<"Database Success" | "Database Error">;
    saveWinamaxPokerHistory(PokerHistories: PokerHistoryDto[], sections: any): Promise<"Database Success" | "Database Error">;
    saveWpnHistory(PokerHistories: PokerHistoryDto[], sections: any): Promise<"Database Success" | "Database Error">;
    getHandsHistory(pageData: any): Promise<any>;
    getEachHandHistory(hand: string): Promise<any>;
}
