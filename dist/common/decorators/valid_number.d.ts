import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNumberOptions } from 'class-validator';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';
type Option = {
    apiPropertyOptions?: ApiPropertyOptions;
    isNumberOptions?: IsNumberOptions;
    validationOptions?: ValidationOptions;
};
export declare const IsValidNumberApi: (option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const IsValidNumberOptionnalApi: (option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const IsDecimalApi: () => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const IsValidNumberOptionnalArrayApi: (option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
