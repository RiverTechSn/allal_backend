import { ApiController } from 'src/common/decorators/api_controller';
import { CustomerAliasService } from './customer_alias.service';
import {
  Get,
  Post,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Param,
  Query,
} from '@nestjs/common/decorators/http/route-params.decorator';
import {
  ApiPaginationResponse,
  ApiSuccessResponseDto,
  ApiUnauthorizedResponseDto,
  WsMessageDto,
} from 'src/common/decorators/response.decorator';
import { ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { ApiGet, ApiPost } from 'src/common/decorators/api_param';
import { CurrentUser } from 'src/common/decorators/current_user';
import { CurrentUserDto } from 'src/common/types/login.dto';
import { PaginationQueryDto } from 'src/common/types/paginagation_query.dto';
import {
  CustomerAliasCreateDto,
  CustomerAliasPaginationResponseDto,
  CustomerAliasQuery,
  CustomerAliasResponseDto,
} from 'src/common/types/customer_alias.dto';
import { ApiLoginType } from '../security/login_type.guard';
@ApiController('customer-alias')
export class CustomerAliasController {
  constructor(private readonly service: CustomerAliasService) {}
  @ApiPost('create')
  @ApiLoginType(['USER'])
  create(
    @Body() body: CustomerAliasCreateDto,
    @CurrentUser() by: CurrentUserDto,
  ) {
    return this.service.create({ body, by });
  }

  @ApiGet('id/:id')
  @ApiPaginationResponse(CustomerAliasResponseDto)
  byId(@Param('id') id: number) {
    return this.service.byId({ id });
  }

  @ApiGet('perpage/shop/:shopId')
  @ApiPaginationResponse(CustomerAliasPaginationResponseDto)
  byShopId(@Query() query: CustomerAliasQuery, @Param('shopId') id: number) {
    return this.service.perpage({ query, id });
  }
  @ApiGet('shop/:shopId/phone/:phone')
  @ApiPaginationResponse(CustomerAliasResponseDto)
  byPhone(@Param('phone') phone: string, @Param('shopId') id: number) {
    return this.service.phone({ phone, id });
  }
}
