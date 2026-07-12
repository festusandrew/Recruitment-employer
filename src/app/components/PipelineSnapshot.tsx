import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { ArrowRight, Briefcase } from "lucide-react";

const jobPipelines = [
    {
        id: 1,
        title: "Senior Product Designer",
        department: "Design",
        totalApplicants: 45,
        color: "bg-indigo-50/40 border-slate-100 hover:border-indigo-300 text-slate-900",
        stages: [
            { name: "Review", count: 18, color: "bg-indigo-600" },
            { name: "Screen", count: 15, color: "bg-amber-500" },
            { name: "Interview", count: 8, color: "bg-violet-650" },
            { name: "Offer", count: 4, color: "bg-emerald-600" }
        ],
        recentInitials: ["SC", "MT", "EW", "DK"]
    },
    {
        id: 2,
        title: "Frontend Developer",
        department: "Engineering",
        totalApplicants: 32,
        color: "bg-indigo-50/40 border-slate-100 hover:border-indigo-300 text-slate-900",
        stages: [
            { name: "Review", count: 12, color: "bg-indigo-600" },
            { name: "Screen", count: 10, color: "bg-amber-500" },
            { name: "Interview", count: 7, color: "bg-violet-650" },
            { name: "Offer", count: 3, color: "bg-emerald-600" }
        ],
        recentInitials: ["OM", "LB", "SL", "NA"]
    },
    {
        id: 3,
        title: "Marketing Manager",
        department: "Marketing",
        totalApplicants: 28,
        color: "bg-indigo-50/40 border-slate-100 hover:border-indigo-300 text-slate-900",
        stages: [
            { name: "Review", count: 10, color: "bg-indigo-600" },
            { name: "Screen", count: 9, color: "bg-amber-500" },
            { name: "Interview", count: 6, color: "bg-violet-650" },
            { name: "Offer", count: 3, color: "bg-emerald-600" }
        ],
        recentInitials: ["AT", "JW", "ED", "MC"]
    }
];

export function PipelineSnapshot({ onViewCandidates }: { onViewCandidates?: () => void }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-premium text-left">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg text-slate-900 font-extrabold tracking-tight font-sans">Active Pipelines</h2>
                    <p className="text-xs text-slate-500 mt-1.5 font-bold uppercase tracking-wider">
                        Applicant funnel breakdown per position
                    </p>
                </div>
                <button
                    onClick={onViewCandidates}
                    className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 text-xs font-semibold cursor-pointer "
                >
                    All Pipelines
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {jobPipelines.map((job, idx) => (
                    <motion.div
                        key={job.id}
                        onClick={onViewCandidates}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.1, ease: "easeOut" }}
                        whileHover={{ y: -3, boxShadow: "0 12px 20px -8px rgba(0,0,0,0.08)" }}
                        className={`${job.color} rounded-2xl p-5 border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between`}
                    >
                        {/* Header */}
                        <div>
                            <div className="flex items-start justify-between gap-2 mb-3">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{job.title}</h3>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{job.department}</span>
                                </div>
                                <Badge className="bg-white/90 text-indigo-600 hover:bg-white border border-slate-200/50 font-extrabold px-2 py-0.5 text-[10px] rounded-lg flex-shrink-0">
                                    {job.totalApplicants} active
                                </Badge>
                            </div>

                            {/* Micro progress status indicators */}
                            <div className="grid grid-cols-4 gap-1.5 my-4">
                                {job.stages.map((stage) => (
                                    <div key={stage.name} className="space-y-1">
                                        <div className="h-1.5 rounded-full bg-slate-200/60 overflow-hidden">
                                            <div 
                                                className={`h-full ${stage.color}`}
                                                style={{ width: `${(stage.count / job.totalApplicants) * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
                                            <span>{stage.name[0]}</span>
                                            <span className="text-slate-700">{stage.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Candidate Avatars & Link */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-2">
                            <div className="flex items-center -space-x-2">
                                {job.recentInitials.map((initial, index) => (
                                    <Avatar
                                        key={index}
                                        className="w-7 h-7 border-2 border-white hover:z-10 hover:scale-115 transition-all duration-200 cursor-pointer "
                                    >
                                        <AvatarFallback className="text-[9px] font-extrabold bg-indigo-50 text-indigo-700">
                                            {initial}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors">
                                <span>View board</span>
                                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}


