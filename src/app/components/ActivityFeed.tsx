import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const activities = [
    {
        id: 1,
        recruiter: "Alex Morgan",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
        recruiterInitials: "AM",
        action: "moved",
        candidate: "Sarah Johnson",
        stage: "Interview",
        timestamp: "12 minutes ago",
    },
    {
        id: 2,
        recruiter: "System",
        recruiterAvatar: null,
        recruiterInitials: "SY",
        action: "received new application for",
        job: "Senior Frontend Developer",
        timestamp: "28 minutes ago",
    },
    {
        id: 3,
        recruiter: "Jessica Lee",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
        recruiterInitials: "JL",
        action: "added interview feedback for",
        candidate: "Michael Chen",
        timestamp: "1 hour ago",
    },
    {
        id: 4,
        recruiter: "David Kim",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
        recruiterInitials: "DK",
        action: "scheduled interview with",
        candidate: "Emma Davis",
        timestamp: "2 hours ago",
    },
    {
        id: 5,
        recruiter: "Rachel Green",
        recruiterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel",
        recruiterInitials: "RG",
        action: "sent offer to",
        candidate: "James Wilson",
        timestamp: "3 hours ago",
    },
    {
        id: 6,
        recruiter: "System",
        recruiterAvatar: null,
        recruiterInitials: "SY",
        action: "received new application for",
        job: "Product Designer",
        timestamp: "4 hours ago",
    },
];

export function ActivityFeed({ onViewAll }: { onViewAll?: () => void }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100  text-left relative overflow-hidden flex flex-col justify-between h-[510px]">
            <div>
                <div className="mb-5">
                    <h2 className="text-lg text-slate-900 font-bold tracking-tight">Team Activity</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Recent hiring actions from your team</p>
                </div>

                {/* Timeline container */}
                <div className="relative pl-6 space-y-4 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
                    {/* Vertical Connecting Track Line */}
                    <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-100/80" />

                    {activities.map((activity, index) => {
                        const isSystem = activity.recruiter === "System";

                        return (
                            <motion.div 
                                key={activity.id}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="relative flex items-start gap-3 text-left"
                            >
                                {/* Bullet Point Marker (overlapping the track line) */}
                                <div className="absolute -left-[20px] top-1.5 z-10 w-2.5 h-2.5 rounded-full border-2 border-white bg-gray-300 ring-4 ring-white" />

                                <Avatar className="w-8 h-8 flex-shrink-0 border border-slate-100">
                                    <AvatarFallback className="text-[10px] font-bold bg-indigo-600 text-white">
                                        {activity.recruiterInitials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                                        <span className="font-bold text-slate-900">{activity.recruiter}</span>{" "}
                                        <span className="text-slate-500">{activity.action}</span>{" "}
                                        {activity.candidate && (
                                            <span className="font-bold text-indigo-600">{activity.candidate}</span>
                                        )}
                                        {activity.stage && (
                                            <>
                                                {" "}
                                                to <span className="font-bold text-slate-800">{activity.stage}</span>
                                            </>
                                        )}
                                        {activity.job && (
                                            <span className="font-bold text-slate-800"> • {activity.job}</span>
                                        )}
                                    </p>
                                    <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-bold">
                                        <Clock className="w-3 h-3 text-gray-350" />
                                        <span>{activity.timestamp}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <button 
                onClick={onViewAll}
                className="w-full mt-4 py-2.5 text-xs text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600/15 hover:border-indigo-600 rounded-xl transition-all duration-300 cursor-pointer font-bold bg-white flex items-center justify-center gap-1 "
            >
                <span>View All Activity</span>
                <ArrowRight className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}


