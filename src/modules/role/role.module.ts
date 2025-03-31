import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
