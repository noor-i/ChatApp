import { MessageSquare } from "lucide-react";
import React from "react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center space-y-8 p-4 bg-base-100/50">
      <div className="border-2 p-3 rounded-xl bg-primary/10 animate-bounce">
        <MessageSquare className="size-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold">Welcome to Chai-Chat!</h2>
      <p className="text-base-content/60">
        Select a conversation from the sidebar to start chai-chatting
      </p>
    </div>
  );
};

export default NoChatSelected;
