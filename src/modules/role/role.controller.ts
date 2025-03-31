import { ApiController } from 'src/common/decorators/api_controller';
import { RoleService } from './role.service';
import { ApiGet, ApiPost } from 'src/common/decorators/api_param';
import { Body, Query } from '@nestjs/common';
import { SearchQueryDto } from 'src/common/types/paginagation_query.dto';
import { ApiPaginationResponse } from 'src/common/decorators/response.decorator';
import {
  RoleCreateDto,
  RolePaginationResponseDto,
} from 'src/common/types/role.dto';
import { ApiLoginType } from '../security/login_type.guard';
import { CurrentUser } from 'src/common/decorators/current_user';
import { CurrentUserDto } from 'src/common/types/login.dto';

@ApiController('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}
  @ApiGet('per-page')
  @ApiPaginationResponse(RolePaginationResponseDto)
  perpage(@Query() query: SearchQueryDto) {
    return this.service.perpage({ query });
  }
  @ApiPost('create')
  @ApiLoginType(['USER'])
  create(@Body() body: RoleCreateDto, @CurrentUser() by: CurrentUserDto) {
    return this.service.create({ body, by });
  }
}
