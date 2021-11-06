import { Banner, Tweet } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from '../../../util/ssr/prisma';

// Just append new types here for ease since this will be the 'preprocessor' of all twitch features
export type FeatureMapTypes = {
    featureMap: {
        tweet?: Tweet;
        banner?: Banner;
    };
};

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

    const userId: string = req.query.userId as string;

    const userInfo = await prisma.user?.findFirst({
        where: {
            id: userId,
        },
        include: {
            tweet: true,
            banner: true,
        },
    });

    if (userInfo === null) {
        return res.status(400).send('User cannot be found');
    }

    const featureMap = {};
    if (userInfo.banner !== null && userInfo.banner.enabled === true) {
        const bannerObj: Banner = userInfo.banner;
        featureMap['banner'] = bannerObj;
    }
    if (userInfo.tweet !== null && userInfo.tweet.enabled === true) {
        const tweetObj: Tweet = userInfo.tweet;
        featureMap['tweet'] = tweetObj;
    }

    console.log('usedFeatures: ', featureMap);

    return res.status(200).json({ featureMap });
}
