import ListsTab from "@/app/lists/ListsTab";
import {fetchCurrentUserLikedIds, fetchLikedMembers} from "@/app/actions/likeActions";

export default async function ListsPage({searchParams}:
    {searchParams: Promise<{type: string}>}
) {
    const {type} = await searchParams;
    const likeIds = await fetchCurrentUserLikedIds();
    const members = await fetchLikedMembers(type);

    return (
        <div>
            <ListsTab members={members} likeIds={likeIds} />
        </div>
    );
}
