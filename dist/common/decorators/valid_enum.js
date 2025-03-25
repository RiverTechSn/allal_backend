"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidEnumOptionalApi = exports.IsValidEnumApi = void 0;
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const api_property_decorator_1 = require("@nestjs/swagger/dist/decorators/api-property.decorator");
const class_validator_1 = require("class-validator");
const IsValidEnumApi = (values, option) => {
    return (0, apply_decorators_1.applyDecorators)((0, class_validator_1.IsIn)(values, option?.validationOptions), (0, api_property_decorator_1.ApiProperty)({ ...option?.apiPropertyOptions, enum: Object.values(values) }));
};
exports.IsValidEnumApi = IsValidEnumApi;
const IsValidEnumOptionalApi = (values, option) => {
    return (0, apply_decorators_1.applyDecorators)((0, exports.IsValidEnumApi)(values, option), (0, class_validator_1.IsOptional)());
};
exports.IsValidEnumOptionalApi = IsValidEnumOptionalApi;
//# sourceMappingURL=valid_enum.js.map