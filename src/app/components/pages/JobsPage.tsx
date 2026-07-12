import { Briefcase, Search, Filter, Plus, MapPin, Clock, Users, MoreVertical, Check, LayoutGrid, List, Sparkles, AlertCircle } from "lucide-react";
import { useState } from "react";
import { EditJobModal } from "../modals/EditJobModal";
import { ShareJobModal } from "../modals/ShareJobModal";
import { JobFiltersModal } from "../modals/JobFiltersModal";
import { JobActionsModal } from "../modals/JobActionsModal";
import { DuplicateJobModal } from "../modals/DuplicateJobModal";
import { DeleteJobModal } from "../modals/DeleteJobModal";
import { BulkJobActionsModal } from "../modals/BulkJobActionsModal";
import { JobDetailsPage } from "./JobDetailsPage";
import { ViewApplicantsPage } from "./ViewApplicantsPage";
import { motion, AnimatePresence } from "motion/react";

const initialJobs = [
    { id: 1, title: "Senior Product Designer", department: "Design", location: "Remote", type: "Full-time", applicants: 45, status: "Active", posted: "2 days ago", salary: "€100,000 - €150,000", experience: "5+ years" },
    { id: 2, title: "Frontend Developer", department: "Engineering", location: "New York, NY", type: "Full-time", applicants: 32, status: "Active", posted: "5 days ago", salary: "€90,000 - €140,000", experience: "3-5 years" },
    { id: 3, title: "Marketing Manager", department: "Marketing", location: "San Francisco, CA", type: "Full-time", applicants: 28, status: "Active", posted: "1 week ago", salary: "€85,000 - €125,000", experience: "5+ years" },
    { id: 4, title: "Data Analyst", department: "Analytics", location: "Remote", type: "Contract", applicants: 19, status: "Active", posted: "3 days ago", salary: "€75,000 - €110,000", experience: "3-5 years" },
    { id: 5, title: "Content Writer", department: "Marketing", location: "Remote", type: "Part-time", applicants: 15, status: "Draft", posted: "Today", salary: "€50,000 - €70,000", experience: "2-4 years" },
    { id: 6, title: "Product Manager", department: "Product", location: "Austin, TX", type: "Full-time", applicants: 52, status: "Active", posted: "1 week ago", salary: "€120,000 - €170,000", experience: "5+ years" },
    { id: 7, title: "UX Researcher", department: "Design", location: "Remote", type: "Full-time", applicants: 23, status: "Active", posted: "4 days ago", salary: "€90,000 - €130,000", experience: "3-5 years" },
    { id: 8, title: "DevOps Engineer", department: "Engineering", location: "Seattle, WA", type: "Full-time", applicants: 38, status: "On Hold", posted: "2 weeks ago", salary: "€110,000 - €160,000", experience: "5+ years" },
];

interface JobsPageProps {
    onAddJob: () => void;
    onViewApplicantProfile?: (applicant: any) => void;
    onViewPipeline?: (job: any) => void;
}

