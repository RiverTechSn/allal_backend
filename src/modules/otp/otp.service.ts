import { CreateOtpWithCheckDto, OtpCreateDto } from 'src/common/types/otp.dto';
import { DatabaseService } from '../database/database.service';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { OptDurationEnum, USER_TYPE } from '@prisma/client';
import {
  HttpExceptionCode,
  throwSuccess,
  WsMessage,
} from 'src/common/exceptions/ws_message';
import { CryptoService } from '../database/crypto_service';
@Injectable()
export class OtpService {
  constructor(
    private readonly _db: DatabaseService,
    private readonly _crypto: CryptoService,
  ) {}

  create(body: OtpCreateDto) {
    return this._db.otp.create({
      data: {
        via: body.via,
        duration: body.duration,
        code: this._crypto.encrypt(body.code),
        to: body.to,
        status: 'PENDING',
        type: body.type,
      },
    });
    //   .then(() => {
    //     return this.mailer.sendUserConfirmation({
    //       email: 'djiga2015@gmail.com',
    //       token: code,
    //     });
    //   });
  }
  verifyOtp({
    phone,
    code,
    type,
  }: {
    phone: string;
    code: string;
    type: USER_TYPE;
  }) {
    return this._db.otp
      .findFirstOrThrow({ where: { to: phone, type, status: 'PENDING' } })
      .then((val) => {
        console.log(val);
        console.log(this._crypto.decrypt(val.code));
        if (this._crypto.decrypt(val.code) === code) {
          console.log("====================code pin Valid===============")
          const codeDuration=new Date().getTime() - val.createdAt.getTime();
          const duartion= this.getDuration(val.duration)

          if (
           codeDuration >
            duartion
          ) {
          console.log("====================code pin Valid===============")

            return this._db.otp
              .update({
                where: { id: val.id },
                data: { status: 'EXPIRED' },
              })
              .then((val) => {
                throw new WsMessage(HttpExceptionCode.EXPIRED);
              });
          }
          return this._db.otp
            .update({
              where: { id: val.id },
              data: { status: 'SUCCEDED' },
            })
            .then(throwSuccess);
        }
        throw new WsMessage(HttpExceptionCode.INVALID_CODE);
      }).catch((err)=>{
        if(err instanceof WsMessage) throw err;
         throw new WsMessage(HttpExceptionCode.INVALID_CODE);
      });
  }

  checkAndSendOtp({ to, type }:CreateOtpWithCheckDto) {
    return this._db.user
      .findUniqueOrThrow({
        where: { phone_type: { phone: to, type } },
      })
      .then((val) => {
        throw new WsMessage(HttpExceptionCode.ALREADY_EXIST);
      })
      .catch((err) => {
        if(err instanceof WsMessage) throw err;
        return this.create({
          duration: 'MIN_15',
          code: '110596',
          to: to,
          loginId: null,
          via: 'SMS',
          type,
        }).then(throwSuccess);
      });
  }
  getDuration(duration: OptDurationEnum): number {
    switch (duration) {
      case OptDurationEnum.MIN_15:
        return 15 * 60 * 1000;
      case OptDurationEnum.MIN_30:
        return 30 * 60 * 1000;
      case OptDurationEnum.HOUR_1:
        return 60 * 60 * 1000;
      case OptDurationEnum.HOUR_12:
        return 12 * 60 * 60 * 1000;
      case OptDurationEnum.HOUR_4:
        return 4 * 60 * 60 * 1000;
      case OptDurationEnum.DAY_1:
        return 24 * 60 * 60 * 1000;
      case OptDurationEnum.DAY_15:
        return 15 * 24 * 60 * 60 * 1000;
    }
  }
}
