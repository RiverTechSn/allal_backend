import { OtpCreateDto } from 'src/common/types/otp.dto';
import { DatabaseService } from '../database/database.service';
export declare class OtpService {
    private readonly db;
    constructor(db: DatabaseService);
    create(body: OtpCreateDto): void;
}
