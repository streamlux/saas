import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAdmin } from '../../util/hooks/useAdmin';
import { Box, Button, Heading } from '@chakra-ui/react';

export default function Page() {
    const { data: session } = useSession({ required: true }) as any;
    useAdmin({ required: true });
    return (
        <Box>
            <Heading>{session ? session?.user?.role : ''}</Heading>
            <Button
                onClick={() => {
                    fetch('/api/admin/seed', {
                        method: 'POST',
                    });
                }}
            >
                Seed database
            </Button>
        </Box>
    );
}
