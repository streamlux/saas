import { Prisma, User } from '@prisma/client';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../users/user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
        return this.userService.createUser(userData);
    }

    @Get('/:id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.user({
            id: +id,
        });
    }
}
