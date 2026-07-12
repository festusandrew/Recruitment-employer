import { Bell, Search, Menu, Check } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { useState } from "react";

interface HeaderProps {
    onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "Sarah Chen advanced to Interview stage", time: "5 mins ago", read: false },
        { id: 2, text: "New application received: Senior Frontend Developer position", time: "1 hour ago", read: false },
        { id: 3, text: "Workspace subscription upgraded to Enterprise Plan successfully", time: "2 hours ago", read: true }
    ]);

    return (
        <header className="glass-light border-b border-slate-200/50 px-6 md:px-8 py-4.5 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onMenuClick}
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-all block md:hidden cursor-pointer border border-slate-200/50"
                        title="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="text-left">
                        <h1 className="text-lg md:text-xl text-slate-900 font-extrabold tracking-tight leading-tight font-sans">Employer Dashboard</h1>
                        <p className="text-[10px] md:text-xs text-slate-500 font-medium tracking-wide uppercase mt-0.5 hidden sm:block">
                            Manage your recruitment pipelines and talent pool
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3.5">
                    {/* Search Button */}
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 border border-slate-200/40 transition-all cursor-pointer bg-white shadow-sm"
                    >
                        <Search className="w-4.5 h-4.5" />
                    </motion.button>

                    {/* Notifications Button */}
                    <div className="relative">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-600 border border-slate-200/40 transition-all relative cursor-pointer bg-white shadow-sm"
                        >
                            <Bell className="w-4.5 h-4.5" />
                            {notifications.some(n => !n.read) && (
                                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-indigo-600 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm">
                                    {notifications.filter(n => !n.read).length}
                                </Badge>
                            )}
                        </motion.button>

                        {showNotifications && (
                            <>
                                <div 
                                    className="fixed inset-0 z-40" 
                                    onClick={() => setShowNotifications(false)}
                                />
                                <div className="absolute right-0 mt-2.5 w-80 bg-white border border-slate-200 rounded-2xl shadow-premium overflow-hidden z-50 text-left">
                                    {/* Header */}
                                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                        <span className="text-xs font-extrabold text-slate-900 tracking-tight">Notifications</span>
                                        {notifications.some(n => !n.read) && (
                                            <button 
                                                onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                                                className="text-[10px] font-extrabold text-indigo-600 hover:text-indigo-850 cursor-pointer flex items-center gap-1"
                                            >
                                                <Check className="w-3 h-3" /> Mark all read
                                            </button>
                                        )}
                                    </div>
                                    {/* Notifications List */}
                                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map((n) => (
                                                <div 
                                                    key={n.id}
                                                    onClick={() => {
                                                        setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
                                                    }}
                                                    className={`p-3.5 hover:bg-slate-50/50 transition-colors cursor-pointer flex gap-3 text-xs font-semibold text-slate-700 ${!n.read ? 'bg-indigo-600/5' : ''}`}
                                                >
                                                    {/* Unread indicator */}
                                                    {!n.read && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="leading-relaxed text-[11px] font-semibold text-slate-800">{n.text}</p>
                                                        <span className="text-[9px] text-slate-400 font-bold block mt-1">{n.time}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-6 text-center text-xs font-bold text-slate-400">
                                                No notifications at this time
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* User Avatar */}
                    <Avatar className="w-9 h-9 cursor-pointer ring-2 ring-slate-100 hover:ring-indigo-600/30 hover:scale-105 transition-all shadow-sm">
                        <AvatarFallback className="bg-indigo-600 text-white font-bold">JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}


