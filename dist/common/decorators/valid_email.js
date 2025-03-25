"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidEmailOptionalApi = exports.IsValidEmailApi = void 0;
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const IsValidEmailApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, class_validator_1.IsEmail)(option?.emailOptions, option?.validationOptions), (0, swagger_1.ApiProperty)(option?.apiPropertyOptions));
};
exports.IsValidEmailApi = IsValidEmailApi;
const IsValidEmailOptionalApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidEmailApi)(option), (0, class_validator_1.IsOptional)());
};
exports.IsValidEmailOptionalApi = IsValidEmailOptionalApi;
//# sourceMappingURL=valid_email.js.map