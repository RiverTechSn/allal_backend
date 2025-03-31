import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { HttpExceptionCode } from '../exceptions/ws_message';
import { BadRequestExample } from './response.example';
import { PaginationResponseDto } from '../types/pagination_response.dto';
import { IsAllowApi } from './allow';
import { UserBase } from '../types/user.dto';
export class WsMessageDto {
  @ApiProperty({})
  status: boolean;
  @ApiProperty()
  code: string;
  @ApiProperty({ isArray: true, type: [String] })
  message: string[];
  @ApiProperty()
  path: string;
}

export const ApiSuccessResponseDto = () => {
  return applyDecorators(
    ApiResponse({
      type: WsMessageDto,
      example: HttpExceptionCode.SUCCEEDED,
      status: 200,
    }),
  );
};
export const ApiBadRequestResponseDto = () => {
  return applyDecorators(
    ApiResponse({
      type: WsMessageDto,
      example: BadRequestExample,
      status: 400,
    }),
  );
};

export const ApiUnauthorizedResponseDto = () => {
  return applyDecorators(
    ApiResponse({
      type: WsMessageDto,
      example: HttpExceptionCode.LOGIN_FAILLURE,
      status: 401,
    }),
  );
};
export const ApiNotFoundResponseDto = () => {
  return applyDecorators(
    ApiResponse({
      type: WsMessageDto,
      example: HttpExceptionCode.NOT_FOUND,
      status: 404,
    }),
  );
};

export const ApiPaginationResponse = (tpeClass: any) => {
  return applyDecorators(ApiResponse({ type: tpeClass, status: 200 }));
};
