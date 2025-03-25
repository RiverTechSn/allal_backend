"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentFactory = void 0;
const document_builder_1 = require("@nestjs/swagger/dist/document-builder");
const swagger_module_1 = require("@nestjs/swagger/dist/swagger-module");
const config = new document_builder_1.DocumentBuilder()
    .setTitle('Evisa Senegal')
    .setDescription('The cats API description')
    .setVersion('1.0').addBearerAuth().addCookieAuth("access_token", {
    name: 'access_token',
    type: 'apiKey'
})
    .setContact('Djiga Salane', 'https://daxfolio22.web.app', 'dakspro2007@gmail.com')
    .build();
const documentFactory = (app) => swagger_module_1.SwaggerModule.createDocument(app, config);
exports.documentFactory = documentFactory;
//# sourceMappingURL=swagger_config.js.map