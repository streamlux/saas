import './styles.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import theme from '../definitions/chakra/theme';
import React from 'react';
import Layout from '../components/layout';
import { useRouter } from 'next/router';

// Use of the <SessionProvider> is now mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }) {
    const router = useRouter();
    return (
        <SessionProvider session={pageProps.session}>
            <ChakraProvider theme={theme}>
                {/* {router.pathname === '/' ? (
                    <Component {...pageProps} />
                ) : ( */}
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                {/* )} */}
            </ChakraProvider>
        </SessionProvider>
    );
}
