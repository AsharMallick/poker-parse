export declare class GGPokerHistoryDto {
    players: Player[];
    actions: Action[];
    holeCards: HoleCards[];
    summary: SummaryAction[];
    handId: string;
    tournamentId: string;
    tournamentBuyIn: number;
    tournamentFee: number;
    tournamentName: string;
    tournamentTableNumber: number;
    maxTableSeats: number;
    buttonSeat: number;
    antes: number;
    blindLevel: string;
    smallBlindSeat: number;
    bigBlindSeat: number;
    email: string;
    currency: string;
    level: number;
    smallBlind: number;
    bigBlind: number;
    handDate: string;
    handTime: string;
    handTimezone: string;
    regionalHandDate: string;
    regionalHandTime: string;
    regionalHandTimezone: string;
    gameFormat: string;
    seats: number;
    pokerForm: string;
    pokerType: string;
    tournamentSpeed: string;
    wagerType: string;
    table: Table;
    ante: number;
    handCards: {
        rank: string;
        suit: string;
    }[];
    communityCards: {
        rank: string;
        suit: string;
    }[];
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
export declare class HandResult {
    playerName: string;
    action: string;
    showCards: string;
    street: string;
    actionAmount: number;
}
export declare class Winner {
    wonAmount: number;
    playerName: string;
}
export declare class Table {
    id: number;
    buttonSeat: number;
    maxSeats: number;
    smallBlind: number;
    bigBlind: number;
}
export declare class HoleCards {
    player: string;
    cards: string[];
}
export declare class SummaryAction {
    shows: {
        player: string;
        cards: {
            rank: string;
            suit: string;
        }[];
    }[];
    collected: {
        player: string;
        amount: string;
    }[];
    actions: Action[];
    winner: Winner[];
    mucks: string[];
    notShow: {
        player: string;
    }[];
    handResults: HandResult[];
    totalPot: number;
    board: string;
}
