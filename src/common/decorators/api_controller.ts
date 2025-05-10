import { UseGuards } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const ApiController = (tag: string) => {
  return applyDecorators(
    Controller(tag.toLocaleLowerCase()),
    ApiTags(tag.toUpperCase()),
  );
};
