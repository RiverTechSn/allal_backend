import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/database.service';
import { CurrentUserDto } from 'src/common/types/login.dto';
import { RoleCreateDto, RoleEditDto } from 'src/common/types/role.dto';
import { throwSuccess } from 'src/common/exceptions/ws_message';
import { SearchQueryDto } from 'src/common/types/paginagation_query.dto';
import { Prisma } from '.prisma/client/default';
import { BaseResponse } from 'src/cores/base_response';

@Injectable()
export class RoleService {
  constructor(private readonly db: DatabaseService) {}
  create({ by, body }: { by: CurrentUserDto; body: RoleCreateDto }) {
    return this.db.role
      .create({ data: { ...body, byId: by.id } })
      .then(throwSuccess);
  }
  perpage({ query }: { query: SearchQueryDto }) {
    const whereClause: Prisma.RoleWhereInput | Prisma.RoleWhereInput[] = {
      name: { contains: query.search ?? '' },
    };
    return this.db.role
      .findMany({ where: whereClause, ...query.getPaginationParams() })
      .then(async (val) =>
        BaseResponse.successWithPagination(
          val,
          await this.db.role.count({ where: whereClause }),
          query.perpage,
        ),
      );
  }
  update({ id, body }: { id: number; body: RoleEditDto }) {
    return this.db.role
      .update({ where: { id }, data: { ...body } })
      .then(throwSuccess);
  }
  byId({ id }: { id: number }) {
    return this.db.role
      .findFirstOrThrow({ where: { id } })
      .then(BaseResponse.success);
  }
  byName({ name }: { name: string }) {
    return this.db.role
      .findFirstOrThrow({ where: { name } })
      .then(BaseResponse.success);
  }
}
