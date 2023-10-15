import { BaseParser } from './base';
declare class PartyPokerStrategyService extends BaseParser {
    private currentStreet;
    constructor();
    parse(sections: string[]): string[];
    parseHandId(line: string): void;
    parsePokerHand(line: string): void;
    parseAction(line: string, actionFlag: string): void;
    handleStreet(line: string): void;
    parseTable(line: string): void;
    parseHoleCards(line: string): void;
    parseSummary(line: string): void;
    sectionParser(chunks: string[]): import("../interfaces/parsed-hand-history.interface").ParsedHandHistory;
}
export { PartyPokerStrategyService };
