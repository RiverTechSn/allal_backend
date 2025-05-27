import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { SecurityModule } from './modules/security/security.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { UserModule } from './modules/user/user.module';
import { EmailerModule } from './modules/mailer/mailer.module';
import { OtpModule } from './modules/otp/otp.module';
import { UserAliasModule } from './modules/user_alias/user_alias.module';
import { RoleModule } from './modules/role/role.module';
import { ShopModule } from './modules/shop/shop.module';
import { ShopWalletModule } from './modules/shop_wallet/shop_wallet.module';
import { ModuleModule } from './modules/module/module.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [configurations],
      isGlobal: true,
    }),
    DatabaseModule,
    EmailerModule,
    SecurityModule,
    RoleModule,
    ModuleModule,
    UserModule,
    OtpModule,
    UserAliasModule,
    ShopModule,
    ShopWalletModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
