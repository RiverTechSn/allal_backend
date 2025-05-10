import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { User, USER_TYPE } from '@prisma/client';
export const LoginTypeRoles = Reflector.createDecorator<USER_TYPE[]>();
export const ApiLoginType = (types: USER_TYPE[]) => {
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
    const user = request.user as User;
    return roles.some((e) => e === user.type);
  }
}
