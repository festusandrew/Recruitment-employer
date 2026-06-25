import { MapPin, Building2, Users, ExternalLink, Edit, Share2, MoreVertical, Briefcase } from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useState } from "react";
import { EditJobModal } from "./modals/EditJobModal";
import { ShareJobModal } from "./modals/ShareJobModal";
import { JobActionsModal } from "./modals/JobActionsModal";
import { JobDetailsPage } from "./pages/JobDetailsPage";
import { ViewApplicantsPage } from "./pages/ViewApplicantsPage";
import { motion } from "motion/react";

const initialJobsData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        location: "Remote",
        department: "Engineering",
        applicants: 127,
        progress: 65,
        status: "Live",
        statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200/50",
        type: "Full-time",
        salary: "€120,000 - €180,000",
        experience: "5+ years",
        posted: "3 days ago",
    },
    {
        id: 2,
        title: "Product Designer",
        location: "New York, NY",
        department: "Design",
        applicants: 89,
        progress: 45,
        status: "Live",
        statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200/50",
        type: "Full-time",
        salary: "€100,000 - €150,000",
        experience: "3-5 years",
        posted: "5 days ago",
    },
    {
        id: 3,
        title: "DevOps Engineer",
        location: "San Francisco, CA",
        department: "Engineering",
        applicants: 54,
        progress: 30,
        status: "Live",
        statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200/50",
        type: "Full-time",
        salary: "€130,000 - €190,000",
        experience: "5+ years",
        posted: "1 week ago",
    },
    {
        id: 4,
        title: "Marketing Manager",
        location: "Remote",
        department: "Marketing",
        applicants: 43,
        progress: 20,
        status: "Paused",
        statusColor: "bg-amber-50 text-amber-700 border-amber-200/50",
        type: "Full-time",
        salary: "€90,000 - €130,000",
        experience: "5+ years",
        posted: "2 weeks ago",
    },
    {
        id: 5,
        title: "Data Analyst",
        location: "Austin, TX",
        department: "Analytics",
        applicants: 67,
        progress: 55,
        status: "Live",
        statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200/50",
        type: "Full-time",
        salary: "€80,000 - €120,000",
        experience: "3-5 years",
        posted: "4 days ago",
    },
];

