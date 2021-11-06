import React from 'react';
import { Still, StillProps } from 'remotion';

type Template = {
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & StillProps<any>;

const templates: Template[] = [
    {
        id: 'template-1',
        description: 'Twitter banner',
        width: 1500,
        height: 500,
        defaultProps: {
            title: 'Hello',
            img: '',
        },
        lazyComponent: async () => ({ default: (await import('../../../../../libs/templates/src/lib/templates')).Hello }),
    },
    {
        id: 'banner-1',
        description: 'Twitter banner',
        width: 1500,
        height: 500,
        defaultProps: {
            title: 'Hello',
            img: '',
        },
        lazyComponent: () => import('./components/PreviewCard'),
    },
    {
        id: 'twitch-1',
        description: 'Twitter banner for Twitch stream',
        width: 1500,
        height: 500,
        defaultProps: {
            backgroundColor: 'purple',
            thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_jvna-440x248.jpg',
        },
        lazyComponent: () => import('./components/TwitchStream'),
    },
    {
        id: 'twitch-template',
        description: 'Twitter banner for Twitch stream',
        width: 1500,
        height: 500,
        defaultProps: {
            backgroundColor: 'purple',
            thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_jvna-440x248.jpg',
        },
        lazyComponent: async () => ({ default: (await import('../../../../../libs/templates/src/lib/TwitchStream')).PreviewCard }),
    },
];

export const RemotionVideo: React.FC = () => {
    return (
        <>
            {templates.map((template) => (
                <Still {...template} />
            ))}
        </>
    );
};
