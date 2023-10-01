import { RoomTypes } from '../../../common/constants/common.constants';
import { PokerSite } from '../interfaces/poker-room.interface';
export declare class DetectorService {
    private readonly constants;
    constructor(constants: RoomTypes);
    pokerSites: PokerSite[];
    identifyRoom(section: string): string;
}
