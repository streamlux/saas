import { getAccounts } from '../../../../util/getAccounts';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import NextCors from 'nextjs-cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
        // Options
        // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        methods: ['GET', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const session = await getSession({ req });

    if (session) {
        const accounts = await getAccounts(session);
        const twitchAccount = accounts['twitch'];

        res.status(200).json({ accounts });
    } else {
        res.status(401);
    }
}
