import { MapPin, Building2, Users, ExternalLink, Edit, Share2, MoreVertical } from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useState } from "react";
import { EditJobModal } from "./modals/EditJobModal";
import { ShareJobModal } from "./modals/ShareJobModal";
import { JobActionsModal } from "./modals/JobActionsModal";
import { JobDetailsPage } from "./pages/JobDetailsPage";
import { ViewApplicantsPage } from "./pages/ViewApplicantsPage";

const initialJobsData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        location: "Remote",
        department: "Engineering",
        applicants: 127,
        progress: 65,
        status: "Live",
        statusColor: "bg-green-100 text-green-700 border-green-200",
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
        statusColor: "bg-green-100 text-green-700 border-green-200",
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
        statusColor: "bg-green-100 text-green-700 border-green-200",
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
        statusColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
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
        statusColor: "bg-green-100 text-green-700 border-green-200",
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
            <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-sm text-left">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg text-gray-900 font-semibold">Active Jobs</h2>
                        <p className="text-sm text-gray-600 mt-0.5">
                            {jobsList.length} jobs currently open
                        </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={onViewAllJobs} className="hover:bg-[#800020] hover:text-white hover:border-[#800020] cursor-pointer font-medium">
                        View All Jobs
                    </Button>
                </div>

                <div className="overflow-x-auto -mx-6 px-6">
                    <div className="flex gap-4 pb-4 min-w-max">
                        {jobsList.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white rounded-lg p-5 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#800020]/30 transition-all duration-200 w-[320px] flex-shrink-0"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="flex-1 cursor-pointer"
                                        onClick={() => handleJobClick(job)}
                                    >
                                        <h3 className="text-gray-900 mb-2 hover:text-[#800020] transition-colors font-semibold">{job.title}</h3>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4" />
                                                <span>{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Building2 className="w-4 h-4" />
                                                <span>{job.department}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActionJob(job);
                                            setIsActionsModalOpen(true);
                                        }}
                                        title="More actions"
                                    >
                                        <MoreVertical className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>

                                {/* Status Badge */}
                                <Badge
                                    variant="outline"
                                    className={`mb-4 ${job.statusColor}`}
                                >
                                    {job.status}
                                </Badge>

                                {/* Applicants */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Users className="w-4 h-4" />
                                            <span>{job.applicants} applicants</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{job.progress}%</span>
                                    </div>
                                    <Progress value={job.progress} className="h-2" />
                                </div>

                                {/* Quick Actions */}
                                <div className="flex gap-2 pt-3 border-t border-gray-200">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex-1 text-xs h-8 cursor-pointer hover:text-[#800020]"
                                        onClick={() => {
                                            if (onViewPipeline) {
                                                onViewPipeline(job);
                                            } else {
                                                handleViewApplicants(job);
                                            }
                                        }}
                                    >
                                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                                        Pipeline
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex-1 text-xs h-8 cursor-pointer hover:text-[#800020]"
                                        onClick={() => handleEditJob(job)}
                                    >
                                        <Edit className="w-3.5 h-3.5 mr-1.5" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex-1 text-xs h-8 cursor-pointer hover:text-[#800020]"
                                        onClick={() => handleShareJob(job)}
                                    >
                                        <Share2 className="w-3.5 h-3.5 mr-1.5" />
                                        Share
                                    </Button>
                                </div>
                            </div>
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
                            ? "bg-green-100 text-green-700 border-green-200" 
                            : "bg-yellow-100 text-yellow-700 border-yellow-200";
                        setJobsList(jobsList.map(j => j.id === actionJob.id ? { ...j, status: newStatus, statusColor: newColor } : j));
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