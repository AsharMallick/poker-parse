import { Injectable } from '@nestjs/common';
import { RoomTypes } from '../../../common/constants/common.constants';
import { HandHistoryDataWriterInterface } from 'src/modules/data-stream-api/interfaces/hand-history-data-writer.interface';
import { HandHistoryRepository } from './hand-history-strategy.service';
import { PokerHistoryDto } from '../dtos/history.dto';

@Injectable()
export class HandHistoryDataWriterService
  implements HandHistoryDataWriterInterface
{
  constructor(
    private constants: RoomTypes,
    private readonly handHistoryRepository: HandHistoryRepository, // private readonly ggPokerHistoryRepository: GGPokerHistoryRepository
  ) {}

  async saveHistory(data: any[], roomType: string, sections: any): Promise<any> {
    if (roomType === this.constants.poker888) {
      return this.savePokerHandHistory(data, sections);
    } else if (roomType === this.constants.ggPoker) {
      return this.saveGGPokerHistory(data, sections);
    } else if (roomType === this.constants.pokerStars) {
      return this.savePokerStarHistory(data, sections);
    } else if (roomType === this.constants.chico) {
      return this.saveChicoHistory(data, sections);
    } else if (roomType === this.constants.ignitionPoker) {
      return this.saveIgnitionHistory(data, sections);
    } else if (roomType === this.constants.iPoker) {
      return this.saveIPokerHistory(data, sections);
    } else if (roomType === this.constants.partyPoker) {
      return this.savePartyPokerHistory(data, sections);
    } else if (roomType === this.constants.winamaxPoker) {
      return this.saveWinamaxPokerHistory(data, sections);
    } else if (roomType === this.constants.wpn) {
      return this.saveWpnHistory(data, sections);
    }
  }

  
  async getHands(pageData: any): Promise<any> {
      return this.getHandsHistory(pageData);
  }
  

  async getHand(handId: string): Promise<any> {
    return this.getEachHandHistory(handId);
}

  async savePokerHandHistory(handHistories: PokerHistoryDto[], sections: any) {
    return await this.handHistoryRepository.createHandHistory(handHistories, sections);
  }

  async saveGGPokerHistory(handHistories: PokerHistoryDto[], sections: any) {
    return await this.handHistoryRepository.createHandHistory(handHistories, sections);
  }

  async savePokerStarHistory(pokerStarHistories: PokerHistoryDto[], sections: any) {
    return await this.handHistoryRepository.createHandHistory(
      pokerStarHistories, sections
    );
  }

  async saveChicoHistory(PokerHistories: PokerHistoryDto[], sections: any) {
    return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
  }

  async saveIgnitionHistory(PokerHistories: PokerHistoryDto[], sections: any) {
    return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
  }

  async saveIPokerHistory(PokerHistories: PokerHistoryDto[], sections: any) {
    return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
  }

  async savePartyPokerHistory(PokerHistories: PokerHistoryDto[], sections: any) {
    return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
  }

  async saveWinamaxPokerHistory(PokerHistories: PokerHistoryDto[], sections: any) {
    return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
  }

  async saveWpnHistory(PokerHistories: PokerHistoryDto[], sections: any) {
    return await this.handHistoryRepository.createHandHistory(PokerHistories, sections);
  }

  async getHandsHistory(pageData: any) {
    return await this.handHistoryRepository.getHandsHistory(pageData);
  }
  async getEachHandHistory(hand: string) {
    return await this.handHistoryRepository.getEachHandHistory(hand);
  }
  
}
