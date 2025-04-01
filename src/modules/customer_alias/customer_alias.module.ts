
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { CustomerAliasController } from './customer_alias.controller';
import { CustomerAliasService } from './customer_alias.service';

@Module({
  controllers: [CustomerAliasController],
  providers: [CustomerAliasService],
})
export class CustomerAliasModule {}
