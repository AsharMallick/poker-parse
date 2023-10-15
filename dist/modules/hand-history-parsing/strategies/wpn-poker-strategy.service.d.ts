import { ParsedReturnData } from '../interfaces/parser.interface';
import { BaseParser } from './base';
declare class WpnPokerStrategyService extends BaseParser {
    private currentStreet;
    constructor();
    parse(sections: string[]): ParsedReturnData;
    parsePokerHand(line: string): void;
    parseAction(line: string, actionFlag: string): void;
    handleStreet(line: string): void;
    parseTable(line: string): void;
    parseCollected(line: string): void;
    parseMuck(line: string): void;
    wpnSectionParser(chunks: string[]): import("../interfaces/parsed-hand-history.interface").ParsedHandHistory;
}
export { WpnPokerStrategyService };
