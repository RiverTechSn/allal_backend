import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponseDto,
  ApiNotFoundResponseDto,
  ApiSuccessResponseDto,
  ApiUnauthorizedResponseDto,
} from './response.decorator';
import {
  Post,
  Get,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiNoAuth } from './is_public.meta';

type ParamOption = {
  unauthorized?: boolean;
  notfound?: boolean;
  success?: boolean;
  badrequest?: boolean;
  secure?: boolean;
};
const ApiBase = ({
  unauthorized = true,
  notfound = true,
  success = true,
  badrequest = true,
  secure = true,
}: ParamOption = {}) => {
  return applyDecorators(
    ...(unauthorized ? [ApiUnauthorizedResponseDto()] : []),
    ...(notfound ? [ApiNotFoundResponseDto()] : []),
    ...(success ? [ApiSuccessResponseDto()] : []),
    ...(badrequest ? [ApiBadRequestResponseDto()] : []),
    ...(secure ? [ApiBearerAuth()] : [ApiNoAuth()]),
  );
};
export const ApiGet = (path?: string | string[], option: ParamOption = {}) => {
  return applyDecorators(Get(path), ApiBase({ ...option, success: false }));
};
export const ApiPut = (path?: string | string[], option: ParamOption = {}) => {
  return applyDecorators(Put(path), ApiBase(option));
};
export const ApiPost = (path?: string | string[], option: ParamOption = {}) => {
  return applyDecorators(Post(path), ApiBase(option));
};
