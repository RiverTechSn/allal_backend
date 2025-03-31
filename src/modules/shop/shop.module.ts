import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { ApiGet } from 'src/common/decorators/api_param';

@Module({
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {
 
 
}
