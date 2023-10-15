import { EightStarStrategyService } from '../../hand-history-parsing/strategies/eight-star-strategy.service';
import { GgPokerStrategyService } from '../strategies/gg-poker-strategy.service';
import { PokerStarsStrategyService } from '../../hand-history-parsing/strategies/poker-stars-strategy.service';
import { IgnitionPokerStrategyService } from '../strategies/ignition-poker-strategy.service';
import { RoomTypes } from '../../../common/constants/common.constants';
import { ChicoPokerStrategyService } from '../strategies/chico-poker-strategy.service';
import { PartyPokerStrategyService } from '../strategies/party-poker-strategy.services';
import { WinamaxPokerStrategyService } from '../strategies/winamax-poker-strategy.service';
import { WpnPokerStrategyService } from '../strategies/wpn-poker-strategy.service';
import { IPokerStrategyService } from '../strategies/ipoker-strategy.service';
export declare class RoomStrategyFactory {
    private constants;
    private readonly eightStarStrategyService;
    private readonly ggPokerStrategyService;
    private readonly pokerStarStrategyService;
    private readonly ignitionPokerStrategyService;
    private readonly chicoPokerStrategyService;
    private readonly partyPokerStrategyService;
    private readonly winamaxPokerStrategyService;
    private readonly wpnPokerStrategyService;
    private readonly iPokerStrategyService;
    constructor(constants: RoomTypes, eightStarStrategyService: EightStarStrategyService, ggPokerStrategyService: GgPokerStrategyService, pokerStarStrategyService: PokerStarsStrategyService, ignitionPokerStrategyService: IgnitionPokerStrategyService, chicoPokerStrategyService: ChicoPokerStrategyService, partyPokerStrategyService: PartyPokerStrategyService, winamaxPokerStrategyService: WinamaxPokerStrategyService, wpnPokerStrategyService: WpnPokerStrategyService, iPokerStrategyService: IPokerStrategyService);
    createStrategy(roomType: string): EightStarStrategyService | GgPokerStrategyService | PokerStarsStrategyService | IgnitionPokerStrategyService | ChicoPokerStrategyService | PartyPokerStrategyService | WinamaxPokerStrategyService | WpnPokerStrategyService | IPokerStrategyService;
}
