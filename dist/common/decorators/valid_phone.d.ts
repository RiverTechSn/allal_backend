import { ValidationOptions } from "class-validator";
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators';
import { CountryCode } from "libphonenumber-js/types.cjs";
type Option = {
    apiPropertyOptions?: ApiPropertyOptions;
    region?: CountryCode;
    validationOptions?: ValidationOptions;
};
export declare const IsValidPhoneApi: (option?: Option) => any;
export declare const IsValidPhoneOptionalApi: (option?: Option) => any;
export {};
