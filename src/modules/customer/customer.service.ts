import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CustomerAliasQuery } from 'src/common/types/customer_alias.dto';
import { DatabaseService } from '../database/database.service';
import { BaseResponse } from 'src/cores/base_response';
import { CustomerCreateDto, CustomerUpdateDto } from 'src/common/types/customer.dto';
import { excludeFields } from 'src/cores/exclude_key';
import { CryptoService } from '../database/crypto_service';

@Injectable()
export class CustomerService {
  constructor(private readonly db: DatabaseService, private readonly crypto: CryptoService) {}
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
  create({ body }: { body: CustomerCreateDto }) {
    return this.db.customer.upsert({
      create: { ...excludeFields(body, ['password']),walletBase:{create:{type:"CUSTOMER"}}, Login: { create:{type:"CUSTOMER", username:body.phone, password:this.crypto.hash(body.password)} } },
      update: { ...excludeFields(body, ['password']),walletBase:{create:{type:"CUSTOMER"}}, Login: { create:{type:"CUSTOMER", username:body.phone, password:this.crypto.hash(body.password)} }},
      where: {
        phone: body.phone,
      },
    });
  }
  update({id, body }: {id:number, body: CustomerUpdateDto }) {
    return this.db.customer.update({
      where: { id },
      data: { ...excludeFields(body, ['password']), Login:{update:body?.login} },
    });
  }
}
