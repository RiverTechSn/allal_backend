import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CustomerAliasQuery } from 'src/common/types/customer_alias.dto';
import { DatabaseService } from '../database/database.service';
import { BaseResponse } from 'src/cores/base_response';

@Injectable()
export class CustomerService {
  constructor(private readonly db: DatabaseService) {}
  perpage({ query }: { query: CustomerAliasQuery }) {
    return this.db.customer
      .findMany()
      .then(async (val) =>
        BaseResponse.successWithPagination(
          val,
          await this.db.customer.count({ where: {} }),
          query.perpage,
        ),
      );
  }
}
