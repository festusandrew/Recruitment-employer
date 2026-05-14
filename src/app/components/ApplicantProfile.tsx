import {
    ArrowLeft, Mail, Phone, CheckCircle, XCircle, MoreHorizontal,
    Download, Upload, Plus, MessageSquare, Calendar, Star, FileText,
    Send, Trash2, Edit, Eye, Clock, User, Building, Award, AlertCircle
} from 'lucide-react';
import { useState } from 'react';

interface ApplicantProfileProps {
    onBack: () => void;
    applicant?: any;
}

const hiringStages = [
    { id: 1, name: 'Filter Candidate', completed: true },
    { id: 2, name: 'Shortlisted', completed: true },
    { id: 3, name: 'Phone Screen', completed: false },
    { id: 4, name: 'In-depth Interview', completed: false },
    { id: 5, name: 'Interview Attended', completed: false },
    { id: 6, name: 'Offering', completed: false },
    { id: 7, name: 'Declined Offer', completed: false },
    { id: 8, name: 'Compliance / Mandate', completed: false },
    { id: 9, name: 'Commenced Employ...', completed: false }
];

const tabs = [
    'Latest CV', 'Activity', 'Questions', 'Interview Score',
    'Forms & Docs', 'Contracts', 'Comments', 'Emails'
];

