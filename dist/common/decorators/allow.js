"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAllowOptionalApi = exports.IsAllowApi = void 0;
const common_1 = require("@nestjs/common");
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const IsAllowApi = () => {
    return (0, apply_decorators_1.applyDecorators)((0, class_validator_1.Allow)(), (0, swagger_1.ApiProperty)());
};
exports.IsAllowApi = IsAllowApi;
const IsAllowOptionalApi = () => {
    return (0, apply_decorators_1.applyDecorators)((0, class_validator_1.Allow)(), (0, swagger_1.ApiProperty)(), (0, common_1.Optional)());
};
exports.IsAllowOptionalApi = IsAllowOptionalApi;
//# sourceMappingURL=allow.js.map