import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { badRequestExceptionCatch } from 'src/common/exceptions/bad_request_error';


export const validationConfig = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: badRequestExceptionCatch,
});
