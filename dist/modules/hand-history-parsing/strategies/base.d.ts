import { ActionType, Street } from '../../../common/constants/common.constants';
import { Card, ParsedHandHistory } from '../interfaces/parsed-hand-history.interface';
export declare class BaseParser {
    private readonly constants;
    street: Street;
    actionTypes: ActionType;
    handData: ParsedHandHistory;
    actionNames: string[];
    findPlayer(nickname: string): string;
    findPlayerSeatNumber(nickname: string): number;
    findPlayerCards(nickname: string): any;
    initHandData(): void;
    showAction(match: any, type: any, line: any, lineno: any): {
        player: any;
        type: any;
        card1: any;
        card2: any;
        metadata: {
            lineno: any;
            raw: any;
        };
        desc: any;
    };
    actionType(s: any): any;
    getCardsDetail(cards: any): Card[];
}
