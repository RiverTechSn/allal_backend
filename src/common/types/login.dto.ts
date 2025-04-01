import { $Enums, Customer, Login, User } from '@prisma/client';
import { IsValidStringApi } from '../decorators/valid_string';
import { IsValidEnumApi } from '../decorators/valid_enum';
import { IsValidBooleanOptionalApi } from '../decorators/valid_boolean';
import { IsValidStringNumberOptionalApi } from '../decorators/valid_string_number';
import { AddIdDto } from './id_param';
import { Optional } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';

export class LoginDto {
  @IsValidStringApi()
  username: string;
  @IsValidStringApi()
  password: string;
  user: User;
  customer: Customer;
  @IsValidEnumApi<$Enums.LoginEnum>(Object.values($Enums.LoginEnum))
  type?: $Enums.LoginEnum;
}
export class LoginUpdateDto extends OmitType(LoginDto, [
  'user',
  'customer',
  'password',
  'type',
] as const) {
  @IsValidBooleanOptionalApi()
  isActive?: boolean;
  @IsValidBooleanOptionalApi()
  isArchived?: boolean;
  @IsValidBooleanOptionalApi()
  isBlocked?: boolean;
  @IsValidStringNumberOptionalApi()
  roleId?: number;
}

export type CurrentUserDto = AddIdDto & LoginDto;
