import {getMembers} from "@/app/actions/memberActions";
import MemberCard from "@/app/members/MemberCard";
import {fetchCurrentUserLikedIds} from "@/app/actions/likeActions";

export default async function MembersPage() {
    const members = await getMembers();
    const likedIds = await fetchCurrentUserLikedIds();

    return (
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8'>
            {members && members?.map(member => (
                <MemberCard member={member} key={member.id} likedIds={likedIds} />
            ))}
        </div>
    )
}