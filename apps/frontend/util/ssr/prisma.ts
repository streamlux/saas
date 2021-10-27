import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

let numClients = 0;

const createPrismaClient = () => {
    console.log('Creating new Prisma client...');
    console.log('Total clients: ', numClients);
    return new PrismaClient();
    numClients++;
}

// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
