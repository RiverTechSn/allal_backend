import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { OnModuleDestroy } from '@nestjs/common/interfaces/hooks/on-destroy.interface';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks/on-init.interface';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
