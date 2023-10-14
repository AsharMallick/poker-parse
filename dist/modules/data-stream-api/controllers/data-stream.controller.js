"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStreamController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const detector_service_1 = require("../../poker-room-detection/services/detector.service");
const hand_history_data_writer_service_1 = require("../../database-storage/services/hand-history-data-writer.service");
const room_strategy_factory_1 = require("../../hand-history-parsing/factories/room-strategy.factory");
const stream_1 = require("stream");
const common_constants_1 = require("../../../common/constants/common.constants");
const rxjs_1 = require("rxjs");
let DataStreamController = exports.DataStreamController = class DataStreamController {
    constructor(roomDetection, handModelService, roomStrategyFactory, roomType) {
        this.roomDetection = roomDetection;
        this.handModelService = handModelService;
        this.roomStrategyFactory = roomStrategyFactory;
        this.roomType = roomType;
    }
    async test(body) {
        return "test";
    }
    async getHands(body) {
        const hands = await this.handModelService.getHands(body);
        return hands;
    }
    async getHand(handId) {
        const hand = await this.handModelService.getHand(handId);
        return hand;
    }
    async receiveHistory(files) {
        try {
            let data;
            for (const file of files) {
                const stream = new stream_1.Readable();
                stream.push(file.buffer);
                stream.push(null);
                const fileContent = await this.readFileContent(stream);
                const sections = fileContent.split(/\n\s*(?:\n\s*){1,3}/);
                const roomType = this.roomDetection.identifyRoom(sections[0]);
                const strategyService = this.roomStrategyFactory.createStrategy(roomType);
                if (strategyService) {
                    data = strategyService.parse(sections);
                    this.handModelService
                        .saveHistory(data.data, roomType, sections[0])
                        .then((res) => {
                        console.log('---hand history save result---');
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
            }
            return {
                status: 'success',
                msg: 'Successfully parsed',
            };
        }
        catch (e) {
            return {
                status: 'error',
                msg: e.toString(),
            };
        }
    }
    async readFileContent(stream) {
        return new Promise((resolve, reject) => {
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
    async streamOne(request) {
        try {
            const readableStream = request;
            const longStringPromise = new Promise((resolve, reject) => {
                const chunks = [];
                readableStream.on('data', (chunk) => {
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
            const files = longString.split(/\n\n\s+\*divition of file\*\s+\n\n/);
            let wrongFiles = 0;
            let correctFiles = 0;
            let parsedFiles = 0;
            let notParsedFiles = 0;
            for (const file of files) {
                const fileContent = file;
                const sections = fileContent.split(/\n\s*(?:\n\s*){1,3}/);
                const roomType = this.roomDetection.identifyRoom(sections[0]);
                if (roomType === this.roomType.noType) {
                    wrongFiles++;
                }
                else {
                    correctFiles++;
                }
                const strategyService = this.roomStrategyFactory.createStrategy(roomType);
                if (strategyService) {
                    let data = strategyService.parse(sections);
                    await this.handModelService
                        .saveHistory(data.data, roomType, sections)
                        .then((res) => {
                        console.log('---hand history save result---');
                        parsedFiles++;
                        notParsedFiles = correctFiles - parsedFiles;
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
            }
            if (correctFiles === 0) {
                return (0, rxjs_1.throwError)(() => new common_1.HttpException('Require correct files', 400));
            }
            return {
                status: 'success',
                message: 'Stream received successfully',
                correctFiles: correctFiles,
                wrongFiles: wrongFiles,
                parsedFiles: parsedFiles,
                notParsedFiles: notParsedFiles,
            };
        }
        catch (e) {
            return (0, rxjs_1.throwError)(() => new common_1.HttpException(e.toString(), 400));
        }
    }
};
__decorate([
    (0, common_1.Get)('/test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataStreamController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('/getHands'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataStreamController.prototype, "getHands", null);
__decorate([
    (0, common_1.Get)('/getHand/:handId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('handId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataStreamController.prototype, "getHand", null);
__decorate([
    (0, common_1.Post)('/data-one'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file')),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [new common_1.FileTypeValidator({ fileType: 'text/plain' })],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DataStreamController.prototype, "receiveHistory", null);
__decorate([
    (0, common_1.Post)('/data'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataStreamController.prototype, "streamOne", null);
exports.DataStreamController = DataStreamController = __decorate([
    (0, common_1.Controller)('data-stream'),
    __metadata("design:paramtypes", [detector_service_1.DetectorService,
        hand_history_data_writer_service_1.HandHistoryDataWriterService,
        room_strategy_factory_1.RoomStrategyFactory,
        common_constants_1.RoomTypes])
], DataStreamController);
//# sourceMappingURL=data-stream.controller.js.map