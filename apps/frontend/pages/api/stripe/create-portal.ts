import { createAuthApiHandler } from '../../../util/ssr/createApiHandler';
import stripe from '../../../util/ssr/stripe';
import { getCustomerId } from '../../../util/ssr/stripe';

const handler = createAuthApiHandler();

handler.post(async (req, res) => {
    const userId: string = req.session.userId;

    const customerId: string = await getCustomerId(userId);

    const { url } = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXTAUTH_URL}/account`,
    });

    return res.status(200).json({ url });
});

export default handler;
