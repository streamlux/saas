import { Button, ButtonGroup } from '@chakra-ui/button';
import { Heading } from '@chakra-ui/layout';
import axios from 'axios';
import useSWR from 'swr';

export default function Page() {
    // toggle this
    const streamListen = async () => {
        const response = await axios.post('/api/twitch/subscription/stream.online');
        console.log('response: ', response.data);
    };

    const streamUnlisten = async () => {
        const response = await axios.post('/api/twitch/subscription/stream.offline');
        console.log('resonse: ', response.data);
    };

    const removeWebhook = async () => {
        const response = await axios.delete('/api/twitch/subscription');
        console.log('response: ', response.data);
    };

    return (
        <>
            <Heading>Twitch Listening</Heading>
            <ButtonGroup>
                <Button onClick={async () => await streamListen()}>Listen to stream</Button>
                <Button onClick={async () => await streamUnlisten()}>Unlisten to stream</Button>
                <Button onClick={async () => await removeWebhook()}>Remove testing webhook</Button>
            </ButtonGroup>
        </>
    );
}
