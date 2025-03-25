import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
export type ValidationOption = {
    apiPropertyOptions?: ApiPropertyOptions;
    validationOptions?: ValidationOptions;
};
export declare const getOptionalOption: (option?: ValidationOption) => ValidationOption;