export function ApplicantProfile({ onBack, applicant }: ApplicantProfileProps) {
    const [activeTab, setActiveTab] = useState('Latest CV');
    const [notes, setNotes] = useState('');
    const [insights, setInsights] = useState('');
    const [comment, setComment] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [showCoverNote, setShowCoverNote] = useState(false);

    // Modal states
    const [candidateStatus, setCandidateStatus] = useState(applicant?.status || 'Shortlisted');
    const [isHireModalOpen, setIsHireModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isMoreOptionsModalOpen, setIsMoreOptionsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isStageModalOpen, setIsStageModalOpen] = useState(false);

    // Editable candidate info
    const [editedName, setEditedName] = useState(applicant?.name || 'Rajnikant Khristi');
    const [editedEmail, setEditedEmail] = useState(applicant?.email || 'khristirajnikant@gmail.com');
    const [editedPhone, setEditedPhone] = useState(applicant?.phone || '+353-353996363599');
    const [editedRole, setEditedRole] = useState(applicant?.role || 'Senior Software Engineer');

    // Form inputs for modals
    const [hireSalary, setHireSalary] = useState('€85,000');
    const [hireDate, setHireDate] = useState('2026-06-01');
    const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);

    const [rejectReason, setRejectReason] = useState('Position Filled');
    const [rejectNote, setRejectNote] = useState('Thank you for your time and interest in our organization.');
    const [sendRejectEmail, setSendRejectEmail] = useState(true);

    const [selectedStage, setSelectedStage] = useState('In-depth Interview');

    const candidateName = editedName;
    const candidateEmail = editedEmail;
    const candidatePhone = editedPhone;
    const candidateInitials = editedName.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    const appliedDate = applicant?.applied || '3 months ago';

    const handleDownloadCV = () => {
        alert('Downloading CV...');
    };

    const handleUploadCV = () => {
        alert('Upload CV functionality - file picker would open here');
    };

    const handleSaveNotes = () => {
        alert('Notes saved successfully!');
    };

    const handleScheduleInterview = () => {
        alert('Schedule interview modal would open here');
    };

    const handlePostComment = () => {
        if (comment.trim()) {
            alert(`Comment posted: ${comment}`);
            setComment('');
        }
    };

    const handleSendEmail = () => {
        if (emailSubject.trim() && emailBody.trim()) {
            alert(`Email sent to ${editedName}`);
            setEmailSubject('');
            setEmailBody('');
        } else {
            alert('Please fill in both subject and message');
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 relative">
            {/* Left Panel - Candidate Info */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Applicants
                    </button>

                    {/* Candidate Header */}
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl flex-shrink-0 font-semibold shadow-inner">
                            {candidateInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-xl font-bold truncate text-gray-900">{editedName}</h2>
                                <button className="text-[#800020] hover:text-[#600018] transition-colors flex-shrink-0 cursor-pointer">
                                    <Mail className="w-4 h-4" />
                                </button>
                                <button className="text-green-600 hover:text-green-700 transition-colors flex-shrink-0 cursor-pointer">
                                    <MessageSquare className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{editedRole}</p>
                            <p className="text-xs text-gray-400 mt-1">Applied {appliedDate} from Irish jobs</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
                                First time applicant
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => setIsHireModalOpen(true)}
                            className="flex-1 px-4 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors flex items-center justify-center gap-2 font-medium shadow-sm cursor-pointer"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Hire
                        </button>
                        <button
                            onClick={() => setIsRejectModalOpen(true)}
                            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm cursor-pointer border border-gray-200"
                        >
                            <XCircle className="w-4 h-4" />
                            Reject
                        </button>
                    </div>

                    <div>
                        <button
                            onClick={() => setIsMoreOptionsModalOpen(true)}
                            className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm cursor-pointer bg-white"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                            More options
                        </button>
                    </div>
                </div>

                {/* Scores Section */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-center mb-4">
                        <div className="relative w-24 h-24">
                            <svg className="w-24 h-24 transform -rotate-90">
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="#e5e7eb"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="#800020"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${(72 / 100) * 251.2} 251.2`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl text-[#800020]">72</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">54/100 - CV Score</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">91/100 - Great Questions Score</span>
                        </div>
                        <div className="flex justify-between">
                            <span>72/100 - TOTAL SCORE</span>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="p-6 border-b border-gray-200">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <a href={`mailto:${editedEmail}`} className="text-gray-700 hover:text-[#800020] transition-colors">
                                {editedEmail}
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <a href={`tel:${editedPhone}`} className="text-gray-700 hover:text-[#800020] transition-colors">
                                {editedPhone}
                            </a>
                        </div>
                    </div>

                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Select tags or type to add..."
                            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                        />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-3 py-1 bg-[#800020] text-white rounded-full text-xs font-medium shadow-sm ${
                            candidateStatus === 'Hired' ? '!bg-emerald-100 !text-emerald-800 border border-emerald-300' :
                            candidateStatus === 'Rejected' ? '!bg-red-100 !text-red-800 border border-red-300' :
                            'bg-[#800020] text-white'
                        }`}>
                            <Star className="w-3 h-3 mr-1" />
                            {candidateStatus}
                        </span>
                    </div>
                </div>

                {/* Notes Section */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm">Notes</h3>
                        <button
                            onClick={handleSaveNotes}
                            className="text-[#800020] hover:text-[#600018] transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add notes about this candidate..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#800020]"
                        rows={3}
                    />
                    {notes && (
                        <button
                            onClick={handleSaveNotes}
                            className="mt-2 w-full px-3 py-1.5 bg-[#800020] text-white rounded-lg text-sm hover:bg-[#600018] transition-colors"
                        >
                            Save Notes
                        </button>
                    )}
                </div>

                {/* A.I Insights Section */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#800020]" />
                            A.I Insights
                        </h3>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-gray-700">
                        <p className="mb-2">• Strong communication skills based on application responses</p>
                        <p className="mb-2">• High cultural fit score (87%)</p>
                        <p>• Recommended for phone screen interview</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Hiring Flow */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm">Hiring flow</h3>
                        <button className="text-sm text-[#800020] hover:text-[#600018] transition-colors">
                            Update Stage
                        </button>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {hiringStages.map((stage, index) => (
                            <div key={stage.id} className="flex items-center gap-2 flex-shrink-0">
                                <div className="flex flex-col items-center">
                                    <button
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${stage.completed
                                                ? 'bg-[#800020] text-white'
                                                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                            }`}
                                    >
                                        {stage.completed ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <span className="text-xs">{index + 1}</span>
                                        )}
                                    </button>
                                    <span className="text-xs mt-1 text-gray-600 max-w-[100px] text-center">
                                        {stage.name}
                                    </span>
                                </div>
                                {index < hiringStages.length - 1 && (
                                    <div className={`w-8 h-0.5 ${stage.completed ? 'bg-[#800020]' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabs and Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Tab Navigation */}
                    <div className="bg-white border-b border-gray-200 px-6 sticky top-0 z-10">
                        <div className="flex gap-6 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap text-sm ${activeTab === tab
                                            ? 'border-[#800020] text-[#800020]'
                                            : 'border-transparent text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {tab}
                                    {(tab === 'Comments' || tab === 'Emails') && (
                                        <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs">
                                            {tab === 'Comments' ? '3' : '5'}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'Latest CV' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                {/* CV Actions */}
                                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowCoverNote(false)}
                                            className={`px-4 py-2 rounded-lg transition-colors text-sm ${!showCoverNote
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            CV
                                        </button>
                                        <button
                                            onClick={() => setShowCoverNote(true)}
                                            className={`px-4 py-2 rounded-lg transition-colors text-sm ${showCoverNote
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            Cover note
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleUploadCV}
                                            className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                                        >
                                            <Upload className="w-4 h-4" />
                                            Upload new CV
                                        </button>
                                        <button
                                            onClick={handleDownloadCV}
                                            className="px-3 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors text-sm flex items-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download CV
                                        </button>
                                    </div>
                                </div>

                                {/* CV Content */}
                                <div className="p-8 max-w-4xl mx-auto">
                                    {!showCoverNote ? (
                                        <>
                                            <div className="text-center mb-8">
                                                <h1 className="text-3xl mb-2 italic">CURRICULUM VITAE</h1>
                                                <h2 className="text-2xl">{candidateName.toUpperCase()}</h2>
                                            </div>

                                            {/* Correspondence Address */}
                                            <div className="mb-6">
                                                <h3 className="text-lg mb-2 italic underline">CORRESPONDENCE ADDRESS</h3>
                                                <p className="text-gray-700">
                                                    20 HILLBROOK WOODS,<br />
                                                    BLANCHARDSTOWN, DUBLIN 15,<br />
                                                    D15 V9KT IRELAND.<br />
                                                    E-mail: {candidateEmail}<br />
                                                    Contact no : {candidatePhone}
                                                </p>
                                            </div>

                                            {/* Educational Qualifications */}
                                            <div className="mb-6">
                                                <h3 className="text-lg mb-2 italic underline">EDUCATIONAL QUALIFICATION:-</h3>
                                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                    <li>Senior Secondary from GSEB.</li>
                                                    <li>Bachelor's Degree in Computer Science (2018)</li>
                                                </ul>
                                            </div>

                                            {/* Language Known */}
                                            <div className="mb-6">
                                                <h3 className="text-lg mb-2 italic underline">LANGUAGE KNOWN</h3>
                                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                    <li>English, Hindi, Hebrew & Portuguese</li>
                                                </ul>
                                            </div>

                                            {/* Key Strengths */}
                                            <div className="mb-6">
                                                <h3 className="text-lg mb-2 italic underline">KEY STRENGTHS:-</h3>
                                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                    <li>Hardworking & Positive Attitude</li>
                                                    <li>Excellent Problem Solving Skills</li>
                                                    <li>Team Player with Strong Communication</li>
                                                </ul>
                                            </div>

                                            {/* Hobbies */}
                                            <div className="mb-6">
                                                <h3 className="text-lg mb-2 italic underline">HOBBIES:-</h3>
                                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                    <li>Reading, Music & Travelling</li>
                                                </ul>
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                            <h3 className="text-xl mb-4">Cover Letter</h3>
                                            <div className="text-gray-700 space-y-4">
                                                <p>Dear Hiring Manager,</p>
                                                <p>
                                                    I am writing to express my strong interest in the position advertised on Irish Jobs.
                                                    With my background in computer science and proven track record in delivering quality results,
                                                    I believe I would be an excellent fit for your team.
                                                </p>
                                                <p>
                                                    My experience has equipped me with strong problem-solving skills and the ability to work
                                                    effectively both independently and as part of a team. I am particularly drawn to this
                                                    opportunity because it aligns perfectly with my career goals and values.
                                                </p>
                                                <p>
                                                    I am excited about the possibility of contributing to your organization and would welcome
                                                    the opportunity to discuss how my skills and experience can benefit your team.
                                                </p>
                                                <p>Thank you for considering my application.</p>
                                                <p>Sincerely,<br />{candidateName}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Activity' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="space-y-4">
                                    <div className="flex gap-4 pb-4 border-b border-gray-200">
                                        <div className="w-8 h-8 rounded-full bg-[#800020] flex items-center justify-center text-white text-xs flex-shrink-0">
                                            {candidateInitials}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm"><span className="font-medium">{candidateName}</span> was shortlisted</p>
                                            <p className="text-xs text-gray-500">{appliedDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pb-4 border-b border-gray-200">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                                            AI
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm"><span className="font-medium">System</span> automatically matched candidate</p>
                                            <p className="text-xs text-gray-500">{appliedDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm"><span className="font-medium">{candidateName}</span> applied for this position</p>
                                            <p className="text-xs text-gray-500">{appliedDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Questions' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="mb-6">
                                    <h3 className="mb-4">Screening Questions</h3>

                                    <div className="space-y-6">
                                        <div className="border-b border-gray-200 pb-4">
                                            <p className="text-sm text-gray-600 mb-2">1. Why are you interested in this position?</p>
                                            <p className="text-sm text-gray-900">
                                                I am passionate about this field and believe my skills align perfectly with the requirements.
                                                I'm excited about the opportunity to contribute to your team's success.
                                            </p>
                                        </div>

                                        <div className="border-b border-gray-200 pb-4">
                                            <p className="text-sm text-gray-600 mb-2">2. What is your expected salary range?</p>
                                            <p className="text-sm text-gray-900">
                                                €45,000 - €55,000 per annum
                                            </p>
                                        </div>

                                        <div className="pb-4">
                                            <p className="text-sm text-gray-600 mb-2">3. When can you start?</p>
                                            <p className="text-sm text-gray-900">
                                                I am available to start immediately with a 2-week notice period at my current position.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Interview Score' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="text-center py-8">
                                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 mb-4">No interviews scheduled yet</p>
                                    <button
                                        onClick={handleScheduleInterview}
                                        className="px-6 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors"
                                    >
                                        Schedule Interview
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Forms & Docs' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="mb-6">
                                    <h3 className="mb-4">Documents & Forms</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-gray-200 rounded-lg p-4 hover:border-[#800020] transition-colors cursor-pointer">
                                            <div className="flex items-start gap-3">
                                                <FileText className="w-8 h-8 text-[#800020]" />
                                                <div className="flex-1">
                                                    <h4 className="text-sm mb-1">Application Form</h4>
                                                    <p className="text-xs text-gray-500">Submitted {appliedDate}</p>
                                                </div>
                                                <button className="text-[#800020] hover:text-[#600018]">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border border-dashed border-gray-300 rounded-lg p-4 hover:border-[#800020] transition-colors cursor-pointer">
                                            <div className="text-center">
                                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-600">Upload Document</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Contracts' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="text-center py-8">
                                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 mb-4">No contracts generated yet</p>
                                    <button className="px-6 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors">
                                        Generate Contract
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Comments' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="space-y-4 mb-6">
                                    <div className="flex gap-4 pb-4 border-b border-gray-200">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                                            JD
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-sm font-medium">John Doe</p>
                                                <p className="text-xs text-gray-500">2 days ago</p>
                                            </div>
                                            <p className="text-sm text-gray-700">Great candidate! Strong communication skills and impressive background.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pb-4 border-b border-gray-200">
                                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                                            SM
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-sm font-medium">Sarah Miller</p>
                                                <p className="text-xs text-gray-500">5 days ago</p>
                                            </div>
                                            <p className="text-sm text-gray-700">Responded well to initial screening questions. Recommend moving forward.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pb-4 border-b border-gray-200">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                                            TP
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-sm font-medium">Tom Peterson</p>
                                                <p className="text-xs text-gray-500">1 week ago</p>
                                            </div>
                                            <p className="text-sm text-gray-700">CV looks solid. Experience matches our requirements.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h4 className="text-sm mb-3">Add Comment</h4>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs flex-shrink-0">
                                            YO
                                        </div>
                                        <div className="flex-1">
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Add a comment..."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                                rows={3}
                                            />
                                            <div className="mt-3 flex justify-end">
                                                <button
                                                    onClick={handlePostComment}
                                                    className="px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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

                        {activeTab === 'Emails' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="space-y-4 mb-6">
                                    <div className="pb-4 border-b border-gray-200">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <h4 className="font-medium">Application Confirmation</h4>
                                            </div>
                                            <span className="text-xs text-gray-500">{appliedDate}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">
                                            <strong>Subject:</strong> Thank you for your application
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Dear {candidateName}, thank you for your application. We will review it and get back to you soon.
                                        </p>
                                    </div>

                                    <div className="pb-4 border-b border-gray-200">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <h4 className="font-medium">Shortlist Notification</h4>
                                            </div>
                                            <span className="text-xs text-gray-500">2 weeks ago</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">
                                            <strong>Subject:</strong> Congratulations - You've been shortlisted
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            We're pleased to inform you that you've been shortlisted for the next stage of our hiring process.
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h4 className="text-sm mb-4 flex items-center gap-2">
                                        <Send className="w-4 h-4 text-[#800020]" />
                                        Compose Email
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">To</label>
                                            <input
                                                type="text"
                                                value={candidateEmail}
                                                disabled
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">Subject</label>
                                            <input
                                                type="text"
                                                value={emailSubject}
                                                onChange={(e) => setEmailSubject(e.target.value)}
                                                placeholder="Email subject..."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">Message</label>
                                            <textarea
                                                value={emailBody}
                                                onChange={(e) => setEmailBody(e.target.value)}
                                                placeholder="Type your message..."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                                rows={6}
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    setEmailSubject('');
                                                    setEmailBody('');
                                                }}
                                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSendEmail}
                                                className="px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                disabled={!emailSubject.trim() || !emailBody.trim()}
                                            >
                                                <Send className="w-4 h-4" />
                                                Send Email
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODALS */}

            {/* Hire Modal */}
            {isHireModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-900 mb-1">Hire Candidate</h3>
                        <p className="text-sm text-gray-500 text-center mb-6">Confirm offer details and initiate onboarding for {editedName}</p>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary Offer</label>
                                <input
                                    type="text"
                                    value={hireSalary}
                                    onChange={(e) => setHireSalary(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                    placeholder="e.g. €85,000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Start Date</label>
                                <input
                                    type="date"
                                    value={hireDate}
                                    onChange={(e) => setHireDate(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                />
                            </div>
                            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200/80 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={sendWelcomeEmail}
                                    onChange={(e) => setSendWelcomeEmail(e.target.checked)}
                                    className="w-4 h-4 text-[#800020] rounded"
                                />
                                <span className="text-sm text-gray-700 font-medium">Send automated welcome & onboarding email</span>
                            </label>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsHireModalOpen(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setCandidateStatus('Hired');
                                    setIsHireModalOpen(false);
                                    alert(`Successfully hired ${editedName}! Offer letter and welcome pack sent.`);
                                }}
                                className="flex-1 px-4 py-2.5 bg-[#800020] text-white rounded-lg font-medium hover:bg-[#600018] transition-colors cursor-pointer shadow-sm text-sm"
                            >
                                Confirm Hire
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {isRejectModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <XCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-900 mb-1">Reject Candidate</h3>
                        <p className="text-sm text-gray-500 text-center mb-6">Select a reason and notify {editedName}</p>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Rejection</label>
                                <select
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                >
                                    <option value="Position Filled">Position Filled</option>
                                    <option value="Experience Mismatch">Experience Mismatch</option>
                                    <option value="Salary Expectations">Salary Expectations</option>
                                    <option value="Culture Fit">Culture Fit</option>
                                    <option value="Other">Other Reason</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Internal Note / Feedback</label>
                                <textarea
                                    value={rejectNote}
                                    onChange={(e) => setRejectNote(e.target.value)}
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] resize-none"
                                />
                            </div>
                            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200/80 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={sendRejectEmail}
                                    onChange={(e) => setSendRejectEmail(e.target.checked)}
                                    className="w-4 h-4 text-[#800020] rounded"
                                />
                                <span className="text-sm text-gray-700 font-medium">Send polite automated rejection email</span>
                            </label>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsRejectModalOpen(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setCandidateStatus('Rejected');
                                    setIsRejectModalOpen(false);
                                    alert(`Candidate ${editedName} has been rejected.`);
                                }}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer shadow-sm text-sm"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* More Options Modal */}
            {isMoreOptionsModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">More Options & Actions</h3>
                                <p className="text-sm text-gray-500">Perform administrative workflow actions for {editedName}</p>
                            </div>
                            <button 
                                onClick={() => setIsMoreOptionsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <button
                                onClick={() => {
                                    setIsMoreOptionsModalOpen(false);
                                    setIsEditModalOpen(true);
                                }}
                                className="p-4 border border-gray-200 rounded-xl hover:border-[#800020] hover:bg-rose-50/20 text-left transition-all flex items-start gap-4 cursor-pointer group bg-white"
                            >
                                <div className="p-2.5 bg-gray-100 group-hover:bg-[#800020] group-hover:text-white rounded-lg text-gray-600 transition-colors flex-shrink-0">
                                    <Edit className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-[#800020] mb-0.5 text-sm">Edit Details</h4>
                                    <p className="text-xs text-gray-500">Update contact info, role, and details</p>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    setIsMoreOptionsModalOpen(false);
                                    setIsStageModalOpen(true);
                                }}
                                className="p-4 border border-gray-200 rounded-xl hover:border-[#800020] hover:bg-rose-50/20 text-left transition-all flex items-start gap-4 cursor-pointer group bg-white"
                            >
                                <div className="p-2.5 bg-gray-100 group-hover:bg-[#800020] group-hover:text-white rounded-lg text-gray-600 transition-colors flex-shrink-0">
                                    <Send className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-[#800020] mb-0.5 text-sm">Update Stage</h4>
                                    <p className="text-xs text-gray-500">Move candidate across hiring steps</p>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    setIsMoreOptionsModalOpen(false);
                                    alert("Interview scheduler dialog opened successfully.");
                                }}
                                className="p-4 border border-gray-200 rounded-xl hover:border-[#800020] hover:bg-rose-50/20 text-left transition-all flex items-start gap-4 cursor-pointer group bg-white"
                            >
                                <div className="p-2.5 bg-gray-100 group-hover:bg-[#800020] group-hover:text-white rounded-lg text-gray-600 transition-colors flex-shrink-0">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-[#800020] mb-0.5 text-sm">Schedule Interview</h4>
                                    <p className="text-xs text-gray-500">Book phone or in-person interview</p>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    setIsMoreOptionsModalOpen(false);
                                    alert("Background check requested successfully.");
                                }}
                                className="p-4 border border-gray-200 rounded-xl hover:border-[#800020] hover:bg-rose-50/20 text-left transition-all flex items-start gap-4 cursor-pointer group bg-white"
                            >
                                <div className="p-2.5 bg-gray-100 group-hover:bg-[#800020] group-hover:text-white rounded-lg text-gray-600 transition-colors flex-shrink-0">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-[#800020] mb-0.5 text-sm">Background Check</h4>
                                    <p className="text-xs text-gray-500">Initiate compliance and verification</p>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    setIsMoreOptionsModalOpen(false);
                                    alert("Candidate profile and notes exported as PDF successfully.");
                                }}
                                className="p-4 border border-gray-200 rounded-xl hover:border-[#800020] hover:bg-rose-50/20 text-left transition-all flex items-start gap-4 cursor-pointer group bg-white"
                            >
                                <div className="p-2.5 bg-gray-100 group-hover:bg-[#800020] group-hover:text-white rounded-lg text-gray-600 transition-colors flex-shrink-0">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-[#800020] mb-0.5 text-sm">Export Profile</h4>
                                    <p className="text-xs text-gray-500">Download CV, notes, and activity log</p>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    setIsMoreOptionsModalOpen(false);
                                    if (confirm(`Are you sure you want to archive/delete ${editedName}?`)) {
                                        alert("Candidate successfully archived.");
                                    }
                                }}
                                className="p-4 border border-gray-200 rounded-xl hover:border-red-600 hover:bg-red-50/20 text-left transition-all flex items-start gap-4 cursor-pointer group bg-white"
                            >
                                <div className="p-2.5 bg-gray-100 group-hover:bg-red-600 group-hover:text-white rounded-lg text-gray-600 transition-colors flex-shrink-0">
                                    <Trash2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-red-600 mb-0.5 text-sm">Delete / Archive</h4>
                                    <p className="text-xs text-gray-500">Remove candidate from active pipeline</p>
                                </div>
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsMoreOptionsModalOpen(false)}
                                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors cursor-pointer"
                            >
                                Close Options
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Candidate Details Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-xl font-bold text-gray-900">Edit Candidate Details</h3>
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    value={editedPhone}
                                    onChange={(e) => setEditedPhone(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Applied Role</label>
                                <input
                                    type="text"
                                    value={editedRole}
                                    onChange={(e) => setEditedRole(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    alert("Candidate details updated successfully.");
                                }}
                                className="flex-1 px-4 py-2.5 bg-[#800020] text-white rounded-lg font-medium hover:bg-[#600018] transition-colors cursor-pointer shadow-sm text-sm"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Pipeline Stage Modal */}
            {isStageModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-xl font-bold text-gray-900">Update Pipeline Stage</h3>
                            <button 
                                onClick={() => setIsStageModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Target Workflow Stage</label>
                                <select
                                    value={selectedStage}
                                    onChange={(e) => setSelectedStage(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                >
                                    <option value="Filter Candidate">Filter Candidate</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Phone Screen">Phone Screen</option>
                                    <option value="In-depth Interview">In-depth Interview</option>
                                    <option value="Interview Attended">Interview Attended</option>
                                    <option value="Offering">Offering</option>
                                    <option value="Hired">Hired</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsStageModalOpen(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setCandidateStatus(selectedStage);
                                    setIsStageModalOpen(false);
                                    alert(`Candidate stage updated to ${selectedStage}.`);
                                }}
                                className="flex-1 px-4 py-2.5 bg-[#800020] text-white rounded-lg font-medium hover:bg-[#600018] transition-colors cursor-pointer shadow-sm text-sm"
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
