import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
} from '@nestjs/common';
import { eventMap } from './twitchConstants';
import { TwitchEventSubService } from './TwitchEventSub.service';

@Controller('twitch')
export class TwitchEventSubController {
    constructor(private twitchEventSubService: TwitchEventSubService) {}

    @Post('subscriptions/:twitchUserId/:type')
    async listen(
        @Param('twitchUserId') twitchUserId: string,
        @Param('type') type: string,
        @Body('conditionParam') conditionParam?: any
    ) {
        if (!Object.keys(eventMap).includes(type)) {
            throw new BadRequestException(`Invalid event type '${type}'`);
        }

        await this.twitchEventSubService.listen(
            twitchUserId,
            type,
            conditionParam
        );
    }

    @Get('subscriptions')
    getEvents() {
        return this.twitchEventSubService.getSubscriptions();
    }

    @Get('subscriptions')
    getSubscriptionsByUserId(@Param('twitchUserId') twitchUserId: string) {
        return this.twitchEventSubService.getSubscriptionsByUserId(
            twitchUserId
        );
    }

    @Delete('subscriptions')
    async deleteAll() {
        await this.twitchEventSubService.deleteAll();
        return 'OK';
    }
}
