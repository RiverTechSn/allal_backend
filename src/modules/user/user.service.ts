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
import { createFactory } from './factory/create_user.factory';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly db: DatabaseService,
    private readonly crypto: CryptoService,
    private readonly config: ConfigService,
    private readonly mailer: EmailerService,
  ) {}
  onModuleInit() {
    // throw new Error('Method not implemented.');
    createAdminFactory(this.db, this.config, this.crypto);
  }
  create(body: UserCreateDto) {
    return createFactory({
      db: this.db,
      mailer: this.mailer,
      crypto: this.crypto,
      body,
    }).then(throwSuccess);
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
    return createFactory({
      db: this.db,
      mailer: this.mailer,
      crypto: this.crypto,
      body: userDto,
    }).then((val) => {
      this.db.shop.create({
        data: {
          ...body.shop,
          walletBase: { create: { type: 'SHOP' } },
          userShop: { create: { userId: val.id, role: 'ADMIN' } },
        },
      });
    });
  }
  getAll({ query }: { query: UserQueryDto }) {
    const whereClause = {
      displayname: { contains: query.displayname ?? '' },
      phone: { contains: query.phone ?? '' },
      email: { contains: query.email ?? '' },
    };
    return this.db.user
      .findMany({
        include: {
          login: {
            include: { role: true },
            omit: { password: true, username: true },
          },
        },
        where: whereClause,
        ...query.getPaginationParams(),
      })
      .then(async (val) =>
        BaseResponse.successWithPagination(
          val,
          await this.db.user.count({ where: whereClause }),
          query.perpage,
        ),
      );
  }
}
