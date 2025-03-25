import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';

import { Response } from 'express';
import { CryptoService } from '../database/crypto_service';
import { BaseResponse } from 'src/cores/base_response';
import { LoginDto } from 'src/common/types/login.dto';
import { excludeFields } from 'src/cores/exclude_key';
import { HttpExceptionCode, WsMessage } from 'src/common/exceptions/ws_message';
import { LoginEnum } from '@prisma/client';

Injectable();
export class SecurityService {
  constructor(
    private readonly db: DatabaseService,
    private readonly crypto: CryptoService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}
  profile(body) {
    // this.crypto.decrypt(.id)

    return BaseResponse.success(body);
  }

  sigin(body: LoginDto, res: Response) {
    console.log(body);
    return this.db.login
      .findFirstOrThrow({
        where: { username: body.username, type: body.type },
        omit: { username: true },
        include: {
          user: body.type === 'USER',
          customer: body.type === 'CUSTOMER',
        },
      })
      .then((val) => {
        console.log(val);
        const { id, type } = val;
        const valWithoutPassword = excludeFields(val, ['password']);

        if (!this.crypto.verifiy(body.password, val.password))
          throw new WsMessage(HttpExceptionCode.LOGIN_FAILLURE);
        const accessToken =
          'Bearer ' +
          this.jwtService.sign(
            { ...valWithoutPassword },
            { expiresIn: '3600s' },
          );
        const refreshToken =
          'Bearer ' +
          this.jwtService.sign(
            { data: { id, type } },
            { expiresIn: `${3600 * 24}` },
          );
        res.cookie('access_token', accessToken);
        res.cookie('refresh_token', refreshToken);
        return res.status(200).json(
          BaseResponse.success({
            ...valWithoutPassword,
            accessToken,
            refreshToken,
          }),
        );
      });
  }
}
