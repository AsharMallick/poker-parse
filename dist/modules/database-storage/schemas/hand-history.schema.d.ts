/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HydratedDocument } from 'mongoose';
export type HandHistoryDocument = HydratedDocument<HandHistory>;
export declare class HandHistory {
    players: {
        seatNumber: number;
        playerName: string;
        chipCount: number;
    }[];
    actions: {
        playerName: string;
        action: string;
        actionAmount: number;
        street: string;
    }[];
    holeCards: {
        playerName: string;
        cards: {
            rank: string;
            suit: string;
        }[];
    }[];
    communityCards: {
        rank: string;
        suit: string;
    }[];
    summary: {
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
            amount: number;
        }[];
    };
    handId: string;
    tournamentId: number;
    gameFormat: string;
    pokerRoomId: string;
    pokerForm: string;
    pokerType: string;
    handDate: string;
    handTime: string;
    handTimezone: string;
    regionalHandDate: string;
    regionalHandTime: string;
    regionalHandTimezone: string;
    blindLevel: string;
    currency: string;
    tournamentBuyIn: number;
    tournamentFee: number;
    wagerType: string;
    tournamentSpeed: string;
    tournamentTableNumber: string;
    maxTableSeats: number;
    buttonSeat: number;
    smallBlind: number;
    smallBlindSeat: number;
    bigBlind: number;
    bigBlindSeat: number;
    ante: number;
    rawData: string;
    date: Date;
}
export declare const HandHistorySchema: import("mongoose").Schema<HandHistory, import("mongoose").Model<HandHistory, any, any, any, import("mongoose").Document<unknown, any, HandHistory> & HandHistory & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HandHistory, import("mongoose").Document<unknown, {}, HandHistory> & HandHistory & {
    _id: import("mongoose").Types.ObjectId;
}>;
