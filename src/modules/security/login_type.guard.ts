import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { Login, LoginEnum } from '@prisma/client';
import { LoginDto } from 'src/common/types/login.dto';
export const LoginTypeRoles = Reflector.createDecorator<LoginEnum[]>();
export const ApiLoginType = (types: LoginEnum[]) => {
  return applyDecorators(
    LoginTypeRoles(types),
    ApiOperation({ summary: `LoginType= ${types.join('|')}` }),
  );
};

@Injectable()
export class LoginTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(LoginTypeRoles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as Login;
    return roles.some((e) => e === user.type);
  }
}
