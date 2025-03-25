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
exports.EmailerController = void 0;
const controller_decorator_1 = require("@nestjs/common/decorators/core/controller.decorator");
const api_use_tags_decorator_1 = require("@nestjs/swagger/dist/decorators/api-use-tags.decorator");
const mailer_service_1 = require("./mailer.service");
let EmailerController = class EmailerController {
    constructor(mailService) {
        this.mailService = mailService;
    }
};
exports.EmailerController = EmailerController;
exports.EmailerController = EmailerController = __decorate([
    (0, controller_decorator_1.Controller)('info'),
    (0, api_use_tags_decorator_1.ApiTags)('info'),
    __metadata("design:paramtypes", [mailer_service_1.EmailerService])
], EmailerController);
//# sourceMappingURL=mailer.controller.js.map