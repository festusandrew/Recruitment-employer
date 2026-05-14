import { Search, MoreVertical, Send, Paperclip, Smile, MessageSquare, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState, useEffect } from "react";

const conversations = [
    { id: 1, name: "Sarah Chen", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah3", lastMessage: "Thanks for the update!", time: "2m ago", unread: 2, online: true },
    { id: 2, name: "Michael Torres", role: "Frontend Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael3", lastMessage: "When can we schedule the interview?", time: "1h ago", unread: 0, online: false },
    { id: 3, name: "Emily Watson", role: "Marketing Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily3", lastMessage: "I've reviewed the offer letter", time: "3h ago", unread: 1, online: true },
    { id: 4, name: "David Kim", role: "Data Analyst", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david3", lastMessage: "Thank you for considering my application", time: "1d ago", unread: 0, online: false },
];

const messages = [
    { id: 1, sender: "Sarah Chen", content: "Hi! I wanted to follow up on the next steps in the interview process.", time: "10:30 AM", isSender: false },
    { id: 2, sender: "You", content: "Hi Sarah! Thanks for reaching out. We'd like to schedule a technical interview with you.", time: "10:35 AM", isSender: true },
    { id: 3, sender: "Sarah Chen", content: "That sounds great! I'm available next week. What days work best for your team?", time: "10:36 AM", isSender: false },
    { id: 4, sender: "You", content: "Perfect! How about Tuesday at 2:00 PM or Thursday at 10:00 AM?", time: "10:40 AM", isSender: true },
    { id: 5, sender: "Sarah Chen", content: "Tuesday at 2:00 PM works perfectly for me. Thanks for the update!", time: "10:42 AM", isSender: false },
];

export function MessagesPage() {
    const [selectedConversation, setSelectedConversation] = useState<any>(conversations[0]);
    const [messageInput, setMessageInput] = useState("");

    // Handle Escape key to leave chat
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedConversation(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="p-8">
            <div className="max-w-[1600px] mx-auto">
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>
                    <div className="flex h-full">
                        {/* Conversations List */}
                        <div className="w-80 border-r border-gray-200 flex flex-col flex-shrink-0">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-gray-900 mb-3 font-bold text-lg">Messages</h2>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search conversations..."
                                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                {conversations.map((conversation) => (
                                    <button
                                        key={conversation.id}
                                        onClick={() => setSelectedConversation(conversation)}
                                        className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 cursor-pointer ${selectedConversation?.id === conversation.id ? "bg-[#F5E6E8] border-l-4 border-l-[#800020]" : ""
                                            }`}
                                    >
                                        <div className="relative flex-shrink-0">
                                            <Avatar className="w-12 h-12 shadow-xs">
                                                <AvatarImage src={conversation.avatar} />
                                                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {conversation.online && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 text-left min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="text-sm font-bold text-gray-900 truncate">{conversation.name}</h4>
                                                <span className="text-xs text-gray-500 font-medium">{conversation.time}</span>
                                            </div>
                                            <p className="text-xs text-[#800020] font-semibold mb-1 truncate">{conversation.role}</p>
                                            <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                                        </div>
                                        {conversation.unread > 0 && (
                                            <div className="w-5 h-5 bg-[#800020] text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                                {conversation.unread}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message Thread */}
                        {selectedConversation ? (
                            <div className="flex-1 flex flex-col min-w-0 bg-white animate-in fade-in duration-150">
                                {/* Thread Header */}
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => setSelectedConversation(null)}
                                            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 md:hidden cursor-pointer"
                                            title="Leave chat"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                        <Avatar className="w-10 h-10 shadow-xs">
                                            <AvatarImage src={selectedConversation.avatar} />
                                            <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-gray-900 font-bold text-base">{selectedConversation.name}</h3>
                                            <p className="text-xs text-gray-500 font-medium">{selectedConversation.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                        <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-600 font-mono shadow-2xs">ESC</kbd> to leave chat</span>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer ml-1">
                                            <MoreVertical className="w-5 h-5 text-gray-500" />
                                        </button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex gap-3 ${message.isSender ? "flex-row-reverse" : ""}`}
                                        >
                                            {!message.isSender && (
                                                <Avatar className="w-8 h-8 flex-shrink-0 shadow-xs">
                                                    <AvatarImage src={selectedConversation.avatar} />
                                                    <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={`flex flex-col ${message.isSender ? "items-end" : "items-start"} max-w-md`}>
                                                <div
                                                    className={`px-4 py-3 rounded-2xl shadow-xs ${message.isSender
                                                            ? "bg-[#800020] text-white rounded-tr-xs"
                                                            : "bg-white border border-gray-200/80 text-gray-900 rounded-tl-xs"
                                                        }`}
                                                >
                                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                                </div>
                                                <span className="text-[11px] text-gray-400 mt-1 font-medium">{message.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="p-4 border-t border-gray-200 bg-white">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3 border border-gray-200/80 focus-within:border-[#800020]/40 focus-within:ring-1 focus-within:ring-[#800020]/40 transition-all">
                                            <input
                                                type="text"
                                                placeholder="Type a message..."
                                                value={messageInput}
                                                onChange={(e) => setMessageInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && messageInput.trim()) {
                                                        setMessageInput("");
                                                    }
                                                }}
                                                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                                            />
                                            <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer text-gray-500">
                                                <Paperclip className="w-5 h-5" />
                                            </button>
                                            <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer text-gray-500">
                                                <Smile className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => setMessageInput("")}
                                            className="px-6 py-3 bg-[#800020] text-white rounded-xl hover:bg-[#600018] transition-colors flex items-center gap-2 font-bold text-sm shadow-sm cursor-pointer"
                                        >
                                            <Send className="w-4 h-4" />
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Empty chat state placeholder */
                            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 p-8 text-center animate-in fade-in duration-150">
                                <div className="w-16 h-16 rounded-2xl bg-[#800020]/10 flex items-center justify-center text-[#800020] mb-4 shadow-inner">
                                    <MessageSquare className="w-8 h-8 stroke-[1.5]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No Active Chat Selected</h3>
                                <p className="text-sm text-gray-500 max-w-sm mb-6">
                                    Choose a conversation from the sidebar list to view messages, share files, and schedule interview appointments.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
