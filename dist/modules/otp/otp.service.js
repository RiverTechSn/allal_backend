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
exports.OtpService = void 0;
const database_service_1 = require("../database/database.service");
const injectable_decorator_1 = require("@nestjs/common/decorators/core/injectable.decorator");
let OtpService = class OtpService {
    constructor(db) {
        this.db = db;
    }
    create(body) {
        this.db.otp.create({
            data: {
                via: body.via,
                duration: body.duration,
                code: body.code,
                loginId: body.loginId,
            },
        });
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, injectable_decorator_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], OtpService);
//# sourceMappingURL=otp.service.js.map