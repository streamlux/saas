import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors';
import axios from 'axios';
import crypto from 'crypto';

type VerificationBody = {
    challenge: string;
    subscription: unknown;
}

enum MessageType {
    Notification = 'notification',
    Verification = 'webhook_callback_verification'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
        // Options
        // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const param = req.query.param as string[];
    console.log(`POST - Notification: ${param.join(', ')}`)

    const messageSignature = req.headers["Twitch-Eventsub-Message-Signature"] as string;
    const messageId = req.headers["Twitch-Eventsub-Message-Id"] as string;
    const messageTimestamp = req.headers["Twitch-Eventsub-Message-Timestamp"] as string;
    if (!verifySignature(messageSignature, messageId, messageTimestamp, req.body)) {
        res.status(403).send("Forbidden"); // Reject requests with invalid signatures
        res.end();
    }

    const messageType: MessageType = req.headers['Twitch-Eventsub-Message-Type'] as MessageType;

    if (messageType === MessageType.Verification) {
        const challenge: string = (req.body as VerificationBody).challenge;
        res.send(challenge);
        res.end();
    }

    if (messageType === MessageType.Notification) {
        console.log(req.body.event);
        res.status(200);
        res.end();
    }
}

function verifySignature(messageSignature: string, id: string, timestamp: string, body: unknown): boolean {
    const message = id + timestamp + body;
    const signature = crypto.createHmac('sha256', process.env.EVENTSUB_SECRET).update(message);
    const expectedSignatureHeader = "sha256=" + signature.digest("hex");
    return expectedSignatureHeader === messageSignature;
}
