import { UserService } from './user.service';
import {
  Body,
  Param,
  Query,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { UserQueryDto } from 'src/common/types/paginagation_query.dto';
import {
  UserCreateDto,
  UserPaginationResponseDto,
  UserResponseDto,
  UserShopCreateDto,
  UserUpdateDto,
} from 'src/common/types/user.dto';
import { ApiController } from 'src/common/decorators/api_controller';
import { ApiGet, ApiPost, ApiPut } from 'src/common/decorators/api_param';
import { ApiLoginType } from '../security/login_type.guard';
import { ApiPaginationResponse } from 'src/common/decorators/response.decorator';
const Tag: string = 'user';
@ApiController(Tag)
export class UserController {
  constructor(private readonly userServide: UserService) {}
  @ApiGet('perpage', { success: false, secure: true })
  @ApiLoginType(['USER'])
  @ApiPaginationResponse(UserPaginationResponseDto)
  getAll(@Query() query: UserQueryDto) {
    return this.userServide.getAll({ query });
  }
  @ApiGet('id/:id')
  @ApiPaginationResponse(UserResponseDto)
  getById(@Param('id') id: number) {
    return this.userServide.getById(id);
  }
  @ApiPost('create-with-shop', {})
  createWithShop(@Body() body: UserShopCreateDto) {
    console.log(body);
    return this.userServide.createUserWithShop({ body });
  }
  @ApiPost('create')
  create(@Body() body: UserCreateDto) {
    return this.userServide.create(body);
  }

  @ApiPut('id/:id')
  updateById(@Param('id') id: number, @Body() body: UserUpdateDto) {
    return this.userServide.updateById({ id, body });
  }
}
