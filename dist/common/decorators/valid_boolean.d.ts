import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ValidationOptions } from 'class-validator';
type Option = {
    apiPropertyOptions?: ApiPropertyOptions;
    validationOptions?: ValidationOptions;
};
export declare const IsValidBooleanApi: (option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const IsValidBooleanOptionalApi: (option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
