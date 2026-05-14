import { useState } from "react";
import { X, Send, Paperclip, AtSign } from "lucide-react";

interface SendEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    company: any;
    onSend?: (emailData: any) => void;
}

export function SendEmailModal({ isOpen, onClose, company, onSend }: SendEmailModalProps) {
    const [formData, setFormData] = useState({
        to: company?.email || "",
        subject: "",
        message: "",
    });

    const emailTemplates = [
        {
            name: "Welcome Email",
            subject: "Welcome to MployUs Platform",
            message: `Hi ${company?.name || "there"},\n\nWelcome to MployUs! We're excited to have you on board.\n\nIf you have any questions, feel free to reach out.\n\nBest regards,\nMployUs Support Team`
        },
        {
            name: "Payment Reminder",
            subject: "Payment Due Reminder",
            message: `Hi ${company?.name || "there"},\n\nThis is a friendly reminder that your payment is due soon.\n\nPlease review your billing information in your account dashboard.\n\nBest regards,\nMployUs Billing Team`
        },
        {
            name: "Account Suspended",
            subject: "Account Suspension Notice",
            message: `Hi ${company?.name || "there"},\n\nYour account has been temporarily suspended due to [REASON].\n\nPlease contact our support team to resolve this issue.\n\nBest regards,\nMployUs Support Team`
        },
        {
            name: "Plan Upgrade",
            subject: "Upgrade Your Plan - Special Offer",
            message: `Hi ${company?.name || "there"},\n\nWe noticed you're currently on the ${company?.plan || "Starter"} plan. Upgrade today and unlock premium features!\n\nContact us to learn more about our Enterprise solutions.\n\nBest regards,\nMployUs Sales Team`
        },
    ];

    if (!isOpen) return null;

    const handleSend = () => {
        if (onSend) {
            onSend({
                ...formData,
                companyId: company?.id,
                sentAt: new Date().toISOString(),
            });
        }
        onClose();
        // Reset form
        setFormData({
            to: company?.email || "",
            subject: "",
            message: "",
        });
    };

    const handleTemplateSelect = (template: any) => {
        setFormData({
            ...formData,
            subject: template.subject,
            message: template.message,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl text-gray-900">Send Email</h2>
                        <p className="text-sm text-gray-500 mt-1">Send an email to {company?.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Email Templates */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quick Templates
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {emailTemplates.map((template, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleTemplateSelect(template)}
                                    className="p-3 border border-gray-300 rounded-lg text-left hover:border-[#7C3AED] hover:bg-purple-50 transition-colors"
                                >
                                    <p className="text-sm text-gray-900">{template.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{template.subject}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* To Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            To *
                        </label>
                        <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={formData.to}
                                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                placeholder="recipient@company.com"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                                disabled
                            />
                        </div>
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subject *
                        </label>
                        <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Enter email subject"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message *
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Type your message here..."
                            rows={10}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Attachment Section */}
                    <div>
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#7C3AED] transition-colors">
                            <Paperclip className="w-4 h-4" />
                            Attach File
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Email will be sent to: <span className="font-medium text-gray-900">{formData.to}</span>
                    </p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!formData.subject || !formData.message}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6B46C1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                            Send Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}