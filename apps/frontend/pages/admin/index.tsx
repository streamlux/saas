import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAdmin } from '../../util/hooks/useAdmin';

export default function Page() {
    const { data: session } = useSession({ required: true }) as any;
    useAdmin({ required: true });
    return <>{session ? session?.user?.role : ''}</>;
}
