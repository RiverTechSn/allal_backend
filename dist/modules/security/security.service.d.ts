import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CryptoService } from '../database/crypto_service';
import { BaseResponse } from 'src/cores/base_response';
import { LoginDto } from 'src/common/types/login.dto';
export declare class SecurityService {
    private readonly db;
    private readonly crypto;
    private readonly jwtService;
    constructor(db: DatabaseService, crypto: CryptoService, jwtService: JwtService);
    profile(body: any): BaseResponse<any>;
    sigin(body: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
