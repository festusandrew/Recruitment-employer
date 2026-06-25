import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const pipelineStages = [
    {
        id: 1,
        name: "Applied",
        count: 127,
        color: "bg-[#F5E6E8]/80 border-[#E9967A]/30 hover:border-[#800020]/20 text-gray-900",
        bgCircle: "bg-[#800020]",
        candidates: [
            { id: 1, name: "Sarah Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", initials: "SJ" },
            { id: 2, name: "Michael Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael", initials: "MC" },
            { id: 3, name: "Emma Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", initials: "ED" },
            { id: 4, name: "James Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james", initials: "JW" },
        ],
    },
    {
        id: 2,
        name: "Screened",
        count: 45,
        color: "bg-indigo-50/80 border-indigo-100 hover:border-indigo-300 text-gray-900",
        bgCircle: "bg-indigo-600",
        candidates: [
            { id: 5, name: "Olivia Martinez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia", initials: "OM" },
            { id: 6, name: "Liam Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liam", initials: "LB" },
            { id: 7, name: "Sophia Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia", initials: "SL" },
        ],
    },
    {
        id: 3,
        name: "Interviewing",
        count: 18,
        color: "bg-emerald-50/80 border-emerald-100 hover:border-emerald-300 text-gray-900",
        bgCircle: "bg-emerald-600",
        candidates: [
            { id: 8, name: "Noah Anderson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noah", initials: "NA" },
            { id: 9, name: "Ava Taylor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ava", initials: "AT" },
        ],
    },
];

export function PipelineSnapshot({ onViewCandidates }: { onViewCandidates?: () => void }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100  text-left">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Pipeline Snapshot</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Quick overview of active applicants across key stages
                    </p>
                </div>
                <button
                    onClick={onViewCandidates}
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-[#800020] hover:text-white hover:border-[#800020] transition-all duration-300 text-xs font-semibold cursor-pointer "
                >
                    View Pipelines
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {pipelineStages.map((stage, idx) => (
                    <motion.div
                        key={stage.id}
                        onClick={onViewCandidates}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.1, ease: "easeOut" }}
                        whileHover={{ y: -3, boxShadow: "0 12px 20px -8px rgba(0,0,0,0.08)" }}
                        className={`${stage.color} rounded-2xl p-5 border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between h-40`}
                    >
                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-bold text-gray-900">{stage.name}</h3>
                                <Badge className="bg-white/90 text-gray-900 hover:bg-white border border-gray-200/50 font-bold px-2 py-0.5 text-xs  rounded-lg">
                                    {stage.count} applicants
                                </Badge>
                            </div>

                            {/* Candidate Avatars */}
                            <div className="flex items-center -space-x-2.5">
                                {stage.candidates.map((candidate, index) => (
                                    <Avatar
                                        key={candidate.id}
                                        className="w-9 h-9 border-2 border-white hover:z-10 hover:scale-115 transition-all duration-200 cursor-pointer "
                                        style={{ zIndex: stage.candidates.length - index }}
                                    >
                                        <AvatarImage src={candidate.avatar} />
                                        <AvatarFallback className={`text-[10px] font-semibold text-white ${stage.bgCircle}`}>
                                            {candidate.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                                {stage.count > stage.candidates.length && (
                                    <div
                                        className="w-9 h-9 rounded-full bg-white border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600 "
                                        style={{ zIndex: 0 }}
                                    >
                                        +{stage.count - stage.candidates.length}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* View All Link */}
                        <div className="flex items-center gap-1 text-xs font-semibold text-[#800020] group-hover:text-[#600018] transition-colors mt-4">
                            <span>Manage applicants</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}


