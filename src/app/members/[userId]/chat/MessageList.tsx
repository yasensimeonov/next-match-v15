'use client';

import MessageBox from "@/app/members/[userId]/chat/MessageBox";
import {MessageDto} from "@/types";
import {useCallback, useEffect, useRef, useState} from "react";
import {pusherClient} from "@/lib/pusher";
import {formatShortDateTime} from "@/lib/util";
import {Channel} from "pusher-js";
import useMessageStore from "@/hooks/useMessageStore";

type Props = {
    initialMessages: {messages: MessageDto[], readCount: number};
    currentUserId: string;
    chatId: string;
}

export default function MessageList({initialMessages, currentUserId, chatId}: Props) {
    const [messages, setMessages] = useState(initialMessages.messages);
    const channelRef = useRef<Channel | null>(null);
    const updateUnreadCount = useMessageStore(state => state.updateUnreadCount);
    const setReadCount = useRef(false);

    useEffect(() => {
        if (!setReadCount.current) {
            updateUnreadCount(-initialMessages.readCount);
            setReadCount.current = true;
        }
    }, [initialMessages.readCount, updateUnreadCount]);

    const handleNewMessage = useCallback((message: MessageDto) => {
        setMessages(prevMessages => {
            return [...prevMessages, message];
        })
    }, [])

    const handleReadMessages = useCallback((messageIds: string[]) => {
        setMessages(prevMessages => prevMessages.map(message => messageIds.includes(message.id)
            ? {...message, dateRead: formatShortDateTime(new Date())}
            : message
        ))
    }, [])

    useEffect(() => {
        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe(chatId);

            channelRef.current.bind('message:new', handleNewMessage);
            channelRef.current.bind('messages:read', handleReadMessages);
        }

        return () => {
            if (channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();

                //channel.unbind_all();
                channelRef.current.unbind('message:new', handleNewMessage);
                channelRef.current.unbind('messages:read', handleReadMessages);
            }
        }
    }, [chatId, handleNewMessage, handleReadMessages]);

    return (
        <div>
            {messages.length === 0 ? 'No messages to display': (
                <div>
                    {messages.map(message => (
                        <MessageBox
                            key={message.id}
                            message={message}
                            currentUserId={currentUserId}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}