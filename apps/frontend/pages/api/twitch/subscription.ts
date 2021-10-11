import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log('hit');
    const session = await getSession({ req });
    if (session) {

        console.log(session);
        const client = new PrismaClient();
        const accounts = await client.account.findMany({
            where: {
                userId: session.user['id']
            }
        });

        const twitchAccount = accounts.find((account) => account.provider === 'twitch');
        console.log(accounts);
        console.log(twitchAccount);
        res.status(200).json({ twitchAccount });
    } else {
        res.status(401);
    }
}
