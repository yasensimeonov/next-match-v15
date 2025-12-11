'use client';

import {HeroUIProvider} from "@heroui/system";
import {ReactNode, useCallback, useEffect} from "react";
import {ToastContainer} from "react-toastify";
import {usePresenceChannel} from "@/hooks/usePresenceChannel";
import {useNotificationChannel} from "@/hooks/useNotificationChannel";
import useMessageStore from "@/hooks/useMessageStore";
import {useShallow} from "zustand/react/shallow";
import {getUnreadMessageCount} from "@/app/actions/messageActions";

export default function Providers({children, userId}: {children: ReactNode, userId: string | null}) {
    //const updateUnreadCount = useMessageStore(state => state.updateUnreadCount);
    const {updateUnreadCount} = useMessageStore(useShallow(
        state => ({
            updateUnreadCount: state.updateUnreadCount
        })));

    const setUnreadCount = useCallback((amount: number) => {
        updateUnreadCount(amount);
    }, [updateUnreadCount]);

    useEffect(() => {
        if (userId) {
            getUnreadMessageCount().then(count => {
                setUnreadCount(count);
            })
        }
    }, [setUnreadCount, userId]);

    usePresenceChannel();
    useNotificationChannel(userId);

    return (
        <HeroUIProvider>
            <ToastContainer position="bottom-right" hideProgressBar={true} className="z-50" />
            {children}
        </HeroUIProvider>
    )
}
