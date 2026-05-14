import { useState } from "react";
import { X, AlertTriangle, Ban } from "lucide-react";

interface SuspendCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    company: any;
    onConfirm?: (reason: string, sendEmail: boolean) => void;
}

export function SuspendCompanyModal({ isOpen, onClose, company, onConfirm }: SuspendCompanyModalProps) {
    const [reason, setReason] = useState("");
    const [sendEmail, setSendEmail] = useState(true);

    if (!isOpen || !company) return null;

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(reason, sendEmail);
        }
        onClose();
        setReason("");
        setSendEmail(true);
    };

    const suspendReasons = [
        "Payment overdue",
        "Terms of service violation",
        "Suspicious activity detected",
        "Account security concerns",
        "Requested by company",
        "Other (specify below)",
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-xl">
                {/* Header */}
                <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <h2 className="text-lg text-gray-900">Suspend Company Account</h2>
                            <p className="text-sm text-gray-600 mt-0.5">This action can be reversed later</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-yellow-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Company Info */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#9333EA] rounded-lg flex items-center justify-center">
                                <span className="text-white">{company.logo}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{company.name}</p>
                                <p className="text-xs text-gray-500">{company.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Warning Message */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                            <strong>Warning:</strong> Suspending this account will:
                        </p>
                        <ul className="text-sm text-yellow-700 mt-2 space-y-1 list-disc list-inside">
                            <li>Immediately disable all user access</li>
                            <li>Prevent new job postings</li>
                            <li>Hide active job listings</li>
                            <li>Block all platform features</li>
                        </ul>
                    </div>

                    {/* Reason Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reason for Suspension *
                        </label>
                        <div className="space-y-2">
                            {suspendReasons.map((reasonOption, index) => (
                                <label
                                    key={index}
                                    className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name="suspendReason"
                                        value={reasonOption}
                                        checked={reason === reasonOption}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="mt-0.5"
                                    />
                                    <span className="text-sm text-gray-700">{reasonOption}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Additional Notes */}
                    {reason === "Other (specify below)" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Details
                            </label>
                            <textarea
                                placeholder="Please provide more details..."
                                rows={3}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent resize-none"
                            />
                        </div>
                    )}

                    {/* Email Notification */}
                    <div>
                        <label className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">
                            <input
                                type="checkbox"
                                checked={sendEmail}
                                onChange={(e) => setSendEmail(e.target.checked)}
                                className="mt-0.5"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Send notification email</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    The company will receive an email explaining the suspension and next steps.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!reason}
                        className="flex items-center gap-2 px-5 py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Ban className="w-4 h-4" />
                        Suspend Account
                    </button>
                </div>
            </div>
        </div>
    );
}