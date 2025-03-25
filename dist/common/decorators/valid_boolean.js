"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidBooleanOptionalApi = exports.IsValidBooleanApi = void 0;
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const getOption_1 = require("./getOption");
const IsValidBooleanApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, class_validator_1.IsBoolean)(option?.validationOptions), (0, swagger_1.ApiProperty)(option?.apiPropertyOptions));
};
exports.IsValidBooleanApi = IsValidBooleanApi;
const IsValidBooleanOptionalApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidBooleanApi)((0, getOption_1.getOptionalOption)(option)), (0, class_validator_1.IsOptional)());
};
exports.IsValidBooleanOptionalApi = IsValidBooleanOptionalApi;
//# sourceMappingURL=valid_boolean.js.map