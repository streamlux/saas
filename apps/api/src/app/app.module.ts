import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitchEventSubModule } from '@streamlux-saas/twitch-eventsub';

@Module({
    imports: [ConfigModule.forRoot(), LoggerModule.forRoot(), TwitchEventSubModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
