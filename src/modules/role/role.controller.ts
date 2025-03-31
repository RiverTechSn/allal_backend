import { ApiController } from 'src/common/decorators/api_controller';
import { RoleService } from './role.service';
import { ApiGet, ApiPost, ApiPut } from 'src/common/decorators/api_param';
import { SearchQueryDto } from 'src/common/types/paginagation_query.dto';
import { ApiPaginationResponse } from 'src/common/decorators/response.decorator';
import {
  RoleCreateDto,
  RoleEditDto,
  RolePaginationResponseDto,
} from 'src/common/types/role.dto';
import { ApiLoginType } from '../security/login_type.guard';
import { CurrentUser } from 'src/common/decorators/current_user';
import { CurrentUserDto } from 'src/common/types/login.dto';
import {
  Body,
  Param,
  Query,
} from '@nestjs/common/decorators/http/route-params.decorator';

@ApiController('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}
  @ApiGet('perpage')
  @ApiPaginationResponse(RolePaginationResponseDto)
  perpage(@Query() query: SearchQueryDto) {
    return this.service.perpage({ query });
  }

  @ApiGet('id/:id')
  byId(@Param('id') id: number, @CurrentUser() by: CurrentUserDto) {
    return this.service.byId({ id });
  }

  @ApiPut('id/:id')
  @ApiLoginType(['USER'])
  edit(
    @Body() body: RoleEditDto,
    @Param('id') id: number,
    @CurrentUser() by: CurrentUserDto,
  ) {
    return this.service.update({ body, id });
  }
  @ApiPost('create')
  @ApiLoginType(['USER'])
  create(@Body() body: RoleCreateDto, @CurrentUser() by: CurrentUserDto) {
    return this.service.create({ body, by });
  }
}
