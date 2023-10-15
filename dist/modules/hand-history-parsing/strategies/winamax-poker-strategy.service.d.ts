import { ParsedReturnData } from '../interfaces/parser.interface';
import { BaseParser } from './base';
declare class WinamaxPokerStrategyService extends BaseParser {
    private currentStreet;
    constructor();
    parse(sections: string[]): ParsedReturnData;
    parsePokerHand(line: string): void;
    parseAction(line: string, actionFlag: string): void;
    handleStreet(line: string): void;
    parseTable(line: string): void;
    parseHoleCards(line: string): void;
    winamaxSectionParser(chunks: string[]): import("../interfaces/parsed-hand-history.interface").ParsedHandHistory;
}
export { WinamaxPokerStrategyService };
