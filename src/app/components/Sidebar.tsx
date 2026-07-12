import { useState, useEffect } from "react";
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
    
    // Branding states loaded from localStorage
    const [companyName, setCompanyName] = useState(() => localStorage.getItem("mployus_company_name") || "MployUs Inc.");
    const [companyLogo, setCompanyLogo] = useState<string | null>(() => localStorage.getItem("mployus_company_logo") || null);

    useEffect(() => {
        const handleStorageChange = () => {
            setCompanyName(localStorage.getItem("mployus_company_name") || "MployUs Inc.");
            setCompanyLogo(localStorage.getItem("mployus_company_logo") || null);
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const primaryNavItems = [
        { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
        { icon: Briefcase, label: "Jobs", page: "jobs" },
        { icon: Users, label: "Candidates", page: "candidates" },
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
            className={`bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0 z-50 transition-all duration-300 relative ${
                isCollapsed ? "w-[80px]" : "w-[260px]"
            }`}
        >
            {/* Collapse/Expand Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-7 z-[999] flex items-center justify-center w-6 h-6 rounded-full bg-sidebar-accent border border-sidebar-border text-sidebar-foreground hover:bg-sidebar-primary transition-all shadow-md cursor-pointer"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>

            {/* Brand Area */}
            <div className={`p-6 border-b border-sidebar-border flex items-center ${isCollapsed ? "justify-center p-4" : "gap-3"}`}>
                {companyLogo ? (
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/10 shadow-sm">
                        <img src={companyLogo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                ) : (
                    <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-glow-primary">
                        <span className="text-white text-sm font-extrabold tracking-wider font-sans">
                            {companyName.charAt(0)}
                        </span>
                    </div>
                )}
                {!isCollapsed && (
                    <div className="overflow-hidden text-left">
                        <h1 className="text-white font-bold tracking-tight truncate text-base font-sans leading-none">{companyName}</h1>
                        <p className="text-[9px] text-indigo-200/60 font-bold tracking-widest uppercase truncate mt-1">Workspace</p>
                    </div>
                )}
            </div>

            {/* Primary Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
                {primaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.page;
                    return (
                        <button
                            key={item.label}
                            onClick={() => onNavigate(item.page)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group relative ${
                                isActive
                                    ? "bg-indigo-600 text-white shadow-premium shadow-glow-primary font-medium scale-[1.02]"
                                    : "text-sidebar-foreground/75 hover:bg-white/5 hover:text-white hover:scale-[1.01]"
                            } ${isCollapsed ? "justify-center px-0" : ""}`}
                            title={isCollapsed ? item.label : undefined}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full" />
                            )}
                            <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-sidebar-foreground/60 group-hover:text-white"}`} strokeWidth={isActive ? 2.5 : 2} />
                            {!isCollapsed && <span className="text-[13px] truncate">{item.label}</span>}
                        </button>
                    );
                })}

                {/* Divider */}
                <div className="pt-4 pb-3">
                    <div className="h-px bg-sidebar-border" />
                </div>

                {/* Secondary Navigation */}
                {secondaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.page;
                    return (
                        <button
                            key={item.label}
                            onClick={() => onNavigate(item.page)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group ${
                                isActive
                                    ? "bg-indigo-600 text-white shadow-premium shadow-glow-primary font-medium scale-[1.02]"
                                    : "text-sidebar-foreground/75 hover:bg-white/5 hover:text-white hover:scale-[1.01]"
                            } ${isCollapsed ? "justify-center px-0" : ""}`}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-sidebar-foreground/60 group-hover:text-white"}`} strokeWidth={2} />
                            {!isCollapsed && <span className="text-[13px] truncate">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Account Section & Platform Attribution Footer */}
            <div className="flex flex-col border-t border-sidebar-border/60">
                <div className={`p-4 flex items-center ${isCollapsed ? "justify-center" : ""}`}>
                    <button
                        onClick={() => onNavigate("profile")}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                            activePage === "profile" 
                                ? "bg-indigo-600 text-white shadow-premium shadow-glow-primary font-medium" 
                                : "text-sidebar-foreground/85 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5"
                        } ${isCollapsed ? "justify-center px-0" : ""}`}
                        title={isCollapsed ? "Profile & Account" : undefined}
                    >
                        <Avatar className="w-8 h-8 flex-shrink-0 ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-200">
                            <AvatarFallback className="bg-indigo-600 text-white font-bold">JD</AvatarFallback>
                        </Avatar>
                        {!isCollapsed && (
                            <>
                                <div className="flex-1 text-left overflow-hidden">
                                    <p className="text-xs font-semibold text-white truncate">Jane Doe</p>
                                    <p className="text-[10px] text-sidebar-foreground/50 truncate font-medium">Hiring Manager</p>
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-sidebar-foreground/40 group-hover:text-white/60 transition-colors flex-shrink-0" />
                            </>
                        )}
                    </button>
                </div>
                {!isCollapsed && (
                    <div className="pb-4 px-6 text-center text-[9px] font-bold text-indigo-200/30 uppercase tracking-widest pointer-events-none select-none">
                        Powered by MployUs
                    </div>
                )}
            </div>
        </aside>
    );
}


