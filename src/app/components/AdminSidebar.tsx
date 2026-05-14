import {
    LayoutDashboard,
    Building2,
    BarChart3,
    Settings,
    Users,
    Shield,
    ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AdminSidebarProps {
    activePage: string;
    onNavigate: (page: string) => void;
    onExitAdminMode: () => void;
}

export function AdminSidebar({ activePage, onNavigate, onExitAdminMode }: AdminSidebarProps) {
    const adminNavItems = [
        { icon: LayoutDashboard, label: "Dashboard", page: "admin-dashboard" },
        { icon: Building2, label: "Companies", page: "admin-companies" },
        { icon: BarChart3, label: "Analytics", page: "admin-analytics" },
        { icon: Settings, label: "System Settings", page: "admin-settings" },
    ];

    return (
        <aside className="w-[260px] bg-[#800020] border-r border-[#600018] flex flex-col h-screen sticky top-0">
            {/* Brand Area */}
            <div className="p-6 border-b border-[#600018]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#A52A2A] to-[#8B0000] rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white">MployUs</h1>
                        <p className="text-xs text-gray-300">Super Admin</p>
                    </div>
                </div>
            </div>

            {/* Admin Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
                {adminNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.page;
                    return (
                        <button
                            key={item.label}
                            onClick={() => onNavigate(item.page)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${isActive
                                    ? "bg-[#A52A2A] text-white shadow-sm"
                                    : "text-gray-200 hover:bg-[#600018] hover:text-white"
                                }`}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                            )}
                            <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                            <span className={isActive ? "font-medium" : ""}>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Exit Admin Mode Button */}
            <div className="p-4 border-t border-[#600018]">
                <button
                    onClick={onExitAdminMode}
                    className="w-full px-4 py-2.5 mb-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                    Exit Admin Mode
                </button>

                <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#600018] transition-all duration-200"
                >
                    <Avatar className="w-9 h-9">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                        <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                        <p className="text-sm text-white">Super Admin</p>
                        <p className="text-xs text-gray-300">System Administrator</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-300" />
                </button>
            </div>
        </aside>
    );
}
