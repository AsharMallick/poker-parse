import { BaseParser } from './base';
import { ParsedHandHistory, Player } from '../interfaces/parsed-hand-history.interface';
import { ParsedReturnData } from '../interfaces/parser.interface';
declare class GgPokerStrategyService extends BaseParser {
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
    parse(sections: string[]): ParsedReturnData;
    ggPokerSectionParser(data: string): ParsedHandHistory;
}
export { GgPokerStrategyService };
