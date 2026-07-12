import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Clock, Search, Filter, Calendar, CheckCircle2, UserPlus, MessageSquare, Send, ArrowRight, Bell, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const allActivities = [
    {
        id: 1,
        recruiter: "Alex Morgan",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
        recruiterInitials: "AM",
        type: "stage_change",
        icon: ArrowRight,
        iconBg: "bg-blue-50 text-blue-700 border-blue-100",
        action: "moved applicant",
        applicant: "Sarah Johnson",
        details: "from Screening to Technical Interview stage",
        job: "Senior Frontend Developer",
        timestamp: "12 minutes ago",
        dateGroup: "Today",
    },
    {
        id: 2,
        recruiter: "System",
        recruiterAvatar: null,
        recruiterInitials: "SY",
        type: "application",
        icon: UserPlus,
        iconBg: "bg-green-50 text-green-700 border-green-100",
        action: "received new application from",
        job: "Senior Frontend Developer",
        applicant: "David Miller",
        details: "Match score calculated: 94%",
        timestamp: "28 minutes ago",
        dateGroup: "Today",
    },
    {
        id: 3,
        recruiter: "Jessica Lee",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
        recruiterInitials: "JL",
        type: "feedback",
        icon: MessageSquare,
        iconBg: "bg-purple-50 text-purple-700 border-purple-100",
        action: "added interview feedback for",
        applicant: "Michael Chen",
        details: "'Excellent technical skills and outstanding communication.'",
        job: "Product Designer",
        timestamp: "1 hour ago",
        dateGroup: "Today",
    },
    {
        id: 4,
        recruiter: "David Kim",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
        recruiterInitials: "DK",
        type: "interview",
        icon: Calendar,
        iconBg: "bg-amber-50 text-amber-700 border-amber-100",
        action: "scheduled interview with",
        applicant: "Emma Davis",
        details: "Technical Round - Thursday, May 18 at 2:00 PM",
        job: "DevOps Engineer",
        timestamp: "2 hours ago",
        dateGroup: "Today",
    },
    {
        id: 5,
        recruiter: "Rachel Green",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel",
        recruiterInitials: "RG",
        type: "offer",
        icon: Send,
        iconBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
        action: "sent official job offer to",
        applicant: "James Wilson",
        details: "Senior Product Designer - €110,000 base salary",
        job: "Product Designer",
        timestamp: "3 hours ago",
        dateGroup: "Today",
    },
    {
        id: 6,
        recruiter: "System",
        recruiterAvatar: null,
        recruiterInitials: "SY",
        type: "application",
        icon: UserPlus,
        iconBg: "bg-green-50 text-green-700 border-green-100",
        action: "received new application from",
        job: "Product Designer",
        applicant: "Elena Rostova",
        details: "Match score calculated: 89%",
        timestamp: "4 hours ago",
        dateGroup: "Today",
    },
    {
        id: 7,
        recruiter: "Alex Morgan",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
        recruiterInitials: "AM",
        type: "stage_change",
        icon: ArrowRight,
        iconBg: "bg-blue-50 text-blue-700 border-blue-100",
        action: "moved applicant",
        applicant: "Lucas Peeters",
        details: "from Application Review to screening call stage",
        job: "Senior Frontend Developer",
        timestamp: "Yesterday at 4:15 PM",
        dateGroup: "Yesterday",
    },
    {
        id: 8,
        recruiter: "Marcus Vance",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
        recruiterInitials: "MV",
        type: "offer",
        icon: CheckCircle2,
        iconBg: "bg-indigo-50 text-indigo-600 border-indigo-600/10",
        action: "hired applicant",
        applicant: "Sophia Martinez",
        details: "Signed offer letter received! onboarding initiated.",
        job: "Marketing Manager",
        timestamp: "Yesterday at 11:30 AM",
        dateGroup: "Yesterday",
    },
    {
        id: 9,
        recruiter: "System",
        recruiterAvatar: null,
        recruiterInitials: "SY",
        type: "application",
        icon: UserPlus,
        iconBg: "bg-green-50 text-green-700 border-green-100",
        action: "received new application from",
        job: "Data Analyst",
        applicant: "Tom Cruise",
        details: "Match score calculated: 78%",
        timestamp: "May 12, 2026",
        dateGroup: "Last Week",
    },
];