export function JobsPage({ onAddJob, onViewApplicantProfile, onViewPipeline }: JobsPageProps) {
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [activeView, setActiveView] = useState<"list" | "details" | "applicants">("list");
    const [jobsList, setJobsList] = useState<any[]>(initialJobs);
    const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [filterStatus, setFilterStatus] = useState<string>("All");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
    const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
    const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isBulkActionsModalOpen, setIsBulkActionsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleJobClick = (job: any) => {
        setSelectedJob(job);
        setActiveView("details");
    };

    const handleBackToJobs = () => {
        setActiveView("list");
        setSelectedJob(null);
    };

    const handleEditJob = (job: any) => {
        setSelectedJob(job);
        setIsEditModalOpen(true);
    };

    const handleViewApplicants = (job: any) => {
        if (onViewPipeline) {
            onViewPipeline(job);
        } else {
            setSelectedJob(job);
            setActiveView("applicants");
        }
    };

    const handleActionsClick = (job: any) => {
        setSelectedJob(job);
        setIsActionsModalOpen(true);
    };

    const toggleJobSelection = (jobId: number) => {
        if (selectedJobs.includes(jobId)) {
            setSelectedJobs(selectedJobs.filter(id => id !== jobId));
        } else {
            setSelectedJobs([...selectedJobs, jobId]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedJobs.length === filteredJobs.length) {
            setSelectedJobs([]);
        } else {
            setSelectedJobs(filteredJobs.map(j => j.id));
        }
    };

    // Filter and search logic
    const filteredJobs = jobsList.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = filterStatus === "All" || job.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusTheme = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
            case "Draft":
                return "bg-gray-100 text-slate-700 border-gray-250/60";
            case "On Hold":
                return "bg-amber-50 text-amber-700 border-amber-200/60";
            default:
                return "bg-rose-50 text-rose-700 border-rose-200/60";
        }
    };

    return (
        <>
            {activeView === "details" && selectedJob ? (
                <JobDetailsPage
                    job={selectedJob}
                    onBack={handleBackToJobs}
                    onEdit={() => handleEditJob(selectedJob)}
                    onViewApplicants={() => handleViewApplicants(selectedJob)}
                    onTogglePause={() => {
                        const newStatus = selectedJob.status === "Active" ? "On Hold" : "Active";
                        const updatedJob = { ...selectedJob, status: newStatus };
                        setSelectedJob(updatedJob);
                        setJobsList(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
                    }}
                />
            ) : activeView === "applicants" && selectedJob ? (
                <ViewApplicantsPage
                    jobTitle={selectedJob.title}
                    onBack={() => setActiveView("details")}
                    onViewCandidate={(candidate) => {
                        if (onViewApplicantProfile) {
                            onViewApplicantProfile(candidate);
                        }
                    }}
                />
            ) : (
                <div className="p-8 text-left bg-gray-50/30 min-h-full">
                    <div className="max-w-[1600px] mx-auto space-y-6">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-slate-900 font-extrabold text-2xl tracking-tight leading-none flex items-center gap-2">
                                    <Briefcase className="w-6 h-6 text-indigo-600" />
                                    Job Directory
                                </h1>
                                <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">Manage your active listings, applicants, and pipeline structures</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {selectedJobs.length > 0 && (
                                    <motion.button
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        onClick={() => setIsBulkActionsModalOpen(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-700 bg-white rounded-xl hover:bg-gray-50 transition-all font-bold text-xs  cursor-pointer"
                                    >
                                        <Check className="w-4 h-4 text-indigo-600" />
                                        Bulk Actions ({selectedJobs.length})
                                    </motion.button>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onAddJob}
                                    className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl transition-all font-extrabold text-xs  border border-indigo-600/10 hover: cursor-pointer tracking-wider"
                                >
                                    <Plus className="w-4 h-4 text-orange-300" />
                                    POST NEW JOB
                                </motion.button>
                            </div>
                        </div>

                        {/* Search & Filters */}
                        <div className="bg-white/80 backdrop-blur-xs rounded-2xl border border-gray-150  p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-450" />
                                    <input
                                        type="text"
                                        placeholder="Search jobs by title, department, or location..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 focus:bg-white transition-all text-xs font-medium"
                                    />
                                </div>
                                <button
                                    onClick={() => setIsFiltersModalOpen(true)}
                                    className="flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 bg-white text-slate-700 rounded-xl hover:bg-gray-50 transition-all font-bold text-xs  cursor-pointer"
                                >
                                    <Filter className="w-4 h-4 text-indigo-600" />
                                    Advanced Filters
                                </button>
                            </div>

                            {/* Quick Filters */}
                            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">
                                {["All", "Active", "Draft", "On Hold", "Closed"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                            filterStatus === status
                                                ? "bg-indigo-600 text-white  hover:bg-indigo-800"
                                                : "bg-gray-50 hover:bg-gray-100 border border-slate-200/40 text-slate-600"
                                        }`}
                                    >
                                        {status} Jobs
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* View Toggle & Select All */}
                        <div className="flex items-center justify-between">
                            {filteredJobs.length > 0 ? (
                                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 text-indigo-600 border-gray-350 rounded focus:ring-indigo-600"
                                    />
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select all shown ({filteredJobs.length})</span>
                                </label>
                            ) : (
                                <div />
                            )}

                            {/* View Toggle */}
                            <div className="flex items-center gap-1.5 bg-gray-100/75 p-1 rounded-xl border border-slate-200/50">
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all text-xs font-bold cursor-pointer ${
                                        viewMode === "list"
                                            ? "bg-indigo-600 text-white "
                                            : "text-slate-500 hover:text-slate-900"
                                    }`}
                                >
                                    <List className="w-3.5 h-3.5" />
                                    <span>List</span>
                                </button>
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all text-xs font-bold cursor-pointer ${
                                        viewMode === "grid"
                                            ? "bg-indigo-600 text-white "
                                            : "text-slate-500 hover:text-slate-900"
                                    }`}
                                >
                                    <LayoutGrid className="w-3.5 h-3.5" />
                                    <span>Grid</span>
                                </button>
                            </div>
                        </div>

                        {/* Jobs List View */}
                        <AnimatePresence mode="popLayout">
                            {viewMode === "list" && (
                                <motion.div className="space-y-4">
                                    {filteredJobs.map((job) => {
                                        const isSelected = selectedJobs.includes(job.id);
                                        return (
                                            <motion.div
                                                key={job.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                className={`bg-white rounded-2xl border transition-all p-6  flex items-center justify-between ${
                                                    isSelected ? "border-indigo-600/30 bg-indigo-600/10" : "border-gray-150 hover:border-gray-250"
                                                }`}
                                            >
                                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleJobSelection(job.id)}
                                                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded mt-1.5 focus:ring-indigo-600 cursor-pointer"
                                                    />
                                                    <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 text-indigo-600">
                                                        <Briefcase className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3.5 mb-2.5 flex-wrap">
                                                            <h3
                                                                className="text-base font-extrabold text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors truncate"
                                                                onClick={() => handleJobClick(job)}
                                                            >
                                                                {job.title}
                                                            </h3>
                                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusTheme(job.status)}`}>
                                                                {job.status}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 font-semibold mb-4">
                                                            <span className="flex items-center gap-1.5">
                                                                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                                                                {job.department}
                                                            </span>
                                                            <span className="flex items-center gap-1.5">
                                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                                {job.location}
                                                            </span>
                                                            <span className="flex items-center gap-1.5">
                                                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                                {job.type}
                                                            </span>
                                                            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-600/5 text-indigo-600 border border-indigo-600/10 rounded-lg">
                                                                <Users className="w-3.5 h-3.5 text-indigo-600" />
                                                                {job.applicants} Applicants
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 flex-wrap">
                                                            <motion.button
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                onClick={() => handleJobClick(job)}
                                                                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-800 transition-all  cursor-pointer"
                                                            >
                                                                View Details
                                                            </motion.button>
                                                            <motion.button
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                onClick={() => handleViewApplicants(job)}
                                                                className="px-4 py-2 border border-slate-200 text-slate-700 bg-white hover:bg-gray-50 rounded-xl text-xs font-bold transition-all  cursor-pointer"
                                                            >
                                                                View Pipeline
                                                            </motion.button>
                                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-1.5">Published {job.posted}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleActionsClick(job)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-150 transition-colors cursor-pointer text-slate-400 hover:text-slate-900"
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}

                            {viewMode === "grid" && (
                                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredJobs.map((job) => {
                                        const isSelected = selectedJobs.includes(job.id);
                                        return (
                                            <motion.div
                                                key={job.id}
                                                initial={{ opacity: 0, scale: 0.97 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.97 }}
                                                className={`bg-white rounded-2xl border transition-all p-6  relative flex flex-col h-full ${
                                                    isSelected ? "border-indigo-600/30 bg-indigo-600/10" : "border-gray-150 hover:border-gray-250"
                                                }`}
                                            >
                                                {/* Checkbox */}
                                                <div className="absolute top-4 left-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleJobSelection(job.id)}
                                                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600 cursor-pointer"
                                                    />
                                                </div>

                                                {/* Actions Menu */}
                                                <div className="absolute top-4 right-4">
                                                    <button
                                                        onClick={() => handleActionsClick(job)}
                                                        className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors cursor-pointer text-slate-400 hover:text-slate-900"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Icon */}
                                                <div className="flex justify-center mb-4 mt-2">
                                                    <div className="w-14 h-14 bg-rose-50 border border-rose-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                                                        <Briefcase className="w-6 h-6" />
                                                    </div>
                                                </div>

                                                {/* Job Title & Status */}
                                                <div className="text-center mb-5 min-h-[70px] flex flex-col items-center justify-center">
                                                    <h3
                                                        className="text-sm font-extrabold text-slate-900 mb-2 cursor-pointer hover:text-indigo-600 transition-colors leading-snug line-clamp-2"
                                                        onClick={() => handleJobClick(job)}
                                                    >
                                                        {job.title}
                                                    </h3>
                                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${getStatusTheme(job.status)}`}>
                                                        {job.status}
                                                    </span>
                                                </div>

                                                {/* Job Details */}
                                                <div className="space-y-3 mb-6 flex-1 text-xs font-semibold text-slate-500 border-t border-b border-slate-100 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Briefcase className="w-3.5 h-3.5 flex-shrink-0 text-gray-450" />
                                                        <span className="truncate">{job.department}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-450" />
                                                        <span className="truncate">{job.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Clock className="w-3.5 h-3.5 flex-shrink-0 text-gray-455" />
                                                        <span>{job.type}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-indigo-600">
                                                        <Users className="w-3.5 h-3.5 flex-shrink-0 text-indigo-600" />
                                                        <span>{job.applicants} Applicants in Pipeline</span>
                                                    </div>
                                                </div>

                                                {/* Posted Date */}
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center mb-4">Published {job.posted}</p>

                                                {/* Actions */}
                                                <div className="space-y-2 mt-auto">
                                                    <motion.button
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.99 }}
                                                        onClick={() => handleJobClick(job)}
                                                        className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-800 transition-all  cursor-pointer"
                                                    >
                                                        View Details
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.99 }}
                                                        onClick={() => handleViewApplicants(job)}
                                                        className="w-full py-2.5 border border-slate-200 text-slate-700 bg-white hover:bg-gray-50 rounded-xl text-xs font-bold transition-all  cursor-pointer"
                                                    >
                                                        View Pipeline
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Empty State */}
                        {filteredJobs.length === 0 && (
                            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center ">
                                <div className="w-14 h-14 bg-gray-50 border border-gray-150 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
                                    <AlertCircle className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900 mb-1">No Jobs Found</h3>
                                <p className="text-xs text-gray-550 max-w-md mx-auto">We couldn't find any job postings matching "{searchQuery}" or the selected status.</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setFilterStatus("All"); }}
                                    className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-800 transition-colors cursor-pointer"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modals */}
            <EditJobModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    if (activeView === "list") setSelectedJob(null);
                }}
                onSave={(updatedJob) => {
                    setJobsList(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
                    if (selectedJob && selectedJob.id === updatedJob.id) {
                        setSelectedJob(updatedJob);
                    }
                }}
                job={selectedJob}
            />

            <ShareJobModal
                isOpen={isShareModalOpen}
                onClose={() => {
                    setIsShareModalOpen(false);
                    if (activeView === "list") setSelectedJob(null);
                }}
                jobTitle={selectedJob?.title}
            />

            <JobFiltersModal
                isOpen={isFiltersModalOpen}
                onClose={() => setIsFiltersModalOpen(false)}
                onApplyFilters={(filters) => {

                }}
            />

            <JobActionsModal
                isOpen={isActionsModalOpen}
                onClose={() => {
                    setIsActionsModalOpen(false);
                    if (activeView === "list") setSelectedJob(null);
                }}
                onEdit={() => {
                    setIsActionsModalOpen(false);
                    setIsEditModalOpen(true);
                }}
                onShare={() => {
                    setIsActionsModalOpen(false);
                    setIsShareModalOpen(true);
                }}
                onDuplicate={() => {
                    setIsActionsModalOpen(false);
                    setIsDuplicateModalOpen(true);
                }}
                onPauseActivate={() => {

                    setIsActionsModalOpen(false);
                }}
                onArchive={() => {

                    setIsActionsModalOpen(false);
                }}
                onDelete={() => {
                    setIsActionsModalOpen(false);
                    setIsDeleteModalOpen(true);
                }}
                jobTitle={selectedJob?.title}
                jobStatus={selectedJob?.status}
            />

            <DuplicateJobModal
                isOpen={isDuplicateModalOpen}
                onClose={() => {
                    setIsDuplicateModalOpen(false);
                    if (activeView === "list") setSelectedJob(null);
                }}
                jobTitle={selectedJob?.title}
            />

            <DeleteJobModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    if (activeView === "list") setSelectedJob(null);
                }}
                onConfirm={() => {

                }}
                jobTitle={selectedJob?.title}
                applicantCount={selectedJob?.applicants}
            />

            <BulkJobActionsModal
                isOpen={isBulkActionsModalOpen}
                onClose={() => setIsBulkActionsModalOpen(false)}
                selectedCount={selectedJobs.length}
                onApply={(action) => {

                    setSelectedJobs([]);
                }}
            />
        </>
    );
}


