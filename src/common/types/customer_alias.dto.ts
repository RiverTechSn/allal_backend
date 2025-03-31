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
import { PaginationQueryDto } from './paginagation_query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from './pagination_response.dto';

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

export class CustomerAliasResponseDto extends ResponseDto {
  @ApiProperty({ type: CustomerAliasBaseDto })
  result: CustomerAliasBaseDto;
}
export class CustomerAliasPaginationResponseDto extends PaginationQueryDto {
  @ApiProperty({ type: [CustomerAliasBaseDto] })
  result: [CustomerAliasBaseDto];
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

export class CustomerAliasQuery
  extends PaginationQueryDto
  implements Partial<CustomerAliasCreateDto>
{
  @IsValidStringOptionalApi()
  phone?: string;
  isActive: boolean;
  @IsValidStringOptionalApi()
  displayname?: string;
}