export function ActivityPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("all");

    const filteredActivities = allActivities.filter((act) => {
        const matchesSearch = 
            act.recruiter.toLowerCase().includes(searchQuery.toLowerCase()) ||
            act.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            act.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (act.applicant && act.applicant.toLowerCase().includes(searchQuery.toLowerCase())) ||
            act.details.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = selectedType === "all" || act.type === selectedType;

        return matchesSearch && matchesType;
    });

    const groupedActivities = filteredActivities.reduce((groups, act) => {
        if (!groups[act.dateGroup]) {
            groups[act.dateGroup] = [];
        }
        groups[act.dateGroup].push(act);
        return groups;
    }, {} as Record<string, typeof allActivities>);

    return (
        <div className="p-8 max-w-[1400px] mx-auto text-left">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        Notifications Log
                        <Bell className="w-6 h-6 text-indigo-600" />
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Real-time activity tracking and audit log across your hiring teams.</p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-wrap items-center gap-3.5 bg-white/50 backdrop-blur-md p-3 rounded-2xl border border-slate-200/60 ">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search activity log..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600  transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1.5 ">
                        <Filter className="w-3.5 h-3.5 text-slate-500 ml-2" />
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="bg-transparent text-xs text-slate-700 py-1 pr-4 focus:outline-none cursor-pointer font-bold border-none"
                        >
                            <option value="all">All Event Types</option>
                            <option value="application">Applications</option>
                            <option value="stage_change">Stage Moves</option>
                            <option value="interview">Interviews</option>
                            <option value="feedback">Feedback</option>
                            <option value="offer">Offers & Hires</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Timeline Feed */}
            <div className="bg-white rounded-2xl border border-slate-200/80  overflow-hidden">
                <AnimatePresence mode="wait">
                    {Object.keys(groupedActivities).length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-16 text-center"
                        >
                            <p className="text-slate-400 text-sm font-bold">No activity records match your filter criteria.</p>
                        </motion.div>
                    ) : (
                        Object.entries(groupedActivities).map(([dateGroup, items], groupIdx) => (
                            <motion.div 
                                key={dateGroup}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: groupIdx * 0.05 }}
                                className="border-b border-slate-100 last:border-none"
                            >
                                {/* Group Date Header */}
                                <div className="bg-gray-50/60 px-6 py-3.5 border-b border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{dateGroup}</span>
                                    <span className="text-[10px] font-black bg-gray-200/60 text-slate-600 px-2.5 py-0.5 rounded-full">
                                        {items.length} {items.length === 1 ? "event" : "events"}
                                    </span>
                                </div>

                                {/* Group Items */}
                                <div className="divide-y divide-gray-100">
                                    {items.map((act, idx) => {
                                        const IconComponent = act.icon;
                                        return (
                                            <motion.div 
                                                key={act.id} 
                                                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.4)" }}
                                                className="p-6 transition-colors flex items-start gap-4"
                                            >
                                                {/* Recruiter Avatar */}
                                                <Avatar className="w-10 h-10 flex-shrink-0 border border-gray-150 ">
                                                    {act.recruiterAvatar ? (
                                                        <AvatarImage src={act.recruiterAvatar} />
                                                    ) : (
                                                        <div className="w-full h-full bg-indigo-600 flex items-center justify-center border border-white/10">
                                                            <span className="text-white text-xs font-black">{act.recruiterInitials}</span>
                                                        </div>
                                                    )}
                                                    <AvatarFallback className="text-xs font-black bg-indigo-600 text-white">
                                                        {act.recruiterInitials}
                                                    </AvatarFallback>
                                                </Avatar>

                                                {/* Action Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1.5">
                                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                                            <span className="font-bold text-slate-900">{act.recruiter}</span>{" "}
                                                            <span>{act.action}</span>{" "}
                                                            {act.applicant && (
                                                                <span className="font-extrabold text-indigo-600 bg-rose-50 px-2 py-0.5 rounded border border-indigo-600/10 text-xs">
                                                                    {act.applicant}
                                                                </span>
                                                            )}
                                                            {" "}
                                                            <span className="text-gray-300 mx-1">•</span>{" "}
                                                            <span className="font-bold text-slate-800 bg-gray-50 px-2 py-0.5 rounded border border-slate-200/60 text-xs">{act.job}</span>
                                                        </p>
                                                        <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0 font-bold">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{act.timestamp}</span>
                                                        </div>
                                                    </div>

                                                    {/* Detail card */}
                                                    <div className="mt-3 flex items-start gap-3 bg-gray-50/70 rounded-xl p-3.5 border border-slate-200/60 ">
                                                        <div className={`p-1.5 rounded-lg ${act.iconBg} flex-shrink-0 mt-0.5 border `}>
                                                            <IconComponent className="w-4 h-4" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-xs text-slate-700 leading-relaxed font-semibold">{act.details}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}



