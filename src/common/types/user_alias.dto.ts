import {UserAlias } from '@prisma/client';
import { IsValidNumberOptionnalApi } from '../decorators/valid_number';
import { IsValidBooleanOptionalApi } from '../decorators/valid_boolean';
import { IsValidDateOptionalApi } from '../decorators/valid_date';
import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';
import { IsValidPhoneApi } from '../decorators/valid_phone';
import {
  IsValidStringApi,
  IsValidStringOptionalApi,
} from '../decorators/valid_string';
import { PaginationQueryDto } from './paginagation_query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto, ResponseDto } from './pagination_response.dto';

export class UserAliasBaseDto implements UserAlias {
  @IsValidNumberOptionnalApi()
  shopWalletBaseId: number;
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
  userId: number;
  @IsValidNumberOptionnalApi()
  byId: number;
  @IsValidNumberOptionnalApi()
  shopId: number;
}

export class UserAliasResponseDto extends ResponseDto {
  @ApiProperty({ type: UserAliasBaseDto })
  result: UserAliasBaseDto;
}
export class UserAliasPaginationResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: [UserAliasBaseDto] })
  result: [UserAliasBaseDto];
}
export class UserAliasCreateDto extends OmitType(UserAliasBaseDto, [
  'id',
  'createdAt',
  'updatedAt',
  'shopId',
  'userId',
  'byId',
  'shopWalletBaseId',
] as const) {
  @IsValidPhoneApi()
  phone: string;
  @IsValidStringApi()
  displayname: string;
}

export class UserAliasQuery
  extends PaginationQueryDto
  implements Partial<UserAliasCreateDto>
{
  @IsValidStringOptionalApi()
  phone?: string;
  isActive: boolean;
  @IsValidStringOptionalApi()
  displayname?: string;
}
