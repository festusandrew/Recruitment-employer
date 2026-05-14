import { X, Building2, Users, Briefcase, DollarSign, Mail, Calendar, Activity } from "lucide-react";
import { useState } from "react";
import { SendEmailModal } from "./SendEmailModal";
import { SuspendCompanyModal } from "./SuspendCompanyModal";

interface ViewCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    company: any;
    onEdit?: (company: any) => void;
    onSuspend?: (companyId: number, reason: string, sendEmail: boolean) => void;
}

export function ViewCompanyModal({ isOpen, onClose, company, onEdit, onSuspend }: ViewCompanyModalProps) {
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

    if (!isOpen || !company) return null;

    const handleEdit = () => {
        if (onEdit) {
            onEdit(company);
        }
        onClose();
    };

    const handleSendEmail = (emailData: any) => {
        console.log("Email sent:", emailData);
        // You can add a toast notification here
    };

    const handleSuspend = (reason: string, sendEmail: boolean) => {
        if (onSuspend) {
            onSuspend(company.id, reason, sendEmail);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#7C3AED] to-[#9333EA] rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl">{company.logo}</span>
                        </div>
                        <div>
                            <h2 className="text-xl text-gray-900">{company.name}</h2>
                            <p className="text-sm text-gray-500">{company.email}</p>
                        </div>
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
                    {/* Overview Cards */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Overview</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs text-blue-600">Users</span>
                                </div>
                                <p className="text-2xl text-blue-900">{company.users}</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Briefcase className="w-4 h-4 text-green-600" />
                                    <span className="text-xs text-green-600">Jobs</span>
                                </div>
                                <p className="text-2xl text-green-900">{company.jobs}</p>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-4 h-4 text-purple-600" />
                                    <span className="text-xs text-purple-600">Candidates</span>
                                </div>
                                <p className="text-2xl text-purple-900">{company.candidates || 0}</p>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <DollarSign className="w-4 h-4 text-purple-600" />
                                    <span className="text-xs text-purple-600">Revenue</span>
                                </div>
                                <p className="text-2xl text-purple-900">{company.revenue}</p>
                            </div>
                        </div>
                    </div>

                    {/* Company Details */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Company Details</h3>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Subscription Plan</span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${company.plan === 'Enterprise'
                                        ? 'bg-purple-100 text-purple-700'
                                        : company.plan === 'Professional'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {company.plan}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Account Status</span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${company.status === 'Active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {company.status}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Member Since</span>
                                <span className="text-sm text-gray-900">{company.joined}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Contact Email</span>
                                <span className="text-sm text-gray-900">{company.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Briefcase className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Posted new job: Senior React Developer</p>
                                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Users className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Added 3 new team members</p>
                                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Activity className="w-4 h-4 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">Upgraded to {company.plan} plan</p>
                                    <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                        <button className="flex-1 px-4 py-2.5 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6B46C1] transition-colors" onClick={handleEdit}>
                            Edit Company
                        </button>
                        <button className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsEmailModalOpen(true)}>
                            Send Email
                        </button>
                        <button className="px-4 py-2.5 border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors" onClick={() => setIsSuspendModalOpen(true)}>
                            Suspend
                        </button>
                    </div>
                </div>
            </div>

            {/* Send Email Modal */}
            <SendEmailModal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                onSend={handleSendEmail}
                company={company}
            />

            {/* Suspend Company Modal */}
            <SuspendCompanyModal
                isOpen={isSuspendModalOpen}
                onClose={() => setIsSuspendModalOpen(false)}
                onConfirm={handleSuspend}
                company={company}
            />
        </div>
    );
}