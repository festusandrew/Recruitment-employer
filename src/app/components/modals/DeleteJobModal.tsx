import { X, AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    jobTitle?: string;
    applicantCount?: number;
}

export function DeleteJobModal({ isOpen, onClose, onConfirm, jobTitle, applicantCount = 0 }: DeleteJobModalProps) {
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen) return null;

    const handleDelete = () => {
        if (confirmText.toLowerCase() === "delete") {
            setIsDeleting(true);
            setTimeout(() => {
                onConfirm();
                setIsDeleting(false);
                onClose();
            }, 1500);
        }
    };

    const canDelete = confirmText.toLowerCase() === "delete";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-red-200 bg-red-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-gray-900">Delete Job Posting</h2>
                            <p className="text-sm text-red-700">This action cannot be undone</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-6">
                        <p className="text-gray-900 mb-2">You are about to permanently delete:</p>
                        <p className="text-gray-900 px-4 py-3 bg-gray-100 rounded-lg border border-gray-200">{jobTitle}</p>
                    </div>

                    {/* Warning Messages */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-red-900">
                                    This will permanently delete the job posting and all associated data
                                </p>
                            </div>
                        </div>

                        {applicantCount > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-orange-900">
                                        This job has <span className="font-medium">{applicantCount} applicants</span>. Their applications will be archived but the job listing will be removed.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-900">
                                <span className="font-medium">Tip:</span> Consider archiving the job instead if you want to keep it for reference.
                            </p>
                        </div>
                    </div>

                    {/* Confirmation Input */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">
                            Type <span className="font-medium text-gray-900">DELETE</span> to confirm
                        </label>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder="Type DELETE"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={!canDelete || isDeleting}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-colors ${!canDelete || isDeleting
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-red-600 text-white hover:bg-red-700"
                                }`}
                        >
                            <Trash2 className="w-4 h-4" />
                            {isDeleting ? "Deleting..." : "Delete Job"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
