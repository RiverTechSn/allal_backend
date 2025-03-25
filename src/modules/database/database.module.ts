import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { DatabaseService } from './database.service';
import { Global } from '@nestjs/common';
import { CryptoService } from './crypto_service';
@Global()
@Module({
  imports: [],
  providers: [DatabaseService, CryptoService],
  exports: [DatabaseService, CryptoService],
})
export class DatabaseModule {}
