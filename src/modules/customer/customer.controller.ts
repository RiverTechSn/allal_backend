import { ApiController } from 'src/common/decorators/api_controller';
import { CustomerService } from './customer.service';
import { ApiGet, ApiPost, ApiPut } from 'src/common/decorators/api_param';
import { CustomerAliasQuery } from 'src/common/types/customer_alias.dto';
import {
  Body,
  Param,
  Query,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { CustomerCreateDto, CustomerUpdateDto } from 'src/common/types/customer.dto';

@ApiController('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}
  @ApiGet('perpage')
  perpage(@Query() query: CustomerAliasQuery) {
    return this.service.perpage({ query });
  }
  @ApiPost('create')
  create(@Body() body: CustomerCreateDto) {
    return this.service.create({ body });
  }
  @ApiPut('edit/:id')
  edit(@Body() body: CustomerUpdateDto, @Param('id') id: number) {
    return this.service.update({ body, id });
  }
}
