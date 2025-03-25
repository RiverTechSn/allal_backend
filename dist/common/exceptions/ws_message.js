"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwSuccess = exports.WsMessageNotFound = exports.WsMessageSuccess = exports.HttpExceptionCode = exports.WsMessage = void 0;
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
class WsMessage extends http_exception_1.HttpException {
    constructor({ message, status, code, }) {
        super({
            message,
            code,
            status: status === 200,
        }, status);
        this.name = 'CustomError';
        Object.setPrototypeOf(this, WsMessage.prototype);
    }
}
exports.WsMessage = WsMessage;
exports.HttpExceptionCode = {
    LOGIN_FAILLURE: {
        code: 'FAILLURE',
        status: 401,
        message: ['Identifiant de connexion incorrect'],
    },
    SUCCEEDED: {
        code: 'SUCCEEDED',
        status: 200,
        message: ['Traitement reussi avec success'],
    },
    POSITIVE_AMOUNT: {
        code: 'FAILLURE',
        status: 400,
        message: ['total amount doit etre > 0'],
    },
    EXCEL_FILE_NOT_FOUND: {
        code: 'EXCEL_FILE_NOT_FOUND',
        status: 404,
        message: ['excel file is required'],
    },
    FAILLURE: {
        code: 'FAILLURE',
        status: 500,
        message: ["Une Erreur c'est produite vueillez réessayer"],
    },
    INSUFFISANT_BALANCE: {
        code: 'INSUFFISANT_BALANCE',
        status: 500,
        message: ['Solde insufficasant'],
    },
    INSUFFISANT_QUANTITY: {
        code: ['FAILLURE'],
        status: 400,
        message: ['Insuffisant quantity'],
    },
    NOT_FOUND: {
        code: 'NOT_FOUND',
        status: 404,
        message: ['Entity not found'],
    },
};
exports.WsMessageSuccess = new WsMessage(exports.HttpExceptionCode.SUCCEEDED);
exports.WsMessageNotFound = new WsMessage(exports.HttpExceptionCode.NOT_FOUND);
const throwSuccess = (val) => {
    console.log(val);
    throw exports.WsMessageSuccess;
};
exports.throwSuccess = throwSuccess;
//# sourceMappingURL=ws_message.js.map