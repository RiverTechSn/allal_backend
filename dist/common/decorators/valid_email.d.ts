import { ValidationOptions } from "class-validator";
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators';
type Option = {
    apiPropertyOptions?: ApiPropertyOptions;
    emailOptions?: validator.IsEmailOptions;
    validationOptions?: ValidationOptions;
};
export declare const IsValidEmailApi: (option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const IsValidEmailOptionalApi: (option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
