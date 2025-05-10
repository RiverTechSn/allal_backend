import { LoginEnum } from '.prisma/client/default';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from 'src/modules/database/crypto_service';
import { DatabaseService } from 'src/modules/database/database.service';

export const createAdminFactory = (
  db: DatabaseService,
  config: ConfigService,
  crypto: CryptoService,
) => {
  const email: string = config.getOrThrow('SUPER_ADMIN_EMAIL');
  const phone: string = config.getOrThrow('SUPER_ADMIN_PHONE');
  const role: string = config.getOrThrow('SUPER_ADMIN_ROLE');
  const displayname = config.getOrThrow('SUPER_ADMIN_DISPLAYNAME');
  const password = crypto.hash(config.getOrThrow('SUPER_ADMIN_PASSWORD'));
  return db.user.findFirst({ where: { email: email } }).then((exist) => {
    console.log(exist);
    if (!exist)
      return db.user.create({
        data: {
          email,
          displayname,
          phone,
          address: '',
          type:"USER",
          password,
          walletBase: { create: { type: 'USER' } },
          role: {
            connectOrCreate: {
              create: { name: role },
              where: { name: role },
            },
          },
        },
      });
  });
};
