import { BaseParser } from './base';
import { ParsedHandHistory, Player } from '../interfaces/parsed-hand-history.interface';
declare class GgPokerService extends BaseParser {
    private currentStreet;
    constructor();
    parsePlayer(line: string): Player;
    parseHoleCards(line: string): void;
    parseAction(line: string, actionFlag: string): void;
    parseSummary(line: string): void;
    parsePokerHand(line: string): void;
    parseTable(line: string): void;
    parseCommunityCards(line: string): void;
    parsePlayerSeat(line: string): void;
    handleStreet(line: string): void;
    parse(sections: string[]): string[];
    ggPokerSectionParser(data: string): ParsedHandHistory;
}
export { GgPokerService };
