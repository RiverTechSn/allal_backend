import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ValidationOptions } from 'class-validator';
type Option = {
    apiPropertyOptions?: ApiPropertyOptions;
    validationOptions?: ValidationOptions;
};
export declare const IsValidBooleanApi: (option?: Option) => any;
export declare const IsValidBooleanOptionalApi: (option?: Option) => any;
export {};
