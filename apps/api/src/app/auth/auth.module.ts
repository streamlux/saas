import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TwitchStrategy } from './strategies/twitch.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [UsersModule, HttpModule],
    controllers: [AuthController],
    providers: [AuthService, TwitchStrategy, JwtStrategy],
})
export class AuthModule {}
