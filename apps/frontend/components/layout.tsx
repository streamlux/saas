import React from 'react';
import { Box, chakra, Container, Flex } from '@chakra-ui/react';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
    return (
        <Flex direction="column" as={chakra.div} minH="100vh">
            <Box as={chakra.header}>
                <Header />
            </Box>
            <Container as={chakra.main} flex="1" centerContent maxW={['full', 'container.xl']}>
                <Flex direction="column" w="full">
                    {children}
                </Flex>
            </Container>
            <Box as={chakra.footer}>
                <Footer />
            </Box>
        </Flex>
    );
}
