import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { PaginationResponseDto, ResponseDto } from './pagination_response.dto';
import {
  IsValidStringApi,
  IsValidStringOptionalApi,
} from '../decorators/valid_string';
import { IsValidBooleanOptionalApi } from '../decorators/valid_boolean';

export class RoleBaseDto implements Role {
  @ApiProperty()
  id: number;
  @IsValidBooleanOptionalApi()
  isActive: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @IsValidStringApi()
  name: string;
  @IsValidStringOptionalApi()
  comment: string;
  @ApiProperty()
  byId: number;
}
export class RoleCreateDto extends OmitType(RoleBaseDto, [
  'id',
  'createdAt',
  'updatedAt',
  'byId',
] as const) {}

export class RoleEditDto extends PartialType(RoleCreateDto) {
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  comment?: string;
}
export class RolePaginationResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: [RoleBaseDto] })
  result: RoleBaseDto[];
}
export class RoleResponseDto extends ResponseDto {
  @ApiProperty({ type: RoleBaseDto })
  result: RoleBaseDto;
}
