import { UserCreateDto } from 'src/common/types/user.dto';
import { CryptoService } from 'src/modules/database/crypto_service';
import { DatabaseService } from 'src/modules/database/database.service';
import { EmailerService } from 'src/modules/mailer/mailer.service';
export declare const createFactory: ({ db, crypto, mailer, body }: {
    db: DatabaseService;
    crypto: CryptoService;
    mailer: EmailerService;
    body: UserCreateDto;
}) => any;
