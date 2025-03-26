import { ConfigService } from '@nestjs/config';
import { CryptoService } from 'src/modules/database/crypto_service';
import { DatabaseService } from 'src/modules/database/database.service';
export declare const createAdminFactory: (db: DatabaseService, config: ConfigService, crypto: CryptoService) => any;
