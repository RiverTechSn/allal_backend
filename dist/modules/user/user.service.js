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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const database_service_1 = require("../database/database.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailer_service_1 = require("../mailer/mailer.service");
const crypto_service_1 = require("../database/crypto_service");
const exclude_key_1 = require("../../cores/exclude_key");
const base_response_1 = require("../../cores/base_response");
const ws_message_1 = require("../../common/exceptions/ws_message");
const create_admin_factory_1 = require("./factory/create_admin.factory");
const otp_service_1 = require("../otp/otp.service");
let UserService = class UserService {
    constructor(db, crypto, config, mailer, otp) {
        this.db = db;
        this.crypto = crypto;
        this.config = config;
        this.mailer = mailer;
        this.otp = otp;
    }
    onModuleInit() {
        (0, create_admin_factory_1.createAdminFactory)(this.db, this.config, this.crypto);
    }
    create(body) {
        console.log(body);
        return this.db.user
            .create({
            data: {
                ...(0, exclude_key_1.excludeFields)(body, ['password']),
                login: {
                    create: {
                        ...body.login,
                        username: body.email,
                        type: client_1.LoginEnum.USER,
                        password: this.crypto.hash(body.password),
                    },
                },
            },
            include: { login: true },
        })
            .then((val) => {
            const code = this.crypto.encrypt(`${val.loginId}_${new Date().getTime()}`);
            return this.db.otp
                .create({
                data: {
                    via: 'MAIL',
                    duration: 'HOUR_12',
                    code: code,
                    loginId: val.loginId,
                },
            })
                .then(() => {
                return this.mailer.sendUserConfirmation({
                    email: 'djiga2015@gmail.com',
                    token: code,
                });
            });
        })
            .then(ws_message_1.throwSuccess);
    }
    updateById({ body, id }) {
        console.log(body);
        return this.db.user
            .update({
            where: { loginId: id },
            data: {
                ...(0, exclude_key_1.excludeFields)(body, ['login']),
                login: {
                    update: {
                        data: { ...body.login },
                    },
                },
            },
        })
            .then(ws_message_1.throwSuccess);
    }
    getById(id) {
        console.log(id);
        return this.db.user
            .findFirstOrThrow({
            where: { loginId: Number(id) },
            include: { login: { omit: { username: true, password: true } } },
        })
            .then((val) => {
            return base_response_1.BaseResponse.success(val);
        });
    }
    createUserWithShop({ body }) {
        const userDto = (0, exclude_key_1.excludeFields)(body, ['shop']);
        return;
    }
    getAll({ query }) {
        return this.db.user
            .findMany({
            include: {
                login: {
                    include: { role: true },
                    omit: { password: true, username: true },
                },
            },
            where: {},
        })
            .then((val) => base_response_1.BaseResponse.successWithPagination(val, 1, query.perpage));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        crypto_service_1.CryptoService,
        config_1.ConfigService,
        mailer_service_1.EmailerService,
        otp_service_1.OtpService])
], UserService);
//# sourceMappingURL=user.service.js.map