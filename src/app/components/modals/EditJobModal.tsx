import {
    X, Briefcase, DollarSign, MapPin, Clock, Users, Save, FileText,
    Share2, UserCheck, GitBranch, UsersRound, GripVertical, Trash2,
    Plus, Settings, Upload, Eye, Link as LinkIcon, Mail, Edit, ChevronDown, ChevronUp
} from "lucide-react";
import { useState } from "react";

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
        requirements: "",
        benefits: "",
        isActive: true,
    });

    const [hiringStages, setHiringStages] = useState<HiringStage[]>([
        { id: 1, name: "New Candidate", icon: "user-plus", enabled: true },
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
            body: "Dear {{candidate_name}},\n\nWe are pleased to invite you for an interview for the {{job_title}} position at {{company_name}}.\n\nInterview Details:\nDate: {{interview_date}}\nTime: {{interview_time}}\nLocation: {{interview_location}}\n\nPlease confirm your availability.\n\nBest regards,\n{{hiring_manager}}",
            category: "Interview",
            active: true
        },
        {
            id: 2,
            name: "Application Received",
            subject: "Application Received - {{job_title}}",
            body: "Dear {{candidate_name}},\n\nThank you for applying to the {{job_title}} position at {{company_name}}. We have received your application and will review it carefully.\n\nWe will be in touch soon regarding the next steps.\n\nBest regards,\n{{company_name}} Recruitment Team",
            category: "Application",
            active: true
        },
        {
            id: 3,
            name: "Rejection Notice",
            subject: "Update on Your Application - {{job_title}}",
            body: "Dear {{candidate_name}},\n\nThank you for your interest in the {{job_title}} position at {{company_name}}. After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.\n\nWe appreciate the time you invested in the application process and wish you the best in your job search.\n\nBest regards,\n{{company_name}} Recruitment Team",
            category: "Rejection",
            active: true
        },
        {
            id: 4,
            name: "Offer Letter",
            subject: "Job Offer - {{job_title}}",
            body: "Dear {{candidate_name}},\n\nWe are delighted to offer you the position of {{job_title}} at {{company_name}}.\n\nOffer Details:\nPosition: {{job_title}}\nStart Date: {{start_date}}\nSalary: {{salary}}\nLocation: {{location}}\n\nPlease review the attached offer letter and respond by {{response_deadline}}.\n\nWe look forward to welcoming you to our team!\n\nBest regards,\n{{hiring_manager}}",
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

    if (!isOpen || !job) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Job updated:", formData);
        if (onSave) {
            onSave({ ...job, ...formData });
        }
        alert("Job updated successfully!");
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex">
                {/* Left Sidebar - Tabs */}
                <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#800020] rounded-lg flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg">Edit Job</h2>
                                <p className="text-xs text-gray-500">{job.title}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto py-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`w-full flex items-center gap-3 px-6 py-2.5 text-left transition-colors ${activeTab === tab.id
                                            ? 'bg-white border-r-4 border-[#800020] text-[#800020]'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-sm">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                        <div>
                            <h3 className="text-xl text-gray-900">
                                {activeTab === 'details' && 'Job Details'}
                                {activeTab === 'application' && 'Application Form'}
                                {activeTab === 'boards' && 'Job Boards'}
                                {activeTab === 'recruiters' && 'Recruiters'}
                                {activeTab === 'hiring-flow' && 'Configure Hiring Flow'}
                                {activeTab === 'team' && 'Hiring Team'}
                                {activeTab === 'templates' && 'Email Templates'}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {activeTab === 'details' && 'Update job posting details'}
                                {activeTab === 'application' && 'Customize application questions'}
                                {activeTab === 'boards' && 'Manage job board listings'}
                                {activeTab === 'recruiters' && 'Assign recruiters to this job'}
                                {activeTab === 'hiring-flow' && 'Configure the hiring pipeline stages'}
                                {activeTab === 'team' && 'Manage hiring team members'}
                                {activeTab === 'templates' && 'Manage email templates for this job'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                        {/* DETAILS TAB */}
                        {activeTab === 'details' && (
                            <div className="max-w-3xl space-y-6">
                                {/* Job Title */}
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Job Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Senior Product Designer"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                    />
                                </div>

                                {/* Department & Location */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">Department *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            placeholder="e.g. Design"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4 inline mr-1" />
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="e.g. Remote, NY"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Job Type & Experience */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">
                                            <Clock className="w-4 h-4 inline mr-1" />
                                            Job Type *
                                        </label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                        >
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Contract</option>
                                            <option>Internship</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">
                                            <Users className="w-4 h-4 inline mr-1" />
                                            Experience Level *
                                        </label>
                                        <select
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                        >
                                            <option value="">Select level</option>
                                            <option>Entry Level (0-2 years)</option>
                                            <option>Mid Level (3-5 years)</option>
                                            <option>Senior Level (5+ years)</option>
                                            <option>Lead/Principal</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Salary */}
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">
                                        <DollarSign className="w-4 h-4 inline mr-1" />
                                        Salary Range
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.salary}
                                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                        placeholder="e.g. €80,000 - €120,000"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Job Description *</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe the role, responsibilities, and requirements..."
                                        rows={6}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent resize-none"
                                    />
                                </div>

                                {/* Requirements */}
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Requirements</label>
                                    <textarea
                                        value={formData.requirements}
                                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                        placeholder="List key requirements and qualifications..."
                                        rows={4}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent resize-none"
                                    />
                                </div>

                                {/* Benefits */}
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Benefits</label>
                                    <textarea
                                        value={formData.benefits}
                                        onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                                        placeholder="List company benefits and perks..."
                                        rows={4}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent resize-none"
                                    />
                                </div>

                                {/* Status Toggle */}
                                <div className="p-4 bg-[#F5E6E8] rounded-lg border border-[#800020]/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-900">Job Status</p>
                                            <p className="text-xs text-gray-600 mt-1">Make this job visible to candidates</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="w-5 h-5 text-[#800020] rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* APPLICATION FORM TAB */}
                        {activeTab === 'application' && (
                            <div className="max-w-3xl space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-blue-800">
                                        Customize the questions candidates will answer when applying for this position.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {applicationQuestions.map((q, index) => (
                                        <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <GripVertical className="w-5 h-5 text-gray-400 mt-1 cursor-move" />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-gray-500">Question {index + 1}</span>
                                                        <div className="flex items-center gap-2">
                                                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                                                <input type="checkbox" checked={q.required} className="rounded" />
                                                                Required
                                                            </label>
                                                            <button
                                                                type="button"
                                                                className="text-red-600 hover:text-red-700"
                                                                onClick={() => setApplicationQuestions(applicationQuestions.filter(qu => qu.id !== q.id))}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={q.question}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                                        placeholder="Enter question..."
                                                    />
                                                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]">
                                                        <option>Short Text</option>
                                                        <option>Long Text</option>
                                                        <option>Multiple Choice</option>
                                                        <option>Date</option>
                                                        <option>File Upload</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setApplicationQuestions([...applicationQuestions, {
                                        id: Date.now(),
                                        question: "",
                                        type: "text",
                                        required: false
                                    }])}
                                    className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full justify-center"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Question
                                </button>
                            </div>
                        )}

                        {/* JOB BOARDS TAB */}
                        {activeTab === 'boards' && (
                            <div className="max-w-5xl space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-blue-800">
                                        Select which job boards to publish this position on and customize the listing for each platform.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {jobBoards.map((board) => (
                                        <div key={board.name} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                            {/* Board Header */}
                                            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <LinkIcon className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900">{board.name}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {selectedBoards[board.name] ? 'Ready to publish' : 'Not selected'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {selectedBoards[board.name] && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setExpandedBoards({ ...expandedBoards, [board.name]: !expandedBoards[board.name] })}
                                                            className="text-[#800020] hover:text-[#600018] transition-colors"
                                                        >
                                                            {expandedBoards[board.name] ? (
                                                                <ChevronUp className="w-5 h-5" />
                                                            ) : (
                                                                <ChevronDown className="w-5 h-5" />
                                                            )}
                                                        </button>
                                                    )}
                                                    {!board.isDefault && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (confirm(`Remove ${board.name} from job boards?`)) {
                                                                    setJobBoards(jobBoards.filter(b => b.name !== board.name));
                                                                    // Clean up related state
                                                                    const newSelectedBoards = { ...selectedBoards };
                                                                    const newExpandedBoards = { ...expandedBoards };
                                                                    const newBoardDescriptions = { ...boardDescriptions };
                                                                    delete newSelectedBoards[board.name];
                                                                    delete newExpandedBoards[board.name];
                                                                    delete newBoardDescriptions[board.name];
                                                                    setSelectedBoards(newSelectedBoards);
                                                                    setExpandedBoards(newExpandedBoards);
                                                                    setBoardDescriptions(newBoardDescriptions);
                                                                }
                                                            }}
                                                            className="text-red-600 hover:text-red-700 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBoards[board.name] || false}
                                                        onChange={(e) => {
                                                            const newSelectedBoards = { ...selectedBoards, [board.name]: e.target.checked };
                                                            setSelectedBoards(newSelectedBoards);
                                                            if (e.target.checked) {
                                                                setExpandedBoards({ ...expandedBoards, [board.name]: true });
                                                                // Initialize with default values from main form
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
                                                        className="w-5 h-5 text-[#800020] rounded"
                                                    />
                                                </div>
                                            </div>

                                            {/* Expandable Form */}
                                            {selectedBoards[board.name] && expandedBoards[board.name] && (
                                                <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h4 className="text-sm font-medium text-gray-900">Customize listing for {board.name}</h4>
                                                        <span className="text-xs text-gray-500">All fields optional - defaults will be used if left blank</span>
                                                    </div>

                                                    {/* Job Title */}
                                                    <div>
                                                        <label className="block text-sm text-gray-700 mb-2">Job Title</label>
                                                        <input
                                                            type="text"
                                                            value={boardDescriptions[board.name]?.title || ''}
                                                            onChange={(e) => setBoardDescriptions({
                                                                ...boardDescriptions,
                                                                [board.name]: { ...boardDescriptions[board.name], title: e.target.value }
                                                            })}
                                                            placeholder={formData.title || 'Enter job title for ' + board.name}
                                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent text-sm"
                                                        />
                                                    </div>

                                                    {/* Company Name */}
                                                    <div>
                                                        <label className="block text-sm text-gray-700 mb-2">Company Name</label>
                                                        <input
                                                            type="text"
                                                            value={boardDescriptions[board.name]?.company || ''}
                                                            onChange={(e) => setBoardDescriptions({
                                                                ...boardDescriptions,
                                                                [board.name]: { ...boardDescriptions[board.name], company: e.target.value }
                                                            })}
                                                            placeholder="e.g. MployUs"
                                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent text-sm"
                                                        />
                                                    </div>

                                                    {/* Location & Salary */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm text-gray-700 mb-2">Location</label>
                                                            <input
                                                                type="text"
                                                                value={boardDescriptions[board.name]?.location || ''}
                                                                onChange={(e) => setBoardDescriptions({
                                                                    ...boardDescriptions,
                                                                    [board.name]: { ...boardDescriptions[board.name], location: e.target.value }
                                                                })}
                                                                placeholder={formData.location || 'e.g. Remote, NY'}
                                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-gray-700 mb-2">Salary Range</label>
                                                            <input
                                                                type="text"
                                                                value={boardDescriptions[board.name]?.salary || ''}
                                                                onChange={(e) => setBoardDescriptions({
                                                                    ...boardDescriptions,
                                                                    [board.name]: { ...boardDescriptions[board.name], salary: e.target.value }
                                                                })}
                                                                placeholder={formData.salary || 'e.g. €80,000 - €120,000'}
                                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent text-sm"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Job Description */}
                                                    <div>
                                                        <label className="block text-sm text-gray-700 mb-2">Job Description</label>
                                                        <textarea
                                                            value={boardDescriptions[board.name]?.description || ''}
                                                            onChange={(e) => setBoardDescriptions({
                                                                ...boardDescriptions,
                                                                [board.name]: { ...boardDescriptions[board.name], description: e.target.value }
                                                            })}
                                                            placeholder={formData.description || `Customize job description for ${board.name}...`}
                                                            rows={6}
                                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent resize-none text-sm"
                                                        />
                                                        <p className="text-xs text-gray-500 mt-2">
                                                            Tip: Customize this description to match {board.name}'s best practices and formatting
                                                        </p>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                // Reset to defaults
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
                                                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                                        >
                                                            Reset to Defaults
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                alert(`Job listing for ${board.name} saved!`);
                                                                setExpandedBoards({ ...expandedBoards, [board.name]: false });
                                                            }}
                                                            className="px-4 py-2 bg-[#800020] text-white rounded-lg text-sm hover:bg-[#600018] transition-colors"
                                                        >
                                                            Save {board.name} Listing
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Add New Board */}
                                {isAddingBoard && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-sm font-medium text-gray-900">Add New Job Board</h4>
                                            <button
                                                type="button"
                                                onClick={() => setIsAddingBoard(false)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-2">Board Name</label>
                                                <input
                                                    type="text"
                                                    value={newBoardName}
                                                    onChange={(e) => setNewBoardName(e.target.value)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-2">Board URL (optional)</label>
                                                <input
                                                    type="text"
                                                    value={newBoardUrl}
                                                    onChange={(e) => setNewBoardUrl(e.target.value)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-4">
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
                                                    }
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors"
                                            >
                                                <Save className="w-4 h-4" />
                                                Add Board
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsAddingBoard(false)}
                                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {!isAddingBoard && (
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingBoard(true)}
                                        className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full justify-center"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add New Job Board
                                    </button>
                                )}
                            </div>
                        )}

                        {/* RECRUITERS TAB */}
                        {activeTab === 'recruiters' && (
                            <div className="max-w-3xl space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-blue-800">
                                        Assign recruiters who will have access to manage this job posting.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim'].map((recruiter) => (
                                        <div key={recruiter} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-[#800020] transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white">
                                                    {recruiter.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{recruiter}</p>
                                                    <p className="text-xs text-gray-500">recruiter@mployus.com</p>
                                                </div>
                                            </div>
                                            <input type="checkbox" className="w-5 h-5 text-[#800020] rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* HIRING FLOW TAB */}
                        {activeTab === 'hiring-flow' && (
                            <div className="max-w-3xl space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-blue-800">
                                        Configure the stages candidates will move through during the hiring process.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {hiringStages.map((stage, index) => (
                                        <div
                                            key={stage.id}
                                            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#800020] transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />

                                                <div className="flex-1 flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <GitBranch className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                    <span className="text-gray-900">{stage.name}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <label className="relative inline-flex items-center cursor-pointer">
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
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setHiringStages([...hiringStages, {
                                        id: Date.now(),
                                        name: "New Stage",
                                        icon: "circle",
                                        enabled: true
                                    }])}
                                    className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full justify-center"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Stage
                                </button>

                                <div className="text-sm text-gray-500 italic bg-gray-50 rounded-lg p-3">
                                    * Hired and Rejected steps will be automatically added as you create jobs, do not include in the steps above.
                                </div>
                            </div>
                        )}

                        {/* HIRING TEAM TAB */}
                        {activeTab === 'team' && (
                            <div className="max-w-3xl space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-blue-800">
                                        Add team members who will be involved in the hiring process for this position.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {teamMembers.map((member) => (
                                        <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{member.name}</p>
                                                    <p className="text-xs text-gray-500">{member.role} • {member.email}</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setTeamMembers(teamMembers.filter(m => m.id !== member.id))}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
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
                                        }
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full justify-center"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Team Member
                                </button>
                            </div>
                        )}

                        {/* EMAIL TEMPLATES TAB */}
                        {activeTab === 'templates' && (
                            <div className="max-w-3xl space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-blue-800">
                                        Manage email templates for this job.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {emailTemplates.map((template) => (
                                        <div
                                            key={template.id}
                                            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#800020] transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />

                                                <div className="flex-1 flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <Mail className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                    <span className="text-gray-900">{template.name}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <label className="relative inline-flex items-center cursor-pointer">
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
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#800020]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800020]"></div>
                                                    </label>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedTemplate(template);
                                                            setIsEditingTemplate(true);
                                                        }}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
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
                                        }
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full justify-center"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Template
                                </button>

                                {isEditingTemplate && selectedTemplate && (
                                    <div className="mt-6">
                                        <h4 className="text-sm text-gray-900 font-medium">Edit Template</h4>
                                        <div className="space-y-4 mt-2">
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-2">Template Name</label>
                                                <input
                                                    type="text"
                                                    value={selectedTemplate.name}
                                                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, name: e.target.value })}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-2">Email Subject</label>
                                                <input
                                                    type="text"
                                                    value={selectedTemplate.subject}
                                                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-2">Email Body</label>
                                                <textarea
                                                    value={selectedTemplate.body}
                                                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, body: e.target.value })}
                                                    rows={6}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent resize-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updatedTemplates = emailTemplates.map(t =>
                                                        t.id === selectedTemplate.id ? selectedTemplate : t
                                                    );
                                                    setEmailTemplates(updatedTemplates);
                                                    setIsEditingTemplate(false);
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save Changes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditingTemplate(false)}
                                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </form>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-white">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}