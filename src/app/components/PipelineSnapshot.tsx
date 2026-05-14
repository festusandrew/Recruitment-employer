import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const pipelineStages = [
    {
        id: 1,
        name: "Applied",
        count: 127,
        color: "bg-[#F5E6E8] border-[#E9967A]",
        candidates: [
            {
                id: 1,
                name: "Sarah Johnson",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
                initials: "SJ",
            },
            {
                id: 2,
                name: "Michael Chen",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
                initials: "MC",
            },
            {
                id: 3,
                name: "Emma Davis",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
                initials: "ED",
            },
            {
                id: 4,
                name: "James Wilson",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
                initials: "JW",
            },
        ],
    },
    {
        id: 2,
        name: "Screened",
        count: 45,
        color: "bg-purple-50 border-purple-200",
        candidates: [
            {
                id: 5,
                name: "Olivia Martinez",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
                initials: "OM",
            },
            {
                id: 6,
                name: "Liam Brown",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liam",
                initials: "LB",
            },
            {
                id: 7,
                name: "Sophia Lee",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
                initials: "SL",
            },
        ],
    },
    {
        id: 3,
        name: "Interviewing",
        count: 18,
        color: "bg-green-50 border-green-200",
        candidates: [
            {
                id: 8,
                name: "Noah Anderson",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noah",
                initials: "NA",
            },
            {
                id: 9,
                name: "Ava Taylor",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ava",
                initials: "AT",
            },
        ],
    },
];

export function PipelineSnapshot({ onViewCandidates }: { onViewCandidates?: () => void }) {
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-sm text-left">
            <div className="mb-6">
                <h2 className="text-lg text-gray-900 font-semibold">Pipeline Snapshot</h2>
                <p className="text-sm text-gray-600 mt-0.5">
                    Quick overview of candidates across stages
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {pipelineStages.map((stage) => (
                    <div
                        key={stage.id}
                        onClick={onViewCandidates}
                        className={`${stage.color} rounded-lg p-5 border transition-all duration-200 hover:shadow-md cursor-pointer`}
                    >
                        {/* Stage Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-900">{stage.name}</h3>
                            <Badge variant="secondary" className="bg-white/90 text-gray-900 font-semibold">
                                {stage.count}
                            </Badge>
                        </div>

                        {/* Candidate Avatars */}
                        <div className="flex -space-x-2 mb-4">
                            {stage.candidates.map((candidate, index) => (
                                <Avatar
                                    key={candidate.id}
                                    className="w-10 h-10 border-2 border-white hover:z-10 hover:scale-110 transition-transform cursor-pointer"
                                    style={{ zIndex: stage.candidates.length - index }}
                                >
                                    <AvatarImage src={candidate.avatar} />
                                    <AvatarFallback className="text-xs font-semibold bg-[#800020] text-white">{candidate.initials}</AvatarFallback>
                                </Avatar>
                            ))}
                            {stage.count > stage.candidates.length && (
                                <div
                                    className="w-10 h-10 rounded-full bg-white border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-700 shadow-sm"
                                    style={{ zIndex: 0 }}
                                >
                                    +{stage.count - stage.candidates.length}
                                </div>
                            )}
                        </div>

                        {/* View All Link */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onViewCandidates) onViewCandidates();
                            }}
                            className="text-sm font-medium text-[#800020] hover:text-[#600018] hover:underline transition-colors cursor-pointer"
                        >
                            View all candidates →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}