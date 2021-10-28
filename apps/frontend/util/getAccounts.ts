import { Account } from '@prisma/client';
import { Session } from 'next-auth';
import prisma from './ssr/prisma';

export async function getAccounts(session: Session): Promise<Record<string, Account>> {

    const accounts = await prisma.account.findMany({
        where: {
            userId: session.user['id'],
        },
    });

    const result: Record<string, Account> = {};
    accounts.forEach((account) => {
        result[account.provider] = account;
    });
    return result;
}
