import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "@/app/members/[userId]/chat/ChatForm";
import {getMessageThread} from "@/app/actions/messageActions";
import {getAuthUserId} from "@/app/actions/authActions";
import MessageList from "@/app/members/[userId]/chat/MessageList";
import {createChatId} from "@/lib/util";

export default async function ChatPage({params}: {params: Promise<{userId: string}>}) {
    const {userId} = await params;
    const currentUserId = await getAuthUserId();
    const messages = await getMessageThread(userId);
    const chatId = createChatId(currentUserId, userId);

    return (
        <CardInnerWrapper
            header={"Chat"}
            body={
                <MessageList
                    initialMessages={messages}
                    currentUserId={currentUserId}
                    chatId={chatId}
                />
            }
            footer={<ChatForm />}
        />
    )
}