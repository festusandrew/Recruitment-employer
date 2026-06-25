import { Bell, Search, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

interface HeaderProps {
    onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="glass-light border-b border-gray-200/30 px-6 md:px-8 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onMenuClick}
                        className="p-2 rounded-xl hover:bg-gray-100/80 text-gray-600 transition-colors block md:hidden cursor-pointer border border-transparent hover:border-gray-200/30"
                        title="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="text-left">
                        <h1 className="text-lg md:text-xl text-gray-900 font-bold tracking-tight leading-tight">Employer Dashboard</h1>
                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5 hidden sm:block">
                            Manage your recruitment pipelines and talent pool
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3.5">
                    {/* Search Button */}
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200/40 transition-all cursor-pointer bg-white/50 "
                    >
                        <Search className="w-4.5 h-4.5" />
                    </motion.button>

                    {/* Notifications Button */}
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200/40 transition-all relative cursor-pointer bg-white/50 "
                    >
                        <Bell className="w-4.5 h-4.5" />
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#800020] text-white text-[10px] font-bold rounded-full border-2 border-white ">
                            3
                        </Badge>
                    </motion.button>

                    {/* User Avatar */}
                    <Avatar className="w-9 h-9 cursor-pointer ring-2 ring-gray-100 hover:ring-[#800020]/20 hover:scale-105 transition-all ">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=employer" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}


