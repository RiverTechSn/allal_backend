import { DatabaseService } from '../database/database.service';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks';
import { ConfigService } from '@nestjs/config';
import { EmailerService } from '../mailer/mailer.service';
import { CryptoService } from '../database/crypto_service';
import { UserCreateDto, UserShopCreateDto, UserUpdateDto } from 'src/common/types/user.dto';
import { UserQueryDto } from 'src/common/types/paginagation_query.dto';
export declare class UserService implements OnModuleInit {
    private readonly db;
    private readonly crypto;
    private readonly config;
    private readonly mailer;
    constructor(db: DatabaseService, crypto: CryptoService, config: ConfigService, mailer: EmailerService);
    onModuleInit(): void;
    create(body: UserCreateDto): any;
    updateById({ body, id }: {
        body: UserUpdateDto;
        id: number;
    }): any;
    getById(id: number): any;
    createUserWithShop({ body }: {
        body: UserShopCreateDto;
    }): any;
    getAll({ query }: {
        query: UserQueryDto;
    }): any;
}
