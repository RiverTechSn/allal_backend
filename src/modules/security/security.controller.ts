import { SecurityService } from './security.service';
import {
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';

import {
  Body,
  Req,
  Res,
} from '@nestjs/common/decorators/http/route-params.decorator';

import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { Response } from 'express';

import { ApiNoAuth } from 'src/common/decorators/is_public.meta';
import { ApiController } from 'src/common/decorators/api_controller';
import { LoginDto } from 'src/common/types/login.dto';
import { CurrentUser } from 'src/common/decorators/current_user';
import { ApiGet, ApiPost, ApiPut } from 'src/common/decorators/api_param';

const TAG = 'security';
@ApiController(TAG)
export class SecurityController {
  constructor(private readonly service: SecurityService) {}
  @ApiGet('profile')
  profile(@CurrentUser() user) {
    // TODO document why this method 'profile' is empty
    return this.service.profile(user);
  }
  @ApiPost('signin', { secure: false })
  @ApiNoAuth()
  signup(@Body() body: LoginDto, @Res() res: Response) {
    // TODO document why this method 'signup' is empty
    console.log(body);
    return this.service.sigin(body, res);
  }
  @ApiPost('forget-password', { secure: false })
  forgetPassword() {
    // TODO document why this method 'forgetPassword' is empty
  }
  @ApiPut('reset-password', { secure: false })
  resetPassword() {
    // TODO document why this method 'resetPassword' is empty
  }
  @ApiPut('define-password', { secure: false })
  definePassword() {
    // TODO document why this method 'resetPassword' is empty
  }
}
