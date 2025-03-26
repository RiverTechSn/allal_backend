import { UserCreateDto } from 'src/common/types/user.dto';
import { CryptoService } from 'src/modules/database/crypto_service';
import { DatabaseService } from 'src/modules/database/database.service';
import { EmailerService } from 'src/modules/mailer/mailer.service';
export declare const createFactory: ({ db, crypto, mailer, body }: {
    db: DatabaseService;
    crypto: CryptoService;
    mailer: EmailerService;
    body: UserCreateDto;
}) => Promise<{
    login: {
        id: number;
        type: import(".prisma/client").$Enums.LoginEnum;
        username: string;
        password: string;
        isActive: boolean;
        isBlocked: boolean;
        roleId: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    };
} & {
    id: number;
    loginId: number | null;
    walletBaseId: number;
    displayname: string;
    email: string | null;
    address: string;
    phone: string;
    dateOfBirth: Date | null;
    laltitude: import("@prisma/client/runtime/library").Decimal | null;
    longitude: import("@prisma/client/runtime/library").Decimal | null;
}>;
