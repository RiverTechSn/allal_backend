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
exports.SecurityService = void 0;
const injectable_decorator_1 = require("@nestjs/common/decorators/core/injectable.decorator");
const database_service_1 = require("../database/database.service");
const jwt_1 = require("@nestjs/jwt");
const inject_decorator_1 = require("@nestjs/common/decorators/core/inject.decorator");
const crypto_service_1 = require("../database/crypto_service");
const base_response_1 = require("../../cores/base_response");
const exclude_key_1 = require("../../cores/exclude_key");
const ws_message_1 = require("../../common/exceptions/ws_message");
(0, injectable_decorator_1.Injectable)();
let SecurityService = class SecurityService {
    constructor(db, crypto, jwtService) {
        this.db = db;
        this.crypto = crypto;
        this.jwtService = jwtService;
    }
    profile(body) {
        return base_response_1.BaseResponse.success(body);
    }
    sigin(body, res) {
        console.log(body);
        return this.db.login
            .findFirstOrThrow({
            where: { username: body.username, type: body.type },
            omit: { username: true },
            include: {
                user: body.type === 'USER',
                customer: body.type === 'CUSTOMER',
            },
        })
            .then((val) => {
            console.log(val);
            const { id, type } = val;
            const valWithoutPassword = (0, exclude_key_1.excludeFields)(val, ['password']);
            if (!this.crypto.verifiy(body.password, val.password))
                throw new ws_message_1.WsMessage(ws_message_1.HttpExceptionCode.LOGIN_FAILLURE);
            const accessToken = 'Bearer ' +
                this.jwtService.sign({ ...valWithoutPassword }, { expiresIn: '3600s' });
            const refreshToken = 'Bearer ' +
                this.jwtService.sign({ data: { id, type } }, { expiresIn: `${3600 * 24}` });
            res.cookie('access_token', accessToken);
            res.cookie('refresh_token', refreshToken);
            return res.status(200).json(base_response_1.BaseResponse.success({
                ...valWithoutPassword,
                accessToken,
                refreshToken,
            }));
        });
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = __decorate([
    __param(2, (0, inject_decorator_1.Inject)(jwt_1.JwtService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        crypto_service_1.CryptoService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], SecurityService);
//# sourceMappingURL=security.service.js.map