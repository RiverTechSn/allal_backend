import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationConfig } from './cores/validation_pipe_config';
import { HttpExceptionFilter } from './common/exceptions/exception_catch';
import * as cookieParser from 'cookie-parser';
import { VersioningType } from '@nestjs/common/enums/version-type.enum';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { documentFactory } from './cores/swagger_config';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ConsoleLogger, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      json: true,
      compact: false,
      timestamp: true,
      
    }),
  });
  app.useGlobalPipes(validationConfig);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  SwaggerModule.setup('v1/documentation', app, documentFactory(app));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
