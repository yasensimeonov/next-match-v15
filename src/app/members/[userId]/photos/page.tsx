import {getMemberPhotosByUserId} from "@/app/actions/memberActions";
import {Image} from "@heroui/image";
import CardInnerWrapper from "@/components/CardInnerWrapper";

export default async function PhotosPage({params} : { params: Promise<{ userId: string }> }) {
    const {userId} = await params;
    const photos = await getMemberPhotosByUserId(userId);

    return (
        <CardInnerWrapper
            header={'Photos'}
            body={
                <div className='grid grid-cols-5 gap-3'>
                    {photos && photos.map(photo => (
                        <div key = {photo.id}>
                            <Image
                                width={300}
                                //height={300}
                                src={photo.url}
                                alt='Image of member'
                                className='object-cover aspect-square'
                            />
                        </div>
                    ))}
                </div>
            }
        />
    )
}