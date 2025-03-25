export declare const IS_PUBLIC_KEY = "isPublic";
export declare const IsPublic: () => import("@nestjs/common/decorators/core/set-metadata.decorator").CustomDecorator<string>;
export declare const ApiNoAuth: () => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
