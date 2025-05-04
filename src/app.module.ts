import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { SecurityModule } from './modules/security/security.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { UserModule } from './modules/user/user.module';
import { EmailerModule } from './modules/mailer/mailer.module';
import { OtpModule } from './modules/otp/otp.module';
import { CustomerAliasModule } from './modules/customer_alias/customer_alias.module';
import { RoleModule } from './modules/role/role.module';
import { ShopModule } from './modules/shop/shop.module';
import { CustomerModule } from './modules/customer/customer.module';

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
    UserModule,
    CustomerModule,
    OtpModule,
    CustomerAliasModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
