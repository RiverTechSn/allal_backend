import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators';
import { ValidationOptions } from 'class-validator';
type Option = {
    apiPropertyOptions?: ApiPropertyOptions;
    isNumericOptions?: validator.IsNumericOptions;
    validationOptions?: ValidationOptions;
};
export declare const IsValidStringNumberApi: (option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const IsValidStringNumberOptionalApi: (option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const IsValidStringNumberRequiredApi: (option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
