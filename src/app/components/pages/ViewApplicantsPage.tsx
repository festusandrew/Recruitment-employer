import { ArrowLeft, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { motion } from "motion/react";

interface ViewApplicantsPageProps {
    jobTitle?: string;
    onBack: () => void;
    onViewCandidate: (applicant: any) => void;
    fullScreenOverlay?: boolean;
}

const mockApplicants = [
    { id: 1, name: "Sarah Chen", role: "Senior Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah6", location: "San Francisco, CA", experience: "8 years", applied: "2 days ago", status: "review", match: 95, rating: 4.8 },
    { id: 2, name: "Michael Torres", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael6", location: "Remote", experience: "5 years", applied: "3 days ago", status: "screening", match: 88, rating: 4.5 },
    { id: 3, name: "Emily Watson", role: "UI/UX Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily6", location: "New York, NY", experience: "7 years", applied: "1 week ago", status: "interview", match: 92, rating: 4.9 },
    { id: 4, name: "David Kim", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david6", location: "Austin, TX", experience: "4 years", applied: "5 days ago", status: "review", match: 85, rating: 4.3 },
    { id: 5, name: "Jessica Martinez", role: "Visual Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica6", location: "Remote", experience: "6 years", applied: "4 days ago", status: "review", match: 90, rating: 4.7 },
    { id: 6, name: "Ryan Patel", role: "Senior Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan6", location: "Seattle, WA", experience: "9 years", applied: "1 week ago", status: "screening", match: 87, rating: 4.6 },
];

const STAGES = [
    { id: "review", name: "Review", color: "bg-[#800020]/10 text-[#800020] border-[#800020]/20" },
    { id: "screening", name: "Screening", color: "bg-amber-50 text-amber-700 border-amber-200/60" },
    { id: "interview", name: "Interview", color: "bg-indigo-50 text-indigo-700 border-indigo-200/60" },
    { id: "offer", name: "Offer", color: "bg-green-50 text-green-700 border-green-200/60" },
    { id: "hired", name: "Hired", color: "bg-emerald-50 text-emerald-700 border-emerald-200/60" }
];

export function ViewApplicantsPage({ jobTitle, onBack, onViewCandidate, fullScreenOverlay = false }: ViewApplicantsPageProps) {
    const [applicants, setApplicants] = useState(mockApplicants);
    const [draggedApplicantId, setDraggedApplicantId] = useState<number | null>(null);

    const pipelineStages = STAGES.map(stage => ({
        ...stage,
        applicants: applicants.filter(a => a.status === stage.id)
    }));

    const handleDragStart = (e: React.DragEvent, applicantId: number) => {
        setDraggedApplicantId(applicantId);
        e.dataTransfer.setData('text/plain', applicantId.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetStageId: string) => {
        e.preventDefault();
        if (!draggedApplicantId) return;

        setApplicants(prev => prev.map(applicant =>
            applicant.id === draggedApplicantId
                ? { ...applicant, status: targetStageId }
                : applicant
        ));
        setDraggedApplicantId(null);
    };

    const content = (
        <div className="flex flex-col h-[calc(100vh-73px)] overflow-hidden bg-gray-50/50 p-6 text-left w-full">
            {/* Header / Title Area */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200/85 text-gray-700 rounded-xl hover:bg-[#800020] hover:text-white hover:border-[#800020] transition-all duration-300  cursor-pointer text-xs font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Dashboard</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Applicant Pipeline</h1>
                        <p className="text-xs text-gray-500 font-medium">{jobTitle || "Active Position"}</p>
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 no-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 h-full min-w-[1100px]">
                    {pipelineStages.map((stage) => (
                        <div
                            key={stage.id}
                            className="flex flex-col h-full min-w-0"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, stage.id)}
                        >
                            {/* Stage Header */}
                            <div className="bg-white rounded-2xl border border-gray-150  p-4 mb-3 flex-shrink-0">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <h3 className="text-xs font-bold text-gray-900 tracking-wide uppercase">{stage.name}</h3>
                                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${stage.color} flex-shrink-0`}>
                                            {stage.applicants.length}
                                        </span>
                                    </div>
                                    <button className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors flex-shrink-0 cursor-pointer">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                {/* Progress bar */}
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${stage.id === 'hired' ? 'bg-emerald-500' :
                                                stage.id === 'offer' ? 'bg-green-500' :
                                                    stage.id === 'interview' ? 'bg-indigo-500' :
                                                        stage.id === 'screening' ? 'bg-amber-500' : 'bg-[#800020]'
                                            }`}
                                        style={{ width: `${applicants.length > 0 ? Math.min(100, (stage.applicants.length / applicants.length) * 100) : 0}%` }}
                                    />
                                </div>
                            </div>

                            {/* Applicants Cards Area */}
                            <div className="flex-1 space-y-3 min-h-[150px] overflow-y-auto pr-1 pb-4 scrollbar-thin scrollbar-thumb-gray-200">
                                {stage.applicants.map((applicant) => (
                                    <motion.div
                                        key={applicant.id}
                                        className={`relative overflow-hidden bg-white rounded-xl border ${draggedApplicantId === applicant.id
                                                ? 'border-[#800020] opacity-40 scale-95'
                                                : 'border-gray-200/80  hover:'
                                            } transition-all duration-200 p-4 cursor-grab active:cursor-grabbing group`}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, applicant.id)}
                                        onDragEnd={() => setDraggedApplicantId(null)}
                                        whileHover={{ y: -2, scale: 1.01 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <div className="flex items-start gap-3 mb-3 pointer-events-none">
                                            <Avatar className="w-9 h-9 border border-gray-100 flex-shrink-0 ">
                                                <AvatarImage src={applicant.avatar} />
                                                <AvatarFallback className="text-xs font-semibold">{applicant.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-gray-900 text-xs font-bold truncate group-hover:text-[#800020] transition-colors leading-tight">{applicant.name}</h4>
                                                <p className="text-[10px] text-gray-500 truncate mt-0.5 font-medium">{applicant.role}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 pointer-events-none">
                                            <div className="flex items-center gap-1.5">
                                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${applicant.match >= 90 ? 'bg-emerald-500' :
                                                        applicant.match >= 85 ? 'bg-amber-500' : 'bg-orange-500'
                                                    }`}></div>
                                                <span className="text-[10px] font-bold text-gray-600">{applicant.match}% match</span>
                                            </div>
                                            <span className="text-[9px] font-medium text-gray-400">Applied {applicant.applied}</span>
                                        </div>

                                        {/* Interactive overlay - Beautiful glassmorphism fade-in */}
                                        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-xs transition-all duration-300 rounded-xl pointer-events-none">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onViewCandidate(applicant);
                                                }}
                                                className="pointer-events-auto px-4 py-2 bg-[#800020] text-white rounded-xl text-xs font-semibold  hover:bg-[#600018] transition-all transform translate-y-3 group-hover:translate-y-0 duration-300 cursor-pointer"
                                            >
                                                View Profile
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Empty Stage Drop Zone */}
                                {stage.applicants.length === 0 && (
                                    <div className="h-16 border-2 border-dashed border-gray-200 hover:border-gray-300 rounded-2xl flex items-center justify-center text-gray-400 text-xs font-semibold bg-white/50 transition-colors">
                                        Drop applicant here
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (fullScreenOverlay) {
        return (
            <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">
                {content}
            </div>
        );
    }

    return content;
}


