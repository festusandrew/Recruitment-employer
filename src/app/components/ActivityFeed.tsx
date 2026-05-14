import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Clock } from "lucide-react";

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
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-sm text-left">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg text-gray-900 font-semibold">Team Activity</h2>
                    <p className="text-sm text-gray-600 mt-0.5">Recent actions from your team</p>
                </div>
            </div>

            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={activity.id}>
                        <div className="flex gap-3">
                            <Avatar className="w-9 h-9 flex-shrink-0 border border-gray-100 shadow-sm">
                                {activity.recruiterAvatar ? (
                                    <AvatarImage src={activity.recruiterAvatar} />
                                ) : (
                                    <div className="w-full h-full bg-[#800020] flex items-center justify-center">
                                        <span className="text-white text-xs font-semibold">{activity.recruiterInitials}</span>
                                    </div>
                                )}
                                <AvatarFallback className="text-xs font-semibold bg-[#800020] text-white">
                                    {activity.recruiterInitials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 leading-relaxed">
                                    <span className="font-semibold">{activity.recruiter}</span>{" "}
                                    <span className="text-gray-600">{activity.action}</span>{" "}
                                    {activity.candidate && (
                                        <span className="font-medium text-[#800020]">{activity.candidate}</span>
                                    )}
                                    {activity.stage && (
                                        <>
                                            {" "}
                                            to <span className="font-medium text-gray-800">{activity.stage}</span>
                                        </>
                                    )}
                                    {activity.job && (
                                        <span className="font-medium text-gray-800"> • {activity.job}</span>
                                    )}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1 font-medium">
                                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                                </div>
                            </div>
                        </div>

                        {index < activities.length - 1 && (
                            <div className="h-px bg-gray-100 my-4" />
                        )}
                    </div>
                ))}
            </div>

            <button 
                onClick={onViewAll}
                className="w-full mt-6 py-2.5 text-sm text-[#800020] hover:text-white hover:bg-[#800020] border border-[#800020]/20 hover:border-[#800020] rounded-lg transition-colors cursor-pointer font-medium"
            >
                View all activity
            </button>
        </div>
    );
}