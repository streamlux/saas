import { Module } from '@nestjs/common';
import { TwitchEventSubService } from './TwitchEventSub.service';
import { TwitchEventSubController } from './TwitchEventSub.controller';

@Module({
    controllers: [TwitchEventSubController],
    providers: [TwitchEventSubService],
    exports: [TwitchEventSubService],
})
export class TwitchEventSubModule {}
