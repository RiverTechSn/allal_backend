import { Shop } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
export declare class ShopBaseDto implements Shop {
    name: string;
    address: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    walletBaseId: number;
    laltitude: Decimal;
    longitude: Decimal;
    byId: number;
}
declare const ShopCreateDto_base: import("@nestjs/common").Type<Omit<ShopBaseDto, "id" | "createdAt" | "updatedAt" | "walletBaseId" | "byId">>;
export declare class ShopCreateDto extends ShopCreateDto_base {
}
export {};
