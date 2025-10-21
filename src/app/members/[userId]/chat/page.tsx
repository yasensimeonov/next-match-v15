import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "@/app/members/[userId]/chat/ChatForm";

export default function ChatPage() {
    return (
        <CardInnerWrapper
            header={"Chat"}
            body={<div>Chat Page</div>}
            footer={<ChatForm />}
        />
    )
}