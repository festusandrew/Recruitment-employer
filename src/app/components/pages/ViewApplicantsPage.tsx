import { ArrowLeft, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";

interface ViewApplicantsPageProps {
    jobTitle?: string;
    onBack: () => void;
    onViewCandidate: (candidate: any) => void;
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
    { id: "review", name: "Review", color: "bg-[#800020]/10 text-[#800020]" },
    { id: "screening", name: "Screening", color: "bg-yellow-100 text-yellow-700" },
    { id: "interview", name: "Interview", color: "bg-blue-100 text-blue-700" },
    { id: "offer", name: "Offer", color: "bg-green-100 text-green-700" },
    { id: "hired", name: "Hired", color: "bg-emerald-100 text-emerald-700" }
];

export function ViewApplicantsPage({ jobTitle, onBack, onViewCandidate, fullScreenOverlay = false }: ViewApplicantsPageProps) {
    const [applicants, setApplicants] = useState(mockApplicants);
    const [draggedCandidateId, setDraggedCandidateId] = useState<number | null>(null);

    const pipelineStages = STAGES.map(stage => ({
        ...stage,
        candidates: applicants.filter(a => a.status === stage.id)
    }));

    const handleDragStart = (e: React.DragEvent, candidateId: number) => {
        setDraggedCandidateId(candidateId);
        e.dataTransfer.setData('text/plain', candidateId.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetStageId: string) => {
        e.preventDefault();
        if (!draggedCandidateId) return;

        setApplicants(prev => prev.map(applicant =>
            applicant.id === draggedCandidateId
                ? { ...applicant, status: targetStageId }
                : applicant
        ));
        setDraggedCandidateId(null);
    };

    const content = (
        <div className="flex flex-col h-[calc(100vh-73px)] overflow-hidden bg-gray-50 p-6 text-left w-full">
            {/* Header / Title Area */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200/80 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-[#800020]/30 transition-all shadow-sm cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-xs font-medium">Back to Dashboard</span>
                    </button>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">Applicant Pipeline</h1>
                        <p className="text-xs text-gray-600">{jobTitle || "Active Position"}</p>
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 h-full min-w-[1000px]">
                    {pipelineStages.map((stage) => (
                        <div
                            key={stage.id}
                            className="flex flex-col h-full min-w-0"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, stage.id)}
                        >
                            {/* Stage Header */}
                            <div className="bg-white rounded-lg border border-gray-200/80 shadow-sm p-3 mb-2.5 flex-shrink-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <h3 className="text-sm font-medium text-gray-900 truncate">{stage.name}</h3>
                                        <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${stage.color} flex-shrink-0`}>
                                            {stage.candidates.length}
                                        </span>
                                    </div>
                                    <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer">
                                        <Plus className="w-3.5 h-3.5 text-gray-500" />
                                    </button>
                                </div>
                                {/* Progress bar */}
                                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${stage.id === 'hired' ? 'bg-emerald-500' :
                                                stage.id === 'offer' ? 'bg-green-500' :
                                                    stage.id === 'interview' ? 'bg-blue-500' :
                                                        stage.id === 'screening' ? 'bg-yellow-500' : 'bg-[#800020]'
                                            }`}
                                        style={{ width: `${applicants.length > 0 ? Math.min(100, (stage.candidates.length / applicants.length) * 100) : 0}%` }}
                                    />
                                </div>
                            </div>

                            {/* Candidates Cards Area */}
                            <div className="flex-1 space-y-2 min-h-[150px] overflow-y-auto pr-1">
                                {stage.candidates.map((candidate) => (
                                    <div
                                        key={candidate.id}
                                        className={`relative overflow-hidden bg-white rounded-lg border ${draggedCandidateId === candidate.id
                                                ? 'border-[#800020] opacity-50 scale-95'
                                                : 'border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#800020]/40'
                                            } transition-all duration-200 p-3 cursor-move group`}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, candidate.id)}
                                        onDragEnd={() => setDraggedCandidateId(null)}
                                    >
                                        <div className="flex items-start gap-2 mb-2 pointer-events-none">
                                            <Avatar className="w-8 h-8 border border-gray-100 flex-shrink-0">
                                                <AvatarImage src={candidate.avatar} />
                                                <AvatarFallback className="text-xs">{candidate.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-gray-900 text-sm font-semibold truncate group-hover:text-[#800020] transition-colors">{candidate.name}</h4>
                                                <p className="text-xs text-gray-500 truncate leading-tight">{candidate.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 pointer-events-none">
                                            <div className="flex items-center gap-1">
                                                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${candidate.match >= 90 ? 'bg-green-500' :
                                                        candidate.match >= 85 ? 'bg-yellow-500' : 'bg-orange-500'
                                                    }`}></div>
                                                <span className="text-xs font-medium text-gray-600">{candidate.match}% match</span>
                                            </div>
                                        </div>

                                        {/* Interactive overlay */}
                                        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm transition-all rounded-lg pointer-events-none">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onViewCandidate(candidate);
                                                }}
                                                className="pointer-events-auto px-3 py-1.5 bg-[#800020] text-white rounded-lg text-xs font-medium shadow-sm hover:bg-[#600018] transition-colors transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
                                            >
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Empty Stage Drop Zone */}
                                {stage.candidates.length === 0 && (
                                    <div className="h-16 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                                        Drop candidate here
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