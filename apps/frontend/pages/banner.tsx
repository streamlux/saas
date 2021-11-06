import { Button, ButtonGroup, Heading, Image } from '@chakra-ui/react';
import { Banner } from '@prisma/client';
import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Player } from '@remotion/player';
import { PreviewCard } from '@streamlux-saas/templates';

export default function Page() {
    const { data, mutate } = useSWR<Banner>('banner', async () => (await fetch('/api/banner')).json());

    const upsertBanner = async () => {
        const response = await axios.post('/api/banner?templateId=123');
        mutate();
    };

    const refreshBanner = async () => {
        const response = await axios.post('/api/banner?fetchImage=true');
        mutate();
    };

    const toggle = async () => {
        await axios.put('/api/banner');
        mutate({
            ...data,
            enabled: !data.enabled,
        });
    };

    return (
        <>
            <Heading>Banner setup</Heading>
            <ButtonGroup>
                <Button onClick={async () => await refreshBanner()} disabled={!data}>
                    Refresh banner
                </Button>
                <Button onClick={async () => await upsertBanner()}>Setup banner</Button>
                <Button onClick={async () => await toggle()} disabled={!data}>
                    {data && data.enabled ? 'Turn off live banner' : 'Turn on live banner'}
                </Button>
            </ButtonGroup>
            <pre>{data ? JSON.stringify(data, null, 4) : 'No banner'}</pre>
            <Player
                inputProps={{
                    text: 'hello world',
                    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_teampgp-440x248.jpg',
                    backgroundUrl: data?.originalImage ?? undefined,
                }}
                component={PreviewCard}
                durationInFrames={1}
                compositionWidth={1000}
                compositionHeight={333}
                fps={1}
            />
        </>
    );
}
