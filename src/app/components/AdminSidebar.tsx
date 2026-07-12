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
        <aside className="w-[260px] bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
            {/* Brand Area */}
            <div className="p-6 border-b border-sidebar-border">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-glow-primary">
                        <Shield className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold tracking-tight text-base font-sans">MployUs</h1>
                        <p className="text-[9px] text-amber-200/60 font-semibold tracking-widest uppercase truncate mt-0.5">Super Admin</p>
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
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group relative ${
                                isActive
                                    ? "bg-amber-600 text-white shadow-premium font-medium scale-[1.02]"
                                    : "text-sidebar-foreground/75 hover:bg-white/5 hover:text-white hover:scale-[1.01]"
                            }`}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full" />
                            )}
                            <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-sidebar-foreground/60 group-hover:text-white"}`} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[13px] truncate">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Exit Admin Mode Button */}
            <div className="p-4 border-t border-sidebar-border/60">
                <button
                    onClick={onExitAdminMode}
                    className="w-full px-4 py-2.5 mb-3 bg-white/5 text-sidebar-foreground hover:bg-white/10 hover:text-white border border-sidebar-border/60 rounded-xl transition-all duration-200 text-xs font-semibold active:scale-[0.98] cursor-pointer"
                >
                    Exit Admin Mode
                </button>

                <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5 transition-all duration-300 group"
                >
                    <Avatar className="w-8 h-8 flex-shrink-0 ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-200">
                        <AvatarFallback className="bg-amber-600 text-white font-bold">SA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left overflow-hidden">
                        <p className="text-xs font-semibold text-white truncate">Super Admin</p>
                        <p className="text-[10px] text-sidebar-foreground/50 truncate font-medium">System Administrator</p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-sidebar-foreground/40 group-hover:text-white/60 transition-colors flex-shrink-0" />
                </button>
            </div>
        </aside>
    );
}



