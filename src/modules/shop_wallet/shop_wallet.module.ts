import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { ShopWalletController } from './shop_wallet.controller';
import { ShopWalletStatusSerice } from './shop_wallet_status.service';
import { ShopWalletService } from './shop_wallet.service';

@Module({
  controllers: [ShopWalletController],
  providers: [ShopWalletStatusSerice, ShopWalletService],
})
export class ShopWalletModule {}
