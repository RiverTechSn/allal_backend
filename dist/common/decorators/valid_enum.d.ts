import { ApiPropertyOptions } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";
interface Option {
    apiPropertyOptions?: ApiPropertyOptions;
    validationOptions?: ValidationOptions;
}
export declare const IsValidEnumApi: <T extends string>(values: readonly T[], option?: Option) => any;
export declare const IsValidEnumOptionalApi: <T extends string>(values: readonly T[], option?: Option) => any;
export {};
