import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface DuplicateJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle?: string;
}

export function DuplicateJobModal({ isOpen, onClose, jobTitle }: DuplicateJobModalProps) {
    const [newTitle, setNewTitle] = useState(`${jobTitle} (Copy)`);
    const [duplicateOptions, setDuplicateOptions] = useState({
        description: true,
        requirements: true,
        benefits: true,
        questions: true,
        workflow: false,
    });
    const [isDuplicating, setIsDuplicating] = useState(false);

    if (!isOpen) return null;

    const handleDuplicate = () => {
        setIsDuplicating(true);
        setTimeout(() => {
            setIsDuplicating(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Copy className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-gray-900">Duplicate Job</h2>
                            <p className="text-sm text-gray-500">Create a copy of this job posting</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* New Job Title */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-700 mb-2">New Job Title</label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter new job title"
                        />
                    </div>

                    {/* What to Copy */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-3">What would you like to copy?</label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={duplicateOptions.description}
                                    onChange={(e) => setDuplicateOptions({ ...duplicateOptions, description: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Job Description</p>
                                    <p className="text-xs text-gray-500">Copy the full job description and responsibilities</p>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={duplicateOptions.requirements}
                                    onChange={(e) => setDuplicateOptions({ ...duplicateOptions, requirements: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Requirements & Qualifications</p>
                                    <p className="text-xs text-gray-500">Copy all job requirements and qualifications</p>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={duplicateOptions.benefits}
                                    onChange={(e) => setDuplicateOptions({ ...duplicateOptions, benefits: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Benefits & Perks</p>
                                    <p className="text-xs text-gray-500">Copy benefits and compensation details</p>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={duplicateOptions.questions}
                                    onChange={(e) => setDuplicateOptions({ ...duplicateOptions, questions: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Screening Questions</p>
                                    <p className="text-xs text-gray-500">Copy all screening questions for candidates</p>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={duplicateOptions.workflow}
                                    onChange={(e) => setDuplicateOptions({ ...duplicateOptions, workflow: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Interview Workflow</p>
                                    <p className="text-xs text-gray-500">Copy the interview stages and workflow settings</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-900">
                            The duplicated job will be created as a <span className="font-medium">Draft</span>. You can review and make changes before publishing.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            disabled={isDuplicating}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDuplicate}
                            disabled={isDuplicating}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-colors ${isDuplicating
                                    ? "bg-green-600 text-white"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            {isDuplicating ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    Duplicated!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    Duplicate Job
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
