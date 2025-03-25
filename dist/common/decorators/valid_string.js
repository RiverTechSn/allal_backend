"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidStringRequiredApi = exports.IsValidStringOptionalApi = exports.IsValidStringApi = void 0;
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const api_property_decorator_1 = require("@nestjs/swagger/dist/decorators/api-property.decorator");
const class_validator_1 = require("class-validator");
const IsValidStringApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, api_property_decorator_1.ApiProperty)(option?.apiPropertyOptions), (0, class_validator_1.IsString)(option?.validationOptions));
};
exports.IsValidStringApi = IsValidStringApi;
const IsValidStringOptionalApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidStringApi)(option), (0, class_validator_1.IsOptional)(option?.validationOptions));
};
exports.IsValidStringOptionalApi = IsValidStringOptionalApi;
const IsValidStringRequiredApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidStringApi)(option), (0, class_validator_1.IsNotEmpty)(option?.validationOptions));
};
exports.IsValidStringRequiredApi = IsValidStringRequiredApi;
//# sourceMappingURL=valid_string.js.map