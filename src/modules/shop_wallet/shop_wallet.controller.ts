import { ApiGet, ApiPost } from 'src/common/decorators/api_param';
import { ShopWalletService } from './shop_wallet.service';
import { CurrentUser } from 'src/common/decorators/current_user';
import { CurrentUserDto } from 'src/common/types/login.dto';
import { Body, Param, Query } from '@nestjs/common';
import { ShopWalletCreateDto } from 'src/common/types/shop8wallet.dto';
import { ApiController } from 'src/common/decorators/api_controller';
import { SearchQueryDto } from 'src/common/types/paginagation_query.dto';
import { ApiLoginType } from '../security/login_type.guard';

@ApiController('shop-wallet')
export class ShopWalletController {
  constructor(private readonly service: ShopWalletService) {}
  @ApiPost('transaction/create')
  create(@CurrentUser() by: CurrentUserDto, @Body() body: ShopWalletCreateDto) {
    return this.service.transaction({ by, body });
  }
  @ApiGet('wallet-base/by-id/:id')
  @ApiLoginType(['MERCHANT'])
  getById(@Param('id') id: number, @CurrentUser() by: CurrentUserDto) {
    return this.service.getById({ id });
  }
  @ApiGet('merchant/transaction/perpage')
  @ApiLoginType(['MERCHANT'])
  perpageForShop(
    @Query() query: SearchQueryDto,
    @CurrentUser() by: CurrentUserDto,
  ) {
    return this.service.perpageShop({ by, query });
  }
  @ApiGet('customer/transaction/perpage')
  @ApiLoginType(['CUSTOMER'])
  perpageForCustmer(
    @Query() query: SearchQueryDto,
    @CurrentUser() by: CurrentUserDto,
  ) {
    return this.service.perpageCustomer({ by, query });
  }
  @ApiGet('customer/transaction/perpage-by-shop/:id')
  @ApiLoginType(['CUSTOMER'])
  perpageForCustmerByShopId(
    @Query() query: SearchQueryDto,
    @Param('id') id: number,
    @CurrentUser() by: CurrentUserDto,
  ) {
    return this.service.perpageCustomerByShop({ by, query , id});
  }
}
