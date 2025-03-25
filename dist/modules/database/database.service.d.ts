import { OnModuleDestroy } from '@nestjs/common/interfaces/hooks/on-destroy.interface';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks/on-init.interface';
import { PrismaClient } from '@prisma/client';
export declare class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
