import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";
import {getAuthUserId} from "@/app/actions/authActions";
import {getMemberByUserId, getMemberPhotosByUserId} from "@/app/actions/memberActions";
import MemberPhotoUpload from "@/app/members/edit/photos/MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";

export default async function PhotosPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const photos = await getMemberPhotosByUserId(userId);

    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Edit Profile
            </CardHeader>
            <Divider />
            <CardBody>
                <MemberPhotoUpload />
                <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image} />
            </CardBody>
        </>
    )
}