import { DatabaseService } from '../database/database.service';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks';
import { ConfigService } from '@nestjs/config';
import { EmailerService } from '../mailer/mailer.service';
import { CryptoService } from '../database/crypto_service';
import { BaseResponse } from 'src/cores/base_response';
import { UserCreateDto, UserShopCreateDto, UserUpdateDto } from 'src/common/types/user.dto';
import { UserQueryDto } from 'src/common/types/paginagation_query.dto';
import { OtpService } from '../otp/otp.service';
export declare class UserService implements OnModuleInit {
    private readonly db;
    private readonly crypto;
    private readonly config;
    private readonly mailer;
    private readonly otp;
    constructor(db: DatabaseService, crypto: CryptoService, config: ConfigService, mailer: EmailerService, otp: OtpService);
    onModuleInit(): void;
    create(body: UserCreateDto): Promise<never>;
    updateById({ body, id }: {
        body: UserUpdateDto;
        id: number;
    }): Promise<never>;
    getById(id: number): Promise<BaseResponse<{
        login: {
            id: number;
            type: import(".prisma/client").$Enums.LoginEnum;
            isActive: boolean;
            isBlocked: boolean;
            createdAt: Date | null;
            updatedAt: Date | null;
            roleId: number | null;
        };
    } & {
        id: number;
        loginId: number | null;
        displayname: string;
        email: string | null;
        address: string;
        phone: string;
        dateOfBirth: Date | null;
        laltitude: import("@prisma/client/runtime/library").Decimal | null;
        longitude: import("@prisma/client/runtime/library").Decimal | null;
    }>>;
    createUserWithShop({ body }: {
        body: UserShopCreateDto;
    }): void;
    getAll({ query }: {
        query: UserQueryDto;
    }): Promise<BaseResponse<({
        login: {
            role: {
                id: number;
                isActive: boolean;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                comment: string | null;
                byId: number | null;
            };
        } & {
            id: number;
            type: import(".prisma/client").$Enums.LoginEnum;
            isActive: boolean;
            isBlocked: boolean;
            createdAt: Date | null;
            updatedAt: Date | null;
            roleId: number | null;
        };
    } & {
        id: number;
        loginId: number | null;
        displayname: string;
        email: string | null;
        address: string;
        phone: string;
        dateOfBirth: Date | null;
        laltitude: import("@prisma/client/runtime/library").Decimal | null;
        longitude: import("@prisma/client/runtime/library").Decimal | null;
    })[]>>;
}
