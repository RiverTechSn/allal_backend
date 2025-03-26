import { ValidationOptions } from "class-validator";
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators';
type Option = {
    apiPropertyOptions?: ApiPropertyOptions;
    emailOptions?: validator.IsEmailOptions;
    validationOptions?: ValidationOptions;
};
export declare const IsValidEmailApi: (option?: Option) => any;
export declare const IsValidEmailOptionalApi: (option?: Option) => any;
export {};
