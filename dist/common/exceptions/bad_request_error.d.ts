import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';
export declare const badRequestExceptionCatch: (errors: ValidationError[]) => BadRequestException;
