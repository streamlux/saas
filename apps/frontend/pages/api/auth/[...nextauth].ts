import NextAuth from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';
import TwitterProvider from 'next-auth/providers/twitter';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '.prisma/client';

async function refreshAccessToken(refreshToken) {
    try {
        const url =
            'https://id.twitch.tv/oauth2/token?' +
            new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            });

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...refreshedTokens,
            expires_at: Date.now() + refreshedTokens.expires_in * 1000,
            refresh_token: refreshedTokens.refresh_token ?? refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.log(error);

        return {
            error: 'RefreshAccessTokenError',
        };
    }
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const prisma = new PrismaClient();
export default NextAuth({
    adapter: PrismaAdapter(prisma),
    // https://next-auth.js.org/configuration/providers
    providers: [
        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
        }),
    ],
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    database: process.env.DATABASE_URL,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: false,

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
        secret: process.env.SECRET,
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        signIn: '/auth/signin',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) { return true },
        // async redirect({ url, baseUrl }) { return baseUrl },
        // async session({ session, token, user }) { return session },
        async session({ session, token, user }) {
            const accounts = await prisma.account.findMany({
                where: {
                    userId: user.id,
                },
            });
            session.user['role'] = user.role;
            session.userId = user.id;
            session.user['id'] = user.id;
            session.accounts = {};
            accounts.forEach(async (account) => {
                if (account.provider === 'twitch' && account.expires_at > Date.now()) {
                    console.log('refreshing twitch token');
                    const data = await refreshAccessToken(account.refresh_token);

                    await prisma.account.update({
                        where: {
                            id: account.id,
                        },
                        data: {
                            access_token: data.access_token,
                            refresh_token: data.refresh_token,
                            expires_at: data.expires_at,
                            token_type: data.token_type,
                            scope: data.scope,
                        },
                    });
                }
                session.accounts[account.provider] = true;
            });
            return session;
        },
        // async jwt({ token, user, account, profile, isNewUser }) { return token }
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // You can set the theme to 'light', 'dark' or use 'auto' to default to the
    // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
    theme: 'auto',

    // Enable debug messages in the console if you are having problems
    debug: false,
});
