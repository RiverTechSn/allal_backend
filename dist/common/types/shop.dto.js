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
exports.ShopBaseDto = void 0;
const library_1 = require("@prisma/client/runtime/library");
const valid_number_1 = require("../decorators/valid_number");
class ShopBaseDto {
}
exports.ShopBaseDto = ShopBaseDto;
__decorate([
    (0, valid_number_1.IsDecimalApi)(),
    __metadata("design:type", library_1.Decimal)
], ShopBaseDto.prototype, "laltitude", void 0);
__decorate([
    (0, valid_number_1.IsDecimalApi)(),
    __metadata("design:type", library_1.Decimal)
], ShopBaseDto.prototype, "longitude", void 0);
//# sourceMappingURL=shop.dto.js.map