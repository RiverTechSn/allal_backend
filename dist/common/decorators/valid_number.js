"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidNumberOptionnalArrayApi = exports.IsDecimalApi = exports.IsValidNumberOptionnalApi = exports.IsValidNumberApi = void 0;
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const api_property_decorator_1 = require("@nestjs/swagger/dist/decorators/api-property.decorator");
const class_validator_1 = require("class-validator");
const IsValidNumberApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, api_property_decorator_1.ApiProperty)(option?.apiPropertyOptions), (0, class_validator_1.IsNumber)(option?.isNumberOptions, option?.validationOptions));
};
exports.IsValidNumberApi = IsValidNumberApi;
const IsValidNumberOptionnalApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidNumberApi)(option), (0, class_validator_1.IsNumber)(option?.isNumberOptions, option?.validationOptions), (0, class_validator_1.IsOptional)());
};
exports.IsValidNumberOptionnalApi = IsValidNumberOptionnalApi;
const IsDecimalApi = () => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidNumberOptionnalApi)({
        apiPropertyOptions: { type: Number },
    }));
};
exports.IsDecimalApi = IsDecimalApi;
const IsValidNumberOptionnalArrayApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidNumberApi)(option), (0, class_validator_1.IsNumber)(option?.isNumberOptions, option?.validationOptions), (0, class_validator_1.IsOptional)());
};
exports.IsValidNumberOptionnalArrayApi = IsValidNumberOptionnalArrayApi;
//# sourceMappingURL=valid_number.js.map