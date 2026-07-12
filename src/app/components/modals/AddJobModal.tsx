import {
    X, Briefcase, DollarSign, MapPin, Clock, Users, Save, FileText,
    Share2, UserCheck, GitBranch, UsersRound, GripVertical, Trash2,
    Plus, Settings, Upload, Eye, Link as LinkIcon, Mail, Edit, ChevronDown, ChevronUp,
    Info, Sparkles, AlertCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface AddJobModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface HiringStage {
    id: number;
    name: string;
    icon: string;
    enabled: boolean;
}

export function AddJobModal({ isOpen, onClose }: AddJobModalProps) {
    const tabs = [
        { id: 'details', label: 'DETAILS', icon: Settings },
        { id: 'application', label: 'APPLICATION FORM', icon: FileText },
        { id: 'boards', label: 'JOB BOARDS', icon: Share2 },
        { id: 'recruiters', label: 'RECRUITERS', icon: UserCheck },
        { id: 'hiring-flow', label: 'HIRING FLOW', icon: GitBranch },
        { id: 'team', label: 'HIRING TEAM', icon: UsersRound },
        { id: 'templates', label: 'EMAIL TEMPLATES', icon: Mail },
    ];
    
    const [activeTab, setActiveTab] = useState<'details' | 'application' | 'boards' | 'recruiters' | 'hiring-flow' | 'team' | 'templates'>('details');
    const currentStepIndex = tabs.findIndex(tab => tab.id === activeTab);

    const [formData, setFormData] = useState({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        salary: "",
        experience: "",
        description: "",
        requirements: "",
        benefits: "",
        isActive: true,
    });

    const [hiringStages, setHiringStages] = useState<HiringStage[]>([
        { id: 1, name: "New Applicant", icon: "user-plus", enabled: true },
        { id: 2, name: "Shortlisted", icon: "star", enabled: true },
        { id: 3, name: "Phone Screen", icon: "phone", enabled: true },
        { id: 4, name: "Invited To Interview", icon: "users", enabled: true },
        { id: 5, name: "Interview Attended", icon: "check", enabled: true },
        { id: 6, name: "Offering", icon: "dollar-sign", enabled: true },
        { id: 7, name: "Declined Offer", icon: "x-circle", enabled: true },
        { id: 8, name: "Compliance / Mandatory Training", icon: "file-check", enabled: true },
        { id: 9, name: "Commenced Employment", icon: "briefcase", enabled: true },
    ]);

    const [applicationQuestions, setApplicationQuestions] = useState([
        { id: 1, question: "Why are you interested in this position?", type: "text", required: true },
        { id: 2, question: "What is your expected salary?", type: "text", required: false },
        { id: 3, question: "When can you start?", type: "date", required: true },
    ]);

    const [teamMembers, setTeamMembers] = useState([
        { id: 1, name: "John Doe", role: "Hiring Manager", email: "john@example.com" },
        { id: 2, name: "Sarah Miller", role: "Recruiter", email: "sarah@example.com" },
    ]);

    const [emailTemplates, setEmailTemplates] = useState([
        {
            id: 1,
            name: "Interview Invitation",
            subject: "Interview Invitation - {{job_title}}",
            body: "Dear {{applicant_name}},\n\nWe are pleased to invite you for an interview for the {{job_title}} position at {{company_name}}.\n\nInterview Details:\nDate: {{interview_date}}\nTime: {{interview_time}}\nLocation: {{interview_location}}\n\nPlease confirm your availability.\n\nBest regards,\n{{hiring_manager}}",
            category: "Interview",
            active: true
        },
        {
            id: 2,
            name: "Application Received",
            subject: "Application Received - {{job_title}}",
            body: "Dear {{applicant_name}},\n\nThank you for applying to the {{job_title}} position at {{company_name}}. We have received your application and will review it carefully.\n\nWe will be in touch soon regarding the next steps.\n\nBest regards,\n{{company_name}} Recruitment Team",
            category: "Application",
            active: true
        },
        {
            id: 3,
            name: "Rejection Notice",
            subject: "Update on Your Application - {{job_title}}",
            body: "Dear {{applicant_name}},\n\nThank you for your interest in the {{job_title}} position at {{company_name}}. After careful consideration, we have decided to move forward with other applicants whose qualifications more closely match our current needs.\n\nWe appreciate the time you invested in the application process and wish you the best in your job search.\n\nBest regards,\n{{company_name}} Recruitment Team",
            category: "Rejection",
            active: true
        },
        {
            id: 4,
            name: "Offer Letter",
            subject: "Job Offer - {{job_title}}",
            body: "Dear {{applicant_name}},\n\nWe are delighted to offer you the position of {{job_title}} at {{company_name}}.\n\nOffer Details:\nPosition: {{job_title}}\nStart Date: {{start_date}}\nSalary: {{salary}}\nLocation: {{location}}\n\nPlease review the attached offer letter and respond by {{response_deadline}}.\n\nWe look forward to welcoming you to our team!\n\nBest regards,\n{{hiring_manager}}",
            category: "Offer",
            active: true
        },
    ]);

    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [isEditingTemplate, setIsEditingTemplate] = useState(false);

    const [selectedBoards, setSelectedBoards] = useState<{ [key: string]: boolean }>({});
    const [expandedBoards, setExpandedBoards] = useState<{ [key: string]: boolean }>({});
    const [boardDescriptions, setBoardDescriptions] = useState<{
        [key: string]: {
            title: string;
            description: string;
            location: string;
            salary: string;
            company: string;
        }
    }>({});

    const [jobBoards, setJobBoards] = useState<Array<{ name: string; url?: string; isDefault: boolean }>>([
        { name: 'LinkedIn', isDefault: true },
        { name: 'Indeed', isDefault: true },
        { name: 'Glassdoor', isDefault: true },
        { name: 'Monster', isDefault: true },
        { name: 'CareerBuilder', isDefault: true },
        { name: 'ZipRecruiter', isDefault: true },
    ]);

    const [isAddingBoard, setIsAddingBoard] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');
    const [newBoardUrl, setNewBoardUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Job created:", formData);
        toast.success("Job posted successfully!");
        onClose();
    };

    const handleDeleteStage = (stageId: number) => {
        setHiringStages(hiringStages.filter(stage => stage.id !== stageId));
    };



    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                        className="bg-white border border-slate-150 w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col z-10 rounded-2xl relative text-left"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-gray-50/50 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-glow-primary flex-shrink-0">
                                    <Briefcase className="w-4.5 h-4.5" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase font-sans">
                                        Post New Job: {formData.title || "New Position"}
                                    </h2>
                                    <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mt-0.5">
                                        Step {currentStepIndex + 1} of {tabs.length} — {tabs[currentStepIndex].label}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-slate-400 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Stepper progress indicator */}
                        <div className="flex items-center justify-between px-8 py-4.5 border-b border-slate-100 bg-slate-50/30 flex-shrink-0 select-none overflow-x-auto no-scrollbar gap-2">
                            {tabs.map((tab, idx) => {
                                const isCompleted = idx < currentStepIndex;
                                const isCurrent = idx === currentStepIndex;
                                return (
                                    <div key={tab.id} className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all border ${
                                                isCompleted ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' :
                                                isCurrent ? 'bg-white border-indigo-600 text-indigo-600 shadow-md ring-2 ring-indigo-500/20' :
                                                'bg-white border-slate-200 text-slate-400'
                                            }`}
                                        >
                                            {isCompleted ? '✓' : idx + 1}
                                        </button>
                                        <span className={`text-[10px] font-extrabold uppercase tracking-wider hidden md:inline ${isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                                            {tab.label}
                                        </span>
                                        {idx < tabs.length - 1 && (
                                            <div className={`h-0.5 w-6 lg:w-10 ml-1 ${idx < currentStepIndex ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Content Header Subtitle */}
                        <div className="px-8 pt-6 pb-2 flex-shrink-0">
                            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-indigo-600" />
                                {activeTab === 'details' && 'Job Details'}
                                {activeTab === 'application' && 'Application Form Setup'}
                                {activeTab === 'boards' && 'Job Boards Syndication'}
                                {activeTab === 'recruiters' && 'Assigned Recruiters'}
                                {activeTab === 'hiring-flow' && 'Configure Hiring Pipeline'}
                                {activeTab === 'team' && 'Hiring Team Members'}
                                {activeTab === 'templates' && 'Pipeline Email Templates'}
                            </h3>
                            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                                {activeTab === 'details' && 'Enter job title, description, benefits, and salary settings'}
                                {activeTab === 'application' && 'Customize the questions applicants will answer during submission'}
                                {activeTab === 'boards' && 'Select, edit, and publish this job to global recruitment boards'}
                                {activeTab === 'recruiters' && 'Choose recruiters who will manage candidates and interviews'}
                                {activeTab === 'hiring-flow' && 'Customize the Kanban pipeline stages applicants move through'}
                                {activeTab === 'team' && 'Add collaboration team members to view CV scores and comments'}
                                {activeTab === 'templates' && 'Manage trigger emails sent at key stages of the recruitment flow'}
                            </p>
                        </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-white/35">
                                {/* DETAILS TAB */}
                                {activeTab === 'details' && (
                                    <div className="max-w-3xl space-y-6">
                                        {/* Job Title */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Job Title *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                placeholder="e.g. Senior Software Engineer"
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium"
                                            />
                                        </div>

                                        {/* Department & Location */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Department *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.department}
                                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                    placeholder="e.g. Engineering"
                                                    className="w-full px-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                                                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                                                    Location *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    placeholder="e.g. Dublin, Ireland (Hybrid)"
                                                    className="w-full px-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium"
                                                />
                                            </div>
                                        </div>

                                        {/* Job Type & Experience */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                                                    <Clock className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                                                    Job Type *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.type}
                                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium appearance-none"
                                                    >
                                                        <option>Full-time</option>
                                                        <option>Part-time</option>
                                                        <option>Contract</option>
                                                        <option>Internship</option>
                                                    </select>
                                                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                                                    <Users className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                                                    Experience Level *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.experience}
                                                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium appearance-none"
                                                    >
                                                        <option value="">Select level</option>
                                                        <option>Entry Level (0-2 years)</option>
                                                        <option>Mid Level (3-5 years)</option>
                                                        <option>Senior Level (5+ years)</option>
                                                        <option>Lead/Principal</option>
                                                    </select>
                                                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Salary */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                                                <DollarSign className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                                                Salary Range
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.salary}
                                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                                placeholder="e.g. €85,000 - €110,000"
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Job Description *</label>
                                            <textarea
                                                required
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Describe the role, responsibilities, and key metrics..."
                                                rows={6}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium resize-none leading-relaxed"
                                            />
                                        </div>

                                        {/* Requirements */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Requirements</label>
                                            <textarea
                                                value={formData.requirements}
                                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                                placeholder="List critical qualifications, frameworks, and tools needed..."
                                                rows={4}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium resize-none leading-relaxed"
                                            />
                                        </div>

                                        {/* Benefits */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Benefits</label>
                                            <textarea
                                                value={formData.benefits}
                                                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                                                placeholder="List company perks, health benefits, pension, and bonuses..."
                                                rows={4}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium resize-none leading-relaxed"
                                            />
                                        </div>

                                        {/* Status Toggle */}
                                        <div className="p-5 bg-indigo-50/70 border border-indigo-600/10 rounded-2xl  flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-600/10 text-indigo-600 rounded-xl flex items-center justify-center">
                                                    <Eye className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Publish Immediately</p>
                                                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Make this job active and visible to candidate listings</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.isActive}
                                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* APPLICATION FORM TAB */}
                                {activeTab === 'application' && (
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-indigo-50/70 border border-indigo-600/15 rounded-xl text-xs font-semibold text-indigo-600 leading-relaxed ">
                                            <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                            <p>Customize the screening questions applicants will answer when applying for this position to help filter submissions.</p>
                                        </div>

                                        <div className="space-y-4">
                                            {applicationQuestions.map((q, index) => (
                                                <motion.div
                                                    key={q.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-white border border-gray-150 rounded-xl p-5  hover:border-gray-250 transition-colors"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-7 h-7 rounded-lg bg-gray-150 flex items-center justify-center text-slate-500 cursor-move mt-1">
                                                            <GripVertical className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-3.5">
                                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question {index + 1}</span>
                                                                <div className="flex items-center gap-4">
                                                                    <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer select-none">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={q.required}
                                                                            onChange={(e) => {
                                                                                const updated = applicationQuestions.map(qu =>
                                                                                    qu.id === q.id ? { ...qu, required: e.target.checked } : qu
                                                                                );
                                                                                setApplicationQuestions(updated);
                                                                            }}
                                                                            className="w-4 h-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                                                        />
                                                                        Required Question
                                                                    </label>
                                                                    <button
                                                                        type="button"
                                                                        className="text-rose-600 hover:text-rose-700 w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors flex items-center justify-center cursor-pointer"
                                                                        onClick={() => setApplicationQuestions(applicationQuestions.filter(qu => qu.id !== q.id))}
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={q.question}
                                                                onChange={(e) => {
                                                                    const updated = applicationQuestions.map(qu =>
                                                                        qu.id === q.id ? { ...qu, question: e.target.value } : qu
                                                                    );
                                                                    setApplicationQuestions(updated);
                                                                }}
                                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 transition-all text-sm font-medium"
                                                                placeholder="e.g. How many years of experience do you have with React?"
                                                            />
                                                            <div className="relative w-48">
                                                                <select
                                                                    value={q.type}
                                                                    onChange={(e) => {
                                                                        const updated = applicationQuestions.map(qu =>
                                                                            qu.id === q.id ? { ...qu, type: e.target.value } : qu
                                                                        );
                                                                        setApplicationQuestions(updated);
                                                                    }}
                                                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-250 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 appearance-none cursor-pointer"
                                                                >
                                                                    <option value="text">Short Text</option>
                                                                    <option value="textarea">Long Text / Paragraph</option>
                                                                    <option value="select">Multiple Choice</option>
                                                                    <option value="date">Date Picker</option>
                                                                    <option value="file">File Upload / Attachment</option>
                                                                </select>
                                                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            type="button"
                                            onClick={() => setApplicationQuestions([...applicationQuestions, {
                                                id: Date.now(),
                                                question: "",
                                                type: "text",
                                                required: false
                                            }])}
                                            className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-250 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-50 transition-all w-full justify-center text-xs font-bold cursor-pointer  bg-white"
                                        >
                                            <Plus className="w-4 h-4 text-indigo-600" />
                                            ADD CUSTOM APPLICATION QUESTION
                                        </motion.button>
                                    </div>
                                )}

                                {/* JOB BOARDS TAB */}
                                {activeTab === 'boards' && (
                                    <div className="max-w-5xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-indigo-50/70 border border-indigo-600/15 rounded-xl text-xs font-semibold text-indigo-600 leading-relaxed ">
                                            <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                            <p>Select which job boards to syndicate this posting onto. You can customize descriptions, salary formats, or location settings per board.</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {jobBoards.map((board) => {
                                                const isSelected = selectedBoards[board.name];
                                                const isExpanded = expandedBoards[board.name];
                                                return (
                                                    <div key={board.name} className="bg-white border border-gray-150 rounded-xl overflow-hidden  hover:border-gray-250 transition-colors">
                                                        <div className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                                            <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-150 flex-shrink-0">
                                                                    <LinkIcon className="w-4 h-4 text-slate-500" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="text-sm font-bold text-slate-900">{board.name}</p>
                                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                                                                        {isSelected ? 'Syndication Active' : 'Not selected'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                {isSelected && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setExpandedBoards({ ...expandedBoards, [board.name]: !isExpanded })}
                                                                        className="text-indigo-600 hover:text-indigo-800 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                                                                    >
                                                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                                    </button>
                                                                )}
                                                                {!board.isDefault && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            if (confirm(`Remove ${board.name} from job boards?`)) {
                                                                                setJobBoards(jobBoards.filter(b => b.name !== board.name));
                                                                                const newSelected = { ...selectedBoards };
                                                                                const newExpanded = { ...expandedBoards };
                                                                                const newDescriptions = { ...boardDescriptions };
                                                                                delete newSelected[board.name];
                                                                                delete newExpanded[board.name];
                                                                                delete newDescriptions[board.name];
                                                                                setSelectedBoards(newSelected);
                                                                                setExpandedBoards(newExpanded);
                                                                                setBoardDescriptions(newDescriptions);
                                                                            }
                                                                        }}
                                                                        className="text-red-600 hover:text-red-700 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                )}
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isSelected || false}
                                                                    onChange={(e) => {
                                                                        const nextSelected = { ...selectedBoards, [board.name]: e.target.checked };
                                                                        setSelectedBoards(nextSelected);
                                                                        if (e.target.checked) {
                                                                            setExpandedBoards({ ...expandedBoards, [board.name]: true });
                                                                            if (!boardDescriptions[board.name]) {
                                                                                setBoardDescriptions({
                                                                                    ...boardDescriptions,
                                                                                    [board.name]: {
                                                                                        title: formData.title,
                                                                                        description: formData.description,
                                                                                        location: formData.location,
                                                                                        salary: formData.salary,
                                                                                        company: 'MployUs'
                                                                                    }
                                                                                });
                                                                            }
                                                                        } else {
                                                                            setExpandedBoards({ ...expandedBoards, [board.name]: false });
                                                                        }
                                                                    }}
                                                                    className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600 cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Expandable Form */}
                                                        <AnimatePresence>
                                                            {isSelected && isExpanded && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden bg-gray-50/50 border-t border-gray-150"
                                                                >
                                                                    <div className="p-5 space-y-4">
                                                                        <div className="flex items-center justify-between">
                                                                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Customize for {board.name}</h4>
                                                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Defaults used if left blank</span>
                                                                        </div>

                                                                        <div>
                                                                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Board-Specific Title</label>
                                                                            <input
                                                                                type="text"
                                                                                value={boardDescriptions[board.name]?.title || ''}
                                                                                onChange={(e) => setBoardDescriptions({
                                                                                    ...boardDescriptions,
                                                                                    [board.name]: { ...boardDescriptions[board.name], title: e.target.value }
                                                                                })}
                                                                                placeholder={formData.title || 'Job title...'}
                                                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 text-xs"
                                                                            />
                                                                        </div>

                                                                        <div className="grid grid-cols-2 gap-3">
                                                                            <div>
                                                                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Location override</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={boardDescriptions[board.name]?.location || ''}
                                                                                    onChange={(e) => setBoardDescriptions({
                                                                                        ...boardDescriptions,
                                                                                        [board.name]: { ...boardDescriptions[board.name], location: e.target.value }
                                                                                    })}
                                                                                    placeholder={formData.location || 'Location...'}
                                                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 text-xs"
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Salary override</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={boardDescriptions[board.name]?.salary || ''}
                                                                                    onChange={(e) => setBoardDescriptions({
                                                                                        ...boardDescriptions,
                                                                                        [board.name]: { ...boardDescriptions[board.name], salary: e.target.value }
                                                                                    })}
                                                                                    placeholder={formData.salary || 'Salary...'}
                                                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 text-xs"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Custom Description</label>
                                                                            <textarea
                                                                                value={boardDescriptions[board.name]?.description || ''}
                                                                                onChange={(e) => setBoardDescriptions({
                                                                                    ...boardDescriptions,
                                                                                    [board.name]: { ...boardDescriptions[board.name], description: e.target.value }
                                                                                })}
                                                                                placeholder={formData.description || 'Provide board-specific details...'}
                                                                                rows={4}
                                                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 text-xs resize-none"
                                                                            />
                                                                        </div>

                                                                        <div className="flex items-center justify-between pt-3 border-t border-gray-150">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    setBoardDescriptions({
                                                                                        ...boardDescriptions,
                                                                                        [board.name]: {
                                                                                            title: formData.title,
                                                                                            description: formData.description,
                                                                                            location: formData.location,
                                                                                            salary: formData.salary,
                                                                                            company: 'MployUs'
                                                                                        }
                                                                                    });
                                                                                }}
                                                                                className="text-[10px] text-slate-500 hover:text-slate-800 font-extrabold cursor-pointer"
                                                                            >
                                                                                RESET TO DEFAULTS
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    toast.success(`Job listing customization for ${board.name} saved!`);
                                                                                    setExpandedBoards({ ...expandedBoards, [board.name]: false });
                                                                                }}
                                                                                className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-800 transition-colors cursor-pointer"
                                                                            >
                                                                                SAVE BOARD SETUP
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Add New Board Form */}
                                        {isAddingBoard ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-gray-50 border border-slate-200 rounded-xl p-5"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Configure Custom Channel</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsAddingBoard(false)}
                                                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Board Name *</label>
                                                        <input
                                                            type="text"
                                                            value={newBoardName}
                                                            onChange={(e) => setNewBoardName(e.target.value)}
                                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-xs font-medium"
                                                            placeholder="e.g. Dribbble Jobs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Endpoint URL (Optional)</label>
                                                        <input
                                                            type="text"
                                                            value={newBoardUrl}
                                                            onChange={(e) => setNewBoardUrl(e.target.value)}
                                                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-xs font-medium"
                                                            placeholder="e.g. https://dribbble.com/jobs"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3.5 mt-4 pt-3 border-t border-slate-200/60">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (newBoardName) {
                                                                setJobBoards([...jobBoards, {
                                                                    name: newBoardName,
                                                                    url: newBoardUrl || undefined,
                                                                    isDefault: false
                                                                }]);
                                                                setIsAddingBoard(false);
                                                                setNewBoardName('');
                                                                setNewBoardUrl('');
                                                                toast.success(`Custom board ${newBoardName} added!`);
                                                            }
                                                        }}
                                                        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 text-xs font-bold transition-all cursor-pointer"
                                                    >
                                                        <Save className="w-3.5 h-3.5" />
                                                        Add Channel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsAddingBoard(false)}
                                                        className="px-4 py-2 bg-white hover:bg-gray-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                type="button"
                                                onClick={() => setIsAddingBoard(true)}
                                                className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-250 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-50 transition-all w-full justify-center text-xs font-bold cursor-pointer  bg-white"
                                            >
                                                <Plus className="w-4 h-4 text-indigo-600" />
                                                ADD NEW SYNDICATION CHANNEL
                                            </motion.button>
                                        )}
                                    </div>
                                )}

                                {/* RECRUITERS TAB */}
                                {activeTab === 'recruiters' && (
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-indigo-50/70 border border-indigo-600/15 rounded-xl text-xs font-semibold text-indigo-600 leading-relaxed ">
                                            <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                            <p>Assign dedicated recruiters who will be responsible for screening, reviewing applications, and conducting phone screenings for this position.</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3.5">
                                            {['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim'].map((recruiter) => (
                                                <div key={recruiter} className="bg-white border border-gray-150 rounded-xl p-4 flex items-center justify-between hover:border-indigo-600/40 transition-colors ">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-10 h-10 bg-indigo-600   rounded-xl flex items-center justify-center text-white font-bold text-sm ">
                                                            {recruiter.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900">{recruiter}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">recruiter@mployus.com</p>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600 cursor-pointer"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* HIRING FLOW TAB */}
                                {activeTab === 'hiring-flow' && (
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-indigo-50/70 border border-indigo-600/15 rounded-xl text-xs font-semibold text-indigo-600 leading-relaxed ">
                                            <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                            <p>Configure the Kanban stages applicants will move through during the active hiring process for this specific job pipeline.</p>
                                        </div>

                                        <div className="space-y-3">
                                            {hiringStages.map((stage) => (
                                                <motion.div
                                                    key={stage.id}
                                                    className="bg-white border border-gray-150 rounded-xl p-4 hover:border-indigo-600/25 transition-all "
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                                            <GripVertical className="w-4 h-4 text-gray-300 cursor-move" />
                                                            <div className="w-9 h-9 bg-gray-50 border border-gray-150 rounded-lg flex items-center justify-center text-slate-500 flex-shrink-0">
                                                                <GitBranch className="w-4 h-4 text-indigo-600" />
                                                            </div>
                                                            <span className="text-xs font-extrabold text-slate-900 tracking-tight truncate">{stage.name}</span>
                                                        </div>

                                                        <div className="flex items-center gap-4">
                                                            <label className="relative inline-flex items-center cursor-pointer select-none">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={stage.enabled}
                                                                    onChange={() => {
                                                                        const updated = hiringStages.map(s =>
                                                                            s.id === stage.id ? { ...s, enabled: !s.enabled } : s
                                                                        );
                                                                        setHiringStages(updated);
                                                                    }}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                                            </label>

                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteStage(stage.id)}
                                                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            type="button"
                                            onClick={() => setHiringStages([...hiringStages, {
                                                id: Date.now(),
                                                name: "New Custom Stage",
                                                icon: "circle",
                                                enabled: true
                                            }])}
                                            className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-250 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-50 transition-all w-full justify-center text-xs font-bold cursor-pointer  bg-white"
                                        >
                                            <Plus className="w-4 h-4 text-indigo-600" />
                                            ADD PIPELINE STAGE
                                        </motion.button>

                                        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-150 rounded-xl text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                            <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                            <span>Hired and Rejected milestones are automatically added as the final stages of your job pipeline.</span>
                                        </div>
                                    </div>
                                )}

                                {/* HIRING TEAM TAB */}
                                {activeTab === 'team' && (
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-indigo-50/70 border border-indigo-600/15 rounded-xl text-xs font-semibold text-indigo-600 leading-relaxed ">
                                            <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                            <p>Add collaborative hiring team members. They can be invited to leave comments on applications, grade technical tasks, and rate interviews.</p>
                                        </div>

                                        <div className="space-y-3">
                                            {teamMembers.map((member) => (
                                                <motion.div
                                                    key={member.id}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-white border border-gray-150 rounded-xl p-4 flex items-center justify-between "
                                                >
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-10 h-10 bg-indigo-600  via-[#003E6B]  rounded-xl flex items-center justify-center text-white font-bold text-sm ">
                                                            {member.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900">{member.name}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                                                                {member.role} • {member.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setTeamMembers(teamMembers.filter(m => m.id !== member.id))}
                                                        className="text-rose-650 hover:text-rose-800 w-8 h-8 rounded-lg hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            type="button"
                                            onClick={() => {
                                                const name = prompt("Enter team member name:");
                                                const role = prompt("Enter role:");
                                                const email = prompt("Enter email:");
                                                if (name && role && email) {
                                                    setTeamMembers([...teamMembers, {
                                                        id: Date.now(),
                                                        name,
                                                        role,
                                                        email
                                                    }]);
                                                    toast.success(`Hiring team member ${name} added!`);
                                                }
                                            }}
                                            className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-250 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-50 transition-all w-full justify-center text-xs font-bold cursor-pointer  bg-white"
                                        >
                                            <Plus className="w-4 h-4 text-indigo-600" />
                                            INVITE TEAM MEMBER
                                        </motion.button>
                                    </div>
                                )}

                                {/* EMAIL TEMPLATES TAB */}
                                {activeTab === 'templates' && (
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-indigo-50/70 border border-indigo-600/15 rounded-xl text-xs font-semibold text-indigo-600 leading-relaxed ">
                                            <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                            <p>Manage and customize the email templates that will be dispatched as triggers when applicants move into key stages of this job's pipeline.</p>
                                        </div>

                                        <div className="space-y-3.5">
                                            {emailTemplates.map((template) => (
                                                <div
                                                    key={template.id}
                                                    className="bg-white border border-gray-150 rounded-xl p-4 hover:border-indigo-600/25 transition-all "
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                                            <div className="w-9 h-9 bg-gray-50 border border-gray-150 rounded-lg flex items-center justify-center text-slate-500 flex-shrink-0">
                                                                <Mail className="w-4 h-4 text-indigo-600" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <span className="text-xs font-extrabold text-slate-900 tracking-tight block truncate">{template.name}</span>
                                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{template.category} Category</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3.5">
                                                            <label className="relative inline-flex items-center cursor-pointer select-none">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={template.active}
                                                                    onChange={() => {
                                                                        const updated = emailTemplates.map(t =>
                                                                            t.id === template.id ? { ...t, active: !t.active } : t
                                                                        );
                                                                        setEmailTemplates(updated);
                                                                    }}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                                            </label>

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedTemplate(template);
                                                                    setIsEditingTemplate(true);
                                                                }}
                                                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            type="button"
                                            onClick={() => {
                                                const name = prompt("Enter template name:");
                                                const subject = prompt("Enter email subject:");
                                                const body = prompt("Enter email body:");
                                                if (name && subject && body) {
                                                    setEmailTemplates([...emailTemplates, {
                                                        id: Date.now(),
                                                        name,
                                                        subject,
                                                        body,
                                                        category: "Custom",
                                                        active: true
                                                    }]);
                                                    toast.success(`Custom template ${name} created!`);
                                                }
                                            }}
                                            className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-255 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-50 transition-all w-full justify-center text-xs font-bold cursor-pointer  bg-white"
                                        >
                                            <Plus className="w-4 h-4 text-indigo-600" />
                                            CREATE NEW EMAIL TEMPLATE
                                        </motion.button>

                                        {/* Template Editor Drawer / Section */}
                                        {isEditingTemplate && selectedTemplate && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-8 p-6 bg-gray-50 rounded-2xl border border-slate-200 w-full"
                                            >
                                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                                                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Edit Email Template</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsEditingTemplate(false)}
                                                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="flex flex-col lg:flex-row gap-6">
                                                    {/* Left Form Controls */}
                                                    <div className="w-full lg:w-1/2 space-y-4">
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Template Name</label>
                                                            <input
                                                                type="text"
                                                                value={selectedTemplate.name}
                                                                onChange={(e) => setSelectedTemplate({ ...selectedTemplate, name: e.target.value })}
                                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-xs font-medium"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Email Subject Line</label>
                                                            <input
                                                                type="text"
                                                                value={selectedTemplate.subject}
                                                                onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-xs font-medium"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Email Message Body</label>
                                                            <textarea
                                                                value={selectedTemplate.body}
                                                                onChange={(e) => setSelectedTemplate({ ...selectedTemplate, body: e.target.value })}
                                                                rows={7}
                                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-xs font-medium resize-none leading-relaxed"
                                                            />
                                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide mt-2 block">
                                                                Available Variables: {"{{applicant_name}}"}, {"{{job_title}}"}, {"{{company_name}}"}, {"{{interview_date}}"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Right live branded corporate email template preview */}
                                                    <div className="w-full lg:w-1/2 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                                                        <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Corporate Preview</span>
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                                                                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                                            </div>
                                                        </div>
                                                        <div className="p-4 bg-slate-50/50 border-b border-slate-100 text-xs font-semibold text-slate-600 space-y-1">
                                                            <p><span className="text-slate-400">From:</span> recruitment@mployus.com</p>
                                                            <p><span className="text-slate-400">Subject:</span> {selectedTemplate.subject.replace(/\{\{job_title\}\}/g, "Senior Product Designer")}</p>
                                                        </div>
                                                        <div className="p-6 bg-slate-100 flex-1 overflow-y-auto min-h-[300px]">
                                                            {(() => {
                                                                const customName = localStorage.getItem("mployus_company_name") || "MployUs Inc.";
                                                                const customLogo = localStorage.getItem("mployus_company_logo") || null;
                                                                const customColor = localStorage.getItem("mployus_theme_color") || "#4f46e5";
                                                                return (
                                                                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-premium border border-slate-200/40 overflow-hidden">
                                                                        {/* Corporate Banner Banner */}
                                                                        <div 
                                                                            className="px-6 py-5 text-white flex items-center justify-between"
                                                                            style={{ backgroundColor: customColor }}
                                                                        >
                                                                            <div className="flex items-center gap-2">
                                                                                {customLogo ? (
                                                                                    <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-white/20">
                                                                                        <img src={customLogo} alt="Logo" className="w-full h-full object-contain" />
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                                                                                        <Briefcase className="w-4 h-4 text-white" />
                                                                                    </div>
                                                                                )}
                                                                                <span className="text-xs font-black tracking-wider uppercase font-sans">{customName}</span>
                                                                            </div>
                                                                            <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Notification</span>
                                                                        </div>
                                                                        <div className="p-6 text-left">
                                                                            {selectedTemplate.body.split('\n').map((line: string, i: number) => (
                                                                                <p key={i} className="mb-2.5 text-xs text-slate-700 leading-relaxed font-semibold">
                                                                                    {line.replace(/\{\{applicant_name\}\}/g, "Sarah Chen")
                                                                                         .replace(/\{\{job_title\}\}/g, "Senior Product Designer")
                                                                                         .replace(/\{\{company_name\}\}/g, customName)
                                                                                         .replace(/\{\{interview_date\}\}/g, "July 16, 2026")
                                                                                         .replace(/\{\{interview_time\}\}/g, "10:00 AM EST")
                                                                                         .replace(/\{\{interview_location\}\}/g, "MployUs HQ (Google Meet)")
                                                                                         .replace(/\{\{hiring_manager\}\}/g, "John Doe")
                                                                                    }
                                                                                </p>
                                                                            ))}
                                                                            <div className="mt-6 mb-4 text-center">
                                                                                <button 
                                                                                    type="button" 
                                                                                    className="px-5 py-2.5 text-white rounded-xl text-[10px] font-extrabold transition-all cursor-pointer shadow-md"
                                                                                    style={{ backgroundColor: customColor }}
                                                                                >
                                                                                    Confirm Details / View Portal
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="px-6 py-4.5 bg-slate-50 border-t border-slate-100 text-[9px] text-slate-400 text-center font-semibold">
                                                                            <p>© 2026 {customName}. All rights reserved.</p>
                                                                            <p className="mt-1">
                                                                                <span className="hover:text-indigo-650 cursor-pointer">Website</span> · <span className="hover:text-indigo-650 cursor-pointer">Help Center</span> · <span className="hover:text-indigo-650 cursor-pointer">Opt Out</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3.5 mt-5 pt-4 border-t border-slate-200">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updatedTemplates = emailTemplates.map(t =>
                                                                t.id === selectedTemplate.id ? selectedTemplate : t
                                                            );
                                                            setEmailTemplates(updatedTemplates);
                                                            setIsEditingTemplate(false);
                                                            toast.success(`Template "${selectedTemplate.name}" updated!`);
                                                        }}
                                                        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 text-xs font-bold transition-all cursor-pointer"
                                                    >
                                                        <Save className="w-3.5 h-3.5" />
                                                        Save Changes
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsEditingTemplate(false)}
                                                        className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-250 text-slate-600 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-gray-50 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2.5 rounded-xl border border-gray-250 text-slate-700 bg-white hover:bg-gray-50 transition-all font-bold text-xs  cursor-pointer tracking-wider"
                                >
                                    CANCEL
                                </button>
                                <div className="flex items-center gap-3">
                                    {currentStepIndex > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab(tabs[currentStepIndex - 1].id as any)}
                                            className="px-5 py-2.5 rounded-xl border border-gray-250 text-slate-700 bg-white hover:bg-gray-50 transition-all font-bold text-xs cursor-pointer tracking-wider"
                                        >
                                            BACK
                                        </button>
                                    )}
                                    {currentStepIndex < tabs.length - 1 ? (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="button"
                                            onClick={() => setActiveTab(tabs[currentStepIndex + 1].id as any)}
                                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl transition-all font-extrabold text-xs  border border-indigo-600/10 cursor-pointer tracking-wider"
                                        >
                                            NEXT STEP
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="button"
                                            onClick={handleSubmit}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl transition-all font-extrabold text-xs  border border-indigo-600/10 cursor-pointer tracking-wider"
                                        >
                                            <Save className="w-4 h-4" />
                                            POST JOB POSITION
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}



