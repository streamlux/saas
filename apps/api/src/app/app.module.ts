import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitchEventSubModule } from '@streamlux-saas/twitch-eventsub';

@Module({
    imports: [ConfigModule.forRoot(), TwitchEventSubModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
