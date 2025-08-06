import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessageInput from "./ChatMessageInput";
import MessagesSkeleton from "./skeletons/MessagesSkeleton";

const ChatContainer = () => {
  const { getMessages, messages, isMessagesLoading, selectedUser } =
    useChatStore();

  // Run getMessages whenever anything in the dependency array changes (selectedUser or getMessages function)
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

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
      <p>messages....</p>
      <ChatMessageInput />
    </div>
  );
};

export default ChatContainer;
