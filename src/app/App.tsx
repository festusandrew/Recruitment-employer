import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
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
import { Toaster } from "./components/ui/sonner";

// Types
import { Job, Applicant, Candidate } from "./types";

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
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewingApplicantProfile, setViewingApplicantProfile] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [selectedPipelineJob, setSelectedPipelineJob] = useState<Job | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsAdminMode(window.location.pathname.startsWith("/admin-"));
  }, [location.pathname]);

  const handleViewCandidate = (candidate: Candidate) => {
    handleViewApplicantProfile({
      ...candidate,
      email: candidate.email || `${candidate.name.toLowerCase().replace(" ", ".") }@example.com`,
      phone: candidate.phone || "+1 (555) 123-4567",
    });
  };

  const handleViewApplicantProfile = (applicant: Applicant) => {
    setSelectedApplicant({
      ...applicant,
      email: applicant.email || `${applicant.name.toLowerCase().replace(" ", ".") }@example.com`,
      phone: applicant.phone || "+1 (555) 123-4567",
    });
    setViewingApplicantProfile(true);
  };

  const handleBackFromApplicantProfile = () => {
    setViewingApplicantProfile(false);
    setSelectedApplicant(null);
  };

  const handleViewPipelineFromJob = (job: Job) => {
    setSelectedPipelineJob(job);
    setActivePage('pipeline');
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
        return <JobsPage onAddJob={() => setIsAddJobModalOpen(true)} onViewApplicantProfile={handleViewApplicantProfile} onViewPipeline={handleViewPipelineFromJob} />;
      case "candidates":
        return <CandidatesPage onViewCandidate={handleViewCandidate} />;
      case "pipeline":
        return <PipelinePage onAddJob={() => setIsAddJobModalOpen(true)} onNavigate={setActivePage} selectedJobId={selectedPipelineJob?.id} />;
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
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-auto bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewingApplicantProfile ? "profile-" + selectedApplicant?.id : activePage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="min-h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer Content */}
          <div className="fixed top-0 left-0 bottom-0 w-[260px] bg-[#800020] animate-in slide-in-from-left duration-200">
            {isAdminMode ? (
              <AdminSidebar
                activePage={activePage}
                onNavigate={(page) => {
                  setActivePage(page);
                  setViewingApplicantProfile(false);
                  setIsMobileMenuOpen(false);
                }}
                onExitAdminMode={() => {
                  handleExitAdminMode();
                  setIsMobileMenuOpen(false);
                }}
              />
            ) : (
              <Sidebar
                activePage={activePage}
                onNavigate={(page) => {
                  setActivePage(page);
                  setViewingApplicantProfile(false);
                  setIsMobileMenuOpen(false);
                }}
              />
            )}
          </div>
        </div>
      )}

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
      <Toaster richColors position="top-right" />
    </div>
  );
}
