import { ArrowLeft, Plus, Search, Filter, Sparkles, MapPin, Calendar, Star, CheckCircle, Download, Share2, Award, Briefcase, ChevronRight, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useState } from "react";
import { motion } from "motion/react";

interface ViewApplicantsPageProps {
    jobTitle?: string;
    onBack: () => void;
    onViewCandidate: (applicant: any) => void;
    fullScreenOverlay?: boolean;
}

const mockApplicants = [
    { id: 1, name: "Sarah Chen", role: "Senior Product Designer", location: "San Francisco, CA", experience: "8 years", applied: "2 days ago", status: "review", match: 95, rating: 4.8 },
    { id: 2, name: "Michael Torres", role: "Product Designer", location: "Remote", experience: "5 years", applied: "3 days ago", status: "screening", match: 88, rating: 4.5 },
    { id: 3, name: "Emily Watson", role: "UI/UX Designer", location: "New York, NY", experience: "7 years", applied: "1 week ago", status: "interview", match: 92, rating: 4.9 },
    { id: 4, name: "David Kim", role: "Product Designer", location: "Austin, TX", experience: "4 years", applied: "5 days ago", status: "review", match: 85, rating: 4.3 },
    { id: 5, name: "Jessica Martinez", role: "Visual Designer", location: "Remote", experience: "6 years", applied: "4 days ago", status: "review", match: 90, rating: 4.7 },
    { id: 6, name: "Ryan Patel", role: "Senior Designer", location: "Seattle, WA", experience: "9 years", applied: "1 week ago", status: "screening", match: 87, rating: 4.6 },
];

const STAGES = [
    { id: "review", name: "Review", color: "bg-indigo-600/10 text-indigo-700 border-indigo-600/20", icon: Briefcase },
    { id: "screening", name: "Screening", color: "bg-amber-50 text-amber-700 border-amber-200/60", icon: Search },
    { id: "interview", name: "Interview", color: "bg-violet-50 text-violet-700 border-violet-200/60", icon: Calendar },
    { id: "offer", name: "Offer", color: "bg-blue-50 text-blue-700 border-blue-200/60", icon: Award },
    { id: "hired", name: "Hired", color: "bg-emerald-50 text-emerald-700 border-emerald-200/60", icon: CheckCircle }
];

