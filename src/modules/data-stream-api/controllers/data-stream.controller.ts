import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  HttpCode,
  UsePipes,
  ValidationPipe,
  ParseFilePipe,
  FileTypeValidator,
  Req,
  Param,
  HttpException,
} from '@nestjs/common';

import { Request } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DetectorService } from '../../poker-room-detection/services/detector.service';
import { HandHistoryDataWriterService } from '../../database-storage/services/hand-history-data-writer.service';
import { RoomStrategyFactory } from '../../hand-history-parsing/factories/room-strategy.factory';
import { ParsedReturnData } from 'src/modules/hand-history-parsing/interfaces/parser.interface';
import { Readable } from 'stream';
import { RoomTypes } from 'src/common/constants/common.constants';
import { throwError } from 'rxjs';

@Controller('data-stream')
export class DataStreamController {
  constructor(
    private roomDetection: DetectorService,
    private readonly handModelService: HandHistoryDataWriterService,
    private readonly roomStrategyFactory: RoomStrategyFactory,
    private readonly roomType: RoomTypes,
  ) { }


  // @Post('/getHands')
  // async getHands(@Body() body: any): Promise<any[]> {
  //   // Access the body data here
  //   const hands = await this.handModelService.getHands(body.data);
  //   return hands;
  // }

  @Post('/getHands')
  async getHands(@Body() body: any) {
    const hands = await this.handModelService.getHands(body);
    return hands;
  }


  @Get('/getHand/:handId')
  @HttpCode(200)
  async getHand(@Param('handId') handId: string): Promise<string> {
    const hand = await this.handModelService.getHand(handId);
    return hand;
  }


  @Post('/data-one')
  @HttpCode(200)
  // @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(FilesInterceptor('file'))
  @UsePipes(new ValidationPipe())
  async receiveHistory(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/plain' })],
      }),
    )
    files: Express.Multer.File[],
  ) {
    try {
      let data: ParsedReturnData;

      for (const file of files) {
        const stream = new Readable();
        stream.push(file.buffer);
        stream.push(null);

        // const fileContent = file.buffer.toString();
        const fileContent = await this.readFileContent(stream);

        const sections: string[] = fileContent.split(/\n\s*(?:\n\s*){1,3}/);

        const roomType = this.roomDetection.identifyRoom(sections[0]);
        const strategyService = this.roomStrategyFactory.createStrategy(roomType);
        if (strategyService) {
          data = strategyService.parse(sections);
          this.handModelService
            .saveHistory(data.data, roomType, sections[0])
            .then((res: any) => {
              console.log('---hand history save result---');
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
      }
      // return data;
      return {
        status: 'success',
        msg: 'Successfully parsed',
      };
    } catch (e) {
      return {
        status: 'error',
        msg: e.toString(),
      };
    }
  }

  private async readFileContent(stream: Readable): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let fileContent = '';
      stream.on('data', (chunk) => {
        fileContent += chunk.toString();
      });
      stream.on('end', () => {
        resolve(fileContent);
      });
      stream.on('error', (error) => {
        reject(error);
      });
    });
  }

  @Post('/data')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async streamOne(@Req() request: Request) {
    try {
      const readableStream = request as unknown as Readable;
      const longStringPromise = new Promise<string>((resolve, reject) => {
        const chunks: Buffer[] = []; // Use Buffer instead of Uint8Array
        readableStream.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });
        readableStream.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const longString = buffer.toString('utf8');
          resolve(longString);
        });
        readableStream.on('error', (error) => {
          reject(error);
        });
      });

      const longString = await longStringPromise;

      const files: string[] = longString.split(
        /\n\n\s+\*divition of file\*\s+\n\n/,
      );

      let wrongFiles = 0;
      let correctFiles = 0;
      let parsedFiles = 0;
      let notParsedFiles = 0;

      for (const file of files) {
        const fileContent = file;
        const sections: string[] = fileContent.split(/\n\s*(?:\n\s*){1,3}/);

        const roomType = this.roomDetection.identifyRoom(sections[0]);

        if (roomType === this.roomType.noType) {
          wrongFiles++;
        } else {
          correctFiles++;
        }

        const strategyService = this.roomStrategyFactory.createStrategy(roomType);
        if (strategyService) {
          let data: ParsedReturnData = strategyService.parse(sections);

          await this.handModelService
            .saveHistory(data.data, roomType, sections)
            .then((res: any) => {
              console.log('---hand history save result---');
              parsedFiles++;
              notParsedFiles = correctFiles - parsedFiles;
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
      }

      if (correctFiles === 0) {
        return throwError(
          () => new HttpException('Require correct files', 400),
        );
      }

      return {
        status: 'success',
        message: 'Stream received successfully',
        correctFiles: correctFiles,
        wrongFiles: wrongFiles,
        parsedFiles: parsedFiles,
        notParsedFiles: notParsedFiles,
      };
    } catch (e) {
      return throwError(() => new HttpException(e.toString(), 400));
    }
  }
}