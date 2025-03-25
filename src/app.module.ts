import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { SecurityModule } from './modules/security/security.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EmailerModule } from './modules/mailer/mailer.module';
import { OtpModule } from './modules/otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [configurations],
      isGlobal: true,
    }),
    DatabaseModule,
    EmailerModule,
    SecurityModule,
    UserModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
