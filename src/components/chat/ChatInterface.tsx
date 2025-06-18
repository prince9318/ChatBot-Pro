import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

export function ChatInterface() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <MessageList />
      <MessageInput />
    </div>
  );
}
