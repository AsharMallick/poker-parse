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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectorService = void 0;
const common_1 = require("@nestjs/common");
const common_constants_1 = require("../../../common/constants/common.constants");
let DetectorService = exports.DetectorService = class DetectorService {
    constructor(constants) {
        this.constants = constants;
        this.pokerSites = [
            { name: this.constants.poker888, regex: /^(\*{5} 888poker)(?=.+)/ },
            { name: this.constants.chico, regex: /BetOnline Hand #(\d+)/ },
            {
                name: this.constants.ggPoker,
                regex: /Poker Hand #TM\d+: Tournament #\d+/,
            },
            { name: this.constants.ignitionPoker, regex: /Ignition Hand #\d+:/ },
            {
                name: this.constants.wpn,
                regex: /^Game Hand #[0-9]+ - Tournament #[0-9]+ - Holdem\(No Limit\) - Level [0-9]+ \([\d.]+\/[\d.]+\)- [\d/]+ [\d:]+ [A-Za-z]+/,
            },
            {
                name: this.constants.partyPoker,
                regex: /^\*\*\*\*\* Hand History For Game [A-Za-z0-9]+ \*\*\*\*\*/,
            },
            { name: this.constants.pokerStars, regex: /PokerStars Hand #\d+:/ },
            {
                name: this.constants.iPoker,
                regex: /^GAME #[0-9]+ Version:[\d.]+ Uncalled:[YN] Texas Hold'em NL  Tournament/,
            },
            {
                name: this.constants.winamaxPoker,
                regex: /^Winamax Poker - Tournament/,
            },
        ];
    }
    identifyRoom(section) {
        const headData = section.trim().split('\n');
        for (const roomRegex of this.pokerSites) {
            if (roomRegex.regex.test(headData[0]) ||
                roomRegex.regex.test(headData[1])) {
                return roomRegex.name;
            }
        }
        return this.constants.noType;
    }
};
exports.DetectorService = DetectorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_constants_1.RoomTypes])
], DetectorService);
//# sourceMappingURL=detector.service.js.map