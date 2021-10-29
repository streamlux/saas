import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UseAdminOptions {
    required?: boolean;
}

export function useAdmin(options?: UseAdminOptions): [boolean] {
    const { data: session, status } = useSession({ required: true }) as any;
    const loading = status === 'loading';
    const router = useRouter();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!loading && session.user.role !== 'admin') {
            if (options.required) {
                router.replace('/');
                setIsAdmin(false);
            }
            setIsAdmin(false);
        } else {
            setIsAdmin(true);
        }
    }, [options.required, router, loading, session]);
    return [isAdmin];
}
