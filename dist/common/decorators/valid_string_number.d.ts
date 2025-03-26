import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators';
import { ValidationOptions } from 'class-validator';
type Option = {
    apiPropertyOptions?: ApiPropertyOptions;
    isNumericOptions?: validator.IsNumericOptions;
    validationOptions?: ValidationOptions;
};
export declare const IsValidStringNumberApi: (option?: Option) => any;
export declare const IsValidStringNumberOptionalApi: (option?: Option) => any;
export declare const IsValidStringNumberRequiredApi: (option?: Option) => any;
export {};
