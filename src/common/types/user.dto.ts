import { $Enums, User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsValidStringApi,
  IsValidStringOptionalApi,
} from '../decorators/valid_string';
import { IsValidDateOptionalApi } from '../decorators/valid_date';
import {
  IsDecimalApi,
  IsValidNumberApi,
  IsValidNumberOptionnalApi,
} from '../decorators/valid_number';
import {
  IsValidPhoneApi,
  IsValidPhoneOptionalApi,
} from '../decorators/valid_phone';
import { IsAllowOptionalApi } from '../decorators/allow';
import { LoginUpdateDto } from './login.dto';
import { PartialType } from '@nestjs/swagger/dist/type-helpers/partial-type.helper';
import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';
import { ShopCreateDto } from './shop.dto';
import { PaginationResponseDto } from './pagination_response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidBooleanOptionalApi } from '../decorators/valid_boolean';
import { IsValidStringNumberOptionalApi } from '../decorators/valid_string_number';
import { IsValidEmailApi } from '../decorators/valid_email';
import { IsValidEnumApi } from '../decorators/valid_enum';

export class UserBase implements User {
  @IsValidEnumApi(Object.keys($Enums.USER_TYPE))
  type: $Enums.USER_TYPE;
  @IsValidStringOptionalApi()
  password: string;
  @IsValidNumberOptionnalApi()
  id: number;
  @IsValidNumberOptionnalApi()
  walletBaseId: number;
  @IsValidStringOptionalApi()
  address: string;
  @IsDecimalApi()
  laltitude: Decimal;
  @IsDecimalApi()
  longitude: Decimal;
  @IsValidStringApi()
  displayname: string;
  @IsValidEmailApi()
  email: string;
  @IsValidPhoneApi()
  phone: string;
  @IsValidDateOptionalApi()
  dateOfBirth: Date;
  @IsValidBooleanOptionalApi()
  isActive: boolean;
  @IsValidBooleanOptionalApi()
  isBlocked: boolean;
  @IsValidBooleanOptionalApi()
  isArchived: boolean;
  @IsValidNumberApi({ apiPropertyOptions: { type: 'number' } })
  shopId: number | undefined;
  @IsValidNumberApi()
  roleId: number;
  // type: $Enums.USER_TYPE;
  // password: string;
  // @IsValidNumberApi()
  // id: number;
  // @IsValidNumberApi()
  // walletBaseId: number;
  // @IsValidNumberApi()
  // loginId: number;
  // @IsValidStringApi()
  // displayname: string;
  // @IsValidStringApi()
  // email: string;
  // @IsValidStringOptionalApi()
  // address: string;
  // @IsValidPhoneOptionalApi()
  // phone: string;
  // @IsValidDateOptionalApi()
  // dateOfBirth: Date;
  // @IsValidNumberOptionnalApi({ apiPropertyOptions: { type: Number } })
  // laltitude: Decimal;
  // @IsValidNumberOptionnalApi({ apiPropertyOptions: { type: Number } })
  // longitude: Decimal;
  // @IsValidNumberOptionnalApi()
  // shopId: number;
  // @IsValidBooleanOptionalApi()
  // isActive?: boolean;
  // @IsValidBooleanOptionalApi()
  // isArchived?: boolean;
  // @IsValidBooleanOptionalApi()
  // isBlocked?: boolean;
  // @IsValidStringNumberOptionalApi()
  // roleId?: number;
}
export class UserPaginationResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: [UserBase] })
  result: [UserBase];
}
export class UserResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: UserBase })
  result: UserBase;
}
export class UserCreateDto extends OmitType(UserBase, [
  'id',
  'walletBaseId',
] as const) {
  @IsValidStringApi({ validationOptions: {} })
  password: string;
}
export class UserShopCreateDto extends OmitType(UserCreateDto, ['shopId']) {
  @IsAllowOptionalApi()
  shop: ShopCreateDto;
}
export class UserUpdateDto extends PartialType(
  OmitType(UserBase, ['id', 'walletBaseId'] as const),
) {
  @IsValidStringOptionalApi()
  displayname: string;
  @IsValidPhoneOptionalApi()
  phone: string;
  @IsValidStringOptionalApi()
  address: string;
  @IsValidNumberOptionnalApi()
  shopId: number;
  @IsValidNumberOptionnalApi()
  roleId: number;
}
