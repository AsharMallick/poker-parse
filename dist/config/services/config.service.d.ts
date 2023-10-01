export declare class ConfigService {
    private readonly envConfig;
    constructor();
    get(key: string): string;
    getPortConfig(): Promise<string>;
    getMongoConfig(): Promise<{
        uri: string;
        useNewUrlParser: boolean;
        useUnifiedTopology: boolean;
    }>;
}
