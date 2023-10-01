import { ParsedReturnData } from '../interfaces/parser.interface';
import { BaseParser } from './base';
export declare class IgnitionPokerStrategyService extends BaseParser {
    private currentStreet;
    constructor();
    parse(sections: string[]): ParsedReturnData;
    parseAction(line: string, actionFlag: string): void;
    parsePokerHand(line: string): void;
    handleStreet(line: string): void;
    parseHandInfo(line: string): void;
    parseHoleCards(line: string): void;
    parseSummary(line: string): void;
    ignitionPokerSectionParser(chunks: string[]): import("../interfaces/parsed-hand-history.interface").ParsedHandHistory;
}
