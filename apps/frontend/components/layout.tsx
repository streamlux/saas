import React from 'react';
import { Box, chakra, Container, Flex } from '@chakra-ui/react';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
    return (
        <Container centerContent maxW={['full', 'container.xl']} minH="100vh">
            <Flex direction="column" minH="100vh" w="full">
                <Box as={chakra.header}>
                    <Header />
                </Box>
                <Box as={chakra.main} flex="1">
                    {children}
                </Box>
                <Box as={chakra.footer}>
                    <Footer />
                </Box>
            </Flex>
        </Container>
    );
}
