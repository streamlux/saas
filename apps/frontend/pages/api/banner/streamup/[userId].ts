import { AppNextApiRequest } from '../../../../middlewares/auth';
import { NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getAccounts } from '../../../../util/getAccounts';

export default async function handler(req: AppNextApiRequest, res: NextApiResponse) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
        // Options
        // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const userId: string = req.query.userId as string;

    const bannerEntry = await prisma.banner?.findFirst({
        where: {
            userId: userId,
        },
    });

    console.log('bannerEntry: ', bannerEntry);

    if (bannerEntry === null) {
        return res.status(400).send('Could not find banner entry for user');
    }

    // update banner entry to template
    const accounts = await getAccounts(req.session);

    // hit endpoint sending it the template id
    // return the imageUrl or base64 encoded image
    // call updateBanner function and return if it was successful

    return res.status(501).send('Not implemented');
}
