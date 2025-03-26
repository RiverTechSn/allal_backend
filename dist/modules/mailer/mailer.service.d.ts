import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
export declare class EmailerService {
    private mailer;
    private config;
    constructor(mailer: MailerService, config: ConfigService);
    senOtp({ to, message }: {
        to: string;
        message: string;
    }): unknown;
    sendMessage({ to, message }: {
        to: string;
        message: string;
    }): any;
    sendUserConfirmation({ email, token }: {
        email: string;
        token: string;
    }): unknown;
    sendCustomerValidation({ email, token }: {
        email: string;
        token: string;
    }): unknown;
}
