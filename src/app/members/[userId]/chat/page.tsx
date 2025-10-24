import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "@/app/members/[userId]/chat/ChatForm";
import {getMessageThread} from "@/app/actions/messageActions";
import {getAuthUserId} from "@/app/actions/authActions";
import MessageBox from "@/app/members/[userId]/chat/MessageBox";

export default async function ChatPage({params}: {params: Promise<{userId: string}>}) {
    const {userId} = await params;
    const currentUserId = await getAuthUserId();

    const messages = await getMessageThread(userId);

    const body = (
        <div>
            {messages.length === 0 ? 'No messages to display': (
                <div>
                    {messages.map(message => (
                        <MessageBox key={message.id} message={message} currentUserId={currentUserId} />
                    ))}
                </div>
            )}
        </div>
    )

    return (
        <CardInnerWrapper
            header={"Chat"}
            body={body}
            footer={<ChatForm />}
        />
    )
}