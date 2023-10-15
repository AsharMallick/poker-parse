import { ParsedReturnData } from '../interfaces/parser.interface';
import { BaseParser } from './base';
declare class PartyPokerStrategyService extends BaseParser {
    private currentStreet;
    constructor();
    parse(sections: string[]): ParsedReturnData;
    parseHandId(line: string): void;
    parsePokerHand(line: string): void;
    parseAction(line: string, actionFlag: string, beforeLine: string): void;
    handleStreet(line: string): void;
    parseTableSeat(line: string): void;
    parseTable(line: string): void;
    parseHoleCards(line: string): void;
    parseSummary(line: string): void;
    sectionParser(chunks: string[]): import("../interfaces/parsed-hand-history.interface").ParsedHandHistory;
}
export { PartyPokerStrategyService };
