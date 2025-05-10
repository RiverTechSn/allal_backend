import { LoginEnum } from '@prisma/client';
import { CLIENT_RENEG_LIMIT } from 'node:tls';
import { UserCreateDto } from 'src/common/types/user.dto';
import { excludeFields } from 'src/cores/exclude_key';
import { CryptoService } from 'src/modules/database/crypto_service';
import { DatabaseService } from 'src/modules/database/database.service';
import { EmailerService } from 'src/modules/mailer/mailer.service';

export const createFactory = ({
  db,
  crypto,
  mailer,
  body,
}: {
  db: DatabaseService;
  crypto: CryptoService;
  mailer: EmailerService;
  body: UserCreateDto;
}) => {
  console.log(body);

  return db.user
    .create({
      data: {
        ...excludeFields(body, ['password', 'shopId', 'roleId']),
        password: body.password && crypto.hash(body.password),
        walletBase: { create: { type: 'USER' } },
        role: { connect: { id: body.roleId } },
      },
    })
    .then((user) => {
      const code = crypto.encrypt(`${user.id}_${new Date().getTime()}`);
      console.log(code);
      return db.otp
        .create({
          data: {
            via: 'MAIL',
            duration: 'HOUR_12',
            code: code,
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
