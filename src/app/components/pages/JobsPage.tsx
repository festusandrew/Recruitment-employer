import { Briefcase, Search, Filter, Plus, MapPin, Clock, Users, MoreVertical, Check, LayoutGrid, List } from "lucide-react";
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

const jobs = [
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
}

export function JobsPage({ onAddJob, onViewApplicantProfile }: JobsPageProps) {
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [activeView, setActiveView] = useState<"list" | "details" | "applicants">("list");
    const [jobsList, setJobsList] = useState<any[]>(jobs);
    const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
    const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
    const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isBulkActionsModalOpen, setIsBulkActionsModalOpen] = useState(false);

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
        setSelectedJob(job);
        setActiveView("applicants");
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
        if (selectedJobs.length === jobsList.length) {
            setSelectedJobs([]);
        } else {
            setSelectedJobs(jobsList.map(j => j.id));
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
                <div className="p-8">
                    <div className="max-w-[1600px] mx-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-gray-900 mb-2 text-2xl font-semibold">All Jobs</h1>
                                <p className="text-gray-600">Manage your job postings and openings</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {selectedJobs.length > 0 && (
                                    <button
                                        onClick={() => setIsBulkActionsModalOpen(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                                    >
                                        <Check className="w-4 h-4" />
                                        Bulk Actions ({selectedJobs.length})
                                    </button>
                                )}
                                <button
                                    onClick={onAddJob}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors font-medium text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    Post New Job
                                </button>
                            </div>
                        </div>

                        {/* Search & Filters */}
                        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6 mb-6">
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search jobs by title, department, or location..."
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                    />
                                </div>
                                <button
                                    onClick={() => setIsFiltersModalOpen(true)}
                                    className="flex items-center gap-2 px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                                >
                                    <Filter className="w-4 h-4" />
                                    Filters
                                </button>
                            </div>

                            {/* Quick Filters */}
                            <div className="flex gap-2 mt-4">
                                <button className="px-4 py-2 bg-[#800020] text-white rounded-lg text-sm font-medium">All Jobs</button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Active</button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Draft</button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">On Hold</button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Closed</button>
                            </div>
                        </div>

                        {/* View Toggle & Select All */}
                        <div className="flex items-center justify-between mb-4">
                            {jobsList.length > 0 && (
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedJobs.length === jobsList.length}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 text-[#800020] rounded focus:ring-[#800020]"
                                    />
                                    <span className="text-sm font-medium text-gray-600">Select all jobs</span>
                                </label>
                            )}

                            {/* View Toggle */}
                            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${viewMode === "list"
                                            ? "bg-[#800020] text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                    <span className="text-sm font-medium">List</span>
                                </button>
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${viewMode === "grid"
                                            ? "bg-[#800020] text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                    <span className="text-sm font-medium">Grid</span>
                                </button>
                            </div>
                        </div>

                        {/* Jobs List View */}
                        {viewMode === "list" && (
                            <div className="space-y-4">
                                {jobsList.map((job) => (
                                    <div
                                        key={job.id}
                                        className="bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 p-6"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4 flex-1">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedJobs.includes(job.id)}
                                                    onChange={() => toggleJobSelection(job.id)}
                                                    className="w-5 h-5 text-[#800020] rounded mt-1 focus:ring-[#800020]"
                                                />
                                                <div className="w-12 h-12 bg-[#800020]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Briefcase className="w-6 h-6 text-[#800020]" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3
                                                            className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-[#800020] transition-colors"
                                                            onClick={() => handleJobClick(job)}
                                                        >
                                                            {job.title}
                                                        </h3>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${job.status === "Active" ? "bg-green-50 text-green-700 border-green-200" :
                                                                job.status === "Draft" ? "bg-gray-50 text-gray-700 border-gray-200" :
                                                                    "bg-orange-50 text-orange-700 border-orange-200"
                                                            }`}>
                                                            {job.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                                        <span className="flex items-center gap-1.5">
                                                            <Briefcase className="w-4 h-4" />
                                                            {job.department}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <MapPin className="w-4 h-4" />
                                                            {job.location}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4" />
                                                            {job.type}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Users className="w-4 h-4" />
                                                            {job.applicants} applicants
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => handleJobClick(job)}
                                                            className="px-4 py-2 bg-[#800020] text-white rounded-lg text-sm font-medium hover:bg-[#600018] transition-colors"
                                                        >
                                                            View Details
                                                        </button>
                                                        <button
                                                            onClick={() => handleViewApplicants(job)}
                                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                                        >
                                                            View Applicants
                                                        </button>
                                                        <span className="text-sm text-gray-500 ml-2">Posted {job.posted}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleActionsClick(job)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <MoreVertical className="w-5 h-5 text-gray-500" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Jobs Grid View */}
                        {viewMode === "grid" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {jobsList.map((job) => (
                                    <div
                                        key={job.id}
                                        className="bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 p-6 relative flex flex-col h-full"
                                    >
                                        {/* Checkbox */}
                                        <div className="absolute top-4 left-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedJobs.includes(job.id)}
                                                onChange={() => toggleJobSelection(job.id)}
                                                className="w-5 h-5 text-[#800020] rounded focus:ring-[#800020]"
                                            />
                                        </div>

                                        {/* Actions Menu */}
                                        <div className="absolute top-4 right-4">
                                            <button
                                                onClick={() => handleActionsClick(job)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <MoreVertical className="w-5 h-5 text-gray-500" />
                                            </button>
                                        </div>

                                        {/* Icon */}
                                        <div className="flex justify-center mb-4 mt-2">
                                            <div className="w-16 h-16 bg-[#800020]/10 rounded-xl flex items-center justify-center">
                                                <Briefcase className="w-8 h-8 text-[#800020]" />
                                            </div>
                                        </div>

                                        {/* Job Title & Status */}
                                        <div className="text-center mb-6">
                                            <h3
                                                className="text-lg font-semibold text-gray-900 mb-3 cursor-pointer hover:text-[#800020] transition-colors"
                                                onClick={() => handleJobClick(job)}
                                            >
                                                {job.title}
                                            </h3>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${job.status === "Active" ? "bg-green-50 text-green-700 border-green-200" :
                                                    job.status === "Draft" ? "bg-gray-50 text-gray-700 border-gray-200" :
                                                        "bg-orange-50 text-orange-700 border-orange-200"
                                                }`}>
                                                {job.status}
                                            </span>
                                        </div>

                                        {/* Job Details */}
                                        <div className="space-y-3 mb-6 flex-1">
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Briefcase className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                                <span className="truncate">{job.department}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                                <span className="truncate">{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Clock className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                                <span>{job.type}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Users className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                                <span>{job.applicants} applicants</span>
                                            </div>
                                        </div>

                                        {/* Posted Date */}
                                        <p className="text-xs text-gray-500 text-center mb-4">Posted {job.posted}</p>

                                        {/* Actions */}
                                        <div className="space-y-2 mt-auto">
                                            <button
                                                onClick={() => handleJobClick(job)}
                                                className="w-full px-4 py-2 bg-[#800020] text-white rounded-lg text-sm font-medium hover:bg-[#600018] transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => handleViewApplicants(job)}
                                                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                            >
                                                View Applicants
                                            </button>
                                        </div>
                                    </div>
                                ))}
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
                    console.log("Applied filters:", filters);
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
                    console.log("Toggle pause/activate");
                    setIsActionsModalOpen(false);
                }}
                onArchive={() => {
                    console.log("Archive job");
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
                    console.log("Job deleted");
                }}
                jobTitle={selectedJob?.title}
                applicantCount={selectedJob?.applicants}
            />

            <BulkJobActionsModal
                isOpen={isBulkActionsModalOpen}
                onClose={() => setIsBulkActionsModalOpen(false)}
                selectedCount={selectedJobs.length}
                onApply={(action) => {
                    console.log("Bulk action applied:", action, selectedJobs);
                    setSelectedJobs([]);
                }}
            />
        </>
    );
}