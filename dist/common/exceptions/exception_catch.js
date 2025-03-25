"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const ws_message_1 = require("./ws_message");
const bad_request_exception_1 = require("@nestjs/common/exceptions/bad-request.exception");
const catch_decorator_1 = require("@nestjs/common/decorators/core/catch.decorator");
const library_1 = require("@prisma/client/runtime/library");
const unauthorized_exception_1 = require("@nestjs/common/exceptions/unauthorized.exception");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        console.log('--------------exception catcher -------------');
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = exception?.getStatus ? exception?.getStatus() : 500;
        let code = 'INERTNAL_SERVER_ERROR';
        console.log(exception);
        console.log('=================filter exception=============');
        if (exception instanceof unauthorized_exception_1.UnauthorizedException) {
            code = 'UNAUTHORIZED';
            response.status(status).json({
                code: code,
                message: ws_message_1.HttpExceptionCode.LOGIN_FAILLURE.message,
                status: false,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
        else if (exception instanceof bad_request_exception_1.BadRequestException) {
            code = 'BAD_REQUEST';
            response.status(status).json({
                code: code,
                message: exception.getResponse()
                    .messages,
                status: false,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
        else if (exception instanceof ws_message_1.WsMessage) {
            const e = exception.getResponse();
            response.status(status).json({
                ...e,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
        else if (exception instanceof library_1.PrismaClientKnownRequestError ||
            exception.meta) {
            console.log(exception.code);
            const message = exception.meta.modelName +
                ' : ' +
                (exception.meta?.target ?? exception.meta.cause);
            if (exception.code === 'P2025') {
                status = 404;
                code = 'NOT_FOUND';
            }
            else {
                status = 500;
                code = 'CONSTRAINT_VIOLATION';
            }
            response.status(status).json({
                code: code,
                message: [message],
                status: false,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
        else {
            response.status(status).json({
                status: false,
                message: ws_message_1.HttpExceptionCode.FAILLURE.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, catch_decorator_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=exception_catch.js.map