'use server';

import {prisma} from "@/lib/prisma";
import {getAuthUserId} from "@/app/actions/authActions";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean): Promise<void> {
    try {
        const userId = await getAuthUserId();

        if (isLiked) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId: targetUserId
                    }
                }
            });
        } else {
            await prisma.like.create({
                data: {
                    sourceUserId: userId,
                    targetUserId: targetUserId
                }
            });
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchCurrentUserLikedIds() {
    try {
        const userId = getAuthUserId();

        const likedIds = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetUserId: true
            }
        });

        return likedIds.map(like => like.targetUserId);

    } catch (error) {
        console.log(error);
        throw error;
    }
}