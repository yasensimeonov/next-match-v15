'use client';

import {HeroUIProvider} from "@heroui/system";
import {ReactNode} from "react";
import {ToastContainer} from "react-toastify";

export default function Providers({children}: {children: ReactNode}) {
    return (
        <HeroUIProvider>
            <ToastContainer position="bottom-right" hideProgressBar={true} className="z-50" />
            {children}
        </HeroUIProvider>
    )
}
