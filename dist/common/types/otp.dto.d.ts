import { $Enums, Otp } from '@prisma/client';
export declare class OtpBaseDto implements Otp {
    id: number;
    to: string;
    code: string;
    duration: $Enums.OptDurationEnum;
    via: $Enums.OptViaEnum;
    createdAt: Date;
    updatedAt: Date;
    loginId: number;
}
declare const OtpCreateDto_base: import("@nestjs/common").Type<Omit<OtpBaseDto, "id" | "createdAt" | "updatedAt">>;
export declare class OtpCreateDto extends OtpCreateDto_base {
}
export {};
