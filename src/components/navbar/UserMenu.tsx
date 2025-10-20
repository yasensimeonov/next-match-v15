'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/dropdown";
import {Avatar} from "@heroui/avatar";
import Link from "next/link";
import {signOutUser} from "@/app/actions/authActions";

type Props = {
    userInfo: { name: string | null; image: string | null; } | null
}

export default function UserMenu({userInfo}: Props) {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='secondary'
                    name={userInfo?.name || 'user avatar'}
                    size='sm'
                    src={userInfo?.image || '/images/user.png'}
                />
            </DropdownTrigger>
            <DropdownMenu variant='flat' aria-label='User Actions Menu'>
                <DropdownSection showDivider>
                    <DropdownItem key='signInAs' isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>
                        Signed in as {userInfo?.name}
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem key='editProfile' as={Link} href='/members/edit'>
                    Edit Profile
                </DropdownItem>
                <DropdownItem key='logOut' color='danger' onPress={async () => {await signOutUser()}}>
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
