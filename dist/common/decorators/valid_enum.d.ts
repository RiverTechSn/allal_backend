import { ApiPropertyOptions } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";
interface Option {
    apiPropertyOptions?: ApiPropertyOptions;
    validationOptions?: ValidationOptions;
}
export declare const IsValidEnumApi: <T extends string>(values: readonly T[], option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const IsValidEnumOptionalApi: <T extends string>(values: readonly T[], option?: Option) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
