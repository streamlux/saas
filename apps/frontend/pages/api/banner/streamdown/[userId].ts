import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import axios from 'axios';
// import Twitter from 'twitter-lite';
import imageToBase64 from 'image-to-base64';
import { TwitterClient } from 'twitter-api-client';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const Twitter = require('twitter');

export type BannerResponseCode = 200 | 400;

// pass it the banner so we can just upload the base64 or image url directly
export async function updateBanner(oauth_token: string, oauth_token_secret: string, banner: string): Promise<BannerResponseCode> {
    const client = new TwitterClient({
        apiKey: process.env.TWITTER_ID,
        apiSecret: process.env.TWITTER_SECRET,
        accessToken: oauth_token,
        accessTokenSecret: oauth_token_secret,
    });
    try {
        const image: string = await imageToBase64('https://pbs.twimg.com/profile_banners/1612037503/1502430415/1500x500');

        // const response = await client.accountsAndUsers.accountVerifyCredentials();
        // console.log('verify creds response: ', response);

        await client.accountsAndUsers.accountUpdateProfileBanner({
            banner: image,
        });

        // await client.post('account/update_profile_banner', params, (e, tweets, response) => {
        //     console.log('error: ', e);
        // });
    } catch (e) {
        console.log('e: ', e);
        if ('errors' in e) {
            // Twitter API error
            if (e.errors[0].code === 88)
                // rate limit exceeded
                console.log('Rate limit will reset on', new Date(e._headers.get('x-rate-limit-reset') * 1000));
            // some other kind of error, e.g. read-only API trying to POST
            else console.log('Other error');
        } else {
            // non-API error, e.g. network problem or invalid JSON in response
            console.log('Non api error');
        }
        return 400;
    }
    return 200;
}

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

    const bannerEntry = await prisma.banner?.findFirst({
        where: {
            userId: userId,
        },
    });

    const tokenInfo = await prisma.account?.findFirst({
        where: {
            userId,
        },
        select: {
            oauth_token: true,
            oauth_token_secret: true,
        },
    });

    console.log('bannerEntry: ', bannerEntry);
    console.log('tokenInfo: ', tokenInfo);

    if (bannerEntry === null || tokenInfo === null) {
        return res.status(400).send('Could not find banner entry or token info for user');
    }

    const bannerStatus: BannerResponseCode = await updateBanner(tokenInfo.oauth_token, tokenInfo.oauth_token_secret, bannerEntry.originalImage);
    return bannerStatus === 200 ? res.status(200).send('Set banner back to original image') : res.status(400).send('Unable to set banner to original image');
}
