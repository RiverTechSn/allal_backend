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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityController = void 0;
const security_service_1 = require("./security.service");
const request_mapping_decorator_1 = require("@nestjs/common/decorators/http/request-mapping.decorator");
const route_params_decorator_1 = require("@nestjs/common/decorators/http/route-params.decorator");
const api_bearer_decorator_1 = require("@nestjs/swagger/dist/decorators/api-bearer.decorator");
const express_1 = require("express");
const is_public_meta_1 = require("../../common/decorators/is_public.meta");
const api_controller_1 = require("../../common/decorators/api_controller");
const login_dto_1 = require("../../common/types/login.dto");
const current_user_1 = require("../../common/decorators/current_user");
const TAG = 'security';
let SecurityController = class SecurityController {
    constructor(service) {
        this.service = service;
    }
    signup(body, res) {
        console.log(body);
        return this.service.sigin(body, res);
    }
    resetPassword() {
    }
    definePassword() {
    }
    forgetPassword() {
    }
    profile(user) {
        return this.service.profile(user);
    }
};
exports.SecurityController = SecurityController;
__decorate([
    (0, request_mapping_decorator_1.Post)('signin'),
    (0, is_public_meta_1.ApiNoAuth)(),
    __param(0, (0, route_params_decorator_1.Body)()),
    __param(1, (0, route_params_decorator_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "signup", null);
__decorate([
    (0, request_mapping_decorator_1.Put)('reset-password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "resetPassword", null);
__decorate([
    (0, request_mapping_decorator_1.Put)('define-password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "definePassword", null);
__decorate([
    (0, request_mapping_decorator_1.Post)('forget-password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "forgetPassword", null);
__decorate([
    (0, request_mapping_decorator_1.Get)('profile'),
    (0, api_bearer_decorator_1.ApiBearerAuth)(),
    __param(0, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "profile", null);
exports.SecurityController = SecurityController = __decorate([
    (0, api_controller_1.ApiController)(TAG),
    __metadata("design:paramtypes", [security_service_1.SecurityService])
], SecurityController);
//# sourceMappingURL=security.controller.js.map