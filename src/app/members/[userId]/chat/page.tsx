import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "@/app/members/[userId]/chat/ChatForm";
import {getMessageThread} from "@/app/actions/messageActions";

export default async function ChatPage({params}: {params: Promise<{userId: string}>}) {
    const {userId} = await params;

    const messages = await getMessageThread(userId);
    console.log({messages});

    return (
        <CardInnerWrapper
            header={"Chat"}
            body={<div>Chat Page</div>}
            footer={<ChatForm />}
        />
    )
}