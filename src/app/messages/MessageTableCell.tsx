import PresenceAvatar from "@/components/PresenceAvatar";
import {AiFillDelete} from "react-icons/ai";
import {Button, ButtonProps} from "@heroui/button";
import {truncateString} from "@/lib/util";
import {MessageDto} from "@/types";
import {useDisclosure} from "@heroui/react";
import AppModal from "@/components/AppModal";

type Props = {
    item: MessageDto;
    columnKey: string;
    isOutbox: boolean;
    deleteMessage: (message: MessageDto) => void;
    isDeleting: boolean;
}

export default function MessageTableCell({item, columnKey, isOutbox, deleteMessage, isDeleting}: Props) {
    const cellValue = item[columnKey as keyof MessageDto];
    const {isOpen, onOpen, onClose} = useDisclosure();

    const onConfirmDeleteMessage = () => {
        deleteMessage(item);
    }

    const footerButtons: ButtonProps[] = [
        {color: 'default', onClick: onClose, children: 'Cancel'},
        {color: 'secondary', onClick: onConfirmDeleteMessage, children: 'Confirm'}
    ]

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
            return (
                <div>{cellValue}</div>
            )
        default:
            return (
                <>
                    <Button
                        isIconOnly
                        variant='light'
                        // onPress={()=> deleteMessage(item)}
                        onPress={()=> onOpen()}
                        isLoading={isDeleting}
                    >
                        <AiFillDelete size={25} className='text-danger' />
                    </Button>
                    <AppModal
                        isOpen={isOpen}
                        onClose={onClose}
                        header='Please confirm this action'
                        body={<div>
                            Are you sure you want to delete this message? This cannot be undone.
                        </div>}
                        footerButtons={footerButtons}
                    />
                </>
            )
    }
}