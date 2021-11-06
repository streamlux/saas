import { getAccounts } from '../../../../util/getAccounts';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import NextCors from 'nextjs-cors';
import axios from 'axios';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import { Account } from '@prisma/client';

const authProvider = new ClientCredentialsAuthProvider(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
        // Options
        // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const session = await getSession({ req });

    if (session) {
        const type: string = req.query.type as string;
        const accounts = await getAccounts(session);
        const twitchAccount: Account = accounts['twitch'];
        const twitchUserId = twitchAccount.providerAccountId;
        const reqBody = {
            type,
            version: '1',
            condition: {
                broadcaster_user_id: twitchUserId,
            },
            transport: {
                method: 'webhook',
                callback: `https://saas.streamlux.com/api/twitch/notification/${type}/${twitchUserId}`,
                secret: process.env.EVENTSUB_SECRET,
            },
        };

        const token = await authProvider.getAccessToken();

        await axios.post('https://api.twitch.tv/helix/eventsub/subscriptions', reqBody, {
            headers: {
                'Content-Type': 'application/json',
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                Authorization: `Bearer ${token.accessToken}`,
            },
        });

        // res.status(200).json({ accounts });
        res.send(201);
    } else {
        // res.status(401);
        res.send(401);
    }
}
