import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';

import { Response } from 'express';
import { CryptoService } from '../database/crypto_service';
import { BaseResponse } from 'src/cores/base_response';
import { CurrentUserDto, LoginDto } from 'src/common/types/login.dto';
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
  profile(body: CurrentUserDto) {
    // this.crypto.decrypt(.id)
    return this.db.user
      .findFirstOrThrow({
        where: { id: body.id },
        omit: { roleId: true, shopId: true },
        include: {
          shop: body.type === 'MERCHANT' && {
            select: { address: true, name: true, shopWalletBaseId:true },
          },
          role: {
            omit: { byId: true, createdAt: true, updatedAt: true },
            include: {
              rolePermission: {
                include: {
                  permission: {},
                },
              },
            },
          },
        },
      })
      .then(BaseResponse.success);
  }

  sigin(body: LoginDto, res: Response) {
    console.log(body);
    return this.db.user
      .findFirstOrThrow({
        where: {
          OR: [{ phone: body.username }, { email: body.username }],
          type: body.type,
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
