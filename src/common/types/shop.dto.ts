import { Shop } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { IsDecimalApi } from '../decorators/valid_number';

export class ShopBaseDto implements Shop {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  
  entityBaseId: number;
  @IsDecimalApi()
  laltitude: Decimal;
  @IsDecimalApi()
  longitude: Decimal;
  byId: number;
}
