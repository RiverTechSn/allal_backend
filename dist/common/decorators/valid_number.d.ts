import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNumberOptions } from 'class-validator';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
type Option = {
    apiPropertyOptions?: ApiPropertyOptions;
    isNumberOptions?: IsNumberOptions;
    validationOptions?: ValidationOptions;
};
export declare const IsValidNumberApi: (option?: Option) => any;
export declare const IsValidNumberOptionnalApi: (option?: Option) => any;
export declare const IsDecimalApi: () => any;
export declare const IsValidNumberOptionnalArrayApi: (option?: Option) => any;
export {};
