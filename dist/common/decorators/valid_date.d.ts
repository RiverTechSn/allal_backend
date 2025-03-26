import { ValidationOptions } from "class-validator";
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators';
type Option = {
    apiPropertyOptions?: ApiPropertyOptions;
    dateOptions?: validator.IsISO8601Options;
    validationOptions?: ValidationOptions;
};
export declare const IsValidDateApi: (option?: Option) => any;
export declare const IsValidDateOptionalApi: (option?: Option) => any;
export {};
