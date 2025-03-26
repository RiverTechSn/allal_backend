import { ConfigService } from '@nestjs/config';
import { CryptoService } from 'src/modules/database/crypto_service';
import { DatabaseService } from 'src/modules/database/database.service';
export declare const createAdminFactory: (db: DatabaseService, config: ConfigService, crypto: CryptoService) => Promise<{
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
}>;
