/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import { ApiClient, HelixEventSubSubscription } from 'twitch';
import { EventSubListener, ReverseProxyAdapter } from 'twitch-eventsub';
import { NgrokAdapter } from 'twitch-eventsub-ngrok';
import {
    EVENTSUB_CALLBACK_DOMAIN,
    TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET,
    TWITCH_EVENTSUB_SECRET,
} from './constants';
import { eventMap } from './twitchConstants';

@Injectable()
export class TwitchEventSubService {
    private readonly listener: EventSubListener;
    private readonly authProvider: ClientCredentialsAuthProvider;

    private readonly apiClient: ApiClient;

    private readonly adapter = this.getAdapter();

    private isListening = false;

    constructor() {
        const authProvider = new ClientCredentialsAuthProvider(
            TWITCH_CLIENT_ID,
            TWITCH_CLIENT_SECRET
        );
        const apiClient = new ApiClient({ authProvider });
        this.authProvider = authProvider;
        this.apiClient = apiClient;
        this.listener = new EventSubListener(
            apiClient,
            this.adapter,
            TWITCH_EVENTSUB_SECRET
        );
    }

    async getSubscriptions() {
        const result = await this.apiClient.helix.eventSub.getSubscriptions();
        const subscriptionJsons = result.data.map(this.subscriptionToJson);
        return { subscriptions: subscriptionJsons, total: result.total };
    }

    async deleteAll() {
        await this.apiClient.helix.eventSub.deleteAllSubscriptions();
    }

    async unsubscribe(id: string) {
        await this.apiClient.helix.eventSub.deleteSubscription(id);
    }

    async listen(twitchUserId: string, type: string, arg: string) {
        if (!this.isListening) {
            await this.listener.listen();
            this.isListening = true;
        }

        const listenMethod = this.listener[eventMap[type]];
        if (typeof listenMethod === 'function') {
            if (listenMethod.length === 3) {
                listenMethod.call(this.listener, twitchUserId, arg, (event) => {
                    console.log('hit1', event);
                });
            } else {
                listenMethod.call(this.listener, twitchUserId, (event) => {
                    console.log('hit', event);
                });
            }
        }
        return 'OK';
    }

    async deleteUserSubscriptions(twitchUserId: string) {
        const userSubscriptions = await this.getSubscriptionsByUserId(
            twitchUserId
        );
        userSubscriptions.subscriptions.forEach(async (subscription) => {
            this.unsubscribe(subscription.id);
        });
    }

    async getSubscriptionsByUserId(twitchUserId: string) {
        const subscriptions = await this.getSubscriptions();
        const userSubscriptions = subscriptions.subscriptions.filter(
            (sub) => sub.condition['user_id'] === twitchUserId
        );
        return {
            subscriptions: userSubscriptions,
            total: userSubscriptions.length,
        };
    }

    private subscriptionToJson(subscription: HelixEventSubSubscription) {
        return {
            id: subscription.id,
            type: subscription.type,
            status: subscription.status,
            creationDate: subscription.creationDate,
            condition: subscription.condition,
        };
    }

    private getAdapter() {
        if (process.env.NODE_ENV !== 'production') {
            return new NgrokAdapter();
        }
        return new ReverseProxyAdapter({
            hostName: EVENTSUB_CALLBACK_DOMAIN, // The host name the server is available from
            externalPort: 443, // The external port (optional, defaults to 443)
        });
    }
}
