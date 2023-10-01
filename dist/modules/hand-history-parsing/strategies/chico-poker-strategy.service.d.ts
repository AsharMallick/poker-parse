import { ParsedReturnData } from '../interfaces/parser.interface';
import { BaseParser } from './base';
declare class ChicoPokerStrategyService extends BaseParser {
    private currentStreet;
    constructor();
    parse(sections: string[]): ParsedReturnData;
    parsePokerHand(line: string): void;
    parseAction(line: string, actionFlag: string): void;
    handleStreet(line: string): void;
    parseTable(line: string): void;
    parseSummary(line: string): void;
    sectionParser(chunks: string[]): import("../interfaces/parsed-hand-history.interface").ParsedHandHistory;
}
export { ChicoPokerStrategyService };
