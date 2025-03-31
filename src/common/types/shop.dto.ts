import { Shop } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { IsDecimalApi, IsValidNumberApi } from '../decorators/valid_number';
import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';
import {
  IsValidStringApi,
  IsValidStringOptionalApi,
} from '../decorators/valid_string';
import { IsValidDateApi } from '../decorators/valid_date';
import { PaginationResponseDto, ResponseDto } from './pagination_response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from './paginagation_query.dto';

export class ShopBaseDto implements Shop {
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
