import { ApiProperty } from '@nestjs/swagger';
import { IsAllowApi } from '../decorators/allow';
import { WsMessageDto } from '../decorators/response.decorator';
import { IsValidNumberApi } from '../decorators/valid_number';
export class ResponseDto {
  @ApiProperty({ example: 200 })
  status: number;
  @ApiProperty({ example: 'SUCCEEDED' })
  code: string;
}
export class PaginationResponseDto extends ResponseDto {
  @IsValidNumberApi()
  totalPage: number;
}
