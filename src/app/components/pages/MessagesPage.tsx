import { Search, MoreVertical, Send, Paperclip, Smile, MessageSquare, ArrowLeft, Video, Calendar, Phone, ShieldAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const initialConversations = [
    { id: 1, name: "Sarah Chen", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah3", lastMessage: "Thanks for the update!", time: "2m ago", unread: 2, online: true },
    { id: 2, name: "Michael Torres", role: "Frontend Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael3", lastMessage: "When can we schedule the interview?", time: "1h ago", unread: 0, online: false },
    { id: 3, name: "Emily Watson", role: "Marketing Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily3", lastMessage: "I've reviewed the offer letter", time: "3h ago", unread: 1, online: true },
    { id: 4, name: "David Kim", role: "Data Analyst", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david3", lastMessage: "Thank you for considering my application", time: "1d ago", unread: 0, online: false },
];

const initialMessages = [
    { id: 1, sender: "Sarah Chen", content: "Hi! I wanted to follow up on the next steps in the interview process.", time: "10:30 AM", isSender: false },
    { id: 2, sender: "You", content: "Hi Sarah! Thanks for reaching out. We'd like to schedule a technical interview with you.", time: "10:35 AM", isSender: true },
    { id: 3, sender: "Sarah Chen", content: "That sounds great! I'm available next week. What days work best for your team?", time: "10:36 AM", isSender: false },
    { id: 4, sender: "You", content: "Perfect! How about Tuesday at 2:00 PM or Thursday at 10:00 AM?", time: "10:40 AM", isSender: true },
    { id: 5, sender: "Sarah Chen", content: "Tuesday at 2:00 PM works perfectly for me. Thanks for the update!", time: "10:42 AM", isSender: false },
];

export function MessagesPage() {
    const [conversationsList, setConversationsList] = useState(initialConversations);
    const [selectedConversation, setSelectedConversation] = useState<any>(initialConversations[0]);
    const [messageInput, setMessageInput] = useState("");
    const [messagesList, setMessagesList] = useState(initialMessages);

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

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;

        const newMsg = {
            id: Date.now(),
            sender: "You",
            content: messageInput,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSender: true
        };

        setMessagesList([...messagesList, newMsg]);
        
        // Update last message in conversation
        setConversationsList(prev => prev.map(c => 
            c.id === selectedConversation.id 
                ? { ...c, lastMessage: messageInput, time: "Just now" } 
                : c
        ));
        
        setMessageInput("");
        toast.success("Message sent successfully!");
    };

    return (
        <div className="p-8 text-left bg-gray-50/40 min-h-full flex flex-col">
            <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col space-y-6">
                
                {/* Header info */}
                <div>
                    <h1 className="text-gray-955 font-extrabold text-2xl tracking-tight leading-none flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-[#800020]" />
                        Applicant Messenger
                    </h1>
                    <p className="text-xs text-gray-400 font-semibold mt-1 uppercase tracking-wider">Direct chat channels with active job seekers and sourced candidates</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-150  overflow-hidden flex-1 flex min-h-[500px] h-[calc(100vh-230px)]">
                    
                    {/* Left Sidebar - Conversations */}
                    <div className="w-80 border-r border-gray-200/60 flex flex-col flex-shrink-0 bg-white">
                        <div className="p-5 border-b border-gray-150">
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-450" />
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] focus:bg-white transition-all text-xs font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-gray-100">
                            {conversationsList.map((conversation) => {
                                const isSelected = selectedConversation?.id === conversation.id;
                                return (
                                    <button
                                        key={conversation.id}
                                        onClick={() => {
                                            setSelectedConversation(conversation);
                                            // Reset unread count on select
                                            setConversationsList(prev => prev.map(c => c.id === conversation.id ? { ...c, unread: 0 } : c));
                                        }}
                                        className={`w-full p-4.5 flex items-start gap-3.5 hover:bg-gray-50/50 transition-all text-left border-l-4 cursor-pointer select-none ${
                                            isSelected 
                                                ? "bg-[#F5E6E8]/30 border-l-[#800020] " 
                                                : "border-l-transparent"
                                        }`}
                                    >
                                        <div className="relative flex-shrink-0">
                                            <Avatar className="w-11 h-11 border border-white ">
                                                <AvatarImage src={conversation.avatar} />
                                                <AvatarFallback className="bg-primary   text-white font-bold text-xs">{conversation.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {conversation.online && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="text-xs font-extrabold text-gray-900 truncate leading-none">{conversation.name}</h4>
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{conversation.time}</span>
                                            </div>
                                            <p className="text-[10px] text-[#800020] font-extrabold uppercase tracking-wide mb-1 truncate">{conversation.role}</p>
                                            <p className="text-xs text-gray-500 truncate font-medium">{conversation.lastMessage}</p>
                                        </div>
                                        {conversation.unread > 0 && (
                                            <div className="w-5 h-5 bg-[#800020] text-white text-[9px] rounded-full flex items-center justify-center flex-shrink-0 font-extrabold  self-center">
                                                {conversation.unread}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Panel - Chat Workspace */}
                    <div className="flex-1 flex flex-col min-w-0 bg-white relative">
                        <AnimatePresence mode="wait">
                            {selectedConversation ? (
                                <motion.div 
                                    key={selectedConversation.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-1 flex flex-col min-h-0"
                                >
                                    {/* Header */}
                                    <div className="p-4.5 border-b border-gray-150 flex items-center justify-between bg-white flex-shrink-0 relative z-10">
                                        <div className="flex items-center gap-3.5">
                                            <button 
                                                onClick={() => setSelectedConversation(null)}
                                                className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 md:hidden cursor-pointer"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                            <div className="relative">
                                                <Avatar className="w-10 h-10 border border-white ">
                                                    <AvatarImage src={selectedConversation.avatar} />
                                                    <AvatarFallback className="bg-primary   text-white font-bold text-xs">{selectedConversation.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                {selectedConversation.online && (
                                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-extrabold text-gray-900 leading-none">{selectedConversation.name}</h3>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{selectedConversation.role}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
                                            <span className="hidden sm:inline flex items-center gap-1">
                                                Press <kbd className="px-1.5 py-0.5 bg-gray-150 border border-gray-250 rounded text-gray-600 font-mono  text-[10px]">ESC</kbd> to exit chat
                                            </span>
                                            
                                            <div className="flex items-center gap-1">
                                                <button 
                                                    onClick={() => toast.info(`Starting video interview room...`)}
                                                    className="w-8.5 h-8.5 flex items-center justify-center rounded-xl hover:bg-gray-50 border border-gray-200 text-gray-450 hover:text-gray-900 cursor-pointer transition-colors"
                                                    title="Start Video Meeting"
                                                >
                                                    <Video className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => toast.info(`Opening scheduler for ${selectedConversation.name}...`)}
                                                    className="w-8.5 h-8.5 flex items-center justify-center rounded-xl hover:bg-gray-50 border border-gray-200 text-gray-450 hover:text-gray-900 cursor-pointer transition-colors"
                                                    title="Schedule Slot"
                                                >
                                                    <Calendar className="w-4 h-4" />
                                                </button>
                                                <button className="w-8.5 h-8.5 flex items-center justify-center rounded-xl hover:bg-gray-50 border border-gray-200 text-gray-455 hover:text-gray-900 cursor-pointer transition-colors">
                                                    <MoreVertical className="w-4.5 h-4.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Messages list */}
                                    <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gray-55/20 no-scrollbar">
                                        {messagesList.map((message) => {
                                            const isYou = message.isSender;
                                            return (
                                                <div
                                                    key={message.id}
                                                    className={`flex gap-3 ${isYou ? "flex-row-reverse" : ""}`}
                                                >
                                                    {!isYou && (
                                                        <Avatar className="w-8 h-8 flex-shrink-0 ">
                                                            <AvatarImage src={selectedConversation.avatar} />
                                                            <AvatarFallback className="text-xs font-bold">{selectedConversation.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                    <div className={`flex flex-col ${isYou ? "items-end" : "items-start"} max-w-[70%] sm:max-w-md`}>
                                                        <div
                                                            className={`px-4 py-3 rounded-2xl  border transition-colors leading-relaxed font-medium text-xs text-left ${
                                                                isYou
                                                                    ? "bg-[#800020] border-[#800020]/10 text-white rounded-tr-xs"
                                                                    : "bg-white border-gray-150 text-gray-900 rounded-tl-xs"
                                                            }`}
                                                        >
                                                            <p>{message.content}</p>
                                                        </div>
                                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1.5 px-1">{message.time}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Message input footer */}
                                    <div className="p-4.5 border-t border-gray-150 bg-white flex-shrink-0">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 flex items-center gap-2 bg-gray-50/50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-[#800020]/30 focus-within:ring-2 focus-within:ring-[#800020]/10 transition-all">
                                                <input
                                                    type="text"
                                                    placeholder={`Type a message to ${selectedConversation.name}...`}
                                                    value={messageInput}
                                                    onChange={(e) => setMessageInput(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleSendMessage();
                                                        }
                                                    }}
                                                    className="flex-1 bg-transparent outline-none text-xs font-medium text-gray-800 placeholder-gray-400"
                                                />
                                                <button 
                                                    onClick={() => toast.info("Opening file picker...")}
                                                    className="p-1 hover:bg-gray-200/50 rounded-lg transition-colors cursor-pointer text-gray-400 hover:text-gray-700"
                                                >
                                                    <Paperclip className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => toast.info("Opening emoji selector...")}
                                                    className="p-1 hover:bg-gray-200/50 rounded-lg transition-colors cursor-pointer text-gray-400 hover:text-gray-700"
                                                >
                                                    <Smile className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleSendMessage}
                                                className="px-5 py-3 bg-[#800020] hover:bg-[#600018] text-white rounded-xl transition-all flex items-center justify-center gap-1.5 font-extrabold text-xs  border border-[#800020]/10 hover: cursor-pointer tracking-wider uppercase"
                                            >
                                                <Send className="w-3.5 h-3.5 text-orange-300" />
                                                <span>Send</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                /* Empty chat state placeholder */
                                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/20 p-8 text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#800020] mb-4 ">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-base font-extrabold text-gray-900 mb-1">No Active Chat Selected</h3>
                                    <p className="text-xs text-gray-500 max-w-sm font-medium leading-relaxed mb-6">
                                        Choose an applicant from the sidebar channels to review threads, schedule calls, and coordinate follow-up materials.
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
}



