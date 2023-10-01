import { ParsedReturnData } from '../interfaces/parser.interface';
import { BaseParser } from './base';
declare class IPokerStrategyService extends BaseParser {
    private currentStreet;
    constructor();
    parse(sections: string[]): ParsedReturnData;
    parsePokerHand(line: string): void;
    parseTable(line: string): void;
    parseAction(line: string, actionFlag: string): void;
    handleStreet(line: string): void;
    parseHoleCards(line: string): void;
    getCardsDetailIPoker(cards: any): any[];
    parseTableSeat(line: string): void;
    iPokerSectionParser(chunks: string[]): import("../interfaces/parsed-hand-history.interface").ParsedHandHistory;
}
export { IPokerStrategyService };
