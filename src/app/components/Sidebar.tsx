import { useState } from "react";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    GitBranch,
    Calendar,
    MessageSquare,
    Mail,
    BarChart3,
    Settings,
    HelpCircle,
    MessageCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Bell,
    CheckCircle2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SidebarProps {
    activePage: string;
    onNavigate: (page: string) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const primaryNavItems = [
        { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
        { icon: Briefcase, label: "Jobs", page: "jobs" },
        { icon: Users, label: "Candidates", page: "candidates" },
        { icon: GitBranch, label: "Pipeline", page: "pipeline" },
        { icon: Calendar, label: "Interviews", page: "interviews" },
        { icon: CheckCircle2, label: "Tasks", page: "tasks" },
        { icon: MessageSquare, label: "Messages", page: "messages" },
        { icon: Mail, label: "Templates", page: "templates" },
        { icon: BarChart3, label: "Analytics", page: "analytics" },
        { icon: Bell, label: "Notifications", page: "activity" },
        { icon: Settings, label: "Settings", page: "settings" },
    ];

    const secondaryNavItems = [
        { icon: HelpCircle, label: "Help Center", page: "help" },
        { icon: MessageCircle, label: "Support", page: "support" },
    ];

    return (
        <aside 
            className={`bg-[#800020] border-r border-[#600018] flex flex-col h-screen sticky top-0 transition-all duration-300 relative ${
                isCollapsed ? "w-[80px]" : "w-[260px]"
            }`}
        >
            {/* Collapse/Expand Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-7 z-20 flex items-center justify-center w-6 h-6 rounded-full bg-[#600018] border border-gray-300 text-white hover:bg-[#A52A2A] transition-all shadow-md"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>

            {/* Brand Area */}
            <div className={`p-6 border-b border-[#600018] flex items-center ${isCollapsed ? "justify-center p-4" : "gap-3"}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#A52A2A] to-[#8B0000] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">OT</span>
                </div>
                {!isCollapsed && (
                    <div className="overflow-hidden">
                        <h1 className="text-white font-semibold truncate text-base">MployUs</h1>
                        <p className="text-xs text-gray-300 truncate">Employer Workspace</p>
                    </div>
                )}
            </div>

            {/* Primary Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {primaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.page;
                    return (
                        <button
                            key={item.label}
                            onClick={() => onNavigate(item.page)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                                isActive
                                    ? "bg-[#A52A2A] text-white shadow-sm"
                                    : "text-gray-200 hover:bg-[#600018] hover:text-white"
                            } ${isCollapsed ? "justify-center px-0" : ""}`}
                            title={isCollapsed ? item.label : undefined}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                            )}
                            <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                            {!isCollapsed && <span className={isActive ? "font-medium text-sm truncate" : "text-sm truncate"}>{item.label}</span>}
                        </button>
                    );
                })}

                {/* Divider */}
                <div className="pt-4 pb-3">
                    <div className="h-px bg-gray-300" />
                </div>

                {/* Secondary Navigation */}
                {secondaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.page;
                    return (
                        <button
                            key={item.label}
                            onClick={() => onNavigate(item.page)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                isActive
                                    ? "bg-[#A52A2A] text-white shadow-sm"
                                    : "text-gray-300 hover:bg-[#600018] hover:text-white"
                            } ${isCollapsed ? "justify-center px-0" : ""}`}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                            {!isCollapsed && <span className="text-sm truncate">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Account Section */}
            <div className={`p-4 border-t border-[#600018] flex items-center ${isCollapsed ? "justify-center" : ""}`}>
                <button
                    onClick={() => onNavigate("profile")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        activePage === "profile" ? "bg-[#A52A2A]" : "hover:bg-[#600018]"
                    } ${isCollapsed ? "justify-center px-0" : ""}`}
                    title={isCollapsed ? "Profile & Account" : undefined}
                >
                    <Avatar className="w-9 h-9 flex-shrink-0">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=employer" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                        <>
                            <div className="flex-1 text-left overflow-hidden">
                                <p className="text-sm text-white truncate">Jane Doe</p>
                                <p className="text-xs text-gray-300 truncate">Hiring Manager</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
}