"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiNoAuth = exports.IsPublic = exports.IS_PUBLIC_KEY = void 0;
const apply_decorators_1 = require("@nestjs/common/decorators/core/apply-decorators");
const set_metadata_decorator_1 = require("@nestjs/common/decorators/core/set-metadata.decorator");
const api_operation_decorator_1 = require("@nestjs/swagger/dist/decorators/api-operation.decorator");
exports.IS_PUBLIC_KEY = 'isPublic';
const IsPublic = () => (0, set_metadata_decorator_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.IsPublic = IsPublic;
const ApiNoAuth = () => {
    return (0, apply_decorators_1.applyDecorators)((0, api_operation_decorator_1.ApiOperation)({ summary: 'No Auth Required' }), (0, exports.IsPublic)());
};
exports.ApiNoAuth = ApiNoAuth;
//# sourceMappingURL=is_public.meta.js.map