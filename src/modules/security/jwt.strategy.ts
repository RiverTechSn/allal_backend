import {  Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import {Request} from 'express'
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: extractTokenFromHeader,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      
    });
  }

  async validate(payload: any) {
    return payload;
  }
}

const extractTokenFromHeader=(request:Request):string|undefined =>{
    
    const [type, token] = request.headers.authorization?.split(' ') ??
      request.cookies['access_token']?.split(' ') ?? [undefined, undefined];
    return type==='Bearer'?token :undefined;
}
;