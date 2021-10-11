import { getAccounts } from '../../../util/getAccounts';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (session) {
        const accounts = await getAccounts(session);
        console.log(accounts);
        res.status(200).json({ accounts });
    } else {
        res.status(401);
    }
}
