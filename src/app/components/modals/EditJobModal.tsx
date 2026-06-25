import {
    X, Briefcase, DollarSign, MapPin, Clock, Users, Save, FileText,
    Share2, UserCheck, GitBranch, UsersRound, GripVertical, Trash2,
    Plus, Settings, Upload, Eye, Link as LinkIcon, Mail, Edit, ChevronDown, ChevronUp,
    Info, Sparkles, AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface EditJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (job: any) => void;
    job?: {
        id: number;
        title: string;
        location: string;
        department: string;
        type?: string;
        salary?: string;
        experience?: string;
        description?: string;
        requirements?: string;
        benefits?: string;
        isActive?: boolean;
    };
}

interface HiringStage {
    id: number;
    name: string;
    icon: string;
    enabled: boolean;
}

export function EditJobModal({ isOpen, onClose, onSave, job }: EditJobModalProps) {
    const [activeTab, setActiveTab] = useState<'details' | 'application' | 'boards' | 'recruiters' | 'hiring-flow' | 'team' | 'templates'>('details');

    const [formData, setFormData] = useState({
        title: job?.title || "",
        department: job?.department || "",
        location: job?.location || "",
        type: job?.type || "Full-time",
        salary: job?.salary || "",
        experience: job?.experience || "",
        description: job?.description || "",
        requirements: job?.requirements || "",
        benefits: job?.benefits || "",
        isActive: job?.isActive !== undefined ? job.isActive : true,
    });

    // Keep state in sync with job prop when it changes
    useEffect(() => {
        if (job) {
            setFormData({
                title: job.title || "",
                department: job.department || "",
                location: job.location || "",
                type: job.type || "Full-time",
                salary: job.salary || "",
                experience: job.experience || "",
                description: job.description || "",
                requirements: job.requirements || "",
                benefits: job.benefits || "",
                isActive: job.isActive !== undefined ? job.isActive : true,
            });
        }
    }, [job]);

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

    if (!job) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Job updated:", formData);
        if (onSave) {
            onSave({ ...job, ...formData });
        }
        toast.success("Job updated successfully!");
        onClose();
    };

    const handleDeleteStage = (stageId: number) => {
        setHiringStages(hiringStages.filter(stage => stage.id !== stageId));
    };

    const tabs = [
        { id: 'details', label: 'DETAILS', icon: Settings },
        { id: 'application', label: 'APPLICATION FORM', icon: FileText },
        { id: 'boards', label: 'JOB BOARDS', icon: Share2 },
        { id: 'recruiters', label: 'RECRUITERS', icon: UserCheck },
        { id: 'hiring-flow', label: 'HIRING FLOW', icon: GitBranch },
        { id: 'team', label: 'HIRING TEAM', icon: UsersRound },
        { id: 'templates', label: 'EMAIL TEMPLATES', icon: Mail },
    ];

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
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                        className="bg-white/95 border border-gray-100  w-full max-w-6xl h-[85vh] overflow-hidden flex z-10 rounded-2xl relative text-left"
                    >
                        {/* Left Sidebar - Tabs */}
                        <div className="w-64 bg-primary  via-[#4D0213]  border-r border-gray-200/10 flex flex-col flex-shrink-0 relative">
                            {/* Decorative background glow */}
                            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-orange-400/10 blur-2xl pointer-events-none" />
                            
                            <div className="p-6 border-b border-white/10 relative z-10">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 bg-primary from-orange-400 to-rose-500 rounded-xl flex items-center justify-center text-white ">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-sm font-extrabold text-white tracking-wide">EDIT JOB POSITION</h2>
                                        <p className="text-[10px] text-rose-200/70 font-semibold truncate uppercase tracking-wider mt-0.5">
                                            {formData.title || "Edit Position"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto py-4 relative z-10 no-scrollbar">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`w-full flex items-center gap-3.5 px-6 py-3.5 text-left transition-all duration-200 cursor-pointer select-none ${
                                                isActive
                                                    ? 'bg-white/10 text-white font-extrabold border-l-4 border-orange-400 glass-sidebar-item-active '
                                                    : 'text-rose-100/70 hover:text-white hover:bg-white/5 font-medium'
                                            }`}
                                        >
                                            <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110 text-orange-300' : ''}`} />
                                            <span className="text-xs tracking-wider uppercase font-semibold">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="p-4 border-t border-white/10 relative z-10">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-xl transition-all font-bold text-xs cursor-pointer tracking-wider"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>

                        {/* Right Content Area */}
                        <div className="flex-1 flex flex-col min-w-0 bg-white">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
                                <div>
                                    <h3 className="text-base font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-[#800020]" />
                                        {activeTab === 'details' && 'Edit Job Details'}
                                        {activeTab === 'application' && 'Edit Application Form Setup'}
                                        {activeTab === 'boards' && 'Edit Job Boards Syndication'}
                                        {activeTab === 'recruiters' && 'Edit Assigned Recruiters'}
                                        {activeTab === 'hiring-flow' && 'Configure Hiring Pipeline'}
                                        {activeTab === 'team' && 'Edit Hiring Team Members'}
                                        {activeTab === 'templates' && 'Edit Pipeline Email Templates'}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-semibold mt-0.5">
                                        {activeTab === 'details' && 'Update job title, description, benefits, and salary settings'}
                                        {activeTab === 'application' && 'Customize the questions applicants will answer during submission'}
                                        {activeTab === 'boards' && 'Select, edit, and publish this job to global recruitment boards'}
                                        {activeTab === 'recruiters' && 'Choose recruiters who will manage candidates and interviews'}
                                        {activeTab === 'hiring-flow' && 'Customize the Kanban pipeline stages applicants move through'}
                                        {activeTab === 'team' && 'Add collaboration team members to view CV scores and comments'}
                                        {activeTab === 'templates' && 'Manage trigger emails sent at key stages of the recruitment flow'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-200 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-white/35">
                                {/* DETAILS TAB */}
                                {activeTab === 'details' && (
                                    <div className="max-w-3xl space-y-6">
                                        {/* Job Title */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Job Title *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                placeholder="e.g. Senior Software Engineer"
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] focus:bg-white transition-all text-sm font-medium"
                                            />
                                        </div>

                                        {/* Department & Location */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Department *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.department}
                                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                    placeholder="e.g. Engineering"
                                                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] focus:bg-white transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                                                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
                                                    Location *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    placeholder="e.g. Dublin, Ireland (Hybrid)"
                                                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] focus:bg-white transition-all text-sm font-medium"
                                                />
                                            </div>
                                        </div>

                                        {/* Job Type & Experience */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                                                    <Clock className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
                                                    Job Type *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.type}
                                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] focus:bg-white transition-all text-sm font-medium appearance-none"
                                                    >
                                                        <option>Full-time</option>
                                                        <option>Part-time</option>
                                                        <option>Contract</option>
                                                        <option>Internship</option>
                                                    </select>
                                                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                                                    <Users className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
                                                    Experience Level *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.experience}
                                                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] focus:bg-white transition-all text-sm font-medium appearance-none"
                                                    >
                                                        <option value="">Select level</option>
                                                        <option>Entry Level (0-2 years)</option>
                                                        <option>Mid Level (3-5 years)</option>
                                                        <option>Senior Level (5+ years)</option>
                                                        <option>Lead/Principal</option>
                                                    </select>
                                                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Salary */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                                                <DollarSign className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
                                                Salary Range
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.salary}
                                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                                placeholder="e.g. €85,000 - €110,000"
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] focus:bg-white transition-all text-sm font-medium"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Job Description *</label>
                                            <textarea
                                                required
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Describe the role, responsibilities, and key metrics..."
                                                rows={6}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] focus:bg-white transition-all text-sm font-medium resize-none leading-relaxed"
                                            />
                                        </div>

                                        {/* Requirements */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Requirements</label>
                                            <textarea
                                                value={formData.requirements}
                                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                                placeholder="List critical qualifications, frameworks, and tools needed..."
                                                rows={4}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] focus:bg-white transition-all text-sm font-medium resize-none leading-relaxed"
                                            />
                                        </div>

                                        {/* Benefits */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Benefits</label>
                                            <textarea
                                                value={formData.benefits}
                                                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                                                placeholder="List company perks, health benefits, pension, and bonuses..."
                                                rows={4}
                                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] focus:bg-white transition-all text-sm font-medium resize-none leading-relaxed"
                                            />
                                        </div>

                                        {/* Status Toggle */}
                                        <div className="p-5 bg-[#F5E6E8]/70 border border-[#800020]/10 rounded-2xl  flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#800020]/10 text-[#800020] rounded-xl flex items-center justify-center">
                                                    <Eye className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Publish Immediately</p>
                                                    <p className="text-[11px] text-gray-500 font-medium mt-0.5">Make this job active and visible to candidate listings</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.isActive}
                                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#800020]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800020]"></div>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* APPLICATION FORM TAB */}
                                {activeTab === 'application' && (
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-[#F5E6E8]/70 border border-[#800020]/15 rounded-xl text-xs font-semibold text-[#800020] leading-relaxed ">
                                            <Info className="w-4 h-4 text-[#800020] flex-shrink-0 mt-0.5" />
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
                                                        <div className="w-7 h-7 rounded-lg bg-gray-150 flex items-center justify-center text-gray-500 cursor-move mt-1">
                                                            <GripVertical className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-3.5">
                                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Question {index + 1}</span>
                                                                <div className="flex items-center gap-4">
                                                                    <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer select-none">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={q.required}
                                                                            onChange={(e) => {
                                                                                const updated = applicationQuestions.map(qu =>
                                                                                    qu.id === q.id ? { ...qu, required: e.target.checked } : qu
                                                                                );
                                                                                setApplicationQuestions(updated);
                                                                            }}
                                                                            className="w-4 h-4 rounded text-[#800020] border-gray-300 focus:ring-[#800020]"
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
                                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] transition-all text-sm font-medium"
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
                                                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-255 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020]/15 appearance-none cursor-pointer"
                                                                >
                                                                    <option value="text">Short Text</option>
                                                                    <option value="textarea">Long Text / Paragraph</option>
                                                                    <option value="select">Multiple Choice</option>
                                                                    <option value="date">Date Picker</option>
                                                                    <option value="file">File Upload / Attachment</option>
                                                                </select>
                                                                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
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
                                            className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-250 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all w-full justify-center text-xs font-bold cursor-pointer  bg-white"
                                        >
                                            <Plus className="w-4 h-4 text-[#800020]" />
                                            ADD CUSTOM APPLICATION QUESTION
                                        </motion.button>
                                    </div>
                                )}

                                {/* JOB BOARDS TAB */}
                                {activeTab === 'boards' && (
                                    <div className="max-w-5xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-[#F5E6E8]/70 border border-[#800020]/15 rounded-xl text-xs font-semibold text-[#800020] leading-relaxed ">
                                            <Info className="w-4 h-4 text-[#800020] flex-shrink-0 mt-0.5" />
                                            <p>Select which job boards to syndicate this posting onto. You can customize descriptions, salary formats, or location settings per board.</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {jobBoards.map((board) => {
                                                const isSelected = selectedBoards[board.name];
                                                const isExpanded = expandedBoards[board.name];
                                                return (
                                                    <div key={board.name} className="bg-white border border-gray-155 rounded-xl overflow-hidden  hover:border-gray-255 transition-colors">
                                                        <div className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                                            <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-150 flex-shrink-0">
                                                                    <LinkIcon className="w-4 h-4 text-gray-500" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="text-sm font-bold text-gray-900">{board.name}</p>
                                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                                                                        {isSelected ? 'Syndication Active' : 'Not selected'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                {isSelected && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setExpandedBoards({ ...expandedBoards, [board.name]: !isExpanded })}
                                                                        className="text-[#800020] hover:text-[#600018] w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
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
                                                                    className="w-5 h-5 text-[#800020] rounded border-gray-300 focus:ring-[#800020] cursor-pointer"
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
                                                                            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Customize for {board.name}</h4>
                                                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wide">Defaults used if left blank</span>
                                                                        </div>

                                                                        <div>
                                                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Board-Specific Title</label>
                                                                            <input
                                                                                type="text"
                                                                                value={boardDescriptions[board.name]?.title || ''}
                                                                                onChange={(e) => setBoardDescriptions({
                                                                                    ...boardDescriptions,
                                                                                    [board.name]: { ...boardDescriptions[board.name], title: e.target.value }
                                                                                })}
                                                                                placeholder={formData.title || 'Job title...'}
                                                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020]/10 focus:border-[#800020] text-xs"
                                                                            />
                                                                        </div>

                                                                        <div className="grid grid-cols-2 gap-3">
                                                                            <div>
                                                                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Location override</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={boardDescriptions[board.name]?.location || ''}
                                                                                    onChange={(e) => setBoardDescriptions({
                                                                                        ...boardDescriptions,
                                                                                        [board.name]: { ...boardDescriptions[board.name], location: e.target.value }
                                                                                    })}
                                                                                    placeholder={formData.location || 'Location...'}
                                                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020]/10 focus:border-[#800020] text-xs"
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Salary override</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={boardDescriptions[board.name]?.salary || ''}
                                                                                    onChange={(e) => setBoardDescriptions({
                                                                                        ...boardDescriptions,
                                                                                        [board.name]: { ...boardDescriptions[board.name], salary: e.target.value }
                                                                                    })}
                                                                                    placeholder={formData.salary || 'Salary...'}
                                                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020]/10 focus:border-[#800020] text-xs"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Custom Description</label>
                                                                            <textarea
                                                                                value={boardDescriptions[board.name]?.description || ''}
                                                                                onChange={(e) => setBoardDescriptions({
                                                                                    ...boardDescriptions,
                                                                                    [board.name]: { ...boardDescriptions[board.name], description: e.target.value }
                                                                                })}
                                                                                placeholder={formData.description || 'Provide board-specific details...'}
                                                                                rows={4}
                                                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020]/10 focus:border-[#800020] text-xs resize-none"
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
                                                                                className="text-[10px] text-gray-500 hover:text-gray-800 font-extrabold cursor-pointer"
                                                                            >
                                                                                RESET TO DEFAULTS
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    toast.success(`Job listing customization for ${board.name} saved!`);
                                                                                    setExpandedBoards({ ...expandedBoards, [board.name]: false });
                                                                                }}
                                                                                className="px-3.5 py-1.5 bg-[#800020] text-white rounded-lg text-xs font-bold hover:bg-[#600018] transition-colors cursor-pointer"
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
                                                className="bg-gray-50 border border-gray-200 rounded-xl p-5"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Configure Custom Channel</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsAddingBoard(false)}
                                                        className="text-gray-400 hover:text-gray-700 cursor-pointer"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Board Name *</label>
                                                        <input
                                                            type="text"
                                                            value={newBoardName}
                                                            onChange={(e) => setNewBoardName(e.target.value)}
                                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] text-xs font-medium"
                                                            placeholder="e.g. Dribbble Jobs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Endpoint URL (Optional)</label>
                                                        <input
                                                            type="text"
                                                            value={newBoardUrl}
                                                            onChange={(e) => setNewBoardUrl(e.target.value)}
                                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] text-xs font-medium"
                                                            placeholder="e.g. https://dribbble.com/jobs"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3.5 mt-4 pt-3 border-t border-gray-200/60">
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
                                                        className="flex items-center gap-1.5 px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] text-xs font-bold transition-all cursor-pointer"
                                                    >
                                                        <Save className="w-3.5 h-3.5" />
                                                        Add Channel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsAddingBoard(false)}
                                                        className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-lg text-xs font-bold transition-colors cursor-pointer"
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
                                                className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-255 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all w-full justify-center text-xs font-bold cursor-pointer  bg-white"
                                            >
                                                <Plus className="w-4 h-4 text-[#800020]" />
                                                ADD NEW SYNDICATION CHANNEL
                                            </motion.button>
                                        )}
                                    </div>
                                )}

                                {/* RECRUITERS TAB */}
                                {activeTab === 'recruiters' && (
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-[#F5E6E8]/70 border border-[#800020]/15 rounded-xl text-xs font-semibold text-[#800020] leading-relaxed ">
                                            <Info className="w-4 h-4 text-[#800020] flex-shrink-0 mt-0.5" />
                                            <p>Assign dedicated recruiters who will be responsible for screening, reviewing applications, and conducting phone screenings for this position.</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3.5">
                                            {['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim'].map((recruiter) => (
                                                <div key={recruiter} className="bg-white border border-gray-150 rounded-xl p-4 flex items-center justify-between hover:border-[#800020]/40 transition-colors ">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-10 h-10 bg-primary   rounded-xl flex items-center justify-center text-white font-bold text-sm ">
                                                            {recruiter.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">{recruiter}</p>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">recruiter@mployus.com</p>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 text-[#800020] border-gray-300 rounded focus:ring-[#800020] cursor-pointer"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* HIRING FLOW TAB */}
                                {activeTab === 'hiring-flow' && (
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-[#F5E6E8]/70 border border-[#800020]/15 rounded-xl text-xs font-semibold text-[#800020] leading-relaxed ">
                                            <Info className="w-4 h-4 text-[#800020] flex-shrink-0 mt-0.5" />
                                            <p>Configure the Kanban stages applicants will move through during the active hiring process for this specific job pipeline.</p>
                                        </div>

                                        <div className="space-y-3">
                                            {hiringStages.map((stage) => (
                                                <motion.div
                                                    key={stage.id}
                                                    className="bg-white border border-gray-150 rounded-xl p-4 hover:border-[#800020]/25 transition-all "
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                                            <GripVertical className="w-4 h-4 text-gray-300 cursor-move" />
                                                            <div className="w-9 h-9 bg-gray-50 border border-gray-150 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                                                                <GitBranch className="w-4 h-4 text-[#800020]" />
                                                            </div>
                                                            <span className="text-xs font-extrabold text-gray-900 tracking-tight truncate">{stage.name}</span>
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
                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#800020]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800020]"></div>
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
                                            className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-250 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all w-full justify-center text-xs font-bold cursor-pointer  bg-white"
                                        >
                                            <Plus className="w-4 h-4 text-[#800020]" />
                                            ADD PIPELINE STAGE
                                        </motion.button>

                                        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-150 rounded-xl text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                            <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                            <span>Hired and Rejected milestones are automatically added as the final stages of your job pipeline.</span>
                                        </div>
                                    </div>
                                )}

                                {/* HIRING TEAM TAB */}
                                {activeTab === 'team' && (
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-[#F5E6E8]/70 border border-[#800020]/15 rounded-xl text-xs font-semibold text-[#800020] text-rose-800 leading-relaxed ">
                                            <Info className="w-4 h-4 text-[#800020] flex-shrink-0 mt-0.5" />
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
                                                        <div className="w-10 h-10 bg-primary  via-[#A52A2A]  rounded-xl flex items-center justify-center text-white font-bold text-sm ">
                                                            {member.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">{member.name}</p>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
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
                                            className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-250 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-55 transition-all w-full justify-center text-xs font-bold cursor-pointer  bg-white"
                                        >
                                            <Plus className="w-4 h-4 text-[#800020]" />
                                            INVITE TEAM MEMBER
                                        </motion.button>
                                    </div>
                                )}

                                {/* EMAIL TEMPLATES TAB */}
                                {activeTab === 'templates' && (
                                    <div className="max-w-3xl space-y-6">
                                        <div className="flex items-start gap-3 p-4 bg-[#F5E6E8]/70 border border-[#800020]/15 rounded-xl text-xs font-semibold text-[#800020] leading-relaxed ">
                                            <Info className="w-4 h-4 text-[#800020] flex-shrink-0 mt-0.5" />
                                            <p>Manage and customize the email templates that will be dispatched as triggers when applicants move into key stages of this job's pipeline.</p>
                                        </div>

                                        <div className="space-y-3.5">
                                            {emailTemplates.map((template) => (
                                                <div
                                                    key={template.id}
                                                    className="bg-white border border-gray-150 rounded-xl p-4 hover:border-[#800020]/25 transition-all "
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                                            <div className="w-9 h-9 bg-gray-50 border border-gray-150 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                                                                <Mail className="w-4 h-4 text-[#800020]" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <span className="text-xs font-extrabold text-gray-900 tracking-tight block truncate">{template.name}</span>
                                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{template.category} Category</span>
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
                                                                <div className="w-11 h-6 bg-gray-255 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#800020]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800020]"></div>
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
                                            className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-255 rounded-xl text-gray-650 hover:text-gray-900 hover:bg-gray-55 transition-all w-full justify-center text-xs font-bold cursor-pointer  bg-white"
                                        >
                                            <Plus className="w-4 h-4 text-[#800020]" />
                                            CREATE NEW EMAIL TEMPLATE
                                        </motion.button>

                                        {/* Template Editor Drawer / Section */}
                                        {isEditingTemplate && selectedTemplate && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200 "
                                            >
                                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                                                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Edit Email Template</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsEditingTemplate(false)}
                                                        className="text-gray-400 hover:text-gray-700 cursor-pointer"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Template Name</label>
                                                        <input
                                                            type="text"
                                                            value={selectedTemplate.name}
                                                            onChange={(e) => setSelectedTemplate({ ...selectedTemplate, name: e.target.value })}
                                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] text-xs font-medium"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Email Subject Line</label>
                                                        <input
                                                            type="text"
                                                            value={selectedTemplate.subject}
                                                            onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] text-xs font-medium"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Email Message Body</label>
                                                        <textarea
                                                            value={selectedTemplate.body}
                                                            onChange={(e) => setSelectedTemplate({ ...selectedTemplate, body: e.target.value })}
                                                            rows={7}
                                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] text-xs font-medium resize-none leading-relaxed"
                                                        />
                                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wide mt-2 block">
                                                            Available Variables: {"{{applicant_name}}"}, {"{{job_title}}"}, {"{{company_name}}"}, {"{{interview_date}}"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3.5 mt-5 pt-4 border-t border-gray-200">
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
                                                        className="flex items-center gap-1.5 px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] text-xs font-bold transition-all cursor-pointer"
                                                    >
                                                        <Save className="w-3.5 h-3.5" />
                                                        Save Changes
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsEditingTemplate(false)}
                                                        className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-250 text-gray-655 rounded-lg text-xs font-bold transition-colors cursor-pointer"
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
                            <div className="flex items-center justify-end gap-3.5 p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2.5 rounded-xl border border-gray-250 text-gray-700 bg-white hover:bg-gray-55 transition-all font-bold text-xs  cursor-pointer tracking-wider"
                                >
                                    CANCEL
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleSubmit}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-[#800020] hover:bg-[#600018] text-white rounded-xl transition-all font-extrabold text-xs  border border-[#800020]/10 hover: cursor-pointer tracking-wider"
                                >
                                    <Save className="w-4 h-4" />
                                    SAVE JOB CHANGES
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}


