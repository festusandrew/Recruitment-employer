import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { AdminSidebar } from "./components/AdminSidebar";
import { Header } from "./components/Header";
import { DashboardPage } from "./components/pages/DashboardPage";
import { JobsPage } from "./components/pages/JobsPage";
import { CandidatesPage } from "./components/pages/CandidatesPage";
import { PipelinePage } from "./components/pages/PipelinePage";
import { InterviewsPage } from "./components/pages/InterviewsPage";
import { MessagesPage } from "./components/pages/MessagesPage";
import { TemplatesPage } from "./components/pages/TemplatesPage";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import { HelpCenterPage } from "./components/pages/HelpCenterPage";
import { SupportPage } from "./components/pages/SupportPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { ApplicantProfile } from "./components/ApplicantProfile";
import { SuperAdminDashboard } from "./components/pages/admin/SuperAdminDashboard";
import { CompaniesManagement } from "./components/pages/admin/CompaniesManagement";
import { PlatformAnalytics } from "./components/pages/admin/PlatformAnalytics";
import { SystemSettings } from "./components/pages/admin/SystemSettings";
import { AddJobModal } from "./components/modals/AddJobModal";
import { CandidateDetailsModal } from "./components/modals/CandidateDetailsModal";
import { ScheduleInterviewModal } from "./components/modals/ScheduleInterviewModal";
import { AddTaskModal } from "./components/modals/AddTaskModal";
import { ViewApplicantsPage } from "./components/pages/ViewApplicantsPage";
import { ActivityPage } from "./components/pages/ActivityPage";
import { TasksPage } from "./components/pages/TasksPage";

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname === "/" ? "dashboard" : location.pathname.slice(1);
    const activePage = path;

    const setActivePage = (page: string) => {
        navigate(`/${page}`);
    };

    const [isAdminMode, setIsAdminMode] = useState(() => window.location.pathname.startsWith("/admin-"));
    const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
    const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
    const [isScheduleInterviewModalOpen, setIsScheduleInterviewModalOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [viewingApplicantProfile, setViewingApplicantProfile] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
    const [selectedPipelineJob, setSelectedPipelineJob] = useState<any>(null);

    useEffect(() => {
        if (location.pathname.startsWith("/admin-")) {
            setIsAdminMode(true);
        } else {
            setIsAdminMode(false);
        }
    }, [location.pathname]);

    const handleViewCandidate = (candidate: any) => {
        handleViewApplicantProfile({
            ...candidate,
            email: candidate.email || `${candidate.name.toLowerCase().replace(" ", ".")}@example.com`,
            phone: candidate.phone || "+1 (555) 123-4567",
            experience: candidate.experience ? `${candidate.experience} of experience in ${candidate.role}` : undefined,
            education: "Bachelor's Degree in Computer Science",
            appliedDate: candidate.applied,
            status: candidate.status,
        });
    };

    const handleViewApplicantProfile = (applicant: any) => {
        setSelectedApplicant({
            ...applicant,
            email: applicant.email || `${applicant.name.toLowerCase().replace(" ", ".")}@example.com`,
            phone: applicant.phone || "+1 (555) 123-4567",
        });
        setViewingApplicantProfile(true);
    };

    const handleBackFromApplicantProfile = () => {
        setViewingApplicantProfile(false);
        setSelectedApplicant(null);
    };

    const handleToggleAdminMode = () => {
        if (!isAdminMode) {
            setActivePage("admin-dashboard");
        } else {
            setActivePage("dashboard");
        }
    };

    const handleExitAdminMode = () => {
        setActivePage("dashboard");
    };


    const renderPage = () => {
        if (viewingApplicantProfile) {
            return <ApplicantProfile onBack={handleBackFromApplicantProfile} applicant={selectedApplicant} />;
        }

        // Admin Pages
        if (isAdminMode) {
            switch (activePage) {
                case "admin-dashboard":
                    return <SuperAdminDashboard />;
                case "admin-companies":
                    return <CompaniesManagement />;
                case "admin-analytics":
                    return <PlatformAnalytics />;
                case "admin-settings":
                    return <SystemSettings />;
                default:
                    return <SuperAdminDashboard />;
            }
        }

        // Regular Employer Pages
        switch (activePage) {
            case "dashboard":
                return (
                    <DashboardPage 
                        onNavigate={setActivePage} 
                        onViewPipeline={(job) => {
                            setSelectedPipelineJob(job);
                            setActivePage("view-applicants");
                        }} 
                    />
                );
            case "view-applicants":
                return (
                    <ViewApplicantsPage
                        jobTitle={selectedPipelineJob?.title || "Active Position"}
                        onBack={() => setActivePage("dashboard")}
                        onViewCandidate={handleViewCandidate}
                        fullScreenOverlay={false}
                    />
                );
            case "jobs":
                return <JobsPage onAddJob={() => setIsAddJobModalOpen(true)} onViewApplicantProfile={handleViewApplicantProfile} />;
            case "candidates":
                return <CandidatesPage onViewCandidate={handleViewCandidate} />;
            case "pipeline":
                return <PipelinePage onAddJob={() => setIsAddJobModalOpen(true)} />;
            case "activity":
                return <ActivityPage />;
            case "tasks":
                return <TasksPage onAddTask={() => setIsAddTaskModalOpen(true)} />;
            case "interviews":
                return <InterviewsPage onScheduleInterview={() => setIsScheduleInterviewModalOpen(true)} />;
            case "messages":
                return <MessagesPage />;
            case "templates":
                return <TemplatesPage />;
            case "analytics":
                return <AnalyticsPage />;
            case "settings":
                return <SettingsPage />;
            case "help":
                return <HelpCenterPage />;
            case "support":
                return <SupportPage />;
            case "profile":
                return <ProfilePage onNavigate={setActivePage} />;
            default:
                return <DashboardPage onNavigate={setActivePage} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            {isAdminMode ? (
                <AdminSidebar
                    activePage={activePage}
                    onNavigate={(page) => {
                        setActivePage(page);
                        setViewingApplicantProfile(false);
                    }}
                    onExitAdminMode={handleExitAdminMode}
                />
            ) : (
                <Sidebar 
                    activePage={activePage} 
                    onNavigate={(page) => {
                        setActivePage(page);
                        setViewingApplicantProfile(false);
                    }} 
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-auto bg-gray-50">
                    {renderPage()}
                </main>
            </div>

            {/* Modals */}
            <AddJobModal isOpen={isAddJobModalOpen} onClose={() => setIsAddJobModalOpen(false)} />
            <CandidateDetailsModal
                isOpen={isCandidateModalOpen}
                onClose={() => {
                    setIsCandidateModalOpen(false);
                    setSelectedCandidate(null);
                }}
                candidate={selectedCandidate}
            />
            <ScheduleInterviewModal
                isOpen={isScheduleInterviewModalOpen}
                onClose={() => setIsScheduleInterviewModalOpen(false)}
            />
            <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} />
        </div>
    );
}