import { LoginEnum } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { Inject, Injectable } from '@nestjs/common';

import { OnModuleInit } from '@nestjs/common/interfaces/hooks';
import { ConfigService } from '@nestjs/config';

import { EmailerService } from '../mailer/mailer.service';
import { CryptoService } from '../database/crypto_service';
import { excludeFields } from 'src/cores/exclude_key';
import { BaseResponse } from 'src/cores/base_response';
import {
  UserCreateDto,
  UserShopCreateDto,
  UserUpdateDto,
} from 'src/common/types/user.dto';
import { throwSuccess } from 'src/common/exceptions/ws_message';
import { UserQueryDto } from 'src/common/types/paginagation_query.dto';
import { createAdminFactory } from './factory/create_admin.factory';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly db: DatabaseService,
    private readonly crypto: CryptoService,
    private readonly config: ConfigService,
    private readonly mailer: EmailerService,
    private readonly otp: OtpService,
  ) {}
  onModuleInit() {
    // throw new Error('Method not implemented.');
    createAdminFactory(this.db, this.config, this.crypto);
  }

  create(body: UserCreateDto) {
    console.log(body);

    return this.db.user
      .create({
        data: {
          ...excludeFields(body, ['password']),
          login: {
            create: {
              ...body.login,
              username: body.email,
              type: LoginEnum.USER,
              password: this.crypto.hash(body.password),
            },
          },
        },

        include: { login: true },
      })
      .then((val) => {
        const code = this.crypto.encrypt(
          `${val.loginId}_${new Date().getTime()}`,
        );
        return this.db.otp
          .create({
            data: {
              via: 'MAIL',
              duration: 'HOUR_12',
              code: code,
              loginId: val.loginId,
            },
          })
          .then(() => {
            return this.mailer.sendUserConfirmation({
              email: 'djiga2015@gmail.com',
              token: code,
            });
          });
      })
      .then(throwSuccess);
  }
  updateById({ body, id }: { body: UserUpdateDto; id: number }) {
    console.log(body);
    return this.db.user
      .update({
        where: { loginId: id },
        data: {
          ...excludeFields(body, ['login']),
          login: {
            update: {
              data: { ...body.login },
            },
          },
        },
      })
      .then(throwSuccess);
  }
  getById(id: number) {
    console.log(id);
    return this.db.user
      .findFirstOrThrow({
        where: { loginId: Number(id) },
        include: { login: { omit: { username: true, password: true } } },
      })
      .then((val) => {
        return BaseResponse.success(val);
      });
  }
  createUserWithShop({ body }: { body: UserShopCreateDto }) {
    const userDto = excludeFields(body, ['shop']);
    return;
  }
  getAll({ query }: { query: UserQueryDto }) {
    return this.db.user
      .findMany({
        include: {
          login: {
            include: { role: true },
            omit: { password: true, username: true },
          },
        },
        where: {},
      })
      .then((val) => BaseResponse.successWithPagination(val, 1, query.perpage));
  }
}
