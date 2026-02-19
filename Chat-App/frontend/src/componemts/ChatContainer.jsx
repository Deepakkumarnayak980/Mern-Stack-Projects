import { useEffect } from "react";
import { useChatStore } from "../stores/useChatSrore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./skeleton/MessageSkeleton";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  if (!selectedUser) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  );

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <p className="text-center text-base-content/70">
            No messages yet
          </p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="chat chat-start">
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
