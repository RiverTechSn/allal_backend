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
        message: string[];
    };
    SUCCEEDED: {
        code: string;
        status: number;
        message: string[];
    };
    POSITIVE_AMOUNT: {
        code: string;
        status: number;
        message: string[];
    };
    EXCEL_FILE_NOT_FOUND: {
        code: string;
        status: number;
        message: string[];
    };
    FAILLURE: {
        code: string;
        status: number;
        message: string[];
    };
    INSUFFISANT_BALANCE: {
        code: string;
        status: number;
        message: string[];
    };
    INSUFFISANT_QUANTITY: {
        code: string[];
        status: number;
        message: string[];
    };
    NOT_FOUND: {
        code: string;
        status: number;
        message: string[];
    };
};
export declare const WsMessageSuccess: WsMessage;
export declare const WsMessageNotFound: WsMessage;
export declare const throwSuccess: (val: any) => never;
