import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Plus, Search, Briefcase, ChevronDown, ChevronUp, Users, MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface PipelinePageProps {
    onAddJob?: () => void;
    onNavigate?: (page: string) => void;
    selectedJobId?: number;
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
        color: "bg-indigo-600/10 text-indigo-600 border-indigo-600/20",
        applicants: [
            { id: 1, name: "Sarah Chen", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah1", match: 95 },
            { id: 2, name: "Mike Ross", role: "Frontend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike1", match: 88 },
            { id: 3, name: "Laura Palmer", role: "Marketing Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=laura1", match: 92 },
        ],
    },
    {
        id: "screening",
        name: "Screening",
        count: 2,
        color: "bg-amber-50 text-amber-700 border-amber-200/60",
        applicants: [
            { id: 4, name: "Tom Hardy", role: "Data Analyst", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom1", match: 85 },
            { id: 5, name: "Anna Davis", role: "UX Researcher", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anna1", match: 90 },
        ],
    },
    {
        id: "interview",
        name: "Interview",
        count: 3,
        color: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
        applicants: [
            { id: 6, name: "James Wilson", role: "Product Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james1", match: 87 },
            { id: 7, name: "Emma Stone", role: "Content Writer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma1", match: 82 },
            { id: 8, name: "Chris Evans", role: "DevOps Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris1", match: 89 },
        ],
    },
    {
        id: "offer",
        name: "Offer",
        count: 1,
        color: "bg-green-50 text-green-700 border-green-200/60",
        applicants: [
            { id: 9, name: "Olivia Brown", role: "UI Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia1", match: 94 },
        ],
    },
    {
        id: "hired",
        name: "Hired",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
        count: 2,
        applicants: [
            { id: 10, name: "Noah Martinez", role: "Backend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noah1", match: 96 },
            { id: 11, name: "Sophia Lee", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia1", match: 93 },
        ],
    },
];

type StageType = typeof mockStages[0];

export function PipelinePage({ onAddJob, onNavigate, selectedJobId }: PipelinePageProps) {
    const displayedJobs = selectedJobId ? mockJobs.filter(job => job.id === selectedJobId) : mockJobs;
    const defaultJobId = displayedJobs.length > 0 ? displayedJobs[0].id : null;
    const [expandedJobId, setExpandedJobId] = useState<number | null>(defaultJobId);
    const [draggedApplicant, setDraggedApplicant] = useState<{ applicantId: number, sourceStageId: string, jobId: number } | null>(null);

    // Modal states
    const [isAddApplicantModalOpen, setIsAddApplicantModalOpen] = useState(false);
    const [selectedJobForApplicant, setSelectedJobForApplicant] = useState<number>(defaultJobId ?? mockJobs[0].id);
    const [newApplicantName, setNewApplicantName] = useState("");
    const [newApplicantRole, setNewApplicantRole] = useState("");
    const [newApplicantStage, setNewApplicantStage] = useState("review");
    const [newApplicantMatch, setNewApplicantMatch] = useState(90);

    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [selectedJobForCategory, setSelectedJobForCategory] = useState<number>(defaultJobId ?? mockJobs[0].id);
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

    const handleDragStart = (e: React.DragEvent, applicantId: number, sourceStageId: string, jobId: number) => {
        setDraggedApplicant({ applicantId, sourceStageId, jobId });
        e.dataTransfer.setData('text/plain', applicantId.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetStageId: string, jobId: number) => {
        e.preventDefault();
        if (!draggedApplicant) return;

        const { applicantId, sourceStageId, jobId: sourceJobId } = draggedApplicant;

        if (sourceJobId !== jobId || sourceStageId === targetStageId) {
            setDraggedApplicant(null);
            return;
        }

        setPipelines(prev => {
            const jobPipeline = [...prev[jobId]];

            const sourceStageIndex = jobPipeline.findIndex(s => s.id === sourceStageId);
            const targetStageIndex = jobPipeline.findIndex(s => s.id === targetStageId);

            const newSourceStage = { ...jobPipeline[sourceStageIndex], applicants: [...jobPipeline[sourceStageIndex].applicants] };
            const newTargetStage = { ...jobPipeline[targetStageIndex], applicants: [...jobPipeline[targetStageIndex].applicants] };

            const applicantIndex = newSourceStage.applicants.findIndex(a => a.id === applicantId);
            if (applicantIndex === -1) return prev;

            const [applicant] = newSourceStage.applicants.splice(applicantIndex, 1);
            newSourceStage.count--;

            newTargetStage.applicants.push(applicant);
            newTargetStage.count++;

            jobPipeline[sourceStageIndex] = newSourceStage;
            jobPipeline[targetStageIndex] = newTargetStage;

            return { ...prev, [jobId]: jobPipeline };
        });

        setDraggedApplicant(null);
    };

    const handleAddApplicant = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newApplicantName.trim() || !newApplicantRole.trim()) return;

        const newApplicant = {
            id: Date.now(),
            name: newApplicantName,
            role: newApplicantRole,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newApplicantName)}`,
            match: Number(newApplicantMatch)
        };

        setPipelines(prev => {
            const jobPipeline = [...prev[selectedJobForApplicant]];
            const stageIndex = jobPipeline.findIndex(s => s.id === newApplicantStage);
            if (stageIndex === -1) return prev;

            const updatedStage = { 
                ...jobPipeline[stageIndex], 
                count: jobPipeline[stageIndex].count + 1,
                applicants: [...jobPipeline[stageIndex].applicants, newApplicant] 
            };
            jobPipeline[stageIndex] = updatedStage;
            return { ...prev, [selectedJobForApplicant]: jobPipeline };
        });

        setNewApplicantName("");
        setNewApplicantRole("");
        setIsAddApplicantModalOpen(false);
        toast.success("Applicant successfully added to the pipeline!");
    };

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        const newStage = {
            id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
            name: newCategoryName,
            count: 0,
            color: newCategoryColor,
            applicants: []
        };

        setPipelines(prev => {
            const jobPipeline = [...prev[selectedJobForCategory], newStage];
            return { ...prev, [selectedJobForCategory]: jobPipeline };
        });

        setNewCategoryName("");
        setIsAddCategoryModalOpen(false);
        toast.success(`Category "${newCategoryName}" successfully added to the Kanban board!`);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-73px)] overflow-hidden bg-gray-50/50 relative">
            {/* Back button */}
            {onNavigate && (
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-gray-50 transition-colors text-xs font-medium"
                >
                    ← Back to Dashboard
                </button>
            )}
            {/* Top Header */}
            <div className="bg-white border-b border-slate-200/50 px-6 py-5 flex items-center justify-between flex-shrink-0 ">
                <div>
                    <h1 className="text-slate-900 font-bold text-xl tracking-tight">Job Pipelines</h1>
                    <p className="text-xs text-slate-500 mt-0.5">Manage and track active applicants across all positions</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-56 pl-9 pr-4 py-2 bg-gray-50 border border-gray-205 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white transition-all"
                        />
                    </div>
                    <button 
                        onClick={() => onAddJob ? onAddJob() : toast.info("Add Job modal opened")}
                        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-800 transition-all duration-300 text-xs font-semibold cursor-pointer "
                    >
                        <Plus className="w-4 h-4" />
                        Add Job
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {displayedJobs.map((job) => {
                    const isExpanded = expandedJobId === job.id;
                    const stages = pipelines[job.id];

                    return (
                        <div 
                            key={job.id} 
                            className={`bg-white rounded-2xl border transition-all duration-300 ${
                                isExpanded ? "border-indigo-600/25 " : "border-gray-150  hover:border-indigo-600/20"
                            }`}
                        >
                            {/* Job Row Header */}
                            <div
                                onClick={() => toggleJob(job.id)}
                                className="p-4 flex items-center justify-between cursor-pointer select-none"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                                        isExpanded ? "bg-indigo-600 text-white" : "bg-indigo-600/10 text-indigo-600"
                                    }`}>
                                        <Briefcase className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-extrabold font-bold text-sm leading-tight hover:text-indigo-600 transition-colors">{job.title}</h3>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                                            <span>{job.department}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                                {job.applicants} Applicants
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                                                job.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200/50" : "bg-gray-50 text-slate-600 border-slate-200"
                                            }`}>
                                                {job.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); }} 
                                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                    <div className="w-px h-6 bg-gray-200"></div>
                                    <div className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-600/5 rounded-lg transition-colors">
                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </div>
                                </div>
                            </div>

                            {/* Kanban Board Area (Expanded State) */}
                            <AnimatePresence initial={false}>
                                {isExpanded && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden border-t border-gray-150 bg-gray-50/40"
                                    >
                                        <div className="p-5">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Applicant Pipeline Stages</h4>
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedJobForCategory(job.id);
                                                            setIsAddCategoryModalOpen(true);
                                                        }}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-gray-50 transition-colors text-xs font-semibold cursor-pointer "
                                                    >
                                                        <Plus className="w-3.5 h-3.5 text-indigo-600" />
                                                        Add Category
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedJobForApplicant(job.id);
                                                            setIsAddApplicantModalOpen(true);
                                                        }}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-800 transition-colors text-xs font-semibold cursor-pointer "
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                        Add Applicant
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-[260px] w-full pb-2 overflow-x-auto no-scrollbar">
                                                {stages.map((stage) => (
                                                    <div
                                                        key={stage.id}
                                                        className="flex flex-col h-full min-w-0"
                                                        onDragOver={handleDragOver}
                                                        onDrop={(e) => handleDrop(e, stage.id, job.id)}
                                                    >
                                                        {/* Stage Header */}
                                                        <div className="bg-white rounded-xl border border-gray-150  p-3 mb-2.5 flex-shrink-0">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center gap-1.5 min-w-0">
                                                                    <h3 className="text-[11px] font-bold text-gray-905 truncate tracking-wide uppercase">{stage.name}</h3>
                                                                    <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-bold border ${stage.color} flex-shrink-0`}>
                                                                        {stage.count}
                                                                    </span>
                                                                </div>
                                                                <button 
                                                                    onClick={() => {
                                                                        setSelectedJobForCategory(job.id);
                                                                        setIsAddCategoryModalOpen(true);
                                                                    }}
                                                                    className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 cursor-pointer"
                                                                    title="Add Category"
                                                                >
                                                                    <Plus className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                            {/* Progress bar */}
                                                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full rounded-full transition-all duration-300 ${
                                                                        stage.id === 'hired' ? 'bg-emerald-500' :
                                                                        stage.id === 'offer' ? 'bg-green-500' :
                                                                        stage.id === 'interview' ? 'bg-indigo-500' :
                                                                        stage.id === 'screening' ? 'bg-amber-500' : 'bg-indigo-600'
                                                                    }`}
                                                                    style={{ width: `${Math.min(100, (stage.count / (job.applicants || 1)) * 100)}%` }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Applicants Cards Area */}
                                                        <div className="flex-1 space-y-2.5 max-h-[230px] overflow-y-auto pr-1 pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                                                            {stage.applicants?.map((applicant) => (
                                                                <motion.div
                                                                    key={applicant.id}
                                                                    className={`bg-white rounded-xl border ${
                                                                        draggedApplicant?.applicantId === applicant.id
                                                                            ? 'border-indigo-600 opacity-45 scale-95'
                                                                            : 'border-gray-150  hover:'
                                                                    } transition-all duration-200 p-3 cursor-grab active:cursor-grabbing group`}
                                                                    draggable
                                                                    onDragStart={(e) => handleDragStart(e, applicant.id, stage.id, job.id)}
                                                                    onDragEnd={() => setDraggedApplicant(null)}
                                                                    whileHover={{ y: -2, scale: 1.01 }}
                                                                    transition={{ duration: 0.15 }}
                                                                >
                                                                    <div className="flex items-start gap-2 mb-2 pointer-events-none">
                                                                        <Avatar className="w-7.5 h-7.5 border border-slate-100 flex-shrink-0 ">
                                                                            <AvatarFallback className="bg-indigo-50 text-indigo-700 font-extrabold text-[9px]">
                                                                                {applicant.name.split(' ').map(n => n[0]).join('')}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <div className="flex-1 min-w-0 pointer-events-none">
                                                                            <h4 className="text-slate-900 font-bold text-xs truncate group-hover:text-indigo-600 transition-colors leading-tight">{applicant.name}</h4>
                                                                            <p className="text-[9px] text-slate-500 truncate mt-0.5 font-medium">{applicant.role}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 pointer-events-none">
                                                                        <div className="flex items-center gap-1">
                                                                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                                                                applicant.match >= 90 ? 'bg-emerald-500' :
                                                                                applicant.match >= 85 ? 'bg-amber-500' : 'bg-orange-500'
                                                                            }`}></div>
                                                                            <span className="text-[9px] font-bold text-slate-600">{applicant.match}% match</span>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            ))}

                                                            {/* Empty Stage Drop Zone */}
                                                            {stage.applicants?.length === 0 && (
                                                                <div className="h-14 border-2 border-dashed border-slate-200 hover:border-gray-355 rounded-xl flex items-center justify-center text-slate-400 text-[10px] font-bold bg-white/40 transition-colors">
                                                                    Drop applicant
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Add New Category Column Button */}
                                                <div className="flex flex-col h-full min-w-0">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedJobForCategory(job.id);
                                                            setIsAddCategoryModalOpen(true);
                                                        }}
                                                        className="w-full h-11 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-600 hover:bg-indigo-600/5 transition-all flex items-center justify-center gap-1.5 text-slate-500 hover:text-indigo-600 font-bold text-xs cursor-pointer  bg-white/70"
                                                    >
                                                        <Plus className="w-3.5 h-3.5 flex-shrink-0" />
                                                        <span>Add Category</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* MODALS */}

            {/* Add Applicant Modal */}
            {isAddApplicantModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6  border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-bold text-slate-900">Add New Applicant</h3>
                            <button 
                                onClick={() => setIsAddApplicantModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddApplicant} className="space-y-4 mb-2">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Applicant Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Michael Jordan"
                                    value={newApplicantName}
                                    onChange={(e) => setNewApplicantName(e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Role / Job Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Senior Software Engineer"
                                    value={newApplicantRole}
                                    onChange={(e) => setNewApplicantRole(e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Match Score (%)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        required
                                        value={newApplicantMatch}
                                        onChange={(e) => setNewApplicantMatch(Number(e.target.value))}
                                        className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Initial Stage</label>
                                    <select
                                        value={newApplicantStage}
                                        onChange={(e) => setNewApplicantStage(e.target.value)}
                                        className="w-full p-3 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                                    >
                                        <option value="review">Review</option>
                                        <option value="screening">Screening</option>
                                        <option value="interview">Interview</option>
                                        <option value="offer">Offer</option>
                                        <option value="hired">Hired</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-5 border-t border-slate-100 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsAddApplicantModalOpen(false)}
                                    className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-gray-50 text-xs cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-800 text-xs  cursor-pointer"
                                >
                                    Add Applicant
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Category / Stage Modal */}
            {isAddCategoryModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6  border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-bold text-slate-900">Add Kanban Category</h3>
                            <button 
                                onClick={() => setIsAddCategoryModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddCategory} className="space-y-4 mb-2">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Category Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Technical Test, Reference Check"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Badge Color Theme</label>
                                <select
                                    value={newCategoryColor}
                                    onChange={(e) => setNewCategoryColor(e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                                >
                                    <option value="bg-purple-50 text-purple-700 border-purple-100">Purple Badge</option>
                                    <option value="bg-indigo-50 text-indigo-700 border-indigo-100">Blue Badge</option>
                                    <option value="bg-amber-50 text-amber-700 border-amber-100">Yellow Badge</option>
                                    <option value="bg-emerald-50 text-emerald-700 border-emerald-100">Emerald Badge</option>
                                    <option value="bg-indigo-600/10 text-indigo-600 border-indigo-600/20">Maroon Badge</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-5 border-t border-slate-100 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsAddCategoryModalOpen(false)}
                                    className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-gray-50 text-xs cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-800 text-xs  cursor-pointer"
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


