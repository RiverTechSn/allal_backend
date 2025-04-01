import { ApiController } from 'src/common/decorators/api_controller';
import { ShopService } from './shop.service';
import {
  ShopCreateDto,
  ShopPaginationResponseDto,
  ShopQueryDto,
} from 'src/common/types/shop.dto';
import {
  Body,
  Param,
  Query,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiGet, ApiPost, ApiPut } from 'src/common/decorators/api_param';
import { CurrentUser } from 'src/common/decorators/current_user';
import { CurrentUserDto } from 'src/common/types/login.dto';
import { ApiPaginationResponse } from 'src/common/decorators/response.decorator';

@ApiController('shop')
export class ShopController {
  constructor(private readonly service: ShopService) {}
  @ApiGet('perpage')
  @ApiPaginationResponse(ShopPaginationResponseDto)
  perpageAll(@Query() query: ShopQueryDto) {
    return this.service.perpageAll({ query });
  }
  @ApiGet('user/:userId')
  user(@Body() body: ShopCreateDto, @Param('userId') id: number) {
    return this.service.editById({ body, id });
  }
  @ApiGet('perpage')
  @ApiPaginationResponse(ShopPaginationResponseDto)
  perpageUser(@Query() query: ShopQueryDto, @CurrentUser() by: CurrentUserDto) {
    return this.service.perpageByUser({ query, by });
  }

  @ApiPut('/:id')
  edit(@Body() body: ShopCreateDto, @Param('id') id: number) {
    return this.service.editById({ body, id });
  }
}
