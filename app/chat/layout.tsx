import ChatNavbar from "../components/ChatNavbar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatNavbar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
