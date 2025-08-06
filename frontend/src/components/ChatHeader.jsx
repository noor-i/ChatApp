import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex justify-between items-center p-2.5 border-b border-base-300">
      {/* User Profile and Info */}
      <div className="flex gap-3 items-center pl-2">
        <div className="avatar w-10 h-10">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className=""
          />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-medium">{selectedUser.fullName}</span>
          <span className="text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      {/* Icon for closing */}
      <button className="p-3 btn" onClick={() => setSelectedUser(null)}>
        <X />
      </button>
    </div>
  );
};

export default ChatHeader;
