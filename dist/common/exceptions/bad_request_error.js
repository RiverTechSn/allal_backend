"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequestExceptionCatch = void 0;
const bad_request_exception_1 = require("@nestjs/common/exceptions/bad-request.exception");
const badRequestExceptionCatch = (errors) => {
    const messages = [];
    errors.forEach((error) => Object.entries(error.constraints).forEach((value) => {
        messages.push(`${error.property} : ${value[1]}`);
    }));
    return new bad_request_exception_1.BadRequestException({
        messages,
        code: 'BAD_REQUEST',
        status: 400,
    });
};
exports.badRequestExceptionCatch = badRequestExceptionCatch;
//# sourceMappingURL=bad_request_error.js.map