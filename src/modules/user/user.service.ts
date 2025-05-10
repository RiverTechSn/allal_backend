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
import { createFactory } from './factory/create_user.factory';
import { CLIENT_RENEG_LIMIT } from 'node:tls';
import { Prisma } from '@prisma/client';

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
        where: { id: id },
        data: body,
      })
      .then(throwSuccess);
  }
  getById(id: number) {
    console.log(id);
    return this.db.user
      .findFirstOrThrow({
        where: { id: Number(id) },
      })
      .then((val) => {
        return BaseResponse.success(val);
      });
  }
  createUserWithShop({ body }: { body: UserShopCreateDto }) {
    const userDto = excludeFields(body, ['shop']);
    console.log(userDto);

    return createFactory({
      db: this.db,
      mailer: this.mailer,
      crypto: this.crypto,
      body: { ...userDto, shopId: null },
    }).then((val) => {
      console.log(val);
      return this.db.shop
        .create({
          data: {
            ...body.shop,
            shopWalletBase: { create: { shopWalletStatus:{create:{totalCredit:0,totalDebit:0,}}} },
            walletBase: { create: { type: 'SHOP',  } },
            user: {
              connect: { id: val.id },
            },
          },
        })
        .then(throwSuccess);
    });
  }
  getAll({ query }: { query: UserQueryDto }) {
    const whereClause: Prisma.UserWhereInput = {
      displayname: { contains: query.displayname ?? '' },
      phone: { contains: query.phone ?? '' },
      email: { contains: query.email ?? '' },
    };
    return this.db.user
      .findMany({
        omit: { password: true },
        include: {
          role: { select: { name: true } },
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
