import { X, Send, Paperclip, Users } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface BulkMessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCandidates: any[];
}

export function BulkMessageModal({ isOpen, onClose, selectedCandidates }: BulkMessageModalProps) {
    const [formData, setFormData] = useState({
        subject: "",
        message: "",
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Bulk message sent to:", selectedCandidates, formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-gray-900">Send Bulk Message</h2>
                        <p className="text-sm text-gray-500">
                            Sending to {selectedCandidates.length} {selectedCandidates.length === 1 ? "candidate" : "candidates"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-80px)]">
                    <div className="p-6 space-y-5">
                        {/* Recipients */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-3">
                                <Users className="w-4 h-4 inline mr-1" />
                                Recipients ({selectedCandidates.length})
                            </label>
                            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 max-h-48 overflow-y-auto">
                                <div className="space-y-2">
                                    {selectedCandidates.map((candidate) => (
                                        <div
                                            key={candidate.id}
                                            className="flex items-center gap-3 p-2 bg-white rounded-lg"
                                        >
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={candidate.avatar} />
                                                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-900">{candidate.name}</p>
                                                <p className="text-xs text-gray-500">{candidate.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Subject *</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="e.g. Application Update, Interview Invitation"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                            />
                        </div>

                        {/* Message Templates */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Quick Templates</label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            subject: "Interview Invitation",
                                            message: "Hi there,\n\nWe were impressed by your application and would love to schedule an interview with you. Please let us know your availability for the coming week.\n\nBest regards,\nThe Hiring Team",
                                        })
                                    }
                                    className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Interview Invitation
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            subject: "Application Status Update",
                                            message: "Hi there,\n\nThank you for your application. We wanted to update you on the status of your application. We're currently reviewing all applications and will be in touch soon.\n\nBest regards,\nThe Hiring Team",
                                        })
                                    }
                                    className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Status Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            subject: "Next Steps",
                                            message: "Hi there,\n\nThank you for your time during the interview process. We'd like to discuss the next steps with you. Are you available for a brief call this week?\n\nBest regards,\nThe Hiring Team",
                                        })
                                    }
                                    className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Next Steps
                                </button>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Message *</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Type your message here... Use {name} to personalize with candidate's name."
                                rows={12}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                💡 Tip: Use {"{name}"} in your message to automatically insert each candidate's name
                            </p>
                        </div>

                        {/* Attachments */}
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <button
                                type="button"
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <Paperclip className="w-4 h-4" />
                                <span className="text-sm">Attach files</span>
                            </button>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-4 h-4 text-[#800020] rounded"
                                />
                                <span className="text-sm text-gray-700">Send individual emails (not as group)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-[#800020] rounded"
                                />
                                <span className="text-sm text-gray-700">Schedule for later</span>
                            </label>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 bg-gray-50">
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">{selectedCandidates.length}</span> {selectedCandidates.length === 1 ? "recipient" : "recipients"} selected
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                Send to All
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
