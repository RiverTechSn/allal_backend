"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const create_route_param_metadata_decorator_1 = require("@nestjs/common/decorators/http/create-route-param-metadata.decorator");
exports.CurrentUser = (0, create_route_param_metadata_decorator_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return { ...request.user, refreshToken: request.cookies['refresh_token'] };
});
//# sourceMappingURL=current_user.js.map