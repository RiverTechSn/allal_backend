import { ApiController } from 'src/common/decorators/api_controller';
import { UserAliasService } from './user_alias.service';
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
import { PaginationQueryDto, SearchQueryDto } from 'src/common/types/paginagation_query.dto';
import {
  UserAliasCreateDto as UserAliasCreateDto,
  UserAliasPaginationResponseDto,
  UserAliasQuery,
  UserAliasResponseDto,
} from 'src/common/types/user_alias.dto';
import { ApiLoginType } from '../security/login_type.guard';
@ApiController('user-alias')
export class UserAliasController {
  constructor(private readonly service: UserAliasService) {}
  @ApiPost('create')
  @ApiLoginType(['MERCHANT'])
  create(
    @Body() body: UserAliasCreateDto,
    @CurrentUser() by: CurrentUserDto,
  ) {
    return this.service.create({ body, by });
  }

  @ApiGet('id/:id')
  @ApiPaginationResponse(UserAliasResponseDto)
  byId(@Param('id') id: number) {
    return this.service.byId({ id });
  }

  @ApiGet('perpage/shop')
  @ApiLoginType(['MERCHANT'])
  @ApiPaginationResponse(UserAliasPaginationResponseDto)
  byShopId(@Query() query: SearchQueryDto, @CurrentUser() by: CurrentUserDto) {
    return this.service.perpageshop({ query, by});
  }
  @ApiGet('perpage/user')
  @ApiLoginType(['CUSTOMER'])
  @ApiPaginationResponse(UserAliasPaginationResponseDto)
  byUser(@Query() query: UserAliasQuery, @CurrentUser() by: CurrentUserDto) {
    return this.service.perpageCustomer({ query, by});
  }
  @ApiGet('shop/:shopId/phone/:phone')
  @ApiPaginationResponse(UserAliasResponseDto)
  byPhone(@Param('phone') phone: string, @Param('shopId') id: number) {
    return this.service.phone({ phone, id });
  }
}
