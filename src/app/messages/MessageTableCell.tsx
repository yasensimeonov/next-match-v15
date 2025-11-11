import PresenceAvatar from "@/components/PresenceAvatar";
import {AiFillDelete} from "react-icons/ai";
import {Button} from "@heroui/button";
import {truncateString} from "@/lib/util";
import {MessageDto} from "@/types";

type Props = {
    item: MessageDto;
    columnKey: string;
    isOutbox: boolean;
    deleteMessage: (message: MessageDto) => void;
    isDeleting: boolean;
}

export default function MessageTableCell({item, columnKey, isOutbox, deleteMessage, isDeleting}: Props) {
    const cellValue = item[columnKey as keyof MessageDto];

    switch (columnKey) {
        case 'recipientName':
        case 'senderName':
            return (
                <div className='flex items-center gap-2 cursor-pointer'>
                    <PresenceAvatar
                        userId={isOutbox ? item.recipientId: item.senderId}
                        src={isOutbox ? item.recipientImage : item.senderImage}
                    />
                    <span>{cellValue}</span>
                </div>
            )
        case 'text':
            return (
                <div>
                    {truncateString(cellValue,80)}
                </div>
            )
        case 'created':
            return cellValue
        default:
            return (
                <Button
                    isIconOnly
                    variant='light'
                    onPress={()=>deleteMessage(item)}
                    isLoading={isDeleting}
                >
                    <AiFillDelete size={25} className='text-danger' />
                </Button>
            )
    }
}