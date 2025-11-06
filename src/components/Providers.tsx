'use client';

import {HeroUIProvider} from "@heroui/system";
import {ReactNode} from "react";
import {ToastContainer} from "react-toastify";
import {usePresenceChannel} from "@/hooks/usePresenceChannel";
import {useNotificationChannel} from "@/hooks/useNotificationChannel";

export default function Providers({children, userId}: {children: ReactNode, userId: string | null}) {
    usePresenceChannel();
    useNotificationChannel(userId);

    return (
        <HeroUIProvider>
            <ToastContainer position="bottom-right" hideProgressBar={true} className="z-50" />
            {children}
        </HeroUIProvider>
    )
}
