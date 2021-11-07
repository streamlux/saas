import { Box, Button, ButtonGroup, Code, Heading, Image, Text } from '@chakra-ui/react';
import { Banner } from '@prisma/client';
import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { signIn } from 'next-auth/react';

export default function Page() {
    return (
        <>
            <Box>
                <Button onClick={() => signIn('twitter')}>Connect to Twitter</Button>
            </Box>
        </>
    );
}
