export declare class PokerHistoryDto {
    players: Player[];
    actions: Action[];
    holeCards: HoleCards[];
    communityCards: {
        rank: string;
        suit: string;
    }[];
    summary: SummaryAction[];
    handId: string;
    tournamentId: number;
    tournamentBuyIn: number;
    tournamentFee: number;
    tournamentTableNumber: number;
    maxTableSeats: number;
    buttonSeat: number;
    blindLevel: string;
    smallBlindSeat: number;
    bigBlindSeat: number;
    currency: string;
    smallBlind: number;
    bigBlind: number;
    handDate: string;
    handTime: string;
    handTimezone: string;
    regionalHandDate: string;
    regionalHandTime: string;
    regionalHandTimezone: string;
    gameFormat: string;
    pokerForm: string;
    pokerType: string;
    pokerRoomId: string | null;
    tournamentSpeed: string;
    wagerType: string;
    ante: number;
}
export declare class Player {
    seatNumber: number;
    playerName: string;
    chipCount: number;
}
export declare class Action {
    playerName: string;
    action: string;
    actionAmount: number;
    street: string;
}
export declare class HoleCards {
    playerName: string;
    cards: string[];
}
export declare class SummaryAction {
    shows: {
        playerName: string;
        cards: {
            rank: string;
            suit: string;
        }[];
    }[];
    mucks: {
        playerName: string;
        cards: {
            rank: string;
            suit: string;
        }[];
    }[];
    collected: {
        playerName: string;
        amount: string;
    }[];
}
