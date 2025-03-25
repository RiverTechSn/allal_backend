"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidDateOptionalApi = exports.IsValidDateApi = void 0;
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const IsValidDateApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, class_validator_1.IsDateString)(option?.dateOptions, option?.validationOptions), (0, swagger_1.ApiProperty)(option?.apiPropertyOptions));
};
exports.IsValidDateApi = IsValidDateApi;
const IsValidDateOptionalApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidDateApi)(option), (0, class_validator_1.IsOptional)());
};
exports.IsValidDateOptionalApi = IsValidDateOptionalApi;
//# sourceMappingURL=valid_date.js.map