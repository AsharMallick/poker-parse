import { BaseParser } from './base';
import { ParsedReturnData } from '../interfaces/parser.interface';
export declare class EightStarStrategyService extends BaseParser {
    constructor();
    parse(sections: string[]): ParsedReturnData;
    eightPokerSectionParser(chunks: string[]): import("../interfaces/parsed-hand-history.interface").ParsedHandHistory;
}
