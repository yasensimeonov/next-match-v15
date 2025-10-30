import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

/* eslint-disable no-var */
declare global {
    var pusherServerInstance: PusherServer | undefined;
    var pusherClientInstance: PusherClient | undefined;
}

if (!globalThis.pusherServerInstance) {
    globalThis.pusherServerInstance = new PusherServer({
        appId: process.env.PUSHER_APP_ID!,
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
        secret: process.env.PUSHER_SECRET!,
        cluster: 'eu',
        useTLS: true
    })
}

if (!globalThis.pusherClientInstance) {
    globalThis.pusherClientInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
        cluster: 'eu'
    })
}

export const pusherServer = globalThis.pusherServerInstance;
export const pusherClient = globalThis.pusherClientInstance;