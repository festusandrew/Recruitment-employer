import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Plus, Search, Briefcase, ChevronDown, ChevronUp, Users, MoreHorizontal, X, Check } from "lucide-react";

interface PipelinePageProps {
    onAddJob?: () => void;
}

const mockJobs = [
    { id: 1, title: "Senior Product Designer", department: "Design", applicants: 45, status: "Active" },
    { id: 2, title: "Frontend Developer", department: "Engineering", applicants: 32, status: "Active" },
    { id: 3, title: "Marketing Manager", department: "Marketing", applicants: 28, status: "Active" },
    { id: 4, title: "Data Analyst", department: "Analytics", applicants: 19, status: "Active" },
    { id: 5, title: "UX Researcher", department: "Design", applicants: 23, status: "Active" },
];

const mockStages = [
    {
        id: "review",
        name: "Review",
        count: 3,
        color: "bg-[#800020]/10 text-[#800020]",
        candidates: [
            { id: 1, name: "Sarah Chen", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah1", match: 95 },
            { id: 2, name: "Mike Ross", role: "Frontend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike1", match: 88 },
            { id: 3, name: "Laura Palmer", role: "Marketing Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=laura1", match: 92 },
        ],
    },
    {
        id: "screening",
        name: "Screening",
        count: 2,
        color: "bg-yellow-100 text-yellow-700",
        candidates: [
            { id: 4, name: "Tom Hardy", role: "Data Analyst", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom1", match: 85 },
            { id: 5, name: "Anna Davis", role: "UX Researcher", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anna1", match: 90 },
        ],
    },
    {
        id: "interview",
        name: "Interview",
        count: 3,
        color: "bg-blue-100 text-blue-700",
        candidates: [
            { id: 6, name: "James Wilson", role: "Product Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james1", match: 87 },
            { id: 7, name: "Emma Stone", role: "Content Writer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma1", match: 82 },
            { id: 8, name: "Chris Evans", role: "DevOps Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris1", match: 89 },
        ],
    },
    {
        id: "offer",
        name: "Offer",
        count: 1,
        color: "bg-green-100 text-green-700",
        candidates: [
            { id: 9, name: "Olivia Brown", role: "UI Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia1", match: 94 },
        ],
    },
    {
        id: "hired",
        name: "Hired",
        count: 2,
        color: "bg-emerald-100 text-emerald-700",
        candidates: [
            { id: 10, name: "Noah Martinez", role: "Backend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noah1", match: 96 },
            { id: 11, name: "Sophia Lee", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia1", match: 93 },
        ],
    },
];

type StageType = typeof mockStages[0];

export function PipelinePage({ onAddJob }: PipelinePageProps) {
    const [expandedJobId, setExpandedJobId] = useState<number | null>(mockJobs[0].id);
    const [draggedCandidate, setDraggedCandidate] = useState<{ candidateId: number, sourceStageId: string, jobId: number } | null>(null);

    // Modal states
    const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false);
    const [selectedJobForCandidate, setSelectedJobForCandidate] = useState<number>(mockJobs[0].id);
    const [newCandidateName, setNewCandidateName] = useState("");
    const [newCandidateRole, setNewCandidateRole] = useState("");
    const [newCandidateStage, setNewCandidateStage] = useState("review");
    const [newCandidateMatch, setNewCandidateMatch] = useState(90);

    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [selectedJobForCategory, setSelectedJobForCategory] = useState<number>(mockJobs[0].id);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryColor, setNewCategoryColor] = useState("bg-purple-100 text-purple-700");

    // Maintain separate pipeline states for each mock job so dragging works per job
    const [pipelines, setPipelines] = useState<Record<number, StageType[]>>(() => {
        return mockJobs.reduce((acc, job) => {
            acc[job.id] = JSON.parse(JSON.stringify(mockStages));
            return acc;
        }, {} as Record<number, StageType[]>);
    });

    const toggleJob = (id: number) => {
        setExpandedJobId(prev => prev === id ? null : id);
    };

    const handleDragStart = (e: React.DragEvent, candidateId: number, sourceStageId: string, jobId: number) => {
        setDraggedCandidate({ candidateId, sourceStageId, jobId });
        e.dataTransfer.setData('text/plain', candidateId.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetStageId: string, jobId: number) => {
        e.preventDefault();
        if (!draggedCandidate) return;

        const { candidateId, sourceStageId, jobId: sourceJobId } = draggedCandidate;

        if (sourceJobId !== jobId || sourceStageId === targetStageId) {
            setDraggedCandidate(null);
            return;
        }

        setPipelines(prev => {
            const jobPipeline = [...prev[jobId]];

            const sourceStageIndex = jobPipeline.findIndex(s => s.id === sourceStageId);
            const targetStageIndex = jobPipeline.findIndex(s => s.id === targetStageId);

            const newSourceStage = { ...jobPipeline[sourceStageIndex], candidates: [...jobPipeline[sourceStageIndex].candidates] };
            const newTargetStage = { ...jobPipeline[targetStageIndex], candidates: [...jobPipeline[targetStageIndex].candidates] };

            const candidateIndex = newSourceStage.candidates.findIndex(c => c.id === candidateId);
            if (candidateIndex === -1) return prev;

            const [candidate] = newSourceStage.candidates.splice(candidateIndex, 1);
            newSourceStage.count--;

            newTargetStage.candidates.push(candidate);
            newTargetStage.count++;

            jobPipeline[sourceStageIndex] = newSourceStage;
            jobPipeline[targetStageIndex] = newTargetStage;

            return { ...prev, [jobId]: jobPipeline };
        });

        setDraggedCandidate(null);
    };

    const handleAddCandidate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCandidateName.trim() || !newCandidateRole.trim()) return;

        const newCandidate = {
            id: Date.now(),
            name: newCandidateName,
            role: newCandidateRole,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newCandidateName)}`,
            match: Number(newCandidateMatch)
        };

        setPipelines(prev => {
            const jobPipeline = [...prev[selectedJobForCandidate]];
            const stageIndex = jobPipeline.findIndex(s => s.id === newCandidateStage);
            if (stageIndex === -1) return prev;

            const updatedStage = { 
                ...jobPipeline[stageIndex], 
                count: jobPipeline[stageIndex].count + 1,
                candidates: [...jobPipeline[stageIndex].candidates, newCandidate] 
            };
            jobPipeline[stageIndex] = updatedStage;
            return { ...prev, [selectedJobForCandidate]: jobPipeline };
        });

        setNewCandidateName("");
        setNewCandidateRole("");
        setIsAddCandidateModalOpen(false);
        alert("Candidate successfully added to pipeline!");
    };

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        const newStage = {
            id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
            name: newCategoryName,
            count: 0,
            color: newCategoryColor,
            candidates: []
        };

        setPipelines(prev => {
            const jobPipeline = [...prev[selectedJobForCategory], newStage];
            return { ...prev, [selectedJobForCategory]: jobPipeline };
        });

        setNewCategoryName("");
        setIsAddCategoryModalOpen(false);
        alert(`Category "${newCategoryName}" successfully added to the Kanban board!`);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-73px)] overflow-hidden bg-gray-50 relative">
            {/* Top Header */}
            <div className="bg-white border-b border-gray-200/80 px-6 py-5 flex items-center justify-between flex-shrink-0 shadow-sm">
                <div>
                    <h1 className="text-gray-900 font-bold text-xl">Job Pipelines</h1>
                    <p className="text-sm text-gray-600 mt-0.5">Manage applicants across all active positions</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-56 pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] focus:bg-white transition-all"
                        />
                    </div>
                    <button 
                        onClick={() => onAddJob ? onAddJob() : alert("Add Job modal opened")}
                        className="flex items-center gap-2 px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors text-sm font-medium cursor-pointer shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Job
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {mockJobs.map((job) => {
                    const isExpanded = expandedJobId === job.id;
                    const stages = pipelines[job.id];

                    return (
                        <div key={job.id} className={`bg-white rounded-xl border transition-all duration-200 ${isExpanded ? "border-[#800020]/40 shadow-md" : "border-gray-200/80 shadow-sm hover:border-[#800020]/30"}`}>
                            {/* Job Row Header */}
                            <div
                                onClick={() => toggleJob(job.id)}
                                className="p-3.5 flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isExpanded ? "bg-[#800020] text-white" : "bg-[#800020]/10 text-[#800020]"
                                        }`}>
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 font-semibold text-sm">{job.title}</h3>
                                        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-600">
                                            <span>{job.department}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="flex items-center gap-1 font-medium">
                                                <Users className="w-3 h-3" />
                                                {job.applicants} Candidates
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${job.status === "Active" ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-700 border border-gray-200"
                                                }`}>
                                                {job.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                    <div className="w-px h-6 bg-gray-200"></div>
                                    <div className="p-1 text-gray-400 hover:text-[#800020] hover:bg-[#800020]/10 rounded-lg transition-colors">
                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </div>
                                </div>
                            </div>

                            {/* Kanban Board Area (Expanded State) */}
                            {isExpanded && (
                                <div className="border-t border-gray-200 bg-gray-50/50 p-4">
                                    <div className="flex items-center justify-between mb-4 w-full">
                                        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Candidate Pipeline Stages</h4>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => {
                                                    setSelectedJobForCategory(job.id);
                                                    setIsAddCategoryModalOpen(true);
                                                }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium cursor-pointer shadow-sm"
                                            >
                                                <Plus className="w-3.5 h-3.5 text-[#800020]" />
                                                Add Category
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setSelectedJobForCandidate(job.id);
                                                    setIsAddCandidateModalOpen(true);
                                                }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors text-xs font-medium cursor-pointer shadow-sm"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                Add Candidate
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 min-h-[260px] w-full pb-2">
                                        {stages.map((stage) => (
                                            <div
                                                key={stage.id}
                                                className="flex flex-col h-full min-w-0 flex-1"
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleDrop(e, stage.id, job.id)}
                                            >
                                                {/* Stage Header */}
                                                <div className="bg-white rounded-lg border border-gray-200/80 shadow-sm p-2 mb-2 flex-shrink-0">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <div className="flex items-center gap-1.5 min-w-0">
                                                            <h3 className="text-xs font-bold text-gray-900 truncate">{stage.name}</h3>
                                                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${stage.color} flex-shrink-0`}>
                                                                {stage.count}
                                                            </span>
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                setSelectedJobForCategory(job.id);
                                                                setIsAddCategoryModalOpen(true);
                                                            }}
                                                            className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 cursor-pointer"
                                                            title="Add Category"
                                                        >
                                                            <Plus className="w-3 h-3" />
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
                                                            style={{ width: `${Math.min(100, (stage.count / job.applicants) * 100)}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Candidates Cards Area */}
                                                <div className="flex-1 space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200">
                                                    {stage.candidates.map((candidate) => (
                                                        <div
                                                            key={candidate.id}
                                                            className={`bg-white rounded-lg border ${draggedCandidate?.candidateId === candidate.id
                                                                    ? 'border-[#800020] opacity-50 scale-95'
                                                                    : 'border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#800020]/40'
                                                                } transition-all duration-200 p-2.5 cursor-move group`}
                                                            draggable
                                                            onDragStart={(e) => handleDragStart(e, candidate.id, stage.id, job.id)}
                                                            onDragEnd={() => setDraggedCandidate(null)}
                                                        >
                                                            <div className="flex items-start gap-2 mb-1.5">
                                                                <Avatar className="w-7 h-7 border border-gray-100 pointer-events-none flex-shrink-0 shadow-sm">
                                                                    <AvatarImage src={candidate.avatar} />
                                                                    <AvatarFallback className="text-[10px] font-semibold">{candidate.name.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                                <div className="flex-1 min-w-0 pointer-events-none">
                                                                    <h4 className="text-gray-900 font-semibold text-xs truncate group-hover:text-[#800020] transition-colors">{candidate.name}</h4>
                                                                    <p className="text-[10px] text-gray-500 truncate mt-0.2">{candidate.role}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 pointer-events-none">
                                                                <div className="flex items-center gap-1">
                                                                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${candidate.match >= 90 ? 'bg-green-500' :
                                                                            candidate.match >= 85 ? 'bg-yellow-500' : 'bg-orange-500'
                                                                        }`}></div>
                                                                    <span className="text-[10px] font-semibold text-gray-600">{candidate.match}% Match</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* Empty Stage Drop Zone */}
                                                    {stage.candidates.length === 0 && (
                                                        <div className="h-14 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-[11px] font-medium bg-white/50">
                                                            Drop candidate
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add New Category Kanban Column Button */}
                                        <div className="flex-1 min-w-0 flex items-start">
                                            <button
                                                onClick={() => {
                                                    setSelectedJobForCategory(job.id);
                                                    setIsAddCategoryModalOpen(true);
                                                }}
                                                className="w-full h-10 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#800020] hover:bg-rose-50/10 transition-all flex items-center justify-center gap-1 text-gray-600 hover:text-[#800020] font-semibold text-[11px] cursor-pointer shadow-sm bg-white"
                                            >
                                                <Plus className="w-3 h-3 flex-shrink-0" />
                                                <span className="truncate">Add Category</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* MODALS */}

            {/* Add Candidate Modal */}
            {isAddCandidateModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-xl font-bold text-gray-900">Add New Candidate</h3>
                            <button 
                                onClick={() => setIsAddCandidateModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleAddCandidate} className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Michael Jordan"
                                    value={newCandidateName}
                                    onChange={(e) => setNewCandidateName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Job Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Senior Software Engineer"
                                    value={newCandidateRole}
                                    onChange={(e) => setNewCandidateRole(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Match Percentage</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        required
                                        value={newCandidateMatch}
                                        onChange={(e) => setNewCandidateMatch(Number(e.target.value))}
                                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stage</label>
                                    <select
                                        value={newCandidateStage}
                                        onChange={(e) => setNewCandidateStage(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                    >
                                        <option value="review">Review</option>
                                        <option value="screening">Screening</option>
                                        <option value="interview">Interview</option>
                                        <option value="offer">Offer</option>
                                        <option value="hired">Hired</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddCandidateModalOpen(false)}
                                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-sm cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#800020] text-white rounded-lg font-medium hover:bg-[#600018] text-sm shadow-sm cursor-pointer"
                                >
                                    Add Candidate
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Category / Stage Modal */}
            {isAddCategoryModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-xl font-bold text-gray-900">Add Kanban Category</h3>
                            <button 
                                onClick={() => setIsAddCategoryModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleAddCategory} className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category / Stage Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Technical Test, Background Check"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Color Theme</label>
                                <select
                                    value={newCategoryColor}
                                    onChange={(e) => setNewCategoryColor(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                >
                                    <option value="bg-purple-100 text-purple-700">Purple Badge</option>
                                    <option value="bg-blue-100 text-blue-700">Blue Badge</option>
                                    <option value="bg-yellow-100 text-yellow-700">Yellow Badge</option>
                                    <option value="bg-emerald-100 text-emerald-700">Emerald Badge</option>
                                    <option value="bg-[#800020]/10 text-[#800020]">Maroon Badge</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddCategoryModalOpen(false)}
                                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-sm cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#800020] text-white rounded-lg font-medium hover:bg-[#600018] text-sm shadow-sm cursor-pointer"
                                >
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}