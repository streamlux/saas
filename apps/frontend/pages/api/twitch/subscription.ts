import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession({ req });

    const client = new PrismaClient();
    const account = await client.account.findUnique({
        where: {
            id: session.user['id']
        }
    });

    res.status(200).json(account);
}
