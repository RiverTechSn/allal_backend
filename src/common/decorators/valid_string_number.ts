import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import {
  ApiProperty,
  ApiPropertyOptions,
} from '@nestjs/swagger/dist/decorators';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  ValidationOptions,
} from 'class-validator';
type Option = {
  apiPropertyOptions?: ApiPropertyOptions;
  isNumericOptions?: validator.IsNumericOptions;
  validationOptions?: ValidationOptions;
};
export const IsValidStringNumberApi = (option?: Option) => {
  return applyDecorators(
    ApiProperty({ ...option?.apiPropertyOptions }),
    IsNumberString({}),
  );
};

export const IsValidStringNumberOptionalApi = (option?: Option) => {
  return applyDecorators(
    IsValidStringNumberApi(option),
    IsOptional(option?.validationOptions),
  );
};

export const IsValidStringNumberRequiredApi = (option?: Option) => {
  return applyDecorators(
    IsValidStringNumberApi(option),
    IsNotEmpty(option?.validationOptions),
  );
};
