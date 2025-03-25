"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validation_pipe_config_1 = require("./cores/validation_pipe_config");
const exception_catch_1 = require("./common/exceptions/exception_catch");
const cookieParser = require("cookie-parser");
const version_type_enum_1 = require("@nestjs/common/enums/version-type.enum");
const swagger_module_1 = require("@nestjs/swagger/dist/swagger-module");
const swagger_config_1 = require("./cores/swagger_config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(validation_pipe_config_1.validationConfig);
    app.useGlobalFilters(new exception_catch_1.HttpExceptionFilter());
    app.use(cookieParser());
    app.enableVersioning({
        defaultVersion: '1',
        type: version_type_enum_1.VersioningType.URI,
    });
    swagger_module_1.SwaggerModule.setup('v1/documentation', app, (0, swagger_config_1.documentFactory)(app));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map