export function ViewApplicantsPage({ jobTitle, onBack, onViewCandidate, fullScreenOverlay = false }: ViewApplicantsPageProps) {
    const [applicants, setApplicants] = useState(mockApplicants);
    const [draggedApplicantId, setDraggedApplicantId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [minMatch, setMinMatch] = useState<number>(0);
    const [draggedOverStageId, setDraggedOverStageId] = useState<string | null>(null);
    const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

    // Filters applicants based on search and match threshold
    const filteredApplicants = applicants.filter(a => {
        const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             a.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMatch = a.match >= minMatch;
        return matchesSearch && matchesMatch;
    });

    const pipelineStages = STAGES.map(stage => ({
        ...stage,
        applicants: filteredApplicants.filter(a => a.status === stage.id)
    }));

    const handleDragStart = (e: React.DragEvent, applicantId: number) => {
        setDraggedApplicantId(applicantId);
        e.dataTransfer.setData('text/plain', applicantId.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, stageId: string) => {
        e.preventDefault();
        setDraggedOverStageId(stageId);
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragLeave = () => {
        setDraggedOverStageId(null);
    };

    const handleDrop = (e: React.DragEvent, targetStageId: string) => {
        e.preventDefault();
        setDraggedOverStageId(null);
        if (!draggedApplicantId) return;

        setApplicants(prev => prev.map(applicant =>
            applicant.id === draggedApplicantId
                ? { ...applicant, status: targetStageId }
                : applicant
        ));
        setDraggedApplicantId(null);
    };

    // Calculate dynamic stats
    const totalCount = filteredApplicants.length;
    const topMatchesCount = filteredApplicants.filter(a => a.match >= 90).length;
    const hiredCount = filteredApplicants.filter(a => a.status === 'hired').length;

    const content = (
        <div className="flex flex-col h-[calc(100vh-73px)] overflow-hidden bg-slate-50/50 p-6 text-left w-full">
            {/* Header / Title Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 cursor-pointer text-xs font-bold"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-black text-slate-900 tracking-tight">Recruitment Pipeline</h1>
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-black uppercase tracking-wider">
                                ATS Mode
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">{jobTitle || "Senior UX Product Designer position"}</p>
                    </div>
                </div>

                {/* KPI/Stats Summary Pills */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                    <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-2 shadow-sm flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Total Candidates:</span>
                        <span className="text-xs font-black text-slate-950">{totalCount}</span>
                    </div>
                    <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-2 shadow-sm flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">90%+ Matches:</span>
                        <span className="text-xs font-black text-slate-950">{topMatchesCount}</span>
                    </div>
                    <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-2 shadow-sm flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Hired Rate:</span>
                        <span className="text-xs font-black text-slate-950">
                            {totalCount > 0 ? `${Math.round((hiredCount / totalCount) * 100)}%` : "0%"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Premium Filter Toolbar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 shadow-sm">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by candidate name or expertise..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 transition-all text-xs font-bold text-slate-800 placeholder-slate-400"
                        />
                    </div>
                    
                    {/* Match Score Filter */}
                    <div className="relative">
                        <select
                            value={minMatch}
                            onChange={(e) => setMinMatch(Number(e.target.value))}
                            className="pl-3.5 pr-8 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 transition-all text-xs font-bold text-slate-700 cursor-pointer appearance-none"
                        >
                            <option value={0}>All Match Scores</option>
                            <option value={90}>≥ 90% Match</option>
                            <option value={85}>≥ 85% Match</option>
                            <option value={80}>≥ 80% Match</option>
                        </select>
                        <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <button 
                        onClick={() => alert("CSV Export initiated")}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center"
                        title="Export CSV Data"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => alert("Pipeline Shared")}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center"
                        title="Share Pipeline Link"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => alert("Manual candidate adding opened")}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border border-indigo-600/10 shadow-sm"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Candidate
                    </button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 no-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 h-full min-w-[1100px]">
                    {pipelineStages.map((stage) => {
                        const StageIcon = stage.icon;
                        const isOver = draggedOverStageId === stage.id;
                        return (
                            <div
                                key={stage.id}
                                className={`flex flex-col h-full min-w-0 rounded-2xl p-2 transition-colors ${
                                    isOver ? 'bg-indigo-50/40 border-2 border-dashed border-indigo-300' : 'bg-transparent'
                                }`}
                                onDragOver={(e) => handleDragOver(e, stage.id)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, stage.id)}
                            >
                                {/* Stage Header */}
                                <div className="bg-white rounded-xl border border-slate-200 p-4.5 mb-3 flex-shrink-0 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className={`p-1.5 rounded-lg border ${stage.color} flex-shrink-0`}>
                                                <StageIcon className="w-3.5 h-3.5" />
                                            </div>
                                            <h3 className="text-xs font-black text-slate-900 tracking-tight truncate uppercase font-sans">
                                                {stage.name}
                                            </h3>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${stage.color} flex-shrink-0`}>
                                            {stage.applicants.length}
                                        </span>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-300 ${
                                                stage.id === 'hired' ? 'bg-emerald-500' :
                                                stage.id === 'offer' ? 'bg-blue-500' :
                                                stage.id === 'interview' ? 'bg-violet-500' :
                                                stage.id === 'screening' ? 'bg-amber-500' : 'bg-indigo-600'
                                            }`}
                                            style={{ width: `${applicants.length > 0 ? Math.min(100, (stage.applicants.length / applicants.length) * 100) : 0}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Applicants Cards Area */}
                                <div className="flex-1 space-y-3.5 min-h-[150px] overflow-y-auto pr-1 pb-4 scrollbar-thin scrollbar-thumb-gray-200">
                                    {stage.applicants.map((applicant) => (
                                        <motion.div
                                            key={applicant.id}
                                            className={`relative overflow-hidden bg-white rounded-xl border ${
                                                draggedApplicantId === applicant.id
                                                    ? 'border-indigo-600 opacity-40 scale-95'
                                                    : 'border-slate-200 hover:border-slate-350 shadow-sm'
                                            } transition-all duration-200 p-4 cursor-grab active:cursor-grabbing hover:shadow-md`}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, applicant.id)}
                                            onDragEnd={() => setDraggedApplicantId(null)}
                                            whileHover={{ y: -2 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {/* Card Top Block */}
                                            <div className="flex items-start justify-between gap-2.5 mb-2.5 relative">
                                                <div className="flex items-start gap-2.5 min-w-0">
                                                    <Avatar className="w-9 h-9 border border-slate-100 flex-shrink-0">
                                                        <AvatarFallback className="text-xs font-black bg-indigo-50 text-indigo-700">
                                                            {applicant.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="min-w-0">
                                                        <h4 className="text-slate-900 text-xs font-extrabold truncate leading-tight hover:text-indigo-600 transition-colors">
                                                            {applicant.name}
                                                        </h4>
                                                        <p className="text-[10px] text-slate-500 truncate mt-0.5 font-semibold">{applicant.role}</p>
                                                    </div>
                                                </div>
                                                
                                                {/* 3-dots Action Menu */}
                                                <div className="relative flex-shrink-0">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveDropdownId(activeDropdownId === applicant.id ? null : applicant.id);
                                                        }}
                                                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>

                                                    {activeDropdownId === applicant.id && (
                                                        <>
                                                            <div 
                                                                className="fixed inset-0 z-10" 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setActiveDropdownId(null);
                                                                }}
                                                            />
                                                            <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-premium py-1.5 z-20 text-xs font-bold text-slate-700">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setActiveDropdownId(null);
                                                                        onViewCandidate(applicant);
                                                                    }}
                                                                    className="w-full px-3 py-2 text-left hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-1.5 cursor-pointer"
                                                                >
                                                                    View Profile
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setActiveDropdownId(null);
                                                                        const curIdx = STAGES.findIndex(s => s.id === applicant.status);
                                                                        if (curIdx < STAGES.length - 1) {
                                                                            const nextStage = STAGES[curIdx + 1].id;
                                                                            setApplicants(prev => prev.map(a => a.id === applicant.id ? { ...a, status: nextStage } : a));
                                                                        } else {
                                                                            alert("Candidate is already in final stage!");
                                                                        }
                                                                    }}
                                                                    className="w-full px-3 py-2 text-left hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-1.5 cursor-pointer border-t border-slate-100"
                                                                >
                                                                    Advance Stage
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setActiveDropdownId(null);
                                                                        alert(`Message thread opened with ${applicant.name}`);
                                                                    }}
                                                                    className="w-full px-3 py-2 text-left hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-1.5 cursor-pointer border-t border-slate-100"
                                                                >
                                                                    Send Message
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setActiveDropdownId(null);
                                                                        if (confirm(`Archive ${applicant.name}?`)) {
                                                                            setApplicants(prev => prev.filter(a => a.id !== applicant.id));
                                                                        }
                                                                    }}
                                                                    className="w-full px-3 py-2 text-left hover:bg-rose-50 hover:text-rose-600 text-rose-600 flex items-center gap-1.5 cursor-pointer border-t border-slate-100"
                                                                >
                                                                    Archive / Reject
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Experience & Location Badges */}
                                            <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 text-slate-500 text-[9px] font-bold border border-slate-200/60">
                                                    <MapPin className="w-2.5 h-2.5" /> {applicant.location}
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 text-slate-500 text-[9px] font-bold border border-slate-200/60">
                                                    {applicant.experience} exp
                                                </span>
                                            </div>

                                            {/* Rating and Match stats */}
                                            <div className="flex items-center justify-between pt-3 border-t border-slate-100/80">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                    <span className="text-[10px] font-extrabold text-slate-700">{applicant.rating}</span>
                                                </div>
                                                
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[10px] font-black ${
                                                        applicant.match >= 90 ? 'text-emerald-600' :
                                                        applicant.match >= 85 ? 'text-amber-600' : 'text-slate-500'
                                                    }`}>
                                                        {applicant.match}% match
                                                    </span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onViewCandidate(applicant);
                                                        }}
                                                        className="px-2 py-1 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 rounded-lg text-[9px] font-extrabold transition-all cursor-pointer flex items-center gap-0.5 flex-shrink-0"
                                                        title="View Profile"
                                                    >
                                                        Details <ChevronRight className="w-2.5 h-2.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Empty Stage Drop Zone */}
                                    {stage.applicants.length === 0 && (
                                        <div className="h-20 border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white/50 transition-colors p-4">
                                            <StageIcon className="w-4 h-4 text-slate-300 mb-1" />
                                            <span className="text-[10px] font-extrabold uppercase tracking-wide">Drop Zone</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
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


