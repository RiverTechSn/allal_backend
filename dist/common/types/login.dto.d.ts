import { $Enums, Login } from "@prisma/client";
import { AddIdDto } from "./id_param";
export declare class LoginDto {
    username: string;
    password: string;
    type?: $Enums.LoginEnum;
}
export declare class LoginUpdateDto implements Partial<Login> {
    isActive?: boolean;
    isArchived?: boolean;
    isBlocked?: boolean;
    roleId?: number;
}
export type CurrentUserDto = AddIdDto & LoginDto;
