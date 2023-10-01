"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv = require("dotenv");
class ConfigService {
    constructor() {
        const result = dotenv.config();
        if (result.error) {
            this.envConfig = process.env;
        }
        else {
            this.envConfig = result.parsed;
        }
    }
    get(key) {
        return this.envConfig[key];
    }
    async getPortConfig() {
        return this.get('PORT');
    }
    async getMongoConfig() {
        return {
            uri: 'mongodb://' + this.get('DATABASE_HOST') + ':' + this.get('DATABASE_PORT') + '/' + this.get('DATABASE_NAME'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map