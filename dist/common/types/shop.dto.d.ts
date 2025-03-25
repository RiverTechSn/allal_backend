import { Shop } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
export declare class ShopBaseDto implements Shop {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    entityBaseId: number;
    laltitude: Decimal;
    longitude: Decimal;
    byId: number;
}
