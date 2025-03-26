import { LoginEnum } from '@prisma/client';
import { UserCreateDto } from 'src/common/types/user.dto';
import { excludeFields } from 'src/cores/exclude_key';
import { CryptoService } from 'src/modules/database/crypto_service';
import { DatabaseService } from 'src/modules/database/database.service';
import { EmailerService } from 'src/modules/mailer/mailer.service';

export const createFactory = (
 {db , crypto, mailer , body}: {db: DatabaseService,
  crypto: CryptoService,
   mailer: EmailerService,
  body: UserCreateDto,}
) => {
  console.log(body);

  return db.user
    .create({
      data: {
        ...excludeFields(body, ['password']),
        walletBase: { create: { type: 'USER' } },
        login: {
          create: {
            ...body.login,
            username: body.email,
            type: LoginEnum.USER,
            password: crypto.hash(body.password),
          },
        },
      },

      include: { login: true },
    })
    .then((user) => {
      const code = crypto.encrypt(
        `${user.loginId}_${new Date().getTime()}`,
      );
      return db.otp
        .create({
          data: {
            via: 'MAIL',
            duration: 'HOUR_12',
            code: code,
            loginId: user.loginId,
          },
        })
        .then(() => {
          return mailer
            .sendUserConfirmation({
              email: 'djiga2015@gmail.com',
              token: code,
            })
            .then(() => user);
        });
    })
    .then((val) => val);
};
