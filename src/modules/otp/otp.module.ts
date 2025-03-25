import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
@Global()
@Module({
  imports: [],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
