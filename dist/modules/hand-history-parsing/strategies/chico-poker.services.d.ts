import { BaseParser } from './base';
declare class ChicoPokerStrategyService extends BaseParser {
    private currentStreet;
    constructor();
    parse(sections: string[]): string[];
    parsePokerHand(line: string): void;
    parseAction(line: string, actionFlag: string): void;
    handleStreet(line: string): void;
    parseTable(line: string): void;
    parseSummary(line: string): void;
    getCardsDetail(cards: any): any[];
    sectionParser(chunks: string[]): import("../interfaces/parsed-hand-history.interface").ParsedHandHistory;
}
export { ChicoPokerStrategyService };
