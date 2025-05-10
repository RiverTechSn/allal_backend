
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { UserAliasController } from './user_alias.controller';
import { UserAliasService } from './user_alias.service';

@Module({
  controllers: [UserAliasController],
  providers: [UserAliasService],
})
export class UserAliasModule {}
