"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const module_decorator_1 = require("@nestjs/common/decorators/modules/module.decorator");
const security_service_1 = require("./security.service");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth.guard");
const jwt_module_1 = require("@nestjs/jwt/dist/jwt.module");
const security_controller_1 = require("./security.controller");
let SecurityModule = class SecurityModule {
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = __decorate([
    (0, module_decorator_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_module_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                global: true,
                useFactory: (config) => ({
                    secret: config.getOrThrow('JWT_SECRET'),
                    global: true,
                    privateKey: config.getOrThrow('JWT_SECRET'),
                    publicKey: config.getOrThrow('JWT_SECRET'),
                    signOptions: { expiresIn: '3600s', },
                }),
            }),
        ],
        controllers: [security_controller_1.SecurityController],
        providers: [
            security_service_1.SecurityService,
            jwt_strategy_1.JwtStrategy,
            { provide: core_1.APP_GUARD, useClass: auth_guard_1.JwtAuthGuard },
        ],
        exports: [jwt_strategy_1.JwtStrategy],
    })
], SecurityModule);
//# sourceMappingURL=security.module.js.map