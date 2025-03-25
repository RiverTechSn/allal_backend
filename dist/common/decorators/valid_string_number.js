"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidStringNumberRequiredApi = exports.IsValidStringNumberOptionalApi = exports.IsValidStringNumberApi = void 0;
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const decorators_1 = require("@nestjs/swagger/dist/decorators");
const class_validator_1 = require("class-validator");
const IsValidStringNumberApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, decorators_1.ApiProperty)({ ...option?.apiPropertyOptions }), (0, class_validator_1.IsNumberString)({}));
};
exports.IsValidStringNumberApi = IsValidStringNumberApi;
const IsValidStringNumberOptionalApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidStringNumberApi)(option), (0, class_validator_1.IsOptional)(option?.validationOptions));
};
exports.IsValidStringNumberOptionalApi = IsValidStringNumberOptionalApi;
const IsValidStringNumberRequiredApi = (option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidStringNumberApi)(option), (0, class_validator_1.IsNotEmpty)(option?.validationOptions));
};
exports.IsValidStringNumberRequiredApi = IsValidStringNumberRequiredApi;
//# sourceMappingURL=valid_string_number.js.map