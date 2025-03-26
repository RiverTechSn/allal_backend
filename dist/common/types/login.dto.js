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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUpdateDto = exports.LoginDto = void 0;
const client_1 = require("@prisma/client");
const valid_string_1 = require("../decorators/valid_string");
const valid_enum_1 = require("../decorators/valid_enum");
const valid_boolean_1 = require("../decorators/valid_boolean");
const valid_string_number_1 = require("../decorators/valid_string_number");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, valid_string_1.IsValidStringApi)(),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    (0, valid_string_1.IsValidStringApi)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    (0, valid_enum_1.IsValidEnumApi)(Object.values(client_1.$Enums.LoginEnum)),
    __metadata("design:type", typeof (_a = typeof client_1.$Enums !== "undefined" && client_1.$Enums.LoginEnum) === "function" ? _a : Object)
], LoginDto.prototype, "type", void 0);
class LoginUpdateDto {
}
exports.LoginUpdateDto = LoginUpdateDto;
__decorate([
    (0, valid_boolean_1.IsValidBooleanOptionalApi)(),
    __metadata("design:type", Boolean)
], LoginUpdateDto.prototype, "isActive", void 0);
__decorate([
    (0, valid_boolean_1.IsValidBooleanOptionalApi)(),
    __metadata("design:type", Boolean)
], LoginUpdateDto.prototype, "isArchived", void 0);
__decorate([
    (0, valid_boolean_1.IsValidBooleanOptionalApi)(),
    __metadata("design:type", Boolean)
], LoginUpdateDto.prototype, "isBlocked", void 0);
__decorate([
    (0, valid_string_number_1.IsValidStringNumberOptionalApi)(),
    __metadata("design:type", Number)
], LoginUpdateDto.prototype, "roleId", void 0);
//# sourceMappingURL=login.dto.js.map