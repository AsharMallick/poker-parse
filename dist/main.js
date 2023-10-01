"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./shared/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn']
    });
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api/v1');
    app.enableCors({ origin: true, credentials: true });
    const options = new swagger_1.DocumentBuilder()
        .setTitle('App Explorer')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('explorer', app, document);
    await app.listen(3001);
    common_1.Logger.log(`** Server is running <GREAT> & everything is under <CTRL>. Happy Coding **`);
}
bootstrap();
//# sourceMappingURL=main.js.map