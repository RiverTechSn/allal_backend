"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailerModule = void 0;
const module_decorator_1 = require("@nestjs/common/decorators/modules/module.decorator");
const mailer_controller_1 = require("./mailer.controller");
const mailer_service_1 = require("./mailer.service");
const config_service_1 = require("@nestjs/config/dist/config.service");
const config_module_1 = require("@nestjs/config/dist/config.module");
const mailer_module_1 = require("@nestjs-modules/mailer/dist/mailer.module");
const common_1 = require("@nestjs/common");
let EmailerModule = class EmailerModule {
};
exports.EmailerModule = EmailerModule;
exports.EmailerModule = EmailerModule = __decorate([
    (0, common_1.Global)(),
    (0, module_decorator_1.Module)({
        imports: [
            mailer_module_1.MailerModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: async (configService) => {
                    console.log(configService.get('SYSTEM_EMAIL_HOSTNAME'));
                    console.log(configService.get('SYSTEM_EMAIL_PORT'));
                    console.log(configService.get('SYSTEM_EMAIL_ADDRESS'));
                    console.log(configService.get('SYSTEM_EMAIL_ADDRESS'));
                    return {
                        transport: {
                            host: configService.get('SYSTEM_EMAIL_HOSTNAME'),
                            port: configService.get('SYSTEM_EMAIL_PORT'),
                            auth: {
                                user: configService.get('SYSTEM_EMAIL_ADDRESS'),
                                pass: configService.get('SYSTEM_EMAIL_PASSWORD'),
                            },
                        },
                        defaults: {
                            from: `"No Reply"${configService.get('SYSTEM_EMAIL_USERNAME')} <${configService.get('SYSTEM_EMAIL_ADDRESS')}>`,
                        },
                    };
                },
                inject: [config_service_1.ConfigService],
            }),
        ],
        controllers: [mailer_controller_1.EmailerController],
        providers: [mailer_service_1.EmailerService],
        exports: [mailer_service_1.EmailerService],
    })
], EmailerModule);
//# sourceMappingURL=mailer.module.js.map