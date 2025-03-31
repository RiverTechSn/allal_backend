import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import {
  ApiProperty,
  ApiPropertyOptions,
} from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNumber, IsNumberOptions, IsOptional } from 'class-validator';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
import { getOptionalOption } from './getOption';

type Option = {
  apiPropertyOptions?: ApiPropertyOptions;
  isNumberOptions?: IsNumberOptions;
  validationOptions?: ValidationOptions;
};
export const IsValidNumberApi = (option?: Option) => {
  return applyDecorators(
    ApiProperty(option?.apiPropertyOptions),
    IsNumber(option?.isNumberOptions, option?.validationOptions),
  );
};

export const IsValidNumberOptionnalApi = (option?: Option) => {
  return applyDecorators(
    IsValidNumberApi(getOptionalOption(option)),
    IsOptional(),
  );
};
export const IsDecimalApi = () => {
  return applyDecorators(
    IsValidNumberOptionnalApi({
      apiPropertyOptions: { type: Number },
    }),
  );
};
export const IsValidNumberOptionnalArrayApi = (option?: Option) => {
  return applyDecorators(
    IsValidNumberApi(option),
    IsNumber(option?.isNumberOptions, option?.validationOptions),
    IsOptional(),
  );
};
