"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationConfig = void 0;
const validation_pipe_1 = require("@nestjs/common/pipes/validation.pipe");
const bad_request_error_1 = require("../common/exceptions/bad_request_error");
exports.validationConfig = new validation_pipe_1.ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: bad_request_error_1.badRequestExceptionCatch,
});
//# sourceMappingURL=validation_pipe_config.js.map