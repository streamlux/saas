import { Account, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

export async function getAccounts(session: Session): Promise<Record<string, Account>> {
    const client = new PrismaClient();
    const accounts = await client.account.findMany({
        where: {
            userId: session.user['id']
        }
    });

    const result: Record<string, Account> = {};
    accounts.forEach((account) => {
        result[account.provider] = account;
    });
    return result;
}
