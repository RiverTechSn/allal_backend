"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const request_mapping_decorator_1 = require("@nestjs/common/decorators/http/request-mapping.decorator");
const route_params_decorator_1 = require("@nestjs/common/decorators/http/route-params.decorator");
const api_bearer_decorator_1 = require("@nestjs/swagger/dist/decorators/api-bearer.decorator");
const paginagation_query_dto_1 = require("../../common/types/paginagation_query.dto");
const is_public_meta_1 = require("../../common/decorators/is_public.meta");
const user_dto_1 = require("../../common/types/user.dto");
const api_controller_1 = require("../../common/decorators/api_controller");
const Tag = 'user';
let UserController = class UserController {
    constructor(userServide) {
        this.userServide = userServide;
    }
    getAll(query) {
        return this.userServide.getAll({ query });
    }
    getById(id) {
        return this.userServide.getById(id);
    }
    create(body) {
        return this.userServide.create(body);
    }
    createWithShop(body) {
        return this.userServide.createUserWithShop({ body });
    }
    updateById(id, body) {
        return this.userServide.updateById({ id, body });
    }
};
exports.UserController = UserController;
__decorate([
    (0, request_mapping_decorator_1.Get)('all'),
    (0, is_public_meta_1.ApiNoAuth)(),
    __param(0, (0, route_params_decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginagation_query_dto_1.UserQueryDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, request_mapping_decorator_1.Get)('id/:id'),
    __param(0, (0, route_params_decorator_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getById", null);
__decorate([
    (0, request_mapping_decorator_1.Post)('create'),
    __param(0, (0, route_params_decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserCreateDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, request_mapping_decorator_1.Post)('create-with-shop'),
    __param(0, (0, route_params_decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserShopCreateDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createWithShop", null);
__decorate([
    (0, request_mapping_decorator_1.Put)('id/:id'),
    __param(0, (0, route_params_decorator_1.Param)('id')),
    __param(1, (0, route_params_decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UserUpdateDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateById", null);
exports.UserController = UserController = __decorate([
    (0, api_controller_1.ApiController)(Tag),
    (0, api_bearer_decorator_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map