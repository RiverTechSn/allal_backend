import { HttpException } from '@nestjs/common/exceptions/http.exception';

export class WsMessage extends HttpException {
  constructor({
    message,
    status,
    code,
  }: {
    message: string[];
    status: number;
    code: string;
  }) {
    super(
      {
        message,
        code,
        // sessionExpired: status === 401 ? true : false,
        status: status,
      },
      status,
    );
    this.name = 'CustomError';
    Object.setPrototypeOf(this, WsMessage.prototype);
  }
}
export const HttpExceptionCode = {
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
    code: 'FAILLURE',
    status: 400,
    message: ['Insuffisant quantity'],
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    status: 404,
    message: ['Entity not found'],
  },
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    status: 400,

    message: ['Entity not found'],
  },
};

export const WsMessageSuccess = new WsMessage(HttpExceptionCode.SUCCEEDED);
export const WsMessageNotFound = new WsMessage(HttpExceptionCode.NOT_FOUND);
export const throwSuccess = (val) => {
  console.log(val);
  throw WsMessageSuccess;
};
