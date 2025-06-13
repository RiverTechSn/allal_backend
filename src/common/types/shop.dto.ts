import { $Enums, Shop } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsDecimalApi,
  IsValidNumberApi,
  IsValidNumberOptionnalApi,
} from '../decorators/valid_number';
import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';
import {
  IsValidStringApi,
  IsValidStringOptionalApi,
} from '../decorators/valid_string';
import { IsValidDateApi } from '../decorators/valid_date';
import { PaginationResponseDto, ResponseDto } from './pagination_response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from './paginagation_query.dto';
import { IsValidEnumApi } from '../decorators/valid_enum';

export class ShopBaseDto implements Shop {
  @IsValidEnumApi(Object.values($Enums.CURRENCY_ENUM))
  currency: $Enums.CURRENCY_ENUM;
  @IsValidNumberOptionnalApi()
  shopWalletBaseId: number;
  @IsValidStringApi()
  name: string;
  @IsValidStringApi()
  address: string;
  @IsValidNumberApi()
  id: number;
  @IsValidDateApi()
  createdAt: Date;
  @IsValidDateApi()
  updatedAt: Date;
  @IsValidNumberApi()
  walletBaseId: number;
  @IsDecimalApi()
  laltitude: Decimal;
  @IsDecimalApi()
  longitude: Decimal;
  @IsValidNumberApi()
  byId: number;
}

export class ShopCreateDto extends OmitType(ShopBaseDto, [
  'id',
  'createdAt',
  'updatedAt',
  'walletBaseId',
  'byId',
  'shopWalletBaseId',
] as const) {}
export class ShopEditDto extends ShopCreateDto {
  @IsValidStringOptionalApi()
  name: string;
}
export class ShopPaginationResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: [ShopBaseDto] })
  result: [ShopBaseDto];
}
export class ShopResponseDto extends ResponseDto {
  @ApiProperty({ type: ShopBaseDto })
  result: ShopBaseDto;
}

export class ShopQueryDto extends PaginationQueryDto {
  @IsValidStringOptionalApi()
  name: string;
  @IsValidStringOptionalApi()
  address: string;
}
