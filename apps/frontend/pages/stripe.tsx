import { Price, PriceInterval, Product, Subscription } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Heading, Link, List, Text, Wrap, WrapItem, ListItem, ListIcon, Center, chakra, Container, HStack, VStack, SimpleGrid } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import getStripe from '../util/getStripe';
import prisma from '../util/ssr/prisma';
import Layout from '../components/layout';

type Props = {
    products: (Product & { prices: Price[] })[];
};

const Page: NextPage<Props> = ({ products }) => {
    const [subscription, setSubscription] = useState<Subscription>();
    const { status } = useSession();
    const router = useRouter();

    const [billingInterval, setBillingInterval] = useState<PriceInterval>('month');

    const sortProductsByPrice = (
        products: (Product & {
            prices: Price[];
        })[]
    ) => products.sort((a, b) => a?.prices?.find((one) => one.interval === billingInterval)?.unitAmount - b?.prices?.find((one) => one.interval === billingInterval)?.unitAmount);

    useEffect(() => {
        (async () => {
            if (status === 'authenticated') {
                const res = await fetch('/api/user/subscription');

                const data = await res.json();

                if (data.subscription) {
                    setSubscription(data.subscription);
                }
            }
        })();
    }, [status]);

    const handlePricingClick = useCallback(
        async (priceId: string) => {
            if (status !== 'authenticated') {
                return router.push('/api/auth/signin');
            }

            if (subscription) {
                return router.push('/account');
            }

            const res = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    price: priceId,
                }),
            });

            const data = await res.json();

            const stripe = await getStripe();

            stripe?.redirectToCheckout({ sessionId: data.sessionId });
        },
        [status, router, subscription]
    );

    return (
        <div className="bg-white">
            <VStack>
                <Container centerContent maxW="container.lg">
                    <Heading size="xl">Pricing Plans</Heading>
                    <Text>Start building for free, then add a site plan to go live. Account plans unlock additional features.</Text>
                </Container>
                <Center>
                    <ButtonGroup isAttached>
                        <Button onClick={() => setBillingInterval('month')} isActive={billingInterval === 'month'}>
                            Monthly billing
                        </Button>
                        <Button onClick={() => setBillingInterval('year')} isActive={billingInterval === 'year'}>
                            Yearly billing
                        </Button>
                    </ButtonGroup>
                </Center>
                <Center>
                    <SimpleGrid columns={[1, 2]} spacing="4">
                        {sortProductsByPrice(products).map((product) => {
                            const price: Price = product?.prices?.find((one: Price) => one.interval === billingInterval);

                            if (!price) {
                                return null;
                            }

                            return (
                                <WrapItem key={product.name}>
                                    <Box rounded="md" dropShadow="lg" border="2px" borderColor="gray.200" p="4">
                                        <Heading size="sm">{product.name}</Heading>
                                        <Text color="gray.900" fontSize="2xl" fontWeight="extrabold" lineHeight="tight">
                                            {`$${price.unitAmount / 100}`}
                                            <Text as={chakra.span} fontSize="sm" fontWeight="normal" color="gray">
                                                /mo
                                            </Text>
                                        </Text>
                                        <Text>{product.description ?? 'Missing description'}</Text>

                                        <Button onClick={() => handlePricingClick(price.id)}>Join {product.name}</Button>

                                        <Heading size="md">{"What's included"}</Heading>
                                        <List>
                                            {[
                                                'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                                                'Cum repellendus libero non expedita quam eligendi',
                                                'a deserunt beatae debitis culpa asperiores ipsum facilis,',
                                                'excepturi reiciendis accusantium nemo quos id facere!',
                                            ].map((feature) => (
                                                <ListItem key={feature}>
                                                    <ListIcon as={CheckIcon} />
                                                    {feature}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </WrapItem>
                            );
                        })}
                    </SimpleGrid>
                </Center>
            </VStack>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const products = await prisma.product.findMany({
        where: {
            active: true,
        },
        include: {
            prices: {
                where: {
                    active: true,
                },
            },
        },
    });

    return {
        props: {
            products,
        },
    };
};

export default Page;
