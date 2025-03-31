import { CustomerAlias } from '@prisma/client';
import { IsValidNumberOptionnalApi } from '../decorators/valid_number';
import { IsValidBooleanOptionalApi } from '../decorators/valid_boolean';
import { IsValidDateOptionalApi } from '../decorators/valid_date';
import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';
import { IsValidPhoneApi } from '../decorators/valid_phone';
import {
  IsValidStringApi,
  IsValidStringOptionalApi,
} from '../decorators/valid_string';

export class CustomerAliasBaseDto implements CustomerAlias {
  @IsValidNumberOptionnalApi()
  id: number;
  @IsValidBooleanOptionalApi()
  isActive: boolean;
  @IsValidDateOptionalApi()
  createdAt: Date;
  @IsValidDateOptionalApi()
  updatedAt: Date;
  @IsValidStringApi()
  displayname: string;
  @IsValidNumberOptionnalApi()
  customerId: number;
  @IsValidNumberOptionnalApi()
  byId: number;
  @IsValidNumberOptionnalApi()
  shopId: number;
}
export class CustomerAliasCreateDto extends OmitType(CustomerAliasBaseDto, [
  'id',
  'createdAt',
  'updatedAt',
  'shopId',
  'customerId',
  'byId',
] as const) {
  @IsValidPhoneApi()
  phone: string;
  @IsValidStringApi()
  displayname: string;
}
