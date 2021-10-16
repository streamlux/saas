import type { Stripe } from 'stripe';
import { createAuthApiHandler } from '../../../util/ssr/createApiHandler';
import stripe from '../../../util/ssr/stripe';
import { getCustomerId } from '../../../util/ssr/stripe';

const handler = createAuthApiHandler();

handler.post(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { price, quantity = 1, metadata = {} } = req.body;

    if (!price) {
        throw new Error('Missing parameter price');
    }

    const userId: string = req.session.userId;

    const customerId: string = await getCustomerId(userId);

    const checkoutSession: Stripe.Response<Stripe.Checkout.Session> = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        customer: customerId,
        client_reference_id: userId,
        line_items: [
            {
                price: price,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
            trial_from_plan: true,
            metadata: {},
        },
        success_url: `${process.env.NEXTAUTH_URL}/account`,
        cancel_url: `${process.env.NEXTAUTH_URL}/`,
    });

    return res.status(200).json({ sessionId: checkoutSession.id });
});

export default handler;
