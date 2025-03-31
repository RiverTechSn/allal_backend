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
  ApiSuccessResponseDto,
  ApiUnauthorizedResponseDto,
  WsMessageDto,
} from 'src/common/decorators/response.decorator';
import { ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { ApiGet, ApiPost } from 'src/common/decorators/api_param';
import { CurrentUser } from 'src/common/decorators/current_user';
import { CurrentUserDto } from 'src/common/types/login.dto';
import { PaginationQueryDto } from 'src/common/types/paginagation_query.dto';
import { CustomerAliasCreateDto } from 'src/common/types/customer_alias.dto';
@ApiController('customer-alias')
export class CustomerAliasController {
  constructor(private readonly service: CustomerAliasService) {}
  @ApiPost('create')
  create(
    @Body() body: CustomerAliasCreateDto,
    @CurrentUser() by: CurrentUserDto,
  ) {
    return this.service.create({ body, by });
  }
  @ApiGet('/per-page', { success: false })
  perpage(
    @CurrentUser() by: CurrentUserDto,
    @Query() query: PaginationQueryDto,
  ) {
    return this.service.perpage({ query, by });
  }
  @ApiGet('id/:id')
  byId() {}

  @ApiGet('shop/:id')
  byShopId() {}
  @ApiGet('phone/:phone')
  byPhone() {}
}
