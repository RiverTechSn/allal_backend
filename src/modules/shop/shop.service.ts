import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/database.service';
import {
  ShopCreateDto,
  ShopEditDto,
  ShopQueryDto,
} from 'src/common/types/shop.dto';
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
        where: whereClause,
        include:{user:{select:{displayname:true}}}
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
        where: { id },
      })
      .then(throwSuccess);
  }
  perpageByUser({ query, by }: { query: ShopQueryDto; by: CurrentUserDto }) {
    const whereClause = {
    
        
          name: { contains: query.name ?? '' },
          address: { contains: query.address ?? '' },
        
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

  customerAlias({ query, by }: { query: ShopQueryDto; by: CurrentUserDto }) {
    return this.db.userAlias
      .findMany({
        where: { shopId: by.id },
        ...query.getPaginationParams(),
      })
      .then(async (val) =>
        BaseResponse.successWithPagination(
          val,
          await this.db.userAlias.count({
            where: { shopId: by.id },
          }),
          query.perpage,
        ),
      );
  }
}
