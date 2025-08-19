import React, { useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessageInput from "./ChatMessageInput";
import MessagesSkeleton from "./skeletons/MessagesSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import formatMessageTime from "../lib/time";

const ChatContainer = () => {
  const {
    getMessages,
    messages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  // Run getMessages whenever anything in the dependency array changes (selectedUser or getMessages function)
  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeFromMessages();

    // Cleans up old message listeners when the chat changes or the component unmounts.
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        <ChatHeader />
        <MessagesSkeleton />
        <ChatMessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            {/* profile pic of sender */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile picture"
                />
              </div>
            </div>
            {/* time */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            {/* message bubble */}
            <div className="chat-bubble flex flex-col gap-2.5">
              {message.text && <p>{message.text}</p>}
              {message.image && (
                <img
                  src={message.image}
                  className="sm:max-w-[200px] rounded-md mb-2"
                  alt="Attachment"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <ChatMessageInput />
    </div>
  );
};

export default ChatContainer;
