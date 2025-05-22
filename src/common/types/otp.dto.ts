import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';
import { $Enums, Otp, USER_TYPE } from '@prisma/client';
import { IsValidPhoneApi } from '../decorators/valid_phone';
import { IsValidStringApi } from '../decorators/valid_string';
import { IsValidStringNumberApi } from '../decorators/valid_string_number';
import { IsValidEnumApi } from '../decorators/valid_enum';

export class OtpBaseDto implements Otp {
  type: $Enums.USER_TYPE;
  status: $Enums.OptStatusEnum;
  id: number;
  to: string;
  code: string;
  duration: $Enums.OptDurationEnum;
  via: $Enums.OptViaEnum;
  createdAt: Date;
  updatedAt: Date;
  loginId: number | null;
}

export class OtpCreateDto extends OmitType(OtpBaseDto, [
  'id',
  'createdAt',
  'updatedAt','status',
] as const) {}
export class CreateOtpWithCheckDto {
  @IsValidPhoneApi()
  to: string;
  @IsValidEnumApi(Object.values(USER_TYPE))
  type:USER_TYPE
}
export class VerifyOtpDto {
  @IsValidStringApi()
  to: string;
  @IsValidStringNumberApi()
  code: string;
  @IsValidEnumApi(Object.values(USER_TYPE))
  type:USER_TYPE
}
