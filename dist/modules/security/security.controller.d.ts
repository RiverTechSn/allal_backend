import { SecurityService } from './security.service';
import { Response } from 'express';
import { LoginDto } from 'src/common/types/login.dto';
export declare class SecurityController {
    private readonly service;
    constructor(service: SecurityService);
    signup(body: LoginDto, res: Response): any;
    resetPassword(): void;
    definePassword(): void;
    forgetPassword(): void;
    profile(user: any): import("../../cores/base_response").BaseResponse<any>;
}
