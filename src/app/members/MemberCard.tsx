'use client';

import {Member} from "@prisma/client";
import {Card, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
import Link from "next/link";
import {calculateAge, transformImageUrl} from "@/lib/util";
import LikeButton from "@/components/LikeButton";
import PresenceDot from "@/components/PresenceDot";
import {toggleLikeMember} from "@/app/actions/likeActions";
import {useState} from "react";

type Props = {
    member: Member,
    likedIds: string[]
}

export default function MemberCard({member, likedIds}: Props) {
    const [hasLiked, setHasLiked] = useState(likedIds.includes(member.userId));
    const [isLoading, setLoading] = useState(false);

    async function toggleLike() {
        setLoading(true);

        try {
            // await toggleLikeMember(targetId, hasLiked);
            await toggleLikeMember(member.userId, hasLiked);
            // router.refresh();
            setHasLiked(!hasLiked);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const preventLinkAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Card
            fullWidth
            as={Link}
            href={`/members/${member.userId}`}
            isPressable
        >
            <Image
                isZoomed
                alt={member.name}
                width={300}
                src={transformImageUrl(member.image) || '/images/user.png'}
                className='aspect-square object-cover'
            />

            <div onClick={preventLinkAction}>
                <div className='absolute top-3 right-3 z-50'>
                    {/*<LikeButton targetId={member.userId} hasLiked={hasLiked} />*/}
                    <LikeButton loading={isLoading} hasLiked={hasLiked} toggleLikeAction={toggleLike} />
                </div>
                <div className='absolute top-2 left-3 z-50'>
                    <PresenceDot member={member} />
                </div>
            </div>

            <CardFooter className='flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient'>
                <div className='flex flex-col text-white'>
                    <span className='font-semibold'>{member.name}, {calculateAge(member.dateOfBirth)}</span>
                    <span className='text-sm'>{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    )
}