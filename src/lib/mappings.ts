import {formatShortDateTime} from "@/lib/util";
import {MessageDto, MessageWithSenderRecipient} from "@/types";

export function mapMessageToMessageDTO(message: MessageWithSenderRecipient): MessageDto {
    return {
        id: message.id,
        text: message.text,
        created: formatShortDateTime(message.created),
        dateRead: message.dateRead ? formatShortDateTime(message.dateRead) : null,
        senderId: message.sender?.userId,
        senderName: message.sender?.name,
        senderImage: message.sender?.image,
        recipientId: message.recipient?.userId,
        recipientImage: message.recipient?.image,
        recipientName: message.recipient?.name,
    }
}