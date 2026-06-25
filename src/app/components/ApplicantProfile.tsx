import {
    ArrowLeft, Mail, Phone, CheckCircle, XCircle, MoreHorizontal,
    Download, Upload, Plus, MessageSquare, Calendar, Star, FileText,
    Send, Trash2, Edit, Eye, Clock, User, Building, Award, AlertCircle, Sparkles, Check
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ApplicantProfileProps {
    onBack: () => void;
    applicant?: any;
}

const hiringStages = [
    { id: 1, name: 'Filter', completed: true },
    { id: 2, name: 'Shortlist', completed: true },
    { id: 3, name: 'Phone Screen', completed: false },
    { id: 4, name: 'Technical Round', completed: false },
    { id: 5, name: 'Panel Interview', completed: false },
    { id: 6, name: 'Executive Round', completed: false },
    { id: 7, name: 'Offering', completed: false },
    { id: 8, name: 'Hired', completed: false }
];

const tabs = [
    'Latest CV', 'Activity', 'Questions', 'Interview Score',
    'Forms & Docs', 'Contracts', 'Comments', 'Emails'
];

export function ApplicantProfile({ onBack, applicant }: ApplicantProfileProps) {
    const [activeTab, setActiveTab] = useState('Latest CV');
    const [notes, setNotes] = useState('');
    const [comment, setComment] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [showCoverNote, setShowCoverNote] = useState(false);

    // Modal states
    const [applicantStatus, setApplicantStatus] = useState(applicant?.status || 'Shortlisted');
    const [isHireModalOpen, setIsHireModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isMoreOptionsModalOpen, setIsMoreOptionsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isStageModalOpen, setIsStageModalOpen] = useState(false);

    // Editable applicant info
    const [editedName, setEditedName] = useState(applicant?.name || 'Rajnikant Khristi');
    const [editedEmail, setEditedEmail] = useState(applicant?.email || 'khristirajnikant@gmail.com');
    const [editedPhone, setEditedPhone] = useState(applicant?.phone || '+353-353996363599');
    const [editedRole, setEditedRole] = useState(applicant?.role || 'Senior Software Engineer');

    // Form inputs for modals
    const [hireSalary, setHireSalary] = useState('€85,000');
    const [hireDate, setHireDate] = useState('2026-07-01');
    const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);

    const [rejectReason, setRejectReason] = useState('Position Filled');
    const [rejectNote, setRejectNote] = useState('Thank you for your time and interest in our organization.');
    const [sendRejectEmail, setSendRejectEmail] = useState(true);

    const [selectedStage, setSelectedStage] = useState('Phone Screen');

    const applicantInitials = editedName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    const appliedDate = applicant?.applied || '3 days ago';

    const handleDownloadCV = () => {
        toast.info('Downloading CV document...');
    };

    const handleUploadCV = () => {
        toast.info('Opening file picker to upload new CV...');
    };

    const handleSaveNotes = () => {
        if (notes.trim()) {
            toast.success('Internal notes saved successfully!');
        }
    };

    const handleScheduleInterview = () => {
        toast.info('Opening interview scheduler...');
    };

    const handlePostComment = () => {
        if (comment.trim()) {
            toast.success(`Comment posted successfully!`);
            setComment('');
        }
    };

    const handleSendEmail = () => {
        if (emailSubject.trim() && emailBody.trim()) {
            toast.success(`Email sent to ${editedName}!`);
            setEmailSubject('');
            setEmailBody('');
        } else {
            toast.error('Please complete both subject and message body');
        }
    };

    const getStatusTheme = (status: string) => {
        switch (status) {
            case 'Hired':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
            case 'Rejected':
                return 'bg-rose-50 text-rose-700 border-rose-200/50';
            default:
                return 'bg-indigo-50 text-indigo-700 border-indigo-200/50';
        }
    };

    return (
        <div className="flex h-[calc(100vh-73px)] bg-gray-50/40 relative overflow-hidden text-left w-full">
            {/* Left Panel - Applicant Information */}
            <div className="w-80 bg-white border-r border-gray-200/60 flex flex-col overflow-y-auto no-scrollbar flex-shrink-0 ">
                
                {/* Back Button & Header */}
                <div className="p-6 border-b border-gray-150">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 mb-5 transition-colors cursor-pointer select-none"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Applicants</span>
                    </button>

                    {/* Applicant Profile Card */}
                    <div className="flex items-start gap-3.5 mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-primary   flex items-center justify-center text-white text-base flex-shrink-0 font-bold  border border-white/10">
                            {applicantInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base font-bold text-gray-950 truncate leading-snug">{editedName}</h2>
                            <p className="text-[10px] text-gray-400 font-semibold truncate uppercase tracking-wide mt-0.5">{editedRole}</p>
                            <p className="text-[9px] text-gray-400 font-semibold mt-1">Applied {appliedDate}</p>
                            
                            <span className="inline-flex items-center mt-2.5 px-2 py-0.5 bg-rose-50/50 text-[#800020] rounded-lg text-[9px] font-bold border border-[#800020]/10">
                                Active Applicant
                            </span>
                        </div>
                    </div>

                    {/* Action Panel Buttons */}
                    <div className="flex gap-2 mb-3">
                        <motion.button
                            onClick={() => setIsHireModalOpen(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 text-xs font-bold  cursor-pointer border border-emerald-700/10"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Hire
                        </motion.button>
                        <motion.button
                            onClick={() => setIsRejectModalOpen(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-2.5 bg-rose-50 text-rose-700 rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5 text-xs font-bold border border-rose-200/50 cursor-pointer"
                        >
                            <XCircle className="w-4 h-4" />
                            Reject
                        </motion.button>
                    </div>

                    <motion.button
                        onClick={() => setIsMoreOptionsModalOpen(true)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 text-xs font-bold  bg-white cursor-pointer"
                    >
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        Workflow Options
                    </motion.button>
                </div>

                {/* Score Circle Gauge */}
                <div className="p-6 border-b border-gray-150 bg-gray-50/30 flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-4 filter drop-">
                        <svg className="w-24 h-24 transform -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="38"
                                stroke="#f3f4f6"
                                strokeWidth="6"
                                fill="none"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="38"
                                stroke="url(#maroonGradient)"
                                strokeWidth="7.5"
                                fill="none"
                                strokeDasharray={`${(72 / 100) * 238.76} 238.76`}
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="maroonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#800020" />
                                    <stop offset="100%" stopColor="#E9967A" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-gray-900 tracking-tight leading-none">72</span>
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Match</span>
                        </div>
                    </div>

                    <div className="w-full space-y-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        <div className="flex justify-between items-center bg-white border border-gray-150 p-2 rounded-xl">
                            <span>CV Score</span>
                            <span className="text-gray-900">54 / 100</span>
                        </div>
                        <div className="flex justify-between items-center bg-white border border-gray-150 p-2 rounded-xl">
                            <span>Questionnaire</span>
                            <span className="text-gray-900">91 / 100</span>
                        </div>
                    </div>
                </div>

                {/* Contact and Status Info */}
                <div className="p-6 border-b border-gray-150">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs font-semibold">
                            <Mail className="w-4 h-4 text-gray-450 flex-shrink-0" />
                            <a href={`mailto:${editedEmail}`} className="text-gray-700 hover:text-[#800020] transition-colors truncate">
                                {editedEmail}
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold">
                            <Phone className="w-4 h-4 text-gray-450 flex-shrink-0" />
                            <a href={`tel:${editedPhone}`} className="text-gray-700 hover:text-[#800020] transition-colors truncate">
                                {editedPhone}
                            </a>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${getStatusTheme(applicantStatus)}`}>
                            <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                            Status: {applicantStatus}
                        </span>
                    </div>
                </div>

                {/* Notes Section */}
                <div className="p-6 border-b border-gray-150 bg-gray-50/20">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Internal Notes</h3>
                        <button
                            onClick={handleSaveNotes}
                            className="text-[#800020] hover:text-[#600018] transition-colors cursor-pointer"
                            title="Save Note"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                    </div>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add recruitment notes here..."
                        className="w-full px-3 py-2.5 border border-gray-250 rounded-xl text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020] transition-all bg-white"
                        rows={3.5}
                    />
                </div>

                {/* AI Insights Section */}
                <div className="p-6">
                    <h3 className="text-xs font-bold text-gray-955 uppercase tracking-wide flex items-center gap-1.5 mb-3">
                        <Sparkles className="w-4 h-4 text-[#800020]" />
                        A.I. Talent Insight
                    </h3>
                    <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-3 text-xs text-gray-700 font-medium leading-relaxed">
                        <p className="mb-2">• Exceptional answers to role-specific vetting questionnaires.</p>
                        <p className="mb-2">• Resume matches 87% of the core design requirements.</p>
                        <p>• Highly recommended for deep technical review.</p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Roadmaps, Tabs, and Details */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Hiring Flow Roadmap */}
                <div className="bg-white border-b border-gray-200/60 px-6 py-4 flex-shrink-0 text-left">
                    <div className="flex items-center justify-between mb-3.5">
                        <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider">Hiring Pipeline Stage</h3>
                        <button 
                            onClick={() => setIsStageModalOpen(true)}
                            className="text-xs font-bold text-[#800020] hover:text-[#600018] transition-colors cursor-pointer"
                        >
                            Update Stage
                        </button>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
                        {hiringStages.map((stage, index) => {
                            const isHiredActive = applicantStatus === "Hired" && stage.name === "Hired";
                            const isCurrentStage = applicantStatus.toLowerCase().includes(stage.name.toLowerCase()) || isHiredActive;
                            const isDone = stage.completed || isHiredActive;

                            return (
                                <div key={stage.id} className="flex items-center gap-2 flex-shrink-0">
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={() => {
                                                setSelectedStage(stage.name);
                                                setApplicantStatus(stage.name);
                                                toast.info(`Workflow updated to: ${stage.name}`);
                                            }}
                                            className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-all duration-300  cursor-pointer ${
                                                isCurrentStage 
                                                    ? 'bg-[#800020] text-white ring-4 ring-[#800020]/20'
                                                    : isDone
                                                        ? 'bg-[#800020]/80 text-white'
                                                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                            }`}
                                        >
                                            {isDone ? (
                                                <Check className="w-4 h-4" />
                                            ) : (
                                                <span className="text-[10px] font-bold">{index + 1}</span>
                                            )}
                                        </button>
                                        <span className="text-[9px] font-bold mt-1.5 text-gray-500 max-w-[85px] text-center truncate">
                                            {stage.name}
                                        </span>
                                    </div>
                                    {index < hiringStages.length - 1 && (
                                        <div className={`w-6 h-0.5 rounded-full ${isDone ? 'bg-[#800020]/80' : 'bg-gray-150'} mb-5`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tabs & Details Area */}
                <div className="flex-1 overflow-y-auto bg-gray-50/30 flex flex-col">
                    
                    {/* Tab Navigation Menu */}
                    <div className="bg-white border-b border-gray-150 px-6 sticky top-0 z-10  flex-shrink-0">
                        <div className="flex gap-6 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-3.5 px-1 border-b-2 transition-all whitespace-nowrap text-xs font-bold relative cursor-pointer ${
                                        activeTab === tab
                                            ? 'border-[#800020] text-[#800020]'
                                            : 'border-transparent text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    {tab}
                                    {(tab === 'Comments' || tab === 'Emails') && (
                                        <span className="ml-1.5 px-1.5 py-0.2 bg-gray-100 text-gray-500 rounded-md text-[9px] font-bold border border-gray-200/50">
                                            {tab === 'Comments' ? '3' : '5'}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Panels Content */}
                    <div className="p-6 flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="min-h-full"
                            >
                                {/* PANEL: LATEST CV */}
                                {activeTab === 'Latest CV' && (
                                    <div className="bg-white rounded-2xl  border border-gray-150 overflow-hidden">
                                        {/* Actions Header */}
                                        <div className="flex items-center justify-between p-4 bg-gray-50/50 border-b border-gray-150">
                                            <div className="flex gap-1.5">
                                                <button
                                                    onClick={() => setShowCoverNote(false)}
                                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                        !showCoverNote
                                                            ? 'bg-gray-900 text-white '
                                                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                                    }`}
                                                >
                                                    Curriculum Vitae
                                                </button>
                                                <button
                                                    onClick={() => setShowCoverNote(true)}
                                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                        showCoverNote
                                                            ? 'bg-gray-900 text-white '
                                                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                                    }`}
                                                >
                                                    Cover Letter
                                                </button>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleUploadCV}
                                                    className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                                                >
                                                    <Upload className="w-3.5 h-3.5" />
                                                    Upload
                                                </button>
                                                <button
                                                    onClick={handleDownloadCV}
                                                    className="px-3.5 py-1.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer "
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                    Download
                                                </button>
                                            </div>
                                        </div>

                                        {/* Document Preview (Premium Paper Style) */}
                                        <div className="p-8 md:p-12 max-w-3xl mx-auto text-left bg-white font-sans text-gray-800 leading-relaxed ">
                                            {!showCoverNote ? (
                                                <div className="border border-gray-100 p-8  rounded-xl bg-white">
                                                    <div className="text-center mb-8 border-b border-gray-150 pb-6">
                                                        <h1 className="text-2xl font-black text-gray-950 tracking-tight uppercase mb-1">Rajnikant Khristi</h1>
                                                        <p className="text-xs font-bold text-[#800020] uppercase tracking-widest">{editedRole}</p>
                                                    </div>

                                                    <div className="space-y-6 text-xs font-medium">
                                                        {/* Contact section */}
                                                        <div>
                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Correspondence Info</h3>
                                                            <p className="text-gray-700 leading-normal">
                                                                20 Hillbrook Woods, Blanchardstown, Dublin 15, D15 V9KT, Ireland.<br />
                                                                Email: <span className="font-semibold text-gray-900">{editedEmail}</span> | Tel: <span className="font-semibold text-gray-900">{editedPhone}</span>
                                                            </p>
                                                        </div>

                                                        {/* Experience */}
                                                        <div>
                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Work Experience</h3>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <div className="flex justify-between font-bold text-gray-950 text-[11px]">
                                                                        <span>Senior Software Engineer • Global ATS Systems</span>
                                                                        <span>2022 - Present</span>
                                                                    </div>
                                                                    <p className="text-[10px] text-gray-500 font-semibold mt-0.5">Dublin, Ireland</p>
                                                                    <p className="mt-1.5 text-gray-600 leading-relaxed">
                                                                        Led the technical redesign of enterprise recruiter dashboard apps, improving render performance by 42%. Structured micro-frontend modules and established reusable component libraries using React and Tailwind.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Education */}
                                                        <div>
                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Education & Qualifications</h3>
                                                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                                <li>Bachelor of Science in Computer Science & Engineering (First Class Honours, 2018)</li>
                                                                <li>Senior Secondary Qualifications from GSEB Board</li>
                                                            </ul>
                                                        </div>

                                                        {/* Languages */}
                                                        <div>
                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Languages Known</h3>
                                                            <p className="text-gray-700">English (Fluent), Portuguese, Hebrew, Hindi</p>
                                                        </div>

                                                        {/* Core Strengths */}
                                                        <div>
                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Key Strengths & Skills</h3>
                                                            <p className="text-gray-750">
                                                                TypeScript, React, Node.js, Next.js, Redux, TailwindCSS, Frontend System Design, Performance Tuning, Agile Team Leadership, Excellent Vetting Score.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="border border-gray-100 p-8  rounded-xl bg-white text-xs font-medium">
                                                    <div className="space-y-4 text-gray-700 leading-relaxed">
                                                        <p className="text-right font-semibold text-gray-500">Date: June 25, 2026</p>
                                                        <p className="font-bold text-gray-900">Dear Hiring Manager,</p>
                                                        <p>
                                                            I am writing to express my enthusiastic interest in the senior engineering role currently advertised. With my robust experience in building modern web applications, optimizing workflows, and enhancing client-facing dashboards, I believe I can make an immediate impact on your team.
                                                        </p>
                                                        <p>
                                                            Throughout my career, I have focused on writing clean, maintainable, and high-performing React code. I enjoy collaborative pair-programming, tackling complex state issues, and building components that provide beautiful, intuitive user interfaces.
                                                        </p>
                                                        <p>
                                                            Thank you for your time and consideration of my application. I look forward to discussing how my experience matches your current roadmap.
                                                        </p>
                                                        <p className="pt-4">Sincerely,<br /><span className="font-bold text-gray-950">{editedName}</span></p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* PANEL: ACTIVITY TIMELINE */}
                                {activeTab === 'Activity' && (
                                    <div className="bg-white rounded-2xl  border border-gray-150 p-6 relative">
                                        <div className="relative pl-6 space-y-6">
                                            {/* Timeline Connecting Line */}
                                            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-100" />

                                            <div className="relative flex items-start gap-4">
                                                <div className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-[#800020]" />
                                                <div className="w-8 h-8 rounded-xl bg-[#800020] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                                    {applicantInitials}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-800 font-semibold"><span className="font-bold text-gray-900">{editedName}</span> was moved to Shortlisted stage</p>
                                                    <p className="text-[10px] text-gray-400 mt-1 font-bold">{appliedDate}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="relative flex items-start gap-4">
                                                <div className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-indigo-500" />
                                                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                                    AI
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-800 font-semibold"><span className="font-bold text-gray-950">System Vetting Tool</span> automatically calculated matching score (72/100)</p>
                                                    <p className="text-[10px] text-gray-400 mt-1 font-bold">{appliedDate}</p>
                                                </div>
                                            </div>

                                            <div className="relative flex items-start gap-4">
                                                <div className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-emerald-500" />
                                                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-800 font-semibold"><span className="font-bold text-gray-950">{editedName}</span> applied for this position via Irish Jobs board</p>
                                                    <p className="text-[10px] text-gray-400 mt-1 font-bold">{appliedDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* PANEL: SCREENING QUESTIONS */}
                                {activeTab === 'Questions' && (
                                    <div className="bg-white rounded-2xl  border border-gray-150 p-6 space-y-6">
                                        <div className="border-b border-gray-100 pb-4">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">1. Why are you interested in this position?</p>
                                            <p className="text-xs font-semibold text-gray-900 leading-relaxed">
                                                I am deeply passionate about building modern web applications, utilizing design systems, and improving client experience. I want to bring my React and systems design expertise to your fast-growing engineering team.
                                            </p>
                                        </div>

                                        <div className="border-b border-gray-100 pb-4">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">2. What is your expected salary range?</p>
                                            <p className="text-xs font-semibold text-gray-900 leading-relaxed">
                                                €80,000 - €95,000 per annum, commensurate with roles and benefits.
                                            </p>
                                        </div>

                                        <div className="pb-2">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">3. What is your notice period?</p>
                                            <p className="text-xs font-semibold text-gray-900 leading-relaxed">
                                                I can start immediately upon a 2-week transition notice.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* PANEL: INTERVIEW SCORE */}
                                {activeTab === 'Interview Score' && (
                                    <div className="bg-white rounded-2xl  border border-gray-150 p-8 text-center flex flex-col items-center justify-center min-h-[260px]">
                                        <Calendar className="w-12 h-12 text-gray-300 mb-4" />
                                        <p className="text-xs text-gray-500 font-semibold mb-5">No interviews scheduled yet for this applicant</p>
                                        <button
                                            onClick={handleScheduleInterview}
                                            className="px-5 py-2.5 bg-[#800020] text-white rounded-xl hover:bg-[#600018] transition-colors font-semibold text-xs  cursor-pointer"
                                        >
                                            Schedule Interview
                                        </button>
                                    </div>
                                )}

                                {/* PANEL: FORMS & DOCS */}
                                {activeTab === 'Forms & Docs' && (
                                    <div className="bg-white rounded-2xl  border border-gray-150 p-6">
                                        <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider mb-4">Vetting Documents</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="border border-gray-200 rounded-2xl p-4 hover:border-[#800020]/40 transition-colors cursor-pointer bg-white  flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="w-8 h-8 text-[#800020] bg-rose-50 p-1.5 rounded-lg" />
                                                    <div className="text-left">
                                                        <h4 className="text-xs font-bold text-gray-900">Application Form</h4>
                                                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Submitted {appliedDate}</p>
                                                    </div>
                                                </div>
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div 
                                                onClick={handleUploadCV}
                                                className="border border-dashed border-gray-300 rounded-2xl p-4 hover:border-[#800020] transition-colors cursor-pointer flex flex-col items-center justify-center bg-gray-50/20 text-center"
                                            >
                                                <Upload className="w-6 h-6 text-gray-400 mb-1.5" />
                                                <p className="text-[10px] font-bold text-gray-600">Upload New Vetting Doc</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* PANEL: CONTRACTS */}
                                {activeTab === 'Contracts' && (
                                    <div className="bg-white rounded-2xl  border border-gray-150 p-8 text-center flex flex-col items-center justify-center min-h-[260px]">
                                        <FileText className="w-12 h-12 text-gray-300 mb-4" />
                                        <p className="text-xs text-gray-500 font-semibold mb-5">No contracts generated or offered yet</p>
                                        <button className="px-5 py-2.5 bg-[#800020] text-white rounded-xl hover:bg-[#600018] transition-colors font-semibold text-xs  cursor-pointer">
                                            Generate Offer Contract
                                        </button>
                                    </div>
                                )}

                                {/* PANEL: COMMENTS */}
                                {activeTab === 'Comments' && (
                                    <div className="bg-white rounded-2xl  border border-gray-150 p-6 space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex gap-3.5 pb-4 border-b border-gray-100 text-left">
                                                <Avatar className="w-8.5 h-8.5 border border-gray-100  flex-shrink-0">
                                                    <AvatarFallback className="text-[10px] font-bold bg-indigo-600 text-white">JD</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <p className="text-xs font-bold text-gray-900">John Doe (Engineering Lead)</p>
                                                        <p className="text-[9px] font-bold text-gray-400">2 days ago</p>
                                                    </div>
                                                    <p className="text-xs font-medium text-gray-650 leading-relaxed">
                                                        Very strong coding background. CV demonstrates deep expertise in web performance tuning and modular React architectures. Highly recommend phone screening.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3.5 pb-4 border-b border-gray-100 text-left">
                                                <Avatar className="w-8.5 h-8.5 border border-gray-100  flex-shrink-0">
                                                    <AvatarFallback className="text-[10px] font-bold bg-purple-600 text-white">SM</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <p className="text-xs font-bold text-gray-900">Sarah Miller (Recruiting Manager)</p>
                                                        <p className="text-[9px] font-bold text-gray-400">5 days ago</p>
                                                    </div>
                                                    <p className="text-xs font-medium text-gray-650 leading-relaxed">
                                                        Vetting question responses show outstanding alignment with our culture and values. Clear, professional communicator.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Add Comment Form */}
                                        <div className="pt-2 text-left">
                                            <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Add Internal Feedback</h4>
                                            <div className="flex gap-3">
                                                <Avatar className="w-8 h-8 border border-gray-100  flex-shrink-0">
                                                    <AvatarFallback className="text-[10px] font-bold bg-gray-200 text-gray-650">YO</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <textarea
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        placeholder="Write a comment about this applicant..."
                                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020] transition-all bg-white"
                                                        rows={3}
                                                    />
                                                    <div className="mt-3 flex justify-end">
                                                        <button
                                                            onClick={handlePostComment}
                                                            className="px-5 py-2 bg-[#800020] text-white rounded-xl hover:bg-[#600018] transition-colors text-xs font-bold  cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                            disabled={!comment.trim()}
                                                        >
                                                            Post Comment
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* PANEL: EMAILS */}
                                {activeTab === 'Emails' && (
                                    <div className="bg-white rounded-2xl  border border-gray-150 p-6 space-y-6">
                                        <div className="space-y-4">
                                            <div className="pb-4 border-b border-gray-100 text-left">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4 text-[#800020]" />
                                                        <h4 className="text-xs font-bold text-gray-950">Application Confirmation</h4>
                                                    </div>
                                                    <span className="text-[9px] font-bold text-gray-400">{appliedDate}</span>
                                                </div>
                                                <p className="text-xs text-gray-700 font-semibold mb-1">
                                                    <strong>Subject:</strong> Thank you for your application
                                                </p>
                                                <p className="text-[11px] text-gray-500 leading-normal font-medium">
                                                    Dear {editedName}, thank you for your application to the role. We will review your profile and get back to you soon.
                                                </p>
                                            </div>

                                            <div className="pb-4 border-b border-gray-100 text-left">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4 text-indigo-500" />
                                                        <h4 className="text-xs font-bold text-gray-950">Shortlist Notification</h4>
                                                    </div>
                                                    <span className="text-[9px] font-bold text-gray-400">2 weeks ago</span>
                                                </div>
                                                <p className="text-xs text-gray-700 font-semibold mb-1">
                                                    <strong>Subject:</strong> Congratulations - You have been shortlisted
                                                </p>
                                                <p className="text-[11px] text-gray-500 leading-normal font-medium">
                                                    We are pleased to inform you that your profile has been shortlisted for the next stage of our technical vetting round.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Compose Email Form */}
                                        <div className="pt-2 text-left">
                                            <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-1.5">
                                                <Send className="w-4 h-4 text-[#800020]" />
                                                Compose Email to Applicant
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">To</label>
                                                    <input
                                                        type="email"
                                                        disabled
                                                        value={editedEmail}
                                                        className="w-full p-3 border border-gray-150 rounded-xl text-xs bg-gray-50 text-gray-500 font-semibold cursor-not-allowed"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Subject</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Schedule for Screening Call"
                                                        value={emailSubject}
                                                        onChange={(e) => setEmailSubject(e.target.value)}
                                                        className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020] transition-all bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Message Body</label>
                                                    <textarea
                                                        placeholder="Write your email message here..."
                                                        value={emailBody}
                                                        onChange={(e) => setEmailBody(e.target.value)}
                                                        className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020] transition-all bg-white resize-none"
                                                        rows={4.5}
                                                    />
                                                </div>
                                                <div className="flex justify-end pt-2">
                                                    <button
                                                        onClick={handleSendEmail}
                                                        className="px-5 py-2.5 bg-[#800020] text-white rounded-xl hover:bg-[#600018] transition-colors text-xs font-bold  cursor-pointer flex items-center gap-1.5"
                                                    >
                                                        <Send className="w-3.5 h-3.5" />
                                                        Send Email
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* WORKFLOW MODALS */}

            {/* Hire Confirmation Modal */}
            {isHireModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6  border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 ">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-center text-gray-950 mb-1">Confirm Hiring Offer</h3>
                        <p className="text-xs text-gray-500 text-center mb-6">Set job offer details for {editedName}</p>

                        <div className="space-y-4 mb-6 text-left">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Annual Salary (Gross)</label>
                                <input
                                    type="text"
                                    value={hireSalary}
                                    onChange={(e) => setHireSalary(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Proposed Start Date</label>
                                <input
                                    type="date"
                                    value={hireDate}
                                    onChange={(e) => setHireDate(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]"
                                />
                            </div>
                            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200/80 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={sendWelcomeEmail}
                                    onChange={(e) => setSendWelcomeEmail(e.target.checked)}
                                    className="w-4 h-4 text-[#800020] rounded border-gray-300 focus:ring-[#800020]/20"
                                />
                                <span className="text-xs text-gray-700 font-semibold">Send automated onboarding welcome pack</span>
                            </label>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setIsHireModalOpen(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-255 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 text-xs cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setApplicantStatus('Hired');
                                    setIsHireModalOpen(false);
                                    toast.success(`Successfully hired ${editedName}! Welcome onboarding pack sent.`);
                                }}
                                className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-750 transition-colors cursor-pointer  text-xs"
                            >
                                Confirm Hire
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Confirmation Modal */}
            {isRejectModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6  border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-150 ">
                            <XCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-center text-gray-950 mb-1">Reject Applicant</h3>
                        <p className="text-xs text-gray-500 text-center mb-6">Notify {editedName} about application status</p>

                        <div className="space-y-4 mb-6 text-left">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Reason for Rejection</label>
                                <select
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#800020]/20"
                                >
                                    <option value="Position Filled">Position Filled</option>
                                    <option value="Experience Mismatch">Experience Mismatch</option>
                                    <option value="Salary Expectations">Salary Expectations</option>
                                    <option value="Culture Fit">Culture Fit</option>
                                    <option value="Other">Other Reason</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Internal Feedback Note</label>
                                <textarea
                                    value={rejectNote}
                                    onChange={(e) => setRejectNote(e.target.value)}
                                    rows={3}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]/20 resize-none"
                                />
                            </div>
                            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200/80 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={sendRejectEmail}
                                    onChange={(e) => setSendRejectEmail(e.target.checked)}
                                    className="w-4 h-4 text-[#800020] rounded border-gray-300 focus:ring-[#800020]/20"
                                />
                                <span className="text-xs text-gray-700 font-semibold">Send automated polite rejection email</span>
                            </label>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setIsRejectModalOpen(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-255 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 text-xs cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setApplicantStatus('Rejected');
                                    setIsRejectModalOpen(false);
                                    toast.error(`Applicant ${editedName} has been rejected.`);
                                }}
                                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold transition-colors cursor-pointer  text-xs"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* More Options Menu Dialog */}
            {isMoreOptionsModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full p-6  border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <div className="text-left">
                                <h3 className="text-base font-bold text-gray-950 mb-0.5">Workflow Operations</h3>
                                <p className="text-xs text-gray-500">Perform administrative actions for {editedName}</p>
                            </div>
                            <button 
                                onClick={() => setIsMoreOptionsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <button
                                onClick={() => {
                                    setIsMoreOptionsModalOpen(false);
                                    setIsEditModalOpen(true);
                                }}
                                className="p-4 border border-gray-200 rounded-2xl hover:border-[#800020] hover:bg-rose-50/10 text-left transition-all flex items-start gap-3 bg-white cursor-pointer group"
                            >
                                <div className="p-2 bg-gray-100 group-hover:bg-[#800020] group-hover:text-white rounded-xl text-gray-500 transition-colors flex-shrink-0">
                                    <Edit className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs text-gray-900 group-hover:text-[#800020] mb-0.5">Edit Info</h4>
                                    <p className="text-[10px] text-gray-400 leading-tight">Update email, phone, and role details</p>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    setIsMoreOptionsModalOpen(false);
                                    setIsStageModalOpen(true);
                                }}
                                className="p-4 border border-gray-200 rounded-2xl hover:border-[#800020] hover:bg-rose-50/10 text-left transition-all flex items-start gap-3 bg-white cursor-pointer group"
                            >
                                <div className="p-2 bg-gray-100 group-hover:bg-[#800020] group-hover:text-white rounded-xl text-gray-500 transition-colors flex-shrink-0">
                                    <Send className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs text-gray-900 group-hover:text-[#800020] mb-0.5">Change Stage</h4>
                                    <p className="text-[10px] text-gray-400 leading-tight">Manually advance applicant workflow</p>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    setIsMoreOptionsModalOpen(false);
                                    handleScheduleInterview();
                                }}
                                className="p-4 border border-gray-200 rounded-2xl hover:border-[#800020] hover:bg-rose-50/10 text-left transition-all flex items-start gap-3 bg-white cursor-pointer group"
                            >
                                <div className="p-2 bg-gray-100 group-hover:bg-[#800020] group-hover:text-white rounded-xl text-gray-500 transition-colors flex-shrink-0">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs text-gray-900 group-hover:text-[#800020] mb-0.5">Schedule Vetting</h4>
                                    <p className="text-[10px] text-gray-400 leading-tight">Book phone or technical video call</p>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    setIsMoreOptionsModalOpen(false);
                                    toast.success("Background reference check requested successfully.");
                                }}
                                className="p-4 border border-gray-200 rounded-2xl hover:border-[#800020] hover:bg-rose-50/10 text-left transition-all flex items-start gap-3 bg-white cursor-pointer group"
                            >
                                <div className="p-2 bg-gray-100 group-hover:bg-[#800020] group-hover:text-white rounded-xl text-gray-500 transition-colors flex-shrink-0">
                                    <Award className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs text-gray-900 group-hover:text-[#800020] mb-0.5">Reference Checks</h4>
                                    <p className="text-[10px] text-gray-400 leading-tight">Request verification of career history</p>
                                </div>
                            </button>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setIsMoreOptionsModalOpen(false)}
                                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-650 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                            >
                                Close Operations
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Details Form Dialog */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6  border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-base font-bold text-gray-950">Edit Details</h3>
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-6 text-left">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Phone Number</label>
                                <input
                                    type="tel"
                                    value={editedPhone}
                                    onChange={(e) => setEditedPhone(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Role / Title</label>
                                <input
                                    type="text"
                                    value={editedRole}
                                    onChange={(e) => setEditedRole(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-255 text-gray-650 rounded-xl font-semibold hover:bg-gray-50 text-xs cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    toast.success("Applicant details updated successfully!");
                                }}
                                className="flex-1 px-4 py-2.5 bg-[#800020] hover:bg-[#600018] text-white rounded-xl font-semibold transition-colors cursor-pointer  text-xs"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Workflow Stage Dialog */}
            {isStageModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6  border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-bold text-gray-950">Update Pipeline Stage</h3>
                            <button 
                                onClick={() => setIsStageModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-6 text-left">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Select Target Stage</label>
                                <select
                                    value={selectedStage}
                                    onChange={(e) => setSelectedStage(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#800020]/20"
                                >
                                    <option value="Filter">Filter</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Phone Screen">Phone Screen</option>
                                    <option value="Technical Round">Technical Round</option>
                                    <option value="Panel Interview">Panel Interview</option>
                                    <option value="Executive Round">Executive Round</option>
                                    <option value="Offering">Offering</option>
                                    <option value="Hired">Hired</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setIsStageModalOpen(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-255 text-gray-650 rounded-xl font-semibold hover:bg-gray-50 text-xs cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setApplicantStatus(selectedStage);
                                    setIsStageModalOpen(false);
                                    toast.success(`Workflow stage updated to: ${selectedStage}`);
                                }}
                                className="flex-1 px-4 py-2.5 bg-[#800020] hover:bg-[#600018] text-white rounded-xl font-semibold transition-colors cursor-pointer  text-xs"
                            >
                                Update Stage
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



