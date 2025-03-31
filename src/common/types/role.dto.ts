import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { PaginationResponseDto } from './pagination_response.dto';

export class RoleBaseDto implements Role {
  @ApiProperty()
  id: number;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty()
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
export class RolePaginationResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: [RoleBaseDto] })
  result: RoleBaseDto[];
}
