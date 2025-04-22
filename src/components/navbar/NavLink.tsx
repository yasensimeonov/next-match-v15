'use client';

import Link from "next/link";
import {NavbarItem} from "@heroui/navbar";
import {usePathname} from "next/navigation";

type Props = {
    href: string;
    label: string;
}

export default function NavLink({href, label}: Props) {
    const pathname = usePathname();

    return (
        <NavbarItem isActive={pathname === href} as={Link} href={href}>{label}</NavbarItem>
    );
}
