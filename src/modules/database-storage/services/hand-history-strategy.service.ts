import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { PokerHistoryDto } from 'src/modules/database-storage/dtos/history.dto';
import { HandHistory } from 'src/modules/database-storage/schemas/hand-history.schema';

export class HandHistoryRepository {
  constructor(
    @InjectModel(HandHistory.name)
    private readonly handHistoryModel: Model<HandHistory>,
  ) { }

  async getHistoryByGameId(handId: string) {
    let history: any;
    try {
      history = await this.handHistoryModel.findOne({ handId });
    } catch (error) {
      throw new InternalServerErrorException('');
    }
    if (!history) {
      return null;
    }
    return history;
  }

  async getHandsHistory(pageData: any): Promise<any> {
    const { pageNumber, pageSize } = pageData;
    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const hands = await this.handHistoryModel.find().skip(skip).limit(limit).exec();
    return hands;
  }

  async getEachHandHistory(handId: string): Promise<any> {
    const hands = await this.handHistoryModel.findOne({ handId: handId }).exec()
    return hands;
  }

  async createHandHistory(handHistories: PokerHistoryDto[], sections: any) {
    try {
      for (const query of handHistories) {
        let client = await this.getHistoryByGameId(query.handId);

        if (!client && query.handId != null) {
          client = new this.handHistoryModel({ ...query, rawData: sections });
          await client
            .save()
            .then((res) => { })
            .catch((err) => {
              console.log(err);
            });
        } else {
          await this.handHistoryModel
            .findOneAndUpdate({ handId: query.handId }, query, { new: true })
            .exec()
            .then((res) => { })
            .catch((err) => {
              console.log(err);
            });
        }
      }
      return 'Database Success';
    } catch (error) {
      return 'Database Error';
    }
  }
}
