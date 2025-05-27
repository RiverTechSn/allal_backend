import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Module } from '@prisma/client';
import { PaginationResponseDto, ResponseDto } from './pagination_response.dto';
import {
  IsValidStringApi,
  IsValidStringOptionalApi,
} from '../decorators/valid_string';
import { IsValidBooleanOptionalApi } from '../decorators/valid_boolean';


export class ModuleBaseDto implements Module {
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
export class ModuleCreateDto extends OmitType(ModuleBaseDto, [
  'id',
  'createdAt',
  'updatedAt',
  'byId',
] as const) {}

export class ModuleEditDto extends PartialType(ModuleCreateDto) {
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  comment?: string;
}
export class ModulePaginationResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: [ModuleBaseDto] })
  result: ModuleBaseDto[];
}
export class ModuleResponseDto extends ResponseDto {
  @ApiProperty({ type: ModuleBaseDto })
  result: ModuleBaseDto;
}
