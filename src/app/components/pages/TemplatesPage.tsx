import { useState } from "react";
import {
    Mail, Plus, Edit, Trash2, Eye, Search, Filter, Copy,
    ChevronDown, Save, X, FileText, AlertTriangle
} from "lucide-react";

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
            body: "Dear {{candidate_name}},\n\nWe are pleased to invite you for an interview for the {{job_title}} position at {{company_name}}.\n\nInterview Details:\nDate: {{interview_date}}\nTime: {{interview_time}}\nLocation: {{interview_location}}\n\nPlease confirm your availability.\n\nBest regards,\n{{hiring_manager}}",
            category: "Interview",
            active: true,
            usageCount: 45
        },
        {
            id: 2,
            name: "Application Received",
            subject: "Application Received - {{job_title}}",
            body: "Dear {{candidate_name}},\n\nThank you for applying to the {{job_title}} position at {{company_name}}. We have received your application and will review it carefully.\n\nWe will be in touch soon regarding the next steps.\n\nBest regards,\n{{company_name}} Recruitment Team",
            category: "Application",
            active: true,
            usageCount: 123
        },
        {
            id: 3,
            name: "Rejection Notice",
            subject: "Update on Your Application - {{job_title}}",
            body: "Dear {{candidate_name}},\n\nThank you for your interest in the {{job_title}} position at {{company_name}}. After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.\n\nWe appreciate the time you invested in the application process and wish you the best in your job search.\n\nBest regards,\n{{company_name}} Recruitment Team",
            category: "Rejection",
            active: true,
            usageCount: 67
        },
        {
            id: 4,
            name: "Offer Letter",
            subject: "Job Offer - {{job_title}}",
            body: "Dear {{candidate_name}},\n\nWe are delighted to offer you the position of {{job_title}} at {{company_name}}.\n\nOffer Details:\nPosition: {{job_title}}\nStart Date: {{start_date}}\nSalary: {{salary}}\nLocation: {{location}}\n\nPlease review the attached offer letter and respond by {{response_deadline}}.\n\nWe look forward to welcoming you to our team!\n\nBest regards,\n{{hiring_manager}}",
            category: "Offer",
            active: true,
            usageCount: 34
        },
        {
            id: 5,
            name: "Phone Screen Scheduled",
            subject: "Phone Screen Scheduled - {{job_title}}",
            body: "Dear {{candidate_name}},\n\nThank you for your interest in the {{job_title}} position. We would like to schedule a brief phone screen to discuss your qualifications.\n\nScheduled Time: {{phone_screen_date}} at {{phone_screen_time}}\nDuration: 30 minutes\nPhone Number: We will call you at {{candidate_phone}}\n\nPlease confirm this time works for you.\n\nBest regards,\n{{recruiter_name}}",
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

    const categories = ["All", "Interview", "Application", "Offer", "Rejection", "Reference"];

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === "All" || template.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleEditTemplate = (template: EmailTemplate) => {
        setSelectedTemplate(template);
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
            if (isCreatingTemplate) {
                setTemplates([...templates, { ...selectedTemplate, id: Date.now() }]);
                setIsCreatingTemplate(false);
            } else {
                setTemplates(templates.map(t => t.id === selectedTemplate.id ? selectedTemplate : t));
            }
            setIsEditingTemplate(false);
            setSelectedTemplate(null);
        }
    };

    const confirmDeleteTemplate = (id: number) => {
        setTemplates(templates.filter(t => t.id !== id));
        setTemplateToDelete(null);
    };

    const handleDuplicateTemplate = (template: EmailTemplate) => {
        const newTemplate = {
            ...template,
            id: Date.now(),
            name: `${template.name} (Copy)`,
            usageCount: 0
        };
        setTemplates([...templates, newTemplate]);
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

    return (
        <div className="p-8 relative">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl text-gray-900 mb-2 font-bold">Email Templates</h1>
                <p className="text-gray-600">Create and manage email templates for candidate communication</p>
            </div>

            {/* Actions Bar */}
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent shadow-xs bg-white"
                        />
                    </div>

                    {/* Filter */}
                    <div className="relative">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent bg-white shadow-xs"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Add Template Button */}
                <button
                    onClick={handleCreateNewTemplate}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#800020] text-white rounded-xl hover:bg-[#600018] transition-colors font-bold text-sm shadow-md cursor-pointer border border-[#800020]/20"
                >
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                    New Template
                </button>
            </div>

            {/* Templates Grid */}
            {!isEditingTemplate && !isPreviewMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTemplates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-white border border-gray-200/80 rounded-xl p-5 hover:border-[#800020]/50 shadow-xs hover:shadow-md transition-all"
                        >
                            {/* Template Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="w-10 h-10 bg-[#F5E6E8] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-[#800020]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 truncate text-base">{template.name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                                                {template.category}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Subject Preview */}
                            <div className="mb-3">
                                <p className="text-xs text-gray-500 mb-1 font-medium">Subject:</p>
                                <p className="text-sm text-gray-700 truncate font-semibold">{template.subject}</p>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-1.5">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs font-medium text-gray-600">{template.usageCount} uses</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-2 h-2 rounded-full ${template.active ? 'bg-emerald-500 ring-2 ring-emerald-100' : 'bg-gray-300'}`} />
                                    <span className="text-xs font-medium text-gray-600">{template.active ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleViewTemplate(template)}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-xs cursor-pointer"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    View
                                </button>
                                <button
                                    onClick={() => handleEditTemplate(template)}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#800020] text-white font-semibold rounded-lg hover:bg-[#600018] transition-colors text-xs cursor-pointer shadow-xs"
                                >
                                    <Edit className="w-3.5 h-3.5" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDuplicateTemplate(template)}
                                    className="px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                    title="Duplicate"
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => setTemplateToDelete(template)}
                                    className="px-3 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
                                    title="Delete"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : isPreviewMode && selectedTemplate ? (
                /* Preview Mode */
                <div className="bg-white border border-gray-200/80 rounded-2xl p-8 max-w-4xl mx-auto shadow-sm animate-in fade-in duration-150">
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold mt-2 border border-blue-100">
                                {selectedTemplate.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleEditTemplate(selectedTemplate)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#800020] text-white rounded-xl hover:bg-[#600018] transition-colors font-bold text-sm shadow-sm cursor-pointer"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Template
                            </button>
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
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Subject</label>
                            <div className="px-5 py-4 bg-gray-50 rounded-xl border border-gray-200">
                                <p className="text-gray-900 font-semibold">{selectedTemplate.subject}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Body Preview</label>
                            <div className="px-5 py-6 bg-gray-50 rounded-xl border border-gray-200 min-h-[200px]">
                                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm font-mono">{selectedTemplate.body}</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-6">
                            <p className="text-sm text-blue-900 leading-relaxed font-medium">
                                <strong className="font-bold">Dynamic Token Replacements:</strong> {`{{candidate_name}}, {{job_title}}, {{company_name}}, {{interview_date}}, {{interview_time}}, {{interview_location}}, {{hiring_manager}}, and more.`}
                            </p>
                        </div>
                    </div>
                </div>
            ) : isEditingTemplate && selectedTemplate ? (
                /* Edit Mode */
                <div className="bg-white border border-gray-200/80 rounded-2xl p-8 max-w-4xl mx-auto shadow-sm animate-in fade-in duration-150">
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {isCreatingTemplate ? "Create New Template" : "Edit Template"}
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
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Template Name *</label>
                            <input
                                type="text"
                                value={selectedTemplate.name}
                                onChange={(e) => setSelectedTemplate({ ...selectedTemplate, name: e.target.value })}
                                placeholder="e.g. Interview Invitation"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white shadow-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                            <select
                                value={selectedTemplate.category}
                                onChange={(e) => setSelectedTemplate({ ...selectedTemplate, category: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white shadow-xs"
                            >
                                {categories.filter(c => c !== "All").map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Subject *</label>
                            <input
                                type="text"
                                value={selectedTemplate.subject}
                                onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                                placeholder="e.g. Interview Invitation - {{job_title}}"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white shadow-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Body *</label>
                            <textarea
                                value={selectedTemplate.body}
                                onChange={(e) => setSelectedTemplate({ ...selectedTemplate, body: e.target.value })}
                                placeholder="Enter your email template here..."
                                rows={12}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020] resize-none font-mono text-sm leading-relaxed bg-white shadow-xs"
                            />
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <input
                                type="checkbox"
                                id="active"
                                checked={selectedTemplate.active}
                                onChange={(e) => setSelectedTemplate({ ...selectedTemplate, active: e.target.checked })}
                                className="w-5 h-5 text-[#800020] rounded border-gray-300 cursor-pointer focus:ring-[#800020]"
                            />
                            <label htmlFor="active" className="text-sm font-bold text-gray-800 cursor-pointer">Active Template Status</label>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                            <p className="text-sm font-bold text-blue-900 mb-3">
                                Available Token Variables:
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-semibold text-blue-800 font-mono bg-white/60 p-4 rounded-lg border border-blue-100">
                                <div>{`• {{candidate_name}}`}</div>
                                <div>{`• {{job_title}}`}</div>
                                <div>{`• {{company_name}}`}</div>
                                <div>{`• {{interview_date}}`}</div>
                                <div>{`• {{interview_time}}`}</div>
                                <div>{`• {{interview_location}}`}</div>
                                <div>{`• {{hiring_manager}}`}</div>
                                <div>{`• {{recruiter_name}}`}</div>
                                <div>{`• {{start_date}}`}</div>
                                <div>{`• {{salary}}`}</div>
                                <div>{`• {{location}}`}</div>
                                <div>{`• {{response_deadline}}`}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleSaveTemplate}
                            className="flex items-center gap-2 px-6 py-3 bg-[#800020] text-white font-bold rounded-xl hover:bg-[#600018] transition-colors shadow-sm cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            {isCreatingTemplate ? "Create Template" : "Save Changes"}
                        </button>
                        <button
                            onClick={() => {
                                setIsEditingTemplate(false);
                                setIsCreatingTemplate(false);
                                setSelectedTemplate(null);
                            }}
                            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : null}

            {/* Empty State */}
            {filteredTemplates.length === 0 && !isEditingTemplate && !isPreviewMode && (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mx-auto mb-4 border border-gray-100">
                        <Mail className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No templates found</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                        {searchQuery || filterCategory !== "All"
                            ? "Try adjusting your search query or category filter."
                            : "Create your first email template to automate candidate communications."}
                    </p>
                    <button
                        onClick={handleCreateNewTemplate}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#800020] text-white rounded-xl hover:bg-[#600018] transition-colors font-bold text-sm shadow-sm cursor-pointer"
                    >
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                        Create Template
                    </button>
                </div>
            )}

            {/* Custom Template Delete Confirmation Modal */}
            {templateToDelete && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in zoom-in-95 duration-200 text-left">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 flex-shrink-0">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Confirm Template Deletion</h3>
                                <p className="text-xs text-gray-500">Remove email template permanently</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm text-gray-700 mb-6 font-medium leading-relaxed">
                            Are you sure you want to delete <span className="font-bold text-gray-900">"{templateToDelete.name}"</span>? All recruiters using this template will no longer have access to it.
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setTemplateToDelete(null)}
                                className="px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 text-sm cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => confirmDeleteTemplate(templateToDelete.id)}
                                className="px-6 py-2.5 bg-[#800020] text-white font-semibold rounded-xl hover:bg-[#600018] text-sm shadow-sm cursor-pointer"
                            >
                                Delete Template
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}