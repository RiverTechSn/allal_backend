import { createParamDecorator } from "@nestjs/common/decorators/http/create-route-param-metadata.decorator";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import * as cookieParser from 'cookie-parser';
import { Request } from "express";

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {...request.user, refreshToken:request.cookies['refresh_token']};

    // Return user as a UserDto
  },
);