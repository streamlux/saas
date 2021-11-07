import React from 'react';
import { AnyComponent, Still, StillProps } from 'remotion';
import { TwitchStream } from '@streamlux-saas/templates';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

type Templates = Awaited<typeof import('@streamlux-saas/templates')>;

type TemplateName = keyof Templates;
type TemplateProps = {
    [name in TemplateName]: React.ComponentProps<Templates[name]>
};

const getTemplate: (name: TemplateName) => () => Promise<{
    default: AnyComponent<any>;
}> = (name: TemplateName) => async () => ({ default: (await import('@streamlux-saas/templates'))[name] });


type Template<T extends TemplateName> = {
    templateId: keyof Templates;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & StillProps<TemplateProps[T]>;

function createTemplate<T extends TemplateName>(name: TemplateName, options: { defaultProps?: TemplateProps[T], height?: number, width?: number, description: string, id: string} ): Template<T> {
    return {
        templateId: name,
        lazyComponent: getTemplate(name),
        height: 500,
        width: 1500,
        ...options
    }
};

type TemplateMap = {
    [name in TemplateName]: Template<name>;
}

const templates = [
    createTemplate('TwitchStream', {
        defaultProps: {
            text: 'I\'m live on Twitch!',
            thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_jvna-440x248.jpg'
        },
        description: 'Shows Twitch stream thumbnail',
        id: 'twitch'
    }),
    createTemplate('HelloWorld', {
        defaultProps: {},
        description: 'Hello world',
        id: 'hello'
    })
];

export const RemotionVideo: React.FC = () => {
    return (
        <>
            {templates.map((template) => (
                <Still {...template} />
            ))}
            <Still {...{
                component: TwitchStream,
                defaultProps: {
                    thumbnailUrl: '',
                    text: 'Test'
                },
                height: 500,
                width: 500,
                id: 'test'
            }} />
        </>
    );
};
