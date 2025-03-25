import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumberString } from 'class-validator';

export class ParamIdDto {
  @Allow() @ApiProperty() @IsNumberString() id: number;
}

export class QuerySearchDto {
  @Allow() @ApiProperty() @IsNumberString() search: string;
}


export class AddIdDto{
id:number
}