export function ActiveJobs({ onViewAllJobs, onViewPipeline }: { onViewAllJobs?: () => void; onViewPipeline?: (job: any) => void; }) {
    const [jobsList, setJobsList] = useState(initialJobsData);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [actionJob, setActionJob] = useState<any>(null);
    const [activeView, setActiveView] = useState<"list" | "details" | "applicants">("list");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);

    const handleJobClick = (job: any) => {
        setSelectedJob(job);
        setActiveView("details");
    };

    const handleEditJob = (job: any) => {
        setSelectedJob(job);
        setIsEditModalOpen(true);
    };

    const handleViewApplicants = (job: any) => {
        setSelectedJob(job);
        setActiveView("applicants");
    };

    const handleShareJob = (job: any) => {
        setSelectedJob(job);
        setIsShareModalOpen(true);
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-6 border border-gray-100  text-left relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg text-gray-900 font-bold tracking-tight">Active Jobs</h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {jobsList.length} positions currently open for applications
                        </p>
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={onViewAllJobs} 
                        className="hover:bg-[#800020] hover:text-white hover:border-[#800020] cursor-pointer font-bold text-xs px-4 py-2 rounded-xl transition-all duration-300  bg-white border-gray-200 text-gray-750"
                    >
                        View All Jobs
                    </Button>
                </div>

                <div className="overflow-x-auto -mx-6 px-6 no-scrollbar">
                    <div className="flex gap-5 pb-4 min-w-max">
                        {jobsList.map((job, idx) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.35, delay: idx * 0.08 }}
                                whileHover={{ y: -4, boxShadow: "0 12px 20px -8px rgba(0,0,0,0.06)", borderColor: "rgba(128, 0, 32, 0.15)" }}
                                className="bg-white rounded-2xl p-5 border border-gray-150  transition-all duration-300 w-[320px] flex-shrink-0 flex flex-col justify-between h-[280px]"
                            >
                                <div>
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div
                                            className="flex-1 cursor-pointer select-none text-left"
                                            onClick={() => handleJobClick(job)}
                                        >
                                            <h3 className="text-gray-950 font-bold text-sm leading-tight hover:text-[#800020] transition-colors line-clamp-2">{job.title}</h3>
                                            <div className="flex flex-col gap-1 mt-2.5">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                                                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                    <span>{job.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                                                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                                    <span>{job.department}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            className="p-1.5 hover:bg-gray-100/70 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-250/20"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActionJob(job);
                                                setIsActionsModalOpen(true);
                                            }}
                                            title="More actions"
                                        >
                                            <MoreVertical className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                        </button>
                                    </div>

                                    {/* Status Badge */}
                                    <Badge
                                        variant="outline"
                                        className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border leading-none mb-4 inline-block ${job.statusColor}`}
                                    >
                                        {job.status}
                                    </Badge>
                                </div>

                                <div>
                                    {/* Applicants and Progress */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-1.5 text-xs font-semibold text-gray-550">
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-3.5 h-3.5 text-gray-400" />
                                                <span>{job.applicants} Applicants</span>
                                            </div>
                                            <span className="text-gray-900 font-bold">{job.progress}%</span>
                                        </div>
                                        {/* Premium Custom Colored Progress Bar */}
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full rounded-full bg-primary   transition-all duration-500"
                                                style={{ width: `${job.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex gap-1 pt-3 border-t border-gray-100">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex-1 text-[10px] font-bold h-8 cursor-pointer hover:bg-[#800020]/5 hover:text-[#800020] text-gray-600 rounded-lg transition-all"
                                            onClick={() => {
                                                if (onViewPipeline) {
                                                    onViewPipeline(job);
                                                } else {
                                                    handleViewApplicants(job);
                                                }
                                            }}
                                        >
                                            <ExternalLink className="w-3.5 h-3.5 mr-1" />
                                            Pipeline
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex-1 text-[10px] font-bold h-8 cursor-pointer hover:bg-[#800020]/5 hover:text-[#800020] text-gray-600 rounded-lg transition-all"
                                            onClick={() => handleEditJob(job)}
                                        >
                                            <Edit className="w-3.5 h-3.5 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex-1 text-[10px] font-bold h-8 cursor-pointer hover:bg-[#800020]/5 hover:text-[#800020] text-gray-600 rounded-lg transition-all"
                                            onClick={() => handleShareJob(job)}
                                        >
                                            <Share2 className="w-3.5 h-3.5 mr-1" />
                                            Share
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Full Page Overlays */}
            {activeView === "details" && selectedJob && (
                <JobDetailsPage
                    job={selectedJob}
                    onBack={() => setActiveView("list")}
                    onEdit={() => handleEditJob(selectedJob)}
                    onViewApplicants={() => handleViewApplicants(selectedJob)}
                    fullScreenOverlay={true}
                />
            )}

            {activeView === "applicants" && selectedJob && (
                <ViewApplicantsPage
                    jobTitle={selectedJob.title}
                    onBack={() => setActiveView("list")}
                    onViewCandidate={(candidate) => {
                        console.log("View candidate:", candidate);
                    }}
                    fullScreenOverlay={true}
                />
            )}

            {/* Modals */}
            <EditJobModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    if (activeView === "list") setSelectedJob(null);
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

            <JobActionsModal
                isOpen={isActionsModalOpen}
                onClose={() => {
                    setIsActionsModalOpen(false);
                    setActionJob(null);
                }}
                onEdit={() => {
                    if (actionJob) handleEditJob(actionJob);
                }}
                onShare={() => {
                    if (actionJob) handleShareJob(actionJob);
                }}
                onDuplicate={() => {
                    if (actionJob) {
                        const newJob = {
                            ...actionJob,
                            id: Date.now(),
                            title: `${actionJob.title} (Copy)`,
                            posted: "Just now"
                        };
                        setJobsList([newJob, ...jobsList]);
                    }
                }}
                onPauseActivate={() => {
                    if (actionJob) {
                        const newStatus = actionJob.status === "Live" ? "Paused" : "Live";
                        const newColor = newStatus === "Live" 
                            ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]" 
                            : "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]";
                        setJobsList(jobsList.map(j => j.id === actionJob.id ? { ...j, status: newStatus, statusColor: `${newStatus === "Live" ? "bg-emerald-50 text-emerald-700 border-emerald-200/50" : "bg-amber-50 text-amber-700 border-amber-200/50"}` } : j));
                    }
                }}
                onArchive={() => {
                    if (actionJob) {
                        setJobsList(jobsList.filter(j => j.id !== actionJob.id));
                    }
                }}
                onDelete={() => {
                    if (actionJob) {
                        setJobsList(jobsList.filter(j => j.id !== actionJob.id));
                    }
                }}
                jobTitle={actionJob?.title}
                jobStatus={actionJob?.status === "Live" ? "Active" : actionJob?.status}
            />
        </>
    );
}


