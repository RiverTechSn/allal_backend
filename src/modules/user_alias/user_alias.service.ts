import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/database.service';
import {
  UserAliasCreateDto,
  UserAliasQuery,
} from 'src/common/types/user_alias.dto';
import { CurrentUserDto } from 'src/common/types/login.dto';
import { excludeFields } from 'src/cores/exclude_key';
import {
  PaginationQueryDto,
  SearchQueryDto,
} from 'src/common/types/paginagation_query.dto';
import { BaseResponse } from 'src/cores/base_response';
import {
  HttpExceptionCode,
  throwSuccess,
  WsMessage,
} from 'src/common/exceptions/ws_message';
import { Prisma } from '@prisma/client/index';
@Injectable()
export class UserAliasService {
  constructor(private readonly db: DatabaseService) {}
  perpageshop({ query, by }: { by: CurrentUserDto; query: SearchQueryDto }) {
    if (!by?.shopId)
      throw new WsMessage({
        ...HttpExceptionCode.FAILLURE,
        message: ['ShopId not found'],
      });
    const whereClause: Prisma.UserAliasWhereInput = {
      OR: query.search && [
        { displayname: { contains: query.search ?? '' } },
        { user: { phone: { contains: query.search ?? '' } } },
      ],
      shopId: by.shopId,
    };
    return this.db.userAlias
      .findMany({
        where: whereClause,
        ...query.getPaginationParams(),
        include: {
          user: { select: { phone: true } },
          shopWalletBase: {
            omit: { updatedAt: true, createdAt: true },
            include: {
              shopWalletStatus: {
                select: {
                  totalCredit: true,
                  createdAt: true,
                  totalDebit: true,
                },
                take: 1,
                orderBy: { id: 'desc' },
              },
            },
          },
        },
      })
      .then(async (val) => {
        console.log(val);
        return BaseResponse.successWithPagination(
          val,
          await this.db.userAlias.count({ where: whereClause }),
          query.perpage,
        );
      });
  }
  perpageCustomer({
    query,
    by,
  }: {
    by: CurrentUserDto;
    query: UserAliasQuery;
  }) {
    if (!by?.id)
      throw new WsMessage({
        ...HttpExceptionCode.FAILLURE,
        message: ['customerId not found'],
      });
    const whereClause: Prisma.UserAliasWhereInput = {
      displayname: { contains: query.displayname ?? '' },
      userId: by.id,
    };
    return this.db.userAlias
      .findMany({
        where: whereClause,
        ...query.getPaginationParams(),
        select: {},
      })
      .then(async (val) => {
        console.log(val);
        return BaseResponse.successWithPagination(
          val,
          await this.db.userAlias.count({ where: whereClause }),
          query.perpage,
        );
      });
  }
  byId({ id }: { id: number }) {
    return this.db.userAlias
      .findFirstOrThrow({ where: { id } })
      .then(BaseResponse.success);
  }
  phone({ phone, id }: { phone: string; id: number }) {
    return this.db.userAlias
      .findFirstOrThrow({ where: { user: { phone }, shopId: id } })
      .then(BaseResponse.success);
  }
  create({ body, by }: { body: UserAliasCreateDto; by: CurrentUserDto }) {
    if (!by?.shopId)
      throw new WsMessage({
        ...HttpExceptionCode.FAILLURE,
        message: ['ShopId not found'],
      });
    return this.db.userAlias
      .create({
        data: {
          ...excludeFields(body, ['phone']),
          byId: by.id,
          shopWalletBase: {
            create: {
              shopWalletStatus: { create: { totalCredit: 0, totalDebit: 0 } },
            },
          },
          user: {
            connectOrCreate: {
              create: {
                address: '',
                phone: body.phone,
                displayname: body.displayname,
                type: 'CUSTOMER',
                walletBase: {
                  create: {
                    type: 'CUSTOMER',
                    walletStatus: { create: { totalCredit: 0, totalDebit: 0 } },
                  },
                },
              },

              where: { phone_type: { phone: body.phone, type: 'CUSTOMER' } },
            },
          },
          shop: { connect: { id: by.shopId } },
        },
      })
      .then(throwSuccess);
  }
}
