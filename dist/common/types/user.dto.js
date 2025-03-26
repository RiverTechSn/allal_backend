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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateDto = exports.UserShopCreateDto = exports.UserCreateDto = exports.UserBase = void 0;
const library_1 = require("@prisma/client/runtime/library");
const valid_string_1 = require("../decorators/valid_string");
const valid_date_1 = require("../decorators/valid_date");
const valid_number_1 = require("../decorators/valid_number");
const valid_phone_1 = require("../decorators/valid_phone");
const allow_1 = require("../decorators/allow");
const login_dto_1 = require("./login.dto");
const partial_type_helper_1 = require("@nestjs/swagger/dist/type-helpers/partial-type.helper");
const omit_type_helper_1 = require("@nestjs/swagger/dist/type-helpers/omit-type.helper");
const shop_dto_1 = require("./shop.dto");
class UserBase {
}
exports.UserBase = UserBase;
__decorate([
    (0, valid_string_1.IsValidStringApi)(),
    __metadata("design:type", String)
], UserBase.prototype, "displayname", void 0);
__decorate([
    (0, valid_string_1.IsValidStringApi)(),
    __metadata("design:type", String)
], UserBase.prototype, "email", void 0);
__decorate([
    (0, valid_string_1.IsValidStringOptionalApi)(),
    __metadata("design:type", String)
], UserBase.prototype, "address", void 0);
__decorate([
    (0, valid_phone_1.IsValidPhoneOptionalApi)(),
    __metadata("design:type", String)
], UserBase.prototype, "phone", void 0);
__decorate([
    (0, valid_date_1.IsValidDateOptionalApi)(),
    __metadata("design:type", Date)
], UserBase.prototype, "dateOfBirth", void 0);
__decorate([
    (0, valid_number_1.IsValidNumberOptionnalApi)({ apiPropertyOptions: { type: Number } }),
    __metadata("design:type", library_1.Decimal)
], UserBase.prototype, "laltitude", void 0);
__decorate([
    (0, valid_number_1.IsValidNumberOptionnalApi)({ apiPropertyOptions: { type: Number } }),
    __metadata("design:type", library_1.Decimal)
], UserBase.prototype, "longitude", void 0);
class UserCreateDto extends (0, omit_type_helper_1.OmitType)(UserBase, [
    'id',
    'loginId',
    'walletBaseId',
]) {
}
exports.UserCreateDto = UserCreateDto;
__decorate([
    (0, valid_string_1.IsValidStringApi)({ validationOptions: {} }),
    __metadata("design:type", String)
], UserCreateDto.prototype, "password", void 0);
__decorate([
    (0, allow_1.IsAllowOptionalApi)(),
    __metadata("design:type", login_dto_1.LoginUpdateDto)
], UserCreateDto.prototype, "login", void 0);
class UserShopCreateDto extends UserCreateDto {
}
exports.UserShopCreateDto = UserShopCreateDto;
__decorate([
    (0, allow_1.IsAllowOptionalApi)(),
    __metadata("design:type", shop_dto_1.ShopCreateDto)
], UserShopCreateDto.prototype, "shop", void 0);
class UserUpdateDto extends (0, partial_type_helper_1.PartialType)((0, omit_type_helper_1.OmitType)(UserBase, ['id', 'loginId', 'walletBaseId'])) {
}
exports.UserUpdateDto = UserUpdateDto;
__decorate([
    (0, valid_string_1.IsValidStringOptionalApi)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "displayname", void 0);
__decorate([
    (0, valid_phone_1.IsValidPhoneOptionalApi)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "phone", void 0);
__decorate([
    (0, valid_string_1.IsValidStringOptionalApi)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "address", void 0);
__decorate([
    (0, allow_1.IsAllowOptionalApi)(),
    __metadata("design:type", login_dto_1.LoginUpdateDto)
], UserUpdateDto.prototype, "login", void 0);
//# sourceMappingURL=user.dto.js.map