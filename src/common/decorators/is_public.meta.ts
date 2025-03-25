import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';

export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
export const ApiNoAuth = () => {
  return applyDecorators(
    ApiOperation({ summary: 'No Auth Required' }),
    IsPublic(),
  );
};
