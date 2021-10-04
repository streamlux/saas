import { EventSubBase } from 'twitch-eventsub/lib/EventSubBase';

export const eventMap: Record<string, keyof EventSubBase> = {
    // 'channel.follow': 'subscribeToChannelFollowEvents',
    // 'channel.subscribe': ,
    // 'channel.cheer': 'subscribeToChannelCheerEvents',
    // 'channel.channel_points_custom_reward_redemption.add':
    //     'subscribeToChannelRedemptionAddEvents',
    // 'channel.hype_train.begin': 'subscribeToChannelHypeTrainBeginEvents',
    // 'channel.hype_train.progress': 'subscribeToChannelHypeTrainProgressEvents',
    // 'channel.hype_train.end': 'subscribeToChannelHypeTrainEndEvents',
    // 'channel.poll.begin': 'subscribeToChannelPollBeginEvents',
    // 'channel.poll.progress': 'subscribeToChannelPollProgressEvents',
    // 'channel.poll.end': 'subscribeToChannelPollEndEvents',
    // 'channel.prediction.begin': 'subscribeToChannelPredictionBeginEvents',
    // 'channel.prediction.progress': 'subscribeToChannelPredictionProgressEvents',
    // 'channel.prediction.lock': 'subscribeToChannelPredictionLockEvents',
    // 'channel.prediction.end': 'subscribeToChannelPredictionEndEvents',
    'stream.online': 'subscribeToStreamOnlineEvents',
    'stream.offline': 'subscribeToStreamOfflineEvents',
    // 'channel.channel_points_custom_reward_redemption.update': '_apiClient',
    // 'channel.update': '_apiClient',
    // 'channel.ban': '_apiClient',
    // 'channel.unban': '_apiClient',
    // 'channel.channel_points_custom_reward.add': '_apiClient',
    // 'channel.channel_points_custom_reward.update': '_apiClient',
    // 'channel.channel_points_custom_reward.remove': '_apiClient',
    // 'user.update': 'subscribeToUserUpdateEvents',
};
