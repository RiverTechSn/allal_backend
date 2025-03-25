import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions/exception-filter.interface';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
