import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/database.service';
import { ShopCreateDto, ShopEditDto, ShopQueryDto } from 'src/common/types/shop.dto';
import { BaseResponse } from 'src/cores/base_response';
import { Prisma } from '.prisma/client';
import { CurrentUserDto } from 'src/common/types/login.dto';
import { throwSuccess } from 'src/common/exceptions/ws_message';

@Injectable()
export class ShopService {
  constructor(private readonly db: DatabaseService) {}

  perpageAll({ query }: { query: ShopQueryDto }) {
    const whereClause = {
      name: { contains: query.name ?? '' },
      address: { contains: query.address ?? '' },
    };
    return this.db.shop
      .findMany({
        where: {
          name: { contains: query.name ?? '' },
          address: { contains: query.address ?? '' },
        },
      })
      .then(async (val) =>
        BaseResponse.successWithPagination(
          val,
          await this.db.shop.count({ where: whereClause }),
          query.perpage,
        ),
      );
  }
  editById({ body, id }: { body: ShopEditDto; id: number }) {
    return this.db.shop
      .update({
        data: {
          ...body,
        },
        where:{id}
      })
      .then(throwSuccess);
  }
  perpageByUser({ query, by }: { query: ShopQueryDto; by: CurrentUserDto }) {
    const whereClause = {
      AND: [
        {
          name: { contains: query.name ?? '' },
          address: { contains: query.address ?? '' },
        },
        {
          userShop: { every: { userId: by.user.id } },
        },
      ],
    };
    return this.db.shop
      .findMany({
        where: whereClause,
      })
      .then(async (val) =>
        BaseResponse.successWithPagination(
          val,
          await this.db.shop.count({ where: whereClause }),
          query.perpage,
        ),
      );
  }
}
