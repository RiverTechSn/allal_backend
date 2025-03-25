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
exports.getPaginationParams = exports.CustomerQueryDto = exports.UserQueryDto = exports.SearchQueryDto = exports.PaginationDto = void 0;
const valid_string_1 = require("../decorators/valid_string");
const valid_string_number_1 = require("../decorators/valid_string_number");
class PaginationDto {
    getPaginationParams(query) {
        return {
            skip: (Number(query.page) - 1) * Number(query.perpage),
            take: Number(query.perpage),
        };
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, valid_string_number_1.IsValidStringNumberApi)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, valid_string_number_1.IsValidStringNumberApi)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "perpage", void 0);
class SearchQueryDto extends PaginationDto {
}
exports.SearchQueryDto = SearchQueryDto;
__decorate([
    (0, valid_string_1.IsValidStringOptionalApi)({ apiPropertyOptions: { required: false } }),
    __metadata("design:type", String)
], SearchQueryDto.prototype, "search", void 0);
class UserQueryDto extends PaginationDto {
}
exports.UserQueryDto = UserQueryDto;
__decorate([
    (0, valid_string_1.IsValidStringOptionalApi)({ apiPropertyOptions: { required: false } }),
    __metadata("design:type", String)
], UserQueryDto.prototype, "displayname", void 0);
__decorate([
    (0, valid_string_1.IsValidStringOptionalApi)({ apiPropertyOptions: { required: false } }),
    __metadata("design:type", String)
], UserQueryDto.prototype, "phone", void 0);
__decorate([
    (0, valid_string_1.IsValidStringOptionalApi)({ apiPropertyOptions: { required: false } }),
    __metadata("design:type", String)
], UserQueryDto.prototype, "username", void 0);
class CustomerQueryDto extends PaginationDto {
}
exports.CustomerQueryDto = CustomerQueryDto;
__decorate([
    (0, valid_string_1.IsValidStringOptionalApi)({ apiPropertyOptions: { required: false } }),
    __metadata("design:type", String)
], CustomerQueryDto.prototype, "displayname", void 0);
__decorate([
    (0, valid_string_1.IsValidStringOptionalApi)({ apiPropertyOptions: { required: false } }),
    __metadata("design:type", String)
], CustomerQueryDto.prototype, "phone", void 0);
__decorate([
    (0, valid_string_1.IsValidStringOptionalApi)({ apiPropertyOptions: { required: false } }),
    __metadata("design:type", String)
], CustomerQueryDto.prototype, "email", void 0);
const getPaginationParams = (query) => ({
    skip: (Number(query.page) - 1) * Number(query.perpage),
    take: Number(query.perpage),
});
exports.getPaginationParams = getPaginationParams;
//# sourceMappingURL=paginagation_query.dto.js.map