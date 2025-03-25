"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidPhoneOptionalApi = exports.IsValidPhoneApi = void 0;
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const IsValidPhoneApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, class_validator_1.IsPhoneNumber)(option?.region, option?.validationOptions), (0, swagger_1.ApiProperty)(option?.apiPropertyOptions));
};
exports.IsValidPhoneApi = IsValidPhoneApi;
const IsValidPhoneOptionalApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidPhoneApi)(option), (0, class_validator_1.IsOptional)());
};
exports.IsValidPhoneOptionalApi = IsValidPhoneOptionalApi;
//# sourceMappingURL=valid_phone.js.map