import { IsDecimal } from 'class-validator';
import { IsDecimalApi, IsValidNumberApi } from '../decorators/valid_number';
import { IsValidStringOptionalApi } from '../decorators/valid_string';
import { Decimal } from '@prisma/client/runtime/library';
import { IsValidEnumApi } from '../decorators/valid_enum';

export class ShopWalletCreateDto {
  @IsValidNumberApi()
  userAliasId: number;
  @IsDecimalApi()
  amount: Decimal;
  @IsValidStringOptionalApi()
  comment: string;
  @IsValidEnumApi(['CREDIT', 'DEBIT'])
  type: 'CREDIT'|"DEBIT";
}
