import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiController } from 'src/common/decorators/api_controller';
import { ApiPost } from 'src/common/decorators/api_param';
import { CreateOtpWithCheckDto, VerifyOtpDto } from 'src/common/types/otp.dto';
import { OtpService } from './otp.service';

@ApiController('Otp')
export class OtpController {
  constructor(private readonly service: OtpService) {}
  @ApiPost('create-with-check', { secure:false})
  createWithCheck(@Body() body: CreateOtpWithCheckDto) {
    return this.service.checkAndSendOtp(body);
  }
  @ApiPost('verify', {secure:false})
  verifyOtp(@Body() body: VerifyOtpDto) {
    return this.service.verifyOtp({ phone: body.to, code: body.code, type:body.type });
  }
}
