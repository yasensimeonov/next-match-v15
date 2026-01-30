'use server';

import {prisma} from "@/lib/prisma";
import {GetMemberParams, PaginatedResponse} from "@/types";
import {addYears} from "date-fns";
import {getAuthUserId} from "@/app/actions/authActions";
import {Member, Photo} from "@prisma/client";

export async function getMembers({
    ageRange = '18,100',
    gender = 'male,female',
    orderBy = 'updated',
    pageNumber = '1',
    pageSize = '12',
    withPhoto = 'true'
 }: GetMemberParams): Promise<PaginatedResponse<Member>> {
    // const session = await auth();
    // if (!session?.user) {
    //     return null;
    // }
    const userId = await getAuthUserId();

    // const ageRange = searchParams?.ageRange?.toString()?.split(',') || [18,100];
    const [minAge, maxAge] = ageRange.split(',');
    const currentDate = new Date();
    const minDob = addYears(currentDate, -maxAge-1);
    const maxDob = addYears(currentDate, -minAge);

    // const orderBySelector = searchParams?.orderBy || 'updated';

    // const selectedGender = searchParams?.gender?.toString()?.split(',') || ['male', 'female'];
    const selectedGender = gender.split(',');

    const page = parseInt(pageNumber);
    const limit = parseInt(pageSize);

    const skip = (page - 1) * limit;

    // let conditions = [
    //     {dateOfBirth: {gte: minDob}},
    //     {dateOfBirth: {lte: maxDob}},
    //     {gender: {in: selectedGender}}
    // ];
    //
    // if (withPhoto === 'true') {
    //     conditions.push({image: {not: null}});
    // }

    try {
        const count = await prisma.member.count({
            where: {
                AND: [
                    {dateOfBirth: {gte: minDob}},
                    {dateOfBirth: {lte: maxDob}},
                    {gender: {in: selectedGender}},
                    ...(withPhoto === 'true' ? [{image: {not: null}}] : [])
                ],
                NOT: {
                    userId
                }
            }
        });

        const members = await prisma.member.findMany({
            where: {
                AND: [
                    {dateOfBirth: {gte: minDob}},
                    {dateOfBirth: {lte: maxDob}},
                    {gender: {in: selectedGender}},
                    ...(withPhoto === 'true' ? [{image: {not: null}}] : [])
                ],
                NOT: {
                    userId
                }
            },
            orderBy: {[orderBy]: 'desc'},
            skip,
            take: limit
        });

        return {
            items: members,
            totalCount: count
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({where: {userId}})
    } catch (error) {
        console.log(error);
    }
}

export async function getMemberPhotosByUserId(userId: string) {
    const currentUserId = await getAuthUserId();

    const member = await prisma.member.findUnique({
        where: {userId},
        // select: {photos: true}
        select: {photos: {
            where: currentUserId === userId ? {} : {isApproved: true}
        }}
    });

    if (!member) {
        return null;
    }

    return member.photos as Photo[];
}

export async function updateLastActive() {
    const userId = await getAuthUserId();

    try {
        return prisma.member.update({
            where: {userId},
            data: {updated: new Date()}
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}
