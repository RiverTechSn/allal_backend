import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
import { mailTemplate } from './mail.template';
@Injectable()
export class EmailerService {
  constructor(
private mailer:MailerService,
    private config: ConfigService,
  ) {}
  async senOtp({ to, message }: { to: string; message: string }) {
    console.log(message);
    return `${to} ${message}`;
  }
  sendMessage({ to, message }: { to: string; message: string }) {
    if (process.env.ENV !== process.env.LOCAL)
      return fetch(this.config.getOrThrow<string>('LAM_URL'), {
        method: 'POST',
        body: JSON.stringify({
          accountid: this.config.getOrThrow<string>('LAM_ACCESS_KEY'),
          password: this.config.getOrThrow<string>('LAM_ACCESS_PASSWORD'),
          sender: this.config.getOrThrow<string>('LAM_SENDER_NAME'),
          to: to,
          text: message,
        }),
      });
    return this.senOtp({ to, message });
  }

  async sendUserConfirmation({ email, token }: { email: string; token: string }) {


    return await this.mailer
      .sendMail({
        to: email,
        subject: 'Welcome to My App!',
        html:mailTemplate({content: ` click to this link to define your  <a href="${this.config.getOrThrow('FRONTEND_BASE_URL')}/define-password/${token}">password </a>`})
      })
      .then((val) => {
        console.log(val);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async sendCustomerValidation({ email, token }: { email: string; token: string }) {


    return await this.mailer
      .sendMail({
        to: email,
        subject: 'Welcome to My App!',
        html:mailTemplate({content: ` click to this link to confirme your  <a href="${this.config.getOrThrow('CLIENT_BASE_URL')}/account-validation/${token}">password </a>`})
      })
      .then((val) => {
        console.log(val);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
