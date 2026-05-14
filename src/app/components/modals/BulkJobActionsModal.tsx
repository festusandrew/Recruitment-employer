import { X, Check, Pause, Play, Archive, Trash2, Tag, Users } from "lucide-react";
import { useState } from "react";

interface BulkJobActionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCount: number;
    onApply: (action: string) => void;
}

export function BulkJobActionsModal({ isOpen, onClose, selectedCount, onApply }: BulkJobActionsModalProps) {
    const [selectedAction, setSelectedAction] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handleApply = () => {
        if (!selectedAction) return;
        setIsProcessing(true);
        setTimeout(() => {
            onApply(selectedAction);
            setIsProcessing(false);
            onClose();
        }, 1500);
    };

    const actions = [
        {
            id: "activate",
            label: "Activate Jobs",
            description: "Make selected jobs visible to candidates",
            icon: Play,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            id: "pause",
            label: "Pause Jobs",
            description: "Temporarily hide selected jobs from candidates",
            icon: Pause,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            id: "archive",
            label: "Archive Jobs",
            description: "Move selected jobs to archive",
            icon: Archive,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            id: "tag",
            label: "Add Tags",
            description: "Add tags to selected jobs for organization",
            icon: Tag,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            id: "assign",
            label: "Assign Recruiter",
            description: "Assign a recruiter to selected jobs",
            icon: Users,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
        },
        {
            id: "delete",
            label: "Delete Jobs",
            description: "Permanently delete selected jobs",
            icon: Trash2,
            color: "text-red-600",
            bgColor: "bg-red-50",
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-gray-900">Bulk Actions</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {selectedCount} {selectedCount === 1 ? "job" : "jobs"} selected
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
                <div className="p-6">
                    <label className="block text-sm text-gray-700 mb-3">Select an action to apply</label>
                    <div className="grid grid-cols-2 gap-3">
                        {actions.map((action) => {
                            const Icon = action.icon;
                            const isSelected = selectedAction === action.id;
                            return (
                                <button
                                    key={action.id}
                                    onClick={() => setSelectedAction(action.id)}
                                    className={`relative p-4 border-2 rounded-xl text-left transition-all ${isSelected
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300 bg-white"
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${action.bgColor}`}>
                                        <Icon className={`w-5 h-5 ${action.color}`} />
                                    </div>
                                    <p className="text-sm text-gray-900 mb-1">{action.label}</p>
                                    <p className="text-xs text-gray-600">{action.description}</p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Warning for Delete */}
                    {selectedAction === "delete" && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-start gap-2">
                                <Trash2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-red-900">
                                        <span className="font-medium">Warning:</span> This will permanently delete {selectedCount} {selectedCount === 1 ? "job" : "jobs"}. This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            disabled={isProcessing}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApply}
                            disabled={!selectedAction || isProcessing}
                            className={`px-5 py-2.5 rounded-lg transition-colors ${!selectedAction || isProcessing
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            {isProcessing ? "Processing..." : "Apply Action"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
