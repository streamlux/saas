import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    imports: [],
    exports: [UserService],
    controllers: [UsersController],
    providers: [UserService, PrismaService],
})
export class UsersModule {}
