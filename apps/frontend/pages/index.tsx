import { Box, Button, Code, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';

export default function Page() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: session } = useSession({ required: false }) as any;

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
