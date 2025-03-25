import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';
import { $Enums, Otp } from '@prisma/client';

export class OtpBaseDto implements Otp {
  id: number;
  to: string;
  code: string;
  duration: $Enums.OptDurationEnum;
  via: $Enums.OptViaEnum;
  createdAt: Date;
  updatedAt: Date;
  loginId: number;
}

export class OtpCreateDto extends OmitType(OtpBaseDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
