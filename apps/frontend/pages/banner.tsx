import { Button, ButtonGroup, Heading, Image } from '@chakra-ui/react';
import { Banner } from '@prisma/client';
import React from 'react';
import useSWR from 'swr';
import axios from 'axios';

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
                <Button onClick={async () => await refreshBanner()}>Refresh banner</Button>
                <Button onClick={async () => await upsertBanner()}>Setup banner</Button>
                <Button onClick={async () => await toggle()}>{data && data.enabled ? 'Turn off live banner' : 'Turn on live banner'}</Button>
            </ButtonGroup>
            <pre>{data ? JSON.stringify(data, null, 4) : 'No banner'}</pre>
            {data && <Image src={data.originalImage} alt="Twitter profile banner" />}
        </>
    );
}
