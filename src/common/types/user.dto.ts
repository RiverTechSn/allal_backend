import { User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsValidStringApi,
  IsValidStringOptionalApi,
} from '../decorators/valid_string';
import { IsValidDateOptionalApi } from '../decorators/valid_date';
import {
  IsValidNumberApi,
  IsValidNumberOptionnalApi,
} from '../decorators/valid_number';
import { IsValidPhoneOptionalApi } from '../decorators/valid_phone';
import { IsAllowOptionalApi } from '../decorators/allow';
import { LoginUpdateDto } from './login.dto';
import { PartialType } from '@nestjs/swagger/dist/type-helpers/partial-type.helper';
import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';
import {  ShopCreateDto } from './shop.dto';
import { PaginationResponseDto } from './pagination_response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserBase implements User {
  @IsValidNumberApi()
  id: number;
  @IsValidNumberApi()
  walletBaseId: number;
  @IsValidNumberApi()
  loginId: number;
  @IsValidStringApi()
  displayname: string;
  @IsValidStringApi()
  email: string;
  @IsValidStringOptionalApi()
  address: string;
  @IsValidPhoneOptionalApi()
  phone: string;
  @IsValidDateOptionalApi()
  dateOfBirth: Date;
  @IsValidNumberOptionnalApi({ apiPropertyOptions: { type: Number } })
  laltitude: Decimal;
  @IsValidNumberOptionnalApi({ apiPropertyOptions: { type: Number } })
  longitude: Decimal;
  @IsValidNumberOptionnalApi()
  shopId: number;
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
  'loginId',
  'walletBaseId',
] as const) {
  @IsValidStringApi({ validationOptions: {} })
  password: string;
  @IsAllowOptionalApi()
  login?: LoginUpdateDto;
}
export class UserShopCreateDto extends UserCreateDto {
  @IsAllowOptionalApi()
  shop: ShopCreateDto;
}
export class UserUpdateDto extends PartialType(
  OmitType(UserBase, ['id', 'loginId', 'walletBaseId'] as const),
) {
  @IsValidStringOptionalApi()
  displayname: string;
  @IsValidPhoneOptionalApi()
  phone: string;
  @IsValidStringOptionalApi()
  address: string;
  @IsAllowOptionalApi()
  login?: LoginUpdateDto;
  @IsValidNumberOptionnalApi()
  shopId?: number;
}
