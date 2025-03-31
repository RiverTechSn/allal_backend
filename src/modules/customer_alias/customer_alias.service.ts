import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/database.service';
import {
  CustomerAliasCreateDto,
  CustomerAliasQuery,
} from 'src/common/types/customer_alias.dto';
import { CurrentUserDto } from 'src/common/types/login.dto';
import { excludeFields } from 'src/cores/exclude_key';
import { PaginationQueryDto } from 'src/common/types/paginagation_query.dto';
import { BaseResponse } from 'src/cores/base_response';
import { throwSuccess } from 'src/common/exceptions/ws_message';

@Injectable()
export class CustomerAliasService {
  constructor(private readonly db: DatabaseService) {}
  perpage({
    query,

    id,
  }: {
    id: number;
    query: CustomerAliasQuery;
  }) {
    const whereClause = {
      displayname: { contains: query.displayname ?? '' },
      AND: {
        customer: { phone: { contains: query.displayname ?? '' } },
        shopId: id,
      },
    };
    return this.db.customerAlias
      .findMany({
        where: whereClause,
      })
      .then(async (val) => {
        console.log(val);
        return BaseResponse.successWithPagination(
          val,
          await this.db.customerAlias.count({ where: whereClause }),
          query.perpage,
        );
      });
  }
  byId({ id }: { id: number }) {
    return this.db.customerAlias
      .findFirstOrThrow({ where: { id } })
      .then(BaseResponse.success);
  }
  phone({ phone, id }: { phone: string; id: number }) {
    return this.db.customerAlias
      .findFirstOrThrow({ where: { customer: { phone }, shopId: id } })
      .then(BaseResponse.success);
  }
  create({ body, by }: { body: CustomerAliasCreateDto; by: CurrentUserDto }) {
    return this.db.customerAlias
      .create({
        data: {
          ...excludeFields(body, ['phone']),
          byId: by.id,
          customer: {
            connectOrCreate: {
              create: {
                phone: body.phone,
                displayname: body.displayname,
                walletBase: { create: { type: 'CUSTOMER' } },
              },
              where: { phone: body.phone },
            },
          },
          shop: { connect: { id: 1 } },
        },
      })
      .then(throwSuccess);
  }
}
