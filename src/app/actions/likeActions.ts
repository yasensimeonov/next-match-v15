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

async function fetchSourceLikes(userId: string) {
    const sourceList = await prisma.like.findMany({
        where: {sourceUserId: userId},
        select: {targetMember: true}
    })
    return sourceList.map(x => x.targetMember);
}

async function fetchTargetLikes(userId: string) {
    const targetList = await prisma.like.findMany({
        where: {targetUserId: userId},
        select: {sourceMember: true}
    })
    return targetList.map(x => x.sourceMember);
}

async function fetchMutualLikes(userId: string) {
    const likedUsers = await prisma.like.findMany({
        where: {sourceUserId: userId},
        select: {targetUserId: true}
    });
    const likedUserIds = likedUsers.map(x => x.targetUserId);

    const mutualList = await prisma.like.findMany({
        where: {
            AND: [
                {targetUserId: userId},
                {sourceUserId: {in: likedUserIds}}
            ]
        },
        select: {sourceMember: true}
    });

    return mutualList.map(x => x.sourceMember);
}

export async function fetchLikedMembers(type = 'source') {
    try {
        const userId = await getAuthUserId();

        switch (type) {
            case 'source':
                return await fetchSourceLikes(userId);
            case 'target':
                return await fetchTargetLikes(userId);
            case 'mutual':
                return await fetchMutualLikes(userId);
            default:
                return [];
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}