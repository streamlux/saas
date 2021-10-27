import React from 'react';
import { Button } from '@chakra-ui/react';
import { Subscription } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import prisma from '../util/ssr/prisma';

type Props = {
    subscription: Subscription | null;
};

const Page: NextPage<Props> = ({ subscription }) => {
    const handleCreatePortal = async () => {
        const res = await fetch('/api/stripe/create-portal', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
        });

        const data = await res.json();

        const url = data.url;

        window.location.assign(url);
    };

    return (
        <div className="bg-white">
            <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-6xl font-extrabold text-gray-800 sm:text-center">Account</h1>
                    <p className="mt-5 text-xl text-gray-500 sm:text-center">We partnered with Stripe for a simplified billing.</p>

                    <div className="mt-12 bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Manage subscription</h3>
                            {!!subscription?.cancel_at && (
                                <div className="p-4 my-6 border-l-4 border-yellow-400 bg-yellow-50">
                                    <div className="flex">
                                        <div className="flex-shrink-0">!</div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">Your subscription will end the {subscription.cancel_at.toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div>
                                <div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatibus corrupti atque repudiandae nam.</p>
                                </div>
                                <div>
                                    {subscription ? (
                                        <Button onClick={handleCreatePortal} type="button">
                                            Change plan
                                        </Button>
                                    ) : (
                                        <Link href="/" passHref>
                                            <Button>Subscribe</Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const session = await getSession(context);
    const subscription = await prisma.subscription.findFirst({
        where: {
            userId: (session?.user as any)?.userId,
            status: {
                in: ['active', 'trialing'],
            },
        },
        include: {
            price: {
                include: {
                    product: true,
                },
            },
        },
    });

    return {
        redirect: !session && {
            destination: '/api/auth/signin',
            permanent: false,
        },
        props: {
            subscription,
        },
    };
};

export default Page;
