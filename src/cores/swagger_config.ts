import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';

const config = new DocumentBuilder()
  .setTitle('Evisa Senegal')
  .setDescription('The cats API description')
  .setVersion('1.0').addBearerAuth().addCookieAuth("access_token", {
    name: 'access_token',
    type: 'apiKey'
  })
  .setContact('Djiga Salane', 'https://daxfolio22.web.app', 'dakspro2007@gmail.com')
  .build();
export const documentFactory = (app) =>
  SwaggerModule.createDocument(app, config);
