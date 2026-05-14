import { X, Edit, Share2, Pause, Play, Copy, Trash2, Eye, EyeOff, Archive } from "lucide-react";

interface JobActionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: () => void;
    onShare: () => void;
    onDuplicate: () => void;
    onPauseActivate: () => void;
    onArchive: () => void;
    onDelete: () => void;
    jobTitle?: string;
    jobStatus?: string;
}

export function JobActionsModal({
    isOpen,
    onClose,
    onEdit,
    onShare,
    onDuplicate,
    onPauseActivate,
    onArchive,
    onDelete,
    jobTitle,
    jobStatus,
}: JobActionsModalProps) {
    if (!isOpen) return null;

    const actions = [
        {
            label: "Edit Job",
            icon: Edit,
            onClick: () => {
                onEdit();
                onClose();
            },
            color: "text-gray-700",
        },
        {
            label: "Share Job",
            icon: Share2,
            onClick: () => {
                onShare();
                onClose();
            },
            color: "text-gray-700",
        },
        {
            label: "Duplicate Job",
            icon: Copy,
            onClick: () => {
                onDuplicate();
                onClose();
            },
            color: "text-gray-700",
        },
        {
            label: jobStatus === "Active" ? "Pause Job" : "Activate Job",
            icon: jobStatus === "Active" ? Pause : Play,
            onClick: () => {
                onPauseActivate();
                onClose();
            },
            color: "text-orange-600",
        },
        {
            label: "Archive Job",
            icon: Archive,
            onClick: () => {
                onArchive();
                onClose();
            },
            color: "text-gray-700",
        },
        {
            label: "Delete Job",
            icon: Trash2,
            onClick: () => {
                onDelete();
                onClose();
            },
            color: "text-red-600",
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-900">Job Actions</h3>
                            <p className="text-sm text-gray-500 mt-1">{jobTitle}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Actions List */}
                <div className="p-3">
                    {actions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors ${action.color}`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{action.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
