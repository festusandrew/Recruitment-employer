import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Clock, Search, Filter, Calendar, CheckCircle2, UserPlus, MessageSquare, Send, ArrowRight } from "lucide-react";

const allActivities = [
    {
        id: 1,
        recruiter: "Alex Morgan",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
        recruiterInitials: "AM",
        type: "stage_change",
        icon: ArrowRight,
        iconBg: "bg-blue-100 text-blue-700",
        action: "moved candidate",
        candidate: "Sarah Johnson",
        details: "from Screening to Interview stage",
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
        iconBg: "bg-green-100 text-green-700",
        action: "received new application for",
        job: "Senior Frontend Developer",
        candidate: "David Miller",
        details: "Match score: 94%",
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
        iconBg: "bg-purple-100 text-purple-700",
        action: "added interview feedback for",
        candidate: "Michael Chen",
        details: "'Excellent technical skills and great communication.'",
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
        iconBg: "bg-yellow-100 text-yellow-700",
        action: "scheduled interview with",
        candidate: "Emma Davis",
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
        iconBg: "bg-emerald-100 text-emerald-700",
        action: "sent official offer to",
        candidate: "James Wilson",
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
        iconBg: "bg-green-100 text-green-700",
        action: "received new application for",
        job: "Product Designer",
        candidate: "Elena Rostova",
        details: "Match score: 89%",
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
        iconBg: "bg-blue-100 text-blue-700",
        action: "moved candidate",
        candidate: "Lucas Peeters",
        details: "from Application Review to Screening",
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
        iconBg: "bg-[#800020]/10 text-[#800020]",
        action: "hired candidate",
        candidate: "Sophia Martinez",
        details: "Signed offer letter received!",
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
        iconBg: "bg-green-100 text-green-700",
        action: "received new application for",
        job: "Data Analyst",
        candidate: "Tom Cruise",
        details: "Match score: 78%",
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
            (act.candidate && act.candidate.toLowerCase().includes(searchQuery.toLowerCase())) ||
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    <p className="text-sm text-gray-600 mt-1">Real-time updates and notification log across your organization</p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search activity..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                        />
                    </div>

                    <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg p-1">
                        <Filter className="w-3.5 h-3.5 text-gray-500 ml-2" />
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="bg-transparent text-sm text-gray-700 py-1 pr-3 focus:outline-none cursor-pointer font-medium"
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
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
                {Object.keys(groupedActivities).length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500 text-sm">No activity records match your filter criteria.</p>
                    </div>
                ) : (
                    Object.entries(groupedActivities).map(([dateGroup, items]) => (
                        <div key={dateGroup} className="border-b border-gray-100 last:border-none">
                            {/* Group Date Header */}
                            <div className="bg-gray-50/75 px-6 py-3 border-b border-gray-100/80">
                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{dateGroup}</span>
                            </div>

                            {/* Group Items */}
                            <div className="divide-y divide-gray-100">
                                {items.map((act) => {
                                    const IconComponent = act.icon;
                                    return (
                                        <div key={act.id} className="p-6 hover:bg-gray-50/50 transition-colors flex items-start gap-4">
                                            {/* Recruiter Avatar */}
                                            <Avatar className="w-10 h-10 flex-shrink-0 border border-gray-100 shadow-sm">
                                                {act.recruiterAvatar ? (
                                                    <AvatarImage src={act.recruiterAvatar} />
                                                ) : (
                                                    <div className="w-full h-full bg-[#800020] flex items-center justify-center">
                                                        <span className="text-white text-xs font-semibold">{act.recruiterInitials}</span>
                                                    </div>
                                                )}
                                                <AvatarFallback className="text-xs font-semibold bg-[#800020] text-white">
                                                    {act.recruiterInitials}
                                                </AvatarFallback>
                                            </Avatar>

                                            {/* Action Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                                                    <p className="text-sm text-gray-900 leading-relaxed">
                                                        <span className="font-semibold">{act.recruiter}</span>{" "}
                                                        <span className="text-gray-600">{act.action}</span>{" "}
                                                        {act.candidate && (
                                                            <span className="font-medium text-[#800020]">{act.candidate}</span>
                                                        )}
                                                        {" "}
                                                        <span className="text-gray-500">•</span>{" "}
                                                        <span className="font-medium text-gray-800">{act.job}</span>
                                                    </p>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-shrink-0 font-medium">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span>{act.timestamp}</span>
                                                    </div>
                                                </div>

                                                {/* Detail card */}
                                                <div className="mt-2.5 flex items-start gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200/60">
                                                    <div className={`p-1.5 rounded-md ${act.iconBg} flex-shrink-0 mt-0.5`}>
                                                        <IconComponent className="w-4 h-4" />
                                                    </div>
                                                    <p className="text-xs text-gray-700 leading-normal font-medium">{act.details}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
