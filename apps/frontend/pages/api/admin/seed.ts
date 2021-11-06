import { seed } from '../../..//util/seed';
import { createAuthApiHandler } from '../../../util/ssr/createApiHandler';

const handler = createAuthApiHandler();

handler.post(async (req, res) => {

    if (req.session.role !== 'admin') {
        res.send(401);
    }

    await seed();
    return res.status(200);
});

export default handler;
