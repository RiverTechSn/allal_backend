import { User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { LoginUpdateDto } from './login.dto';
import { ShopCreateDto } from './shop.dto';
export declare class UserBase implements User {
    walletBaseId: number;
    id: number;
    loginId: number;
    displayname: string;
    email: string;
    address: string;
    phone: string;
    dateOfBirth: Date;
    laltitude: Decimal;
    longitude: Decimal;
}
declare const UserCreateDto_base: import("@nestjs/common").Type<Omit<UserBase, "id" | "loginId" | "walletBaseId">>;
export declare class UserCreateDto extends UserCreateDto_base {
    password: string;
    login?: LoginUpdateDto;
}
export declare class UserShopCreateDto extends UserCreateDto {
    shop: ShopCreateDto;
}
declare const UserUpdateDto_base: import("@nestjs/common").Type<Partial<Omit<UserBase, "id" | "loginId" | "walletBaseId">>>;
export declare class UserUpdateDto extends UserUpdateDto_base {
    displayname: string;
    phone: string;
    address: string;
    login?: LoginUpdateDto;
}
export {};
