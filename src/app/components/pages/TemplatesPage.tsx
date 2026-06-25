import { useState, useRef } from "react";
import {
    Mail, Plus, Edit, Trash2, Eye, Search, Filter, Copy,
    ChevronDown, Save, X, FileText, AlertTriangle, Sparkles, Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface EmailTemplate {
    id: number;
    name: string;
    subject: string;
    body: string;
    category: string;
    active: boolean;
    usageCount?: number;
}

export function TemplatesPage() {
    const [templates, setTemplates] = useState<EmailTemplate[]>([
        {
            id: 1,
            name: "Interview Invitation",
            subject: "Interview Invitation - {{job_title}}",
            body: "Dear {{applicant_name}},\n\nWe are pleased to invite you for an interview for the {{job_title}} position at {{company_name}}.\n\nInterview Details:\nDate: {{interview_date}}\nTime: {{interview_time}}\nLocation: {{interview_location}}\n\nPlease confirm your availability.\n\nBest regards,\n{{hiring_manager}}",
            category: "Interview",
            active: true,
            usageCount: 45
        },
        {
            id: 2,
            name: "Application Received",
            subject: "Application Received - {{job_title}}",
            body: "Dear {{applicant_name}},\n\nThank you for applying to the {{job_title}} position at {{company_name}}. We have received your application and will review it carefully.\n\nWe will be in touch soon regarding the next steps.\n\nBest regards,\n{{company_name}} Recruitment Team",
            category: "Application",
            active: true,
            usageCount: 123
        },
        {
            id: 3,
            name: "Rejection Notice",
            subject: "Update on Your Application - {{job_title}}",
            body: "Dear {{applicant_name}},\n\nThank you for your interest in the {{job_title}} position at {{company_name}}. After careful consideration, we have decided to move forward with other applicants whose qualifications more closely match our current needs.\n\nWe appreciate the time you invested in the application process and wish you the best in your job search.\n\nBest regards,\n{{company_name}} Recruitment Team",
            category: "Rejection",
            active: true,
            usageCount: 67
        },
        {
            id: 4,
            name: "Offer Letter",
            subject: "Job Offer - {{job_title}}",
            body: "Dear {{applicant_name}},\n\nWe are delighted to offer you the position of {{job_title}} at {{company_name}}.\n\nOffer Details:\nPosition: {{job_title}}\nStart Date: {{start_date}}\nSalary: {{salary}}\nLocation: {{location}}\n\nPlease review the attached offer letter and respond by {{response_deadline}}.\n\nWe look forward to welcoming you to our team!\n\nBest regards,\n{{hiring_manager}}",
            category: "Offer",
            active: true,
            usageCount: 34
        },
        {
            id: 5,
            name: "Phone Screen Scheduled",
            subject: "Phone Screen Scheduled - {{job_title}}",
            body: "Dear {{applicant_name}},\n\nThank you for your interest in the {{job_title}} position. We would like to schedule a brief phone screen to discuss your qualifications.\n\nScheduled Time: {{phone_screen_date}} at {{phone_screen_time}}\nDuration: 30 minutes\nPhone Number: We will call you at {{applicant_phone}}\n\nPlease confirm this time works for you.\n\nBest regards,\n{{recruiter_name}}",
            category: "Interview",
            active: true,
            usageCount: 89
        },
        {
            id: 6,
            name: "Reference Check Request",
            subject: "Reference Check Request - {{candidate_name}}",
            body: "Dear {{reference_name}},\n\n{{candidate_name}} has applied for the {{job_title}} position at {{company_name}} and has listed you as a reference.\n\nWould you be available for a brief call to discuss their qualifications and work performance?\n\nPlease let us know your availability.\n\nThank you,\n{{recruiter_name}}\n{{company_name}}",
            category: "Reference",
            active: true,
            usageCount: 23
        },
    ]);

    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
    const [templateToDelete, setTemplateToDelete] = useState<EmailTemplate | null>(null);
    const [isEditingTemplate, setIsEditingTemplate] = useState(false);
    const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const categories = ["All", "Interview", "Application", "Offer", "Rejection", "Reference"];

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === "All" || template.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleEditTemplate = (template: EmailTemplate) => {
        setSelectedTemplate({ ...template });
        setIsEditingTemplate(true);
        setIsPreviewMode(false);
    };

    const handleViewTemplate = (template: EmailTemplate) => {
        setSelectedTemplate(template);
        setIsPreviewMode(true);
        setIsEditingTemplate(false);
    };

    const handleSaveTemplate = () => {
        if (selectedTemplate) {
            if (!selectedTemplate.name.trim() || !selectedTemplate.subject.trim() || !selectedTemplate.body.trim()) {
                showToast("Please fill in all required fields.");
                return;
            }
            if (isCreatingTemplate) {
                setTemplates([...templates, { ...selectedTemplate, id: Date.now() }]);
                setIsCreatingTemplate(false);
                showToast("Template created successfully.");
            } else {
                setTemplates(templates.map(t => t.id === selectedTemplate.id ? selectedTemplate : t));
                showToast("Template updated successfully.");
            }
            setIsEditingTemplate(false);
            setSelectedTemplate(null);
        }
    };

    const confirmDeleteTemplate = (id: number) => {
        setTemplates(templates.filter(t => t.id !== id));
        setTemplateToDelete(null);
        showToast("Template deleted successfully.");
    };

    const handleDuplicateTemplate = (template: EmailTemplate) => {
        const newTemplate = {
            ...template,
            id: Date.now(),
            name: `${template.name} (Copy)`,
            usageCount: 0
        };
        setTemplates([...templates, newTemplate]);
        showToast(`Duplicated "${template.name}" successfully.`);
    };

    const handleCreateNewTemplate = () => {
        setSelectedTemplate({
            id: Date.now(),
            name: "",
            subject: "",
            body: "",
            category: "Application",
            active: true,
            usageCount: 0
        });
        setIsCreatingTemplate(true);
        setIsEditingTemplate(true);
        setIsPreviewMode(false);
    };

    const insertToken = (token: string) => {
        if (!selectedTemplate || !textareaRef.current) return;
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);
        
        const newBody = before + token + after;
        setSelectedTemplate({ ...selectedTemplate, body: newBody });
        
        // Reset cursor focus
        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + token.length;
        }, 0);
    };

    const tokens = [
        { key: "{{applicant_name}}", label: "Applicant Name" },
        { key: "{{candidate_name}}", label: "Candidate Name (Pool)" },
        { key: "{{job_title}}", label: "Job Title" },
        { key: "{{company_name}}", label: "Company Name" },
        { key: "{{interview_date}}", label: "Interview Date" },
        { key: "{{interview_time}}", label: "Interview Time" },
        { key: "{{interview_location}}", label: "Interview Location" },
        { key: "{{hiring_manager}}", label: "Hiring Manager" },
        { key: "{{recruiter_name}}", label: "Recruiter Name" },
        { key: "{{start_date}}", label: "Start Date" },
        { key: "{{salary}}", label: "Salary" },
        { key: "{{location}}", label: "Location" },
        { key: "{{response_deadline}}", label: "Response Deadline" },
        { key: "{{applicant_phone}}", label: "Applicant Phone" },
    ];

    return (
        <div className="p-8 relative text-left">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl text-gray-900 mb-2 font-black tracking-tight">Email Templates</h1>
                    <p className="text-gray-500 font-medium">Create, customize, and manage beautiful email templates for candidate and applicant communication.</p>
                </div>
                {!isEditingTemplate && !isPreviewMode && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCreateNewTemplate}
                        className="flex items-center gap-2 px-5 py-3 bg-primary   text-white rounded-xl hover: transition-all font-bold text-sm cursor-pointer border border-[#800020]/20 "
                    >
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                        New Template
                    </motion.button>
                )}
            </div>

            {/* Actions Bar */}
            {!isEditingTemplate && !isPreviewMode && (
                <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-gray-200/60 ">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search templates by name or subject..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent  bg-white font-medium"
                            />
                        </div>

                        {/* Filter */}
                        <div className="relative">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="pl-4 pr-10 py-2.5 border border-gray-200/80 rounded-xl text-sm font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent bg-white  cursor-pointer text-gray-700 min-w-[150px]"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat} Category</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="text-xs font-bold text-gray-400 self-end md:self-auto bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        {filteredTemplates.length} {filteredTemplates.length === 1 ? "Template" : "Templates"} Found
                    </div>
                </div>
            )}

            {/* Templates Grid */}
            <AnimatePresence mode="wait">
                {!isEditingTemplate && !isPreviewMode ? (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredTemplates.map((template, idx) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                whileHover={{ y: -4 }}
                                className="bg-white border border-gray-200/80 rounded-2xl p-6 hover:border-[#800020]/40  hover: transition-all flex flex-col justify-between"
                            >
                                <div>
                                    {/* Template Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#F5E6E8] rounded-xl flex items-center justify-center flex-shrink-0  border border-[#800020]/10">
                                                <Mail className="w-5 h-5 text-[#800020]" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-gray-900 truncate text-base mb-0.5">{template.name}</h3>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-50 text-[#800020] text-xs font-extrabold border border-[#800020]/10">
                                                    {template.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-2 h-2 rounded-full ${template.active ? 'bg-emerald-500 ring-4 ring-emerald-500/10' : 'bg-gray-300'}`} />
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                                {template.active ? 'Active' : 'Draft'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Subject Preview */}
                                    <div className="mb-4 bg-gray-50/70 p-3.5 rounded-xl border border-gray-100">
                                        <p className="text-[10px] text-gray-400 mb-1 font-extrabold uppercase tracking-wider">Subject Line</p>
                                        <p className="text-sm text-gray-800 truncate font-semibold">{template.subject}</p>
                                    </div>
                                </div>

                                <div>
                                    {/* Stats */}
                                    <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                            <FileText className="w-4 h-4" />
                                            <span>Used {template.usageCount || 0} times</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleViewTemplate(template)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors text-xs cursor-pointer border border-gray-200/60 "
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            Preview
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleEditTemplate(template)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-primary   text-white font-bold rounded-xl hover: transition-all text-xs cursor-pointer "
                                        >
                                            <Edit className="w-3.5 h-3.5" />
                                            Edit
                                        </motion.button>
                                        <button
                                            onClick={() => handleDuplicateTemplate(template)}
                                            className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-xl transition-colors cursor-pointer border border-gray-200/60 "
                                            title="Duplicate Template"
                                        >
                                            <Copy className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => setTemplateToDelete(template)}
                                            className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors cursor-pointer border border-rose-100/50 "
                                            title="Delete Template"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : isPreviewMode && selectedTemplate ? (
                    /* Preview Mode */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="bg-white border border-gray-200/80 rounded-2xl p-8 max-w-4xl mx-auto "
                    >
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                                    {selectedTemplate.name}
                                    <Sparkles className="w-5 h-5 text-[#800020] animate-pulse" />
                                </h2>
                                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-rose-50 text-[#800020] text-xs font-black mt-2 border border-[#800020]/10 uppercase tracking-wide">
                                    {selectedTemplate.category} Template
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleEditTemplate(selectedTemplate)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-primary   text-white rounded-xl transition-all font-bold text-sm  cursor-pointer"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Template
                                </motion.button>
                                <button
                                    onClick={() => {
                                        setIsPreviewMode(false);
                                        setSelectedTemplate(null);
                                    }}
                                    className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-gray-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Subject Line</label>
                                <div className="px-5 py-4 bg-gray-50 rounded-xl border border-gray-200/80">
                                    <p className="text-gray-900 font-bold text-base">{selectedTemplate.subject}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Email Body Preview</label>
                                <div className="px-6 py-6 bg-gray-50 rounded-xl border border-gray-200/80 min-h-[250px] ">
                                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm font-mono">{selectedTemplate.body}</p>
                                </div>
                            </div>

                            <div className="bg-[#F5E6E8] border border-[#800020]/10 rounded-xl p-5 mt-6 flex items-start gap-3 text-[#800020]">
                                <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <p className="text-xs leading-relaxed font-bold text-gray-700">
                                    <strong className="font-extrabold text-[#800020] block mb-1 uppercase tracking-wider">Dynamic Fields Notice</strong>
                                    All dynamic tokens formatted as <code className="font-mono bg-white/75 px-1 py-0.5 rounded border border-[#800020]/10 font-black text-xs">{"{{variable_name}}"}</code> will be auto-replaced with actual applicant records when sending messages.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : isEditingTemplate && selectedTemplate ? (
                    /* Edit/Create Mode */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="bg-white border border-gray-200/80 rounded-2xl p-8 max-w-4xl mx-auto "
                    >
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                            <h2 className="text-2xl font-black text-gray-900">
                                {isCreatingTemplate ? "Create New Email Template" : "Edit Email Template"}
                            </h2>
                            <button
                                onClick={() => {
                                    setIsEditingTemplate(false);
                                    setIsCreatingTemplate(false);
                                    setSelectedTemplate(null);
                                }}
                                className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-gray-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Template Name *</label>
                                    <input
                                        type="text"
                                        value={selectedTemplate.name}
                                        onChange={(e) => setSelectedTemplate({ ...selectedTemplate, name: e.target.value })}
                                        placeholder="e.g. Technical Assessment Request"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white  transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                                    <select
                                        value={selectedTemplate.category}
                                        onChange={(e) => setSelectedTemplate({ ...selectedTemplate, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white  transition-all text-gray-700 cursor-pointer"
                                    >
                                        {categories.filter(c => c !== "All").map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Subject *</label>
                                <input
                                    type="text"
                                    value={selectedTemplate.subject}
                                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                                    placeholder="e.g. Next Steps: Interview Invitation - {{job_title}}"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white  transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Editor Area */}
                                <div className="lg:col-span-2 space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">Email Body Content *</label>
                                    <textarea
                                        ref={textareaRef}
                                        value={selectedTemplate.body}
                                        onChange={(e) => setSelectedTemplate({ ...selectedTemplate, body: e.target.value })}
                                        placeholder="Dear {{applicant_name}},\n\nType the email message body here..."
                                        rows={14}
                                        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020] resize-none font-mono text-sm leading-relaxed bg-white  transition-all"
                                    />
                                    <div className="flex items-center gap-3 bg-gray-50/70 p-3.5 rounded-xl border border-gray-200/80 ">
                                        <input
                                            type="checkbox"
                                            id="active"
                                            checked={selectedTemplate.active}
                                            onChange={(e) => setSelectedTemplate({ ...selectedTemplate, active: e.target.checked })}
                                            className="w-5 h-5 text-[#800020] rounded border-gray-300 cursor-pointer focus:ring-[#800020] accent-[#800020]"
                                        />
                                        <label htmlFor="active" className="text-sm font-bold text-gray-700 cursor-pointer">
                                            Make this template active and available for all recruiters
                                        </label>
                                    </div>
                                </div>

                                {/* Dynamic Tokens Helper */}
                                <div className="space-y-3 bg-gray-50/80 p-5 rounded-2xl border border-gray-200/80 ">
                                    <div>
                                        <h4 className="text-sm font-black text-gray-900 flex items-center gap-1.5 mb-1">
                                            <Sparkles className="w-4 h-4 text-[#800020]" />
                                            Insert Tokens
                                        </h4>
                                        <p className="text-[11px] text-gray-500 font-bold leading-normal">
                                            Click on any token below to insert it at your cursor's current position in the editor.
                                        </p>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto no-scrollbar pr-1 pt-1">
                                        {tokens.map((token) => (
                                            <motion.button
                                                key={token.key}
                                                type="button"
                                                whileHover={{ scale: 1.02, x: 2 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => insertToken(token.key)}
                                                className="w-full flex items-center justify-between px-3.5 py-2 bg-white hover:bg-rose-50 hover:text-[#800020] rounded-xl border border-gray-200/80 text-left text-xs font-bold transition-all text-gray-700  cursor-pointer hover:border-[#800020]/30"
                                            >
                                                <code className="font-mono font-black text-[11px] text-[#800020]">{token.key}</code>
                                                <span className="text-[10px] text-gray-400 font-bold">{token.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSaveTemplate}
                                className="flex items-center gap-2 px-6 py-3 bg-primary   text-white font-bold rounded-xl transition-all  cursor-pointer text-sm"
                            >
                                <Save className="w-4 h-4" />
                                {isCreatingTemplate ? "Create Template" : "Save Template"}
                            </motion.button>
                            <button
                                onClick={() => {
                                    setIsEditingTemplate(false);
                                    setIsCreatingTemplate(false);
                                    setSelectedTemplate(null);
                                }}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 rounded-xl transition-colors cursor-pointer text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {/* Empty State */}
            {filteredTemplates.length === 0 && !isEditingTemplate && !isPreviewMode && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-white rounded-2xl border border-gray-200 p-8 "
                >
                    <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center text-[#800020] mx-auto mb-4 border border-[#800020]/10 ">
                        <Mail className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">No templates found</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto font-semibold leading-relaxed">
                        {searchQuery || filterCategory !== "All"
                            ? "We couldn't find any templates matching your search criteria. Try modifying your filters."
                            : "Get started by creating your first automated email template for applicants."}
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCreateNewTemplate}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary   text-white rounded-xl transition-all font-bold text-sm  cursor-pointer"
                    >
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                        Create Template
                    </motion.button>
                </motion.div>
            )}

            {/* Custom Template Delete Confirmation Modal */}
            <AnimatePresence>
                {templateToDelete && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white rounded-2xl max-w-md w-full p-6  border border-gray-100 text-left"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 flex-shrink-0 border border-rose-100">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-gray-900">Confirm Template Deletion</h3>
                                    <p className="text-xs text-gray-400 font-bold">This action cannot be undone</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/80 text-sm text-gray-600 mb-6 font-semibold leading-relaxed">
                                Are you sure you want to delete <span className="font-bold text-gray-900">"{templateToDelete.name}"</span>? Any automated recruitment workflows using this template will fail.
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setTemplateToDelete(null)}
                                    className="px-5 py-2.5 border border-gray-300 text-gray-500 font-bold rounded-xl hover:bg-gray-50 text-sm cursor-pointer transition-colors"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={() => confirmDeleteTemplate(templateToDelete.id)}
                                    className="px-6 py-2.5 bg-[#800020] text-white font-bold rounded-xl hover:bg-[#600018] text-sm  cursor-pointer transition-all"
                                >
                                    Delete Template
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 px-4 py-3 bg-gray-900 text-white rounded-xl  flex items-center gap-3 z-50 border border-white/10"
                    >
                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <p className="text-xs font-black">{toastMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


