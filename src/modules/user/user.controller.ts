import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { UserService } from './user.service';
import {
  Post,
  Get,
  Patch,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Param,
  Query,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { UserQueryDto } from 'src/common/types/paginagation_query.dto';
import { ApiNoAuth } from 'src/common/decorators/is_public.meta';
import {
  UserCreateDto,
  UserShopCreateDto,
  UserUpdateDto,
} from 'src/common/types/user.dto';
import { ApiController } from 'src/common/decorators/api_controller';
const Tag: string = 'user';
@ApiController(Tag)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userServide: UserService) {}
  @Get('all')
  @ApiNoAuth()
  getAll(@Query() query: UserQueryDto) {
    return this.userServide.getAll({ query });
  }
  @Get('id/:id')
  getById(@Param('id') id: number) {
    return this.userServide.getById(id);
  }
  @Post('create')
  create(@Body() body: UserCreateDto) {
    return this.userServide.create(body);
  }
  @Post('create-with-shop')
  createWithShop(@Body() body: UserShopCreateDto) {
    return this.userServide.createUserWithShop({ body });
  }
  @Put('id/:id')
  updateById(@Param('id') id: number, @Body() body: UserUpdateDto) {
    return this.userServide.updateById({ id, body });
  }
}
