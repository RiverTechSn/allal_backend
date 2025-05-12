import { Request, Response } from 'express';
import { HttpExceptionCode, WsMessage } from './ws_message';

import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions/exception-filter.interface';
import { Catch } from '@nestjs/common/decorators/core/catch.decorator';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('--------------exception catcher -------------');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception?.getStatus ? exception?.getStatus() : 500;
    let code: string = 'INERTNAL_SERVER_ERROR';
    console.log(exception);
    console.log('=================filter exception=============');
    if (exception instanceof UnauthorizedException) {
      code = 'UNAUTHORIZED';
      response.status(status).json({
        code: code,
        message: HttpExceptionCode.LOGIN_FAILLURE.message,
        status:  status ,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else if (exception instanceof BadRequestException) {
      code = 'BAD_REQUEST';
      response.status(status).json({
        code: code,
        message: (exception.getResponse() as unknown as { messages: any })
          .messages,
        status: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else if (exception instanceof WsMessage) {
      const e = exception.getResponse() as Object;
      response.status(status).json({
        ...e,
        status:status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else if (exception instanceof PrismaClientValidationError) {
      const err = exception as PrismaClientValidationError;
      console.log(err.name);
      status = 404;
      code = 'NOT_FOUND';
      const message = [err.name + ':' + err.message.split('\n').pop()];
      response.status(status).json({
        code: code,
        message: [message],
        status: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else if (
      exception instanceof PrismaClientKnownRequestError ||
      exception.meta
    ) {
      console.log(exception);
      console.timeLog('===============Now prisma request=============');

      const message =
        exception.meta.modelName +
        ' : ' +
        (exception.meta?.target ?? exception.meta.cause);

      if ((exception as PrismaClientKnownRequestError).code === 'P2025') {
        status = 404;
        code = 'NOT_FOUND';
      } else {
        console.log(exception);
        status = 500;
        code = 'CONSTRAINT_VIOLATION';
      }
      response.status(status).json({
        code: code,
        message: [message],
        status:  status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      response.status(status).json({
        status:  status,
        message: HttpExceptionCode.FAILLURE.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
