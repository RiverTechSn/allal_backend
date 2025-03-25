"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const controller_decorator_1 = require("@nestjs/common/decorators/core/controller.decorator");
const swagger_1 = require("@nestjs/swagger");
const ApiController = (tag) => {
    return (0, apply_decorators_1.applyDecorators)((0, controller_decorator_1.Controller)(tag), (0, swagger_1.ApiTags)(tag), (0, swagger_1.ApiBearerAuth)());
};
exports.ApiController = ApiController;
//# sourceMappingURL=api_controller.js.map