import { ApiController } from 'src/common/decorators/api_controller';
import { CustomerService } from './customer.service';
import { ApiGet } from 'src/common/decorators/api_param';
import { CustomerAliasQuery } from 'src/common/types/customer_alias.dto';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';

@ApiController('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}
  @ApiGet('perpage')
  perpage(@Query() query: CustomerAliasQuery) {
    return this.service.perpage({ query });
  }
}
