import { HttpException } from '@nestjs/common/exceptions/http.exception';
export declare class WsMessage extends HttpException {
    constructor({ message, status, code, }: {
        message: string[];
        status: number;
        code: string;
    });
}
export declare const HttpExceptionCode: {
    LOGIN_FAILLURE: {
        code: string;
        status: number;
        message: {};
    };
    SUCCEEDED: {
        code: string;
        status: number;
        message: {};
    };
    POSITIVE_AMOUNT: {
        code: string;
        status: number;
        message: {};
    };
    EXCEL_FILE_NOT_FOUND: {
        code: string;
        status: number;
        message: {};
    };
    FAILLURE: {
        code: string;
        status: number;
        message: {};
    };
    INSUFFISANT_BALANCE: {
        code: string;
        status: number;
        message: {};
    };
    INSUFFISANT_QUANTITY: {
        code: {};
        status: number;
        message: {};
    };
    NOT_FOUND: {
        code: string;
        status: number;
        message: {};
    };
};
export declare const WsMessageSuccess: WsMessage;
export declare const WsMessageNotFound: WsMessage;
export declare const throwSuccess: (val: any) => never;
