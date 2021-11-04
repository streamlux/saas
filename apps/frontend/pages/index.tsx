import { Box, Button, ButtonGroup, Code, Heading, Image, Text } from '@chakra-ui/react';
import { Banner } from '@prisma/client';
import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Page() {
    const { data: session, status } = useSession({ required: false }) as any;
    const loading = status === 'loading';

    return (
        <>
            <Box>
                <Heading>Connect accounts</Heading>
                <Text>{session?.accounts.twitter ?? false ? '✅' : ''} Twitter</Text>
                <Button onClick={() => signIn('twitter')}>Connect to Twitter</Button>
                <Text>{session?.accounts.twitch ?? false ? '✅' : ''} Twitch</Text>
                <Button onClick={() => signIn('twitch')}>Connect to Twitch</Button>
            </Box>
            <Box>
                <Code variant="subtle" p="2" rounded="md">
                    <pre>{JSON.stringify(session ?? {}, null, 2)}</pre>
                </Code>
            </Box>
        </>
    );
}
