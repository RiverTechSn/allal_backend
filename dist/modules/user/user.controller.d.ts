import { UserService } from './user.service';
import { UserQueryDto } from 'src/common/types/paginagation_query.dto';
import { UserCreateDto, UserShopCreateDto, UserUpdateDto } from 'src/common/types/user.dto';
export declare class UserController {
    private readonly userServide;
    constructor(userServide: UserService);
    getAll(query: UserQueryDto): Promise<import("../../cores/base_response").BaseResponse<({
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
        walletBaseId: number;
    })[]>>;
    getById(id: number): Promise<import("../../cores/base_response").BaseResponse<{
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
        walletBaseId: number;
    }>>;
    create(body: UserCreateDto): Promise<never>;
    createWithShop(body: UserShopCreateDto): Promise<void>;
    updateById(id: number, body: UserUpdateDto): Promise<never>;
}
