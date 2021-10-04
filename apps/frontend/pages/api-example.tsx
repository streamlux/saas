import React, { ReactElement } from 'react';
import Layout from '../components/layout';

export default function Page(): ReactElement {
    return (
        <Layout>
            <h1>API Example</h1>
            <p>
                The examples below show responses from the example API
                endpoints.
            </p>
            <p>
                <em>You must be signed in to see responses.</em>
            </p>
            <h2>Session</h2>
            <p>/api/examples/session</p>
            <iframe src="/api/auth/session" />
        </Layout>
    );
}
