import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';

export const badRequestExceptionCatch = (errors: ValidationError[]) => {
  const messages = [];
  errors.forEach((error) =>
    Object.entries(error.constraints).forEach((value) => {
      messages.push(`${error.property} : ${value[1]}`);
    }),
  );

  return new BadRequestException({
    messages,
    code: 'BAD_REQUEST',
    status: 400,
  });
};
