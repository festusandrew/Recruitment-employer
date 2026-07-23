import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Plus, Search, Briefcase, ChevronDown, ChevronUp, Users, MoreHorizontal, X, ArrowRight, CheckSquare, Square, Pencil, UserPlus, Copy, Link2, Download, Archive, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Applicant } from "../types";

interface PipelinePageProps {
    onAddJob?: () => void;
    onNavigate?: (page: string) => void;
    selectedJobId?: number;
    onViewApplicantProfile?: (applicant: Applicant) => void;
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
        count: 20,
        color: "bg-indigo-600/10 text-indigo-600 border-indigo-600/20",
        applicants: [
            { id: 1, name: "Sarah Chen", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah1", match: 95 },
            { id: 2, name: "Mike Ross", role: "Frontend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike1", match: 88 },
            { id: 3, name: "Laura Palmer", role: "Marketing Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=laura1", match: 92 },
            { id: 101, name: "Alex Mercer", role: "Senior UX Specialist", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex1", match: 97 },
            { id: 102, name: "Samantha Reed", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam1", match: 94 },
            { id: 103, name: "David Vance", role: "UI Lead", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david1", match: 91 },
            { id: 104, name: "Elena Rostova", role: "Design Systems Arch", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elena1", match: 89 },
            { id: 105, name: "Marcus Vance", role: "Interaction Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus1", match: 86 },
            { id: 106, name: "Hannah Abbott", role: "Visual Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hannah1", match: 84 },
            { id: 107, name: "Kevin Durant", role: "Product Strategist", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kevin1", match: 93 },
            { id: 108, name: "Rachel Zane", role: "UX Researcher", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel1", match: 96 },
            { id: 109, name: "Harvey Specter", role: "Product Director", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=harvey1", match: 90 },
            { id: 110, name: "Louis Litt", role: "Compliance Lead", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=louis1", match: 79 },
            { id: 111, name: "Jessica Pearson", role: "VP Product Design", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica1", match: 98 },
            { id: 112, name: "Donna Paulsen", role: "Operations Specialist", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=donna1", match: 92 },
            { id: 113, name: "Katrina Bennett", role: "Senior Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=katrina1", match: 87 },
            { id: 114, name: "Brian Altman", role: "Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=brian1", match: 83 },
            { id: 115, name: "Sheila Sazs", role: "Talent Partner", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sheila1", match: 81 },
            { id: 116, name: "Robert Zane", role: "Managing Partner", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert1", match: 88 },
            { id: 117, name: "Daniel Hardman", role: "Product Advisor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel1", match: 76 },
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

export function PipelinePage({ onAddJob, onNavigate, selectedJobId, onViewApplicantProfile }: PipelinePageProps) {
    // Editable jobs list (seeded from mock data)
    const [jobs, setJobs] = useState(mockJobs);
    // Jobs archived/removed from the active board (kept in memory since data is mocked)
    const [archivedJobIds, setArchivedJobIds] = useState<number[]>([]);
    const [deletedJobIds, setDeletedJobIds] = useState<number[]>([]);

    const displayedJobs = (selectedJobId ? jobs.filter(job => job.id === selectedJobId) : jobs)
        .filter(job => !deletedJobIds.includes(job.id) && !archivedJobIds.includes(job.id));
    const defaultJobId = displayedJobs.length > 0 ? displayedJobs[0].id : null;
    const [expandedJobId, setExpandedJobId] = useState<number | null>(defaultJobId);
    const [draggedApplicant, setDraggedApplicant] = useState<{ applicantId: number, sourceStageId: string, jobId: number } | null>(null);
    // Multi-select state per job: Record<jobId, applicantId[]>
    const [selectedApplicantIds, setSelectedApplicantIds] = useState<Record<number, number[]>>({});
    // Which job's "..." menu is currently open (null = none)
    const [openMenuJobId, setOpenMenuJobId] = useState<number | null>(null);

    // Density & View mode state per job: "standard" | "compact"
    const [cardDensity, setCardDensity] = useState<"standard" | "compact">("standard");
    // Column-level search state per stage: Record<stageId, string>
    const [columnSearch, setColumnSearch] = useState<Record<string, string>>({});
    // Column-level sort state per stage: Record<stageId, "match" | "name">
    const [columnSort, setColumnSort] = useState<Record<string, "match" | "name">>({});

    const handleColumnSearchChange = (stageId: string, query: string) => {
        setColumnSearch(prev => ({ ...prev, [stageId]: query }));
    };

    const handleColumnSortChange = (stageId: string, sortKey: "match" | "name") => {
        setColumnSort(prev => ({ ...prev, [stageId]: prev[stageId] === sortKey ? undefined as any : sortKey }));
    };

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

    const toggleSelectApplicant = (jobId: number, applicantId: number) => {
        setSelectedApplicantIds(prev => {
            const currentSelected = prev[jobId] || [];
            if (currentSelected.includes(applicantId)) {
                return { ...prev, [jobId]: currentSelected.filter(id => id !== applicantId) };
            } else {
                return { ...prev, [jobId]: [...currentSelected, applicantId] };
            }
        });
    };

    const toggleSelectStageApplicants = (jobId: number, stageApplicantIds: number[]) => {
        if (stageApplicantIds.length === 0) return;
        setSelectedApplicantIds(prev => {
            const currentSelected = prev[jobId] || [];
            const allSelected = stageApplicantIds.every(id => currentSelected.includes(id));

            if (allSelected) {
                // Deselect all in stage
                return { ...prev, [jobId]: currentSelected.filter(id => !stageApplicantIds.includes(id)) };
            } else {
                // Select all in stage
                const newSet = new Set([...currentSelected, ...stageApplicantIds]);
                return { ...prev, [jobId]: Array.from(newSet) };
            }
        });
    };

    const toggleSelectAllJobApplicants = (jobId: number, allJobApplicantIds: number[]) => {
        setSelectedApplicantIds(prev => {
            const currentSelected = prev[jobId] || [];
            const allSelected = allJobApplicantIds.length > 0 && allJobApplicantIds.every(id => currentSelected.includes(id));
            return { ...prev, [jobId]: allSelected ? [] : [...allJobApplicantIds] };
        });
    };

    const handleMoveSelectedToTargetStage = (jobId: number, targetStageId: string) => {
        const selectedIds = selectedApplicantIds[jobId] || [];
        if (selectedIds.length === 0) return;

        setPipelines(prev => {
            const jobPipeline = [...prev[jobId]].map(stage => ({
                ...stage,
                applicants: [...stage.applicants]
            }));

            const targetStageObj = jobPipeline.find(s => s.id === targetStageId);
            if (!targetStageObj) return prev;

            const movedApplicants: any[] = [];

            jobPipeline.forEach(stage => {
                if (stage.id !== targetStageId) {
                    const toMove = stage.applicants.filter(a => selectedIds.includes(a.id));
                    if (toMove.length > 0) {
                        stage.applicants = stage.applicants.filter(a => !selectedIds.includes(a.id));
                        stage.count -= toMove.length;
                        movedApplicants.push(...toMove);
                    }
                }
            });

            if (movedApplicants.length > 0) {
                targetStageObj.applicants.push(...movedApplicants);
                targetStageObj.count += movedApplicants.length;
                toast.success(`Moved ${movedApplicants.length} selected applicant(s) to ${targetStageObj.name}!`);
            }

            return { ...prev, [jobId]: jobPipeline };
        });

        // Clear selection for this job
        setSelectedApplicantIds(prev => ({ ...prev, [jobId]: [] }));
    };

    const handleMoveSelectedToNextStage = (jobId: number) => {
        const selectedIds = selectedApplicantIds[jobId] || [];
        if (selectedIds.length === 0) return;

        setPipelines(prev => {
            const jobPipeline = [...prev[jobId]].map(stage => ({
                ...stage,
                applicants: [...stage.applicants]
            }));

            let movedCount = 0;

            for (let i = 0; i < jobPipeline.length - 1; i++) {
                const currentStage = jobPipeline[i];
                const nextStage = jobPipeline[i + 1];

                const toMove = currentStage.applicants.filter(a => selectedIds.includes(a.id));
                if (toMove.length > 0) {
                    currentStage.applicants = currentStage.applicants.filter(a => !selectedIds.includes(a.id));
                    currentStage.count -= toMove.length;

                    nextStage.applicants.push(...toMove);
                    nextStage.count += toMove.length;
                    movedCount += toMove.length;
                }
            }

            if (movedCount > 0) {
                toast.success(`Moved ${movedCount} selected applicant(s) to their next stage!`);
            } else {
                toast.info("Selected applicants are already at the final stage!");
            }

            return { ...prev, [jobId]: jobPipeline };
        });

        // Clear selection for this job
        setSelectedApplicantIds(prev => ({ ...prev, [jobId]: [] }));
    };

    const handleApplicantClick = (applicant: any, jobTitle: string) => {
        if (onViewApplicantProfile) {
            onViewApplicantProfile({
                id: applicant.id,
                name: applicant.name,
                role: applicant.role,
                avatar: applicant.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(applicant.name)}`,
                appliedDate: "Recently",
                status: "In Pipeline",
                matchScore: applicant.match || 90,
                match: applicant.match || 90,
                email: `${applicant.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
                phone: "+1 (555) 234-5678",
                location: "San Francisco, CA",
                experience: "5 years",
                education: "B.S. Computer Science",
                skills: ["React", "TypeScript", "UI/UX", "Tailwind CSS"],
                appliedJob: jobTitle,
                activeJob: jobTitle,
                applied: "Recently",
                summary: `${applicant.name} is an experienced ${applicant.role} currently in the pipeline for ${jobTitle}.`,
                about: `Passionate ${applicant.role} dedicated to crafting scalable solutions and elegant user experiences.`,
                resumeUrl: "#",
                notes: "Candidate active in job pipeline."
            });
        } else {
            toast.info(`Viewing profile for ${applicant.name}`);
        }
    };

    const handleDragStart = (e: React.DragEvent, applicantId: number, sourceStageId: string, jobId: number) => {
        const currentSelected = selectedApplicantIds[jobId] || [];
        // If dragged item is not part of selection, select just it or include it
        if (!currentSelected.includes(applicantId)) {
            setSelectedApplicantIds(prev => ({ ...prev, [jobId]: [applicantId] }));
        }
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

        const selectedIds = selectedApplicantIds[jobId] || [applicantId];
        const idsToMove = selectedIds.length > 0 ? selectedIds : [applicantId];

        setPipelines(prev => {
            const jobPipeline = [...prev[jobId]].map(s => ({
                ...s,
                applicants: [...s.applicants]
            }));

            const targetStageObj = jobPipeline.find(s => s.id === targetStageId);
            if (!targetStageObj) return prev;

            const movedApplicants: any[] = [];

            jobPipeline.forEach(stage => {
                if (stage.id !== targetStageId) {
                    const toMove = stage.applicants.filter(a => idsToMove.includes(a.id));
                    if (toMove.length > 0) {
                        stage.applicants = stage.applicants.filter(a => !idsToMove.includes(a.id));
                        stage.count -= toMove.length;
                        movedApplicants.push(...toMove);
                    }
                }
            });

            if (movedApplicants.length > 0) {
                targetStageObj.applicants.push(...movedApplicants);
                targetStageObj.count += movedApplicants.length;
                toast.success(`Moved ${movedApplicants.length} applicant(s) to ${targetStageObj.name}!`);
            }

            return { ...prev, [jobId]: jobPipeline };
        });

        // Clear selection
        setSelectedApplicantIds(prev => ({ ...prev, [jobId]: [] }));
        setDraggedApplicant(null);
    };

    // --- Job "..." menu actions ---
    type JobType = typeof mockJobs[0];

    const handleEditJob = (job: JobType) => {
        setOpenMenuJobId(null);
        if (onNavigate) {
            onNavigate('jobs');
        } else {
            toast.info(`Editing "${job.title}"`);
        }
    };

    const handleQuickAddApplicant = (job: JobType) => {
        setOpenMenuJobId(null);
        setSelectedJobForApplicant(job.id);
        setIsAddApplicantModalOpen(true);
    };

    const handleDuplicateJob = (job: JobType) => {
        setOpenMenuJobId(null);
        toast.success(`Duplicated "${job.title}" — a copy is ready to edit.`);
    };

    const handleCopyPipelineLink = (job: JobType) => {
        setOpenMenuJobId(null);
        const url = `${window.location.origin}${window.location.pathname}#/pipeline/${job.id}`;
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(url).then(
                () => toast.success("Pipeline link copied to clipboard!"),
                () => toast.error("Couldn't copy the link.")
            );
        } else {
            toast.info(url);
        }
    };

    const handleExportApplicants = (job: JobType) => {
        setOpenMenuJobId(null);
        const jobStages = pipelines[job.id] || mockStages;
        const rows: string[][] = [["Name", "Role", "Stage", "Match %"]];
        jobStages.forEach(stage => {
            (stage.applicants || []).forEach(a => {
                rows.push([a.name, a.role, stage.name, String(a.match)]);
            });
        });

        if (rows.length === 1) {
            toast.info("No applicants to export for this job.");
            return;
        }

        const csv = rows
            .map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
            .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${job.title.replace(/\s+/g, "-").toLowerCase()}-applicants.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success(`Exported ${rows.length - 1} applicant(s) for ${job.title}!`);
    };

    const handleArchiveJob = (job: JobType) => {
        setOpenMenuJobId(null);
        setArchivedJobIds(prev => [...prev, job.id]);
        toast.success(`"${job.title}" archived.`, {
            action: {
                label: "Undo",
                onClick: () => setArchivedJobIds(prev => prev.filter(id => id !== job.id)),
            },
        });
    };

    const handleDeleteJob = (job: JobType) => {
        setOpenMenuJobId(null);
        setDeletedJobIds(prev => [...prev, job.id]);
        toast.success(`"${job.title}" deleted.`, {
            action: {
                label: "Undo",
                onClick: () => setDeletedJobIds(prev => prev.filter(id => id !== job.id)),
            },
        });
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
                    const stages = pipelines[job.id] || mockStages;
                    const currentSelectedIds = selectedApplicantIds[job.id] || [];

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
                                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => setOpenMenuJobId(prev => prev === job.id ? null : job.id)}
                                            className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                                openMenuJobId === job.id
                                                    ? "text-indigo-600 bg-indigo-600/10"
                                                    : "text-slate-400 hover:text-slate-600 hover:bg-gray-50"
                                            }`}
                                            title="Job options"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>

                                        {openMenuJobId === job.id && (
                                            <>
                                                {/* Click-away backdrop */}
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setOpenMenuJobId(null)}
                                                />
                                                <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-200/50 z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
                                                    <div className="px-3 pb-1.5 mb-1 border-b border-slate-100">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{job.title}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleEditJob(job)}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5 text-slate-400" />
                                                        Edit Job
                                                    </button>
                                                    <button
                                                        onClick={() => handleQuickAddApplicant(job)}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    >
                                                        <UserPlus className="w-3.5 h-3.5 text-slate-400" />
                                                        Add Applicant
                                                    </button>
                                                    <button
                                                        onClick={() => handleDuplicateJob(job)}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    >
                                                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                                                        Duplicate Job
                                                    </button>
                                                    <button
                                                        onClick={() => handleCopyPipelineLink(job)}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    >
                                                        <Link2 className="w-3.5 h-3.5 text-slate-400" />
                                                        Copy Pipeline Link
                                                    </button>
                                                    <button
                                                        onClick={() => handleExportApplicants(job)}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    >
                                                        <Download className="w-3.5 h-3.5 text-slate-400" />
                                                        Export Applicants (CSV)
                                                    </button>

                                                    <div className="my-1 border-t border-slate-100" />

                                                    <button
                                                        onClick={() => handleArchiveJob(job)}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                                                    >
                                                        <Archive className="w-3.5 h-3.5 text-amber-500" />
                                                        Archive Job
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteJob(job)}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                                        Delete Job
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
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
                                                <div className="flex items-center gap-3">
                                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Applicant Pipeline Stages</h4>
                                                    {(() => {
                                                        const allJobApplicantIds = stages.flatMap(s => s.applicants?.map(a => a.id) || []);
                                                        const isAllSelected = allJobApplicantIds.length > 0 && allJobApplicantIds.every(id => currentSelectedIds.includes(id));
                                                        return (
                                                            <button
                                                                onClick={() => toggleSelectAllJobApplicants(job.id, allJobApplicantIds)}
                                                                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 transition-colors cursor-pointer"
                                                            >
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={isAllSelected} 
                                                                    readOnly 
                                                                    className="w-3.5 h-3.5 text-indigo-600 rounded cursor-pointer pointer-events-none" 
                                                                />
                                                                <span>{isAllSelected ? "Deselect All" : "Select All Cards"}</span>
                                                            </button>
                                                        );
                                                    })()}
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {/* Density Mode Switcher */}
                                                    <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-[11px] font-semibold text-slate-600 border border-slate-200/60">
                                                        <button
                                                            onClick={() => setCardDensity("standard")}
                                                            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                                                                cardDensity === "standard" ? "bg-white text-indigo-600 shadow-xs font-bold" : "hover:text-slate-900"
                                                            }`}
                                                            title="Standard view mode"
                                                        >
                                                            Cards
                                                        </button>
                                                        <button
                                                            onClick={() => setCardDensity("compact")}
                                                            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                                                                cardDensity === "compact" ? "bg-white text-indigo-600 shadow-xs font-bold" : "hover:text-slate-900"
                                                            }`}
                                                            title="High-density compact view mode"
                                                        >
                                                            Compact
                                                        </button>
                                                    </div>

                                                    {currentSelectedIds.length > 0 && (
                                                        <div className="flex items-center gap-2 bg-indigo-50/80 border border-indigo-200 p-1.5 rounded-xl animate-in fade-in zoom-in-95">
                                                            <span className="text-xs font-bold text-indigo-700 px-1">
                                                                {currentSelectedIds.length} Selected
                                                            </span>
                                                            <select
                                                                onChange={(e) => {
                                                                    if (e.target.value) {
                                                                        handleMoveSelectedToTargetStage(job.id, e.target.value);
                                                                        e.target.value = "";
                                                                    }
                                                                }}
                                                                defaultValue=""
                                                                className="bg-white text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                                                            >
                                                                <option value="" disabled>Move to stage...</option>
                                                                {stages.map(stg => (
                                                                    <option key={stg.id} value={stg.id}>{stg.name}</option>
                                                                ))}
                                                            </select>
                                                            <button
                                                                onClick={() => handleMoveSelectedToNextStage(job.id)}
                                                                className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs font-semibold cursor-pointer shadow-xs"
                                                                title="Move all selected cards to their sequential next stage"
                                                            >
                                                                <ArrowRight className="w-3.5 h-3.5" />
                                                                Next Stage
                                                            </button>
                                                            <button
                                                                onClick={() => setSelectedApplicantIds(prev => ({ ...prev, [job.id]: [] }))}
                                                                className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer"
                                                                title="Clear Selection"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}
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

                                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-[300px] w-full pb-2 overflow-x-auto no-scrollbar">
                                                {stages.map((stage) => {
                                                    const stageApplicantIds = stage.applicants?.map(a => a.id) || [];
                                                    const isStageAllSelected = stageApplicantIds.length > 0 && stageApplicantIds.every(id => currentSelectedIds.includes(id));
                                                    
                                                    // Filter & Sort stage applicants
                                                    const searchQ = (columnSearch[stage.id] || "").toLowerCase();
                                                    const sortK = columnSort[stage.id];

                                                    let processedApplicants = (stage.applicants || []).filter(a =>
                                                        a.name.toLowerCase().includes(searchQ) || a.role.toLowerCase().includes(searchQ)
                                                    );

                                                    if (sortK === "match") {
                                                        processedApplicants = [...processedApplicants].sort((a, b) => b.match - a.match);
                                                    } else if (sortK === "name") {
                                                        processedApplicants = [...processedApplicants].sort((a, b) => a.name.localeCompare(b.name));
                                                    }

                                                    return (
                                                    <div
                                                        key={stage.id}
                                                        className="flex flex-col h-full min-w-0"
                                                        onDragOver={handleDragOver}
                                                        onDrop={(e) => handleDrop(e, stage.id, job.id)}
                                                    >
                                                        {/* Stage Header */}
                                                        <div className="bg-white rounded-xl border border-gray-150 p-3 mb-2.5 flex-shrink-0">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center gap-1.5 min-w-0">
                                                                    {stageApplicantIds.length > 0 && (
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={isStageAllSelected}
                                                                            onChange={() => toggleSelectStageApplicants(job.id, stageApplicantIds)}
                                                                            title={isStageAllSelected ? "Deselect column" : "Select all in column"}
                                                                            className="w-3.5 h-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                                                                        />
                                                                    )}
                                                                    <h3 className="text-[11px] font-bold text-gray-905 truncate tracking-wide uppercase">{stage.name}</h3>
                                                                    <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-bold border ${stage.color} flex-shrink-0`}>
                                                                        {stage.count}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Mini Column Search & Sort (Enabled when stage has > 5 candidates) */}
                                                            {stage.applicants && stage.applicants.length > 5 && (
                                                                <div className="flex items-center gap-1 mt-2 mb-2">
                                                                    <div className="relative flex-1">
                                                                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                                                                        <input
                                                                            type="text"
                                                                            placeholder={`Search ${stage.name}...`}
                                                                            value={columnSearch[stage.id] || ""}
                                                                            onChange={(e) => handleColumnSearchChange(stage.id, e.target.value)}
                                                                            className="w-full pl-6 pr-2 py-1 bg-gray-50 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:bg-white focus:border-indigo-500 transition-colors"
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleColumnSortChange(stage.id, "match")}
                                                                        className={`px-1.5 py-1 rounded text-[9px] font-bold border transition-colors cursor-pointer ${
                                                                            sortK === "match" ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-gray-50 text-slate-500 border-slate-200 hover:bg-gray-100"
                                                                        }`}
                                                                        title="Sort by match score"
                                                                    >
                                                                        Score
                                                                    </button>
                                                                </div>
                                                            )}

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
                                                        <div className="flex-1 space-y-2 max-h-[380px] overflow-y-auto pr-1 pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                                                            {processedApplicants.map((applicant) => {
                                                                const isSelected = currentSelectedIds.includes(applicant.id);

                                                                if (cardDensity === "compact") {
                                                                    return (
                                                                        <motion.div
                                                                            key={applicant.id}
                                                                            className={`bg-white rounded-lg border ${
                                                                                isSelected
                                                                                    ? 'border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600/30'
                                                                                    : draggedApplicant?.applicantId === applicant.id
                                                                                    ? 'border-indigo-600 opacity-45'
                                                                                    : 'border-gray-150 hover:border-gray-300'
                                                                            } transition-all duration-150 p-2 cursor-grab active:cursor-grabbing flex items-center justify-between gap-2 group relative`}
                                                                            draggable
                                                                            onDragStart={(e) => handleDragStart(e, applicant.id, stage.id, job.id)}
                                                                            onDragEnd={() => setDraggedApplicant(null)}
                                                                            whileHover={{ y: -1 }}
                                                                        >
                                                                            <div className="flex items-center gap-2 min-w-0">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={isSelected}
                                                                                    onChange={(e) => {
                                                                                        e.stopPropagation();
                                                                                        toggleSelectApplicant(job.id, applicant.id);
                                                                                    }}
                                                                                    className="w-3 h-3 text-indigo-600 border-gray-300 rounded cursor-pointer flex-shrink-0"
                                                                                />
                                                                                <Avatar 
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleApplicantClick(applicant, job.title);
                                                                                    }}
                                                                                    className="w-5.5 h-5.5 border border-slate-100 flex-shrink-0 cursor-pointer"
                                                                                >
                                                                                    <AvatarImage src={applicant.avatar} />
                                                                                    <AvatarFallback className="bg-indigo-50 text-indigo-700 text-[8px] font-bold">
                                                                                        {applicant.name.split(' ').map(n => n[0]).join('')}
                                                                                    </AvatarFallback>
                                                                                </Avatar>
                                                                                <span 
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleApplicantClick(applicant, job.title);
                                                                                    }}
                                                                                    className="text-slate-900 font-bold text-[11px] truncate cursor-pointer hover:text-indigo-600 transition-colors"
                                                                                >
                                                                                    {applicant.name}
                                                                                </span>
                                                                            </div>
                                                                            <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                                                                                applicant.match >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                                                            } flex-shrink-0`}>
                                                                                {applicant.match}%
                                                                            </span>
                                                                        </motion.div>
                                                                    );
                                                                }

                                                                return (
                                                                    <motion.div
                                                                        key={applicant.id}
                                                                        className={`bg-white rounded-xl border ${
                                                                            isSelected
                                                                                ? 'border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-600/30'
                                                                                : draggedApplicant?.applicantId === applicant.id
                                                                                ? 'border-indigo-600 opacity-45 scale-95'
                                                                                : 'border-gray-150 hover:border-gray-300'
                                                                        } transition-all duration-200 p-3 cursor-grab active:cursor-grabbing group relative`}
                                                                        draggable
                                                                        onDragStart={(e) => handleDragStart(e, applicant.id, stage.id, job.id)}
                                                                        onDragEnd={() => setDraggedApplicant(null)}
                                                                        whileHover={{ y: -2, scale: 1.01 }}
                                                                        transition={{ duration: 0.15 }}
                                                                    >
                                                                        <div className="flex items-start gap-2 mb-2">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={isSelected}
                                                                                onChange={(e) => {
                                                                                    e.stopPropagation();
                                                                                    toggleSelectApplicant(job.id, applicant.id);
                                                                                }}
                                                                                className="mt-1 w-3.5 h-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                                                                            />
                                                                            <Avatar 
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleApplicantClick(applicant, job.title);
                                                                                }}
                                                                                className="w-7.5 h-7.5 border border-slate-100 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                                                            >
                                                                                <AvatarImage src={applicant.avatar} />
                                                                                <AvatarFallback className="bg-indigo-50 text-indigo-700 font-extrabold text-[9px]">
                                                                                    {applicant.name.split(' ').map(n => n[0]).join('')}
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                            <div className="flex-1 min-w-0">
                                                                                <h4 
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleApplicantClick(applicant, job.title);
                                                                                    }}
                                                                                    className="text-slate-900 font-bold text-xs truncate hover:text-indigo-600 transition-colors leading-tight cursor-pointer underline-offset-2 hover:underline"
                                                                                >
                                                                                    {applicant.name}
                                                                                </h4>
                                                                                <p className="text-[9px] text-slate-500 truncate mt-0.5 font-medium">{applicant.role}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                                                            <div className="flex items-center gap-1">
                                                                                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                                                                    applicant.match >= 90 ? 'bg-emerald-500' :
                                                                                    applicant.match >= 85 ? 'bg-amber-500' : 'bg-orange-500'
                                                                                }`}></div>
                                                                                <span className="text-[9px] font-bold text-slate-600">{applicant.match}% match</span>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                );
                                                            })}

                                                            {/* Empty Stage Drop Zone */}
                                                            {stage.applicants?.length === 0 && (
                                                                <div className="h-14 border-2 border-dashed border-slate-200 hover:border-gray-355 rounded-xl flex items-center justify-center text-slate-400 text-[10px] font-bold bg-white/40 transition-colors">
                                                                    Drop applicant
                                                                </div>
                                                            )}
                                                         </div>
                                                    </div>
                                                    );
                                                })}

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


