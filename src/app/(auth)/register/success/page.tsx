'use client';

import {useRouter} from "next/navigation";
import CardWrapper from "@/components/CardWrapper";
import {FaCheckCircle} from "react-icons/fa";

export default function RegisterSuccessPage() {
    const router = useRouter();

    return (
        <CardWrapper
            headerText='You have successfully registered'
            subHeaderText='Please verify your email before you can login'
            action={() => router.push('/login')}
            actionLabel='Go to login'
            headerIcon={FaCheckCircle}
        />
    )
}