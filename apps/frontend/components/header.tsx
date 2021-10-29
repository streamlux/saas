import { HStack, Avatar, Flex, Box, Link, WrapItem, Spacer, Button, Text, Center, Wrap, useBreakpointValue, Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react';
import NextLink from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './header.module.css';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useAdmin } from '../util/hooks/useAdmin';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const [isAdmin] = useAdmin({ required: false });

    return (
        <header>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <Box className={styles.signedInStatus}>
                <Box className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`} bg="blue.100" roundedBottom="lg" p={['2', '4']}>
                    {!session && (
                        <Flex>
                            <Text className={styles.notSignedInText}>You are not signed in</Text>
                            <Spacer />
                            <Button
                                as={Link}
                                href={`/api/auth/signin`}
                                className={styles.buttonPrimary}
                                onClick={(e) => {
                                    e.preventDefault();
                                    signIn('twitter');
                                }}
                            >
                                Sign in
                            </Button>
                        </Flex>
                    )}
                    {session && (
                        <Flex>
                            <Spacer />
                            <Center>
                                <Box mx="4">
                                    <Text fontSize={['sm', 'lg']} lineHeight="shorter">
                                        Signed in as
                                    </Text>
                                    <Text fontSize={['sm', 'md']} fontWeight="bold" lineHeight="shorter">
                                        {session.user.email || session.user.name}
                                    </Text>
                                </Box>
                            </Center>
                            <Menu>
                                <MenuButton aria-label="Options" icon={<HamburgerIcon />} variant="outline">
                                    <Avatar name={session.user.name} src={session.user.image} />
                                </MenuButton>
                                <Portal>
                                    <MenuList>
                                        <MenuItem onClick={() => signOut({ redirect: false })}>Sign out</MenuItem>
                                    </MenuList>
                                </Portal>
                            </Menu>
                        </Flex>
                    )}
                </Box>
            </Box>
            <HStack w="full" my="4">
                <Center w="full">
                    <Wrap spacing={['2', '12']}>
                        <WrapItem>
                            <NextLink href="/" passHref>
                                <Link>Home</Link>
                            </NextLink>
                        </WrapItem>
                        <WrapItem>
                            <NextLink href="/banner" passHref>
                                <Link>Banner</Link>
                            </NextLink>
                        </WrapItem>
                        <WrapItem>
                            <NextLink href="/pricing" passHref>
                                <Link>Pricing</Link>
                            </NextLink>
                        </WrapItem>
                        <WrapItem>
                            <NextLink href="/account" passHref>
                                <Link>Account</Link>
                            </NextLink>
                        </WrapItem>
                        {isAdmin && (
                            <WrapItem>
                                <NextLink href="/admin" passHref>
                                    <Link>Admin</Link>
                                </NextLink>
                            </WrapItem>
                        )}
                    </Wrap>
                </Center>
            </HStack>
        </header>
    );
}
