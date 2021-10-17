import { NextApiRequest, NextApiResponse } from 'next';
import nc, { ErrorHandler } from 'next-connect';

import auth, { AppNextApiRequest } from '../../middlewares/auth';

export const onError: ErrorHandler<NextApiRequest, NextApiResponse> = (err, req, res, next) => {
    console.log(err);
    res.status(500).end(err.toString());
};

/**
 * Next.js API route handler that handles errors. When an error is thrown it responds with a status 500 and includes the error message.
 */
export const createApiHandler = () =>
    nc<NextApiRequest, NextApiResponse>({
        onError,
    });

/**
 * Next.js API route handler that requires a session. Adds the session to the request object.
 */
export const createAuthApiHandler = () =>
    nc<AppNextApiRequest, NextApiResponse>({
        onError,
    }).use(auth);
