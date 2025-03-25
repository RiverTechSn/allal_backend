import { OtpCreateDto } from 'src/common/types/otp.dto';
import { DatabaseService } from '../database/database.service';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
@Injectable()
export class OtpService {
  constructor(private readonly db: DatabaseService) {}

  create(body: OtpCreateDto) {
    this.db.otp.create({
      data: {
        via: body.via,
        duration: body.duration,
        code: body.code,
        loginId: body.loginId,
      },
    });
    //   .then(() => {
    //     return this.mailer.sendUserConfirmation({
    //       email: 'djiga2015@gmail.com',
    //       token: code,
    //     });
    //   });
  }
}
