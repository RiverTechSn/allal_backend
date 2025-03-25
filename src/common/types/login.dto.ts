import { $Enums, Login } from "@prisma/client";
import { IsValidStringApi } from "../decorators/valid_string";
import { IsValidEnumApi } from "../decorators/valid_enum";
import { IsValidBooleanOptionalApi } from "../decorators/valid_boolean";
import { IsValidStringNumberOptionalApi } from "../decorators/valid_string_number";
import { AddIdDto } from "./id_param";


export class LoginDto {

  @IsValidStringApi()
  username: string;
  @IsValidStringApi()
  password: string;
  @IsValidEnumApi<$Enums.LoginEnum>(Object.values($Enums.LoginEnum))
  type?: $Enums.LoginEnum;
}
export class LoginUpdateDto implements Partial<Login> {
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
