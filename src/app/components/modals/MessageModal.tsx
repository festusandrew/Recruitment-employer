import { X, Send, Paperclip } from "lucide-react";
import { useState } from "react";

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipient?: string;
}

export function MessageModal({ isOpen, onClose, recipient }: MessageModalProps) {
    const [formData, setFormData] = useState({
        to: recipient || "",
        subject: "",
        message: "",
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Message sent:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-gray-900">New Message</h2>
                        <p className="text-sm text-gray-500">Send a message to a candidate</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-5">
                        {/* To */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">To *</label>
                            <input
                                type="text"
                                required
                                value={formData.to}
                                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                placeholder="Enter candidate name or email"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Subject *</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="e.g. Interview Follow-up"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Message *</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Type your message here..."
                                rows={10}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
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
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
