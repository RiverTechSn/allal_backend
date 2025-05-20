import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/database.service';
import { CurrentUserDto } from 'src/common/types/login.dto';
import { ShopWalletCreateDto } from 'src/common/types/shop8wallet.dto';
import { Decimal } from '@prisma/client/runtime/library';
import {
  PrismaPromise,
  Prisma,
  ShopWalletStatus,
  PrismaClient,
} from '@prisma/client';
import { ShopWalletStatusSerice } from './shop_wallet_status.service';
import { throwSuccess } from 'src/common/exceptions/ws_message';
import {
  shopTransactionCredit,
  shopTransactionDebit,
} from '@prisma/client/sql';
import { BaseResponse } from 'src/cores/base_response';
import { SearchQueryDto } from 'src/common/types/paginagation_query.dto';
@Injectable()
export class ShopWalletService {
  constructor(
    private readonly _db: DatabaseService,
    private readonly wallet: ShopWalletStatusSerice,
  ) {}
  async transaction({
    by,
    body,
  }: {
    by: CurrentUserDto;
    body: ShopWalletCreateDto;
  }) {
    const shop = await this._db.shopWalletBase.findFirstOrThrow({
      where: { shop: { id: by.shopId } },
    });
    console.log(
      '=========================shop wallet===================',
      shop,
    );
    const alias = await this._db.shopWalletBase.findFirstOrThrow({
      where: { userAlias: { id: body.userAliasId } },
    });
    console.log(
      '=========================alias wallet===================',
      alias,
    );

    const { fromId, toId } =
      body.type === 'LOAN'
        ? { fromId: alias.id, toId: shop.id }
        : { fromId: shop.id, toId: alias.id };
    return this.wallet
      .transaction({ fromId, toId, amount: body.amount })
      .then((val) => {
        return this._db.shopWalletTransaction
          .create({
            data: {
              fromId,
              toId,
              amount: body.amount,
              type: body.type,
              shopId: by.shopId,
              comment: body.comment,
            },
          })
          .then(throwSuccess);
      });
    // await   this._db.$executeRaw`START TRANSACTION;`;
    //   const a = await this._db
    //     .$queryRawTyped(shopTransactionCredit(body.amount, toId))
    //     .then(console.log);
    //   const b = await  this._db
    //     .$queryRawTyped(shopTransactionDebit(body.amount, 19))
    //     .then(console.log);
  }
  getById({ id }: { id: number }) {
    console.log(`====================${id}====================`)
    return this._db.shopWalletBase
      .findUniqueOrThrow({
        where: { id },
        include: { shopWalletStatus: { take: 1, orderBy: { id: 'desc' } } },
      })
      .then(BaseResponse.success);
  }
  perpageShop({ query, by }: { query: SearchQueryDto; by: CurrentUserDto }) {
    const where: Prisma.ShopWalletTransactionWhereInput = {
      OR: [
        {
          from: query.search && {
            userAlias: { displayname: { contains: query.search } },
          },
          to: { shop: { id: by.shopId } },
        },
        {
          to: query.search && {
            userAlias: { displayname: { contains: query.search } },
          },
          from: { shop: { id: by.shopId } },
        },
      ],
    };
    return this._db.shopWalletTransaction
      .findMany({
        where,
        ...query.getPaginationParams(),
        orderBy:{id:'desc'},
        include: {
          from: {
            include: {
              shop: true,
              userAlias: { include: { user: { select: { phone: true } } } },
            },
          },
          to: {
            include: {
              shop: true,
              userAlias: { include: { user: { select: { phone: true } } } },
            },
          },
        },
      })
      .then(async (val) =>
        BaseResponse.successWithPagination(
          val,
          await this._db.shopWalletTransaction.count({ where }),
          query.perpage,
        ),
      );
  }
  perpageCustomer({
    query,
    by,
  }: {
    query: SearchQueryDto;
    by: CurrentUserDto;
  }) {
    const where: Prisma.ShopWalletTransactionWhereInput = {
      OR: [
        {
          from: query.search && {
            shop: { name: { contains: query.search } },
          },
          to: { userAlias: { userId: by.id } },
        },
        {
          to: query.search && {
            shop: { name: { contains: query.search } },
          },
          from: { userAlias: { userId: by.id } },
        },
      ],
    };
    return this._db.shopWalletTransaction
      .findMany({
        where,
        ...query.getPaginationParams(),
        include: {
          from: { include: { shop: true, userAlias: true } },
          to: { include: { shop: true, userAlias: true } },
        },
      })
      .then(async (val) =>
        BaseResponse.successWithPagination(
          val,
          await this._db.shopWalletTransaction.count({ where }),
          query.perpage,
        ),
      );
  }
}
