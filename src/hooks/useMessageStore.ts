import {MessageDto} from "@/types";
import {devtools} from "zustand/middleware";
import {create} from "zustand";

type MessageState = {
    messages: MessageDto[];
    add: (message: MessageDto) => void;
    remove: (id: string) => void;
    set: (messages: MessageDto[]) => void;
}

const useMessageStore = create<MessageState>()(devtools((set) => ({
    messages: [],
    add: (message) => set(state => ({messages: [message, ...state.messages]})),
    remove: (id) => set(state => ({messages: state.messages.filter(message => message.id !== id)})),
    set: (messages) => set({messages: messages}),
}), {name: "messageStore"}));

export default useMessageStore;