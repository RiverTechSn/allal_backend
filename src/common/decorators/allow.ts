import { Optional } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export const IsAllowApi = () => {
  return applyDecorators(Allow(), ApiProperty());
};
export const IsAllowOptionalApi = () => {
  return applyDecorators(Allow(), ApiProperty(), Optional());
};
