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
exports.EmailerService = void 0;
const injectable_decorator_1 = require("@nestjs/common/decorators/core/injectable.decorator");
const config_1 = require("@nestjs/config");
const mailer_service_1 = require("@nestjs-modules/mailer/dist/mailer.service");
const mail_template_1 = require("./mail.template");
let EmailerService = class EmailerService {
    constructor(mailer, config) {
        this.mailer = mailer;
        this.config = config;
    }
    async senOtp({ to, message }) {
        console.log(message);
        return `${to} ${message}`;
    }
    sendMessage({ to, message }) {
        if (process.env.ENV !== process.env.LOCAL)
            return fetch(this.config.getOrThrow('LAM_URL'), {
                method: 'POST',
                body: JSON.stringify({
                    accountid: this.config.getOrThrow('LAM_ACCESS_KEY'),
                    password: this.config.getOrThrow('LAM_ACCESS_PASSWORD'),
                    sender: this.config.getOrThrow('LAM_SENDER_NAME'),
                    to: to,
                    text: message,
                }),
            });
        return this.senOtp({ to, message });
    }
    async sendUserConfirmation({ email, token }) {
        return await this.mailer
            .sendMail({
            to: email,
            subject: 'Welcome to My App!',
            html: (0, mail_template_1.mailTemplate)({ content: ` click to this link to define your  <a href="${this.config.getOrThrow('FRONTEND_BASE_URL')}/define-password/${token}">password </a>` })
        })
            .then((val) => {
            console.log(val);
            return;
        })
            .catch((err) => {
            console.log(err);
        });
    }
    async sendCustomerValidation({ email, token }) {
        return await this.mailer
            .sendMail({
            to: email,
            subject: 'Welcome to My App!',
            html: (0, mail_template_1.mailTemplate)({ content: ` click to this link to confirme your  <a href="${this.config.getOrThrow('CLIENT_BASE_URL')}/account-validation/${token}">password </a>` })
        })
            .then((val) => {
            console.log(val);
            return;
        })
            .catch((err) => {
            console.log(err);
        });
    }
};
exports.EmailerService = EmailerService;
exports.EmailerService = EmailerService = __decorate([
    (0, injectable_decorator_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_service_1.MailerService,
        config_1.ConfigService])
], EmailerService);
//# sourceMappingURL=mailer.service.js.map