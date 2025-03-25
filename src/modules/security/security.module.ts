import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { SecurityService } from './security.service';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { SecurityController } from './security.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        global: true,
        privateKey: config.getOrThrow('JWT_SECRET'),
        publicKey: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '3600s', },
      }),
    }),
  ],
  controllers: [SecurityController],
  providers: [
    SecurityService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [JwtStrategy],
})
export class SecurityModule {}