import { $Enums, User } from '@prisma/client';
import { IsValidStringApi } from '../decorators/valid_string';
import { IsValidEnumApi } from '../decorators/valid_enum';
import { IsValidBooleanOptionalApi } from '../decorators/valid_boolean';
import { IsValidStringNumberOptionalApi } from '../decorators/valid_string_number';
import { AddIdDto } from './id_param';
import { Optional } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';
import { UserBase } from './user.dto';

export class LoginDto {
  @IsValidStringApi()
  username: string;
  @IsValidStringApi()
  password: string;
  @IsValidEnumApi<$Enums.USER_TYPE>(Object.values($Enums.USER_TYPE))
  type?: $Enums.USER_TYPE;
}
export class PasswordEditDto extends OmitType(LoginDto, [
 'username',
  'type',
] as const) {
   @IsValidStringApi()
  oldPassword: string;
}
export class LoginUpdateDto extends OmitType(LoginDto, [
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

export type CurrentUserDto = AddIdDto & LoginDto & UserBase;
