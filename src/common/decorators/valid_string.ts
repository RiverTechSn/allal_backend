import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import {
  ApiProperty,
  ApiPropertyOptions,
} from '@nestjs/swagger/dist/decorators/api-property.decorator';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidationOptions,
} from 'class-validator';
import { getOptionalOption, ValidationOption } from './getOption';

export const IsValidStringApi = (option?: ValidationOption) => {
  return applyDecorators(
    ApiProperty(option?.apiPropertyOptions),
    IsString(option?.validationOptions),
  );
};

export const IsValidStringOptionalApi = (option?: ValidationOption) => {
  return applyDecorators(
    IsValidStringApi(getOptionalOption(option)),
    IsOptional(option?.validationOptions),
  );
};

export const IsValidStringRequiredApi = (option?: ValidationOption) => {
  return applyDecorators(
    IsValidStringApi(option),
    IsNotEmpty(option?.validationOptions),
  );
};
