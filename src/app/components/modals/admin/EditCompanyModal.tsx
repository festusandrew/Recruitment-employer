import { useState } from "react";
import { X, Save } from "lucide-react";

interface EditCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    company: any;
    onSave: (updatedCompany: any) => void;
}

export function EditCompanyModal({ isOpen, onClose, company, onSave }: EditCompanyModalProps) {
    const [formData, setFormData] = useState(company || {
        name: "",
        email: "",
        plan: "Starter",
        status: "Active",
    });

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl text-gray-900">
                        {company ? "Edit Company" : "Add New Company"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-4">
                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter company name"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Email *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="contact@company.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                        />
                    </div>

                    {/* Plan */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subscription Plan *
                        </label>
                        <select
                            value={formData.plan}
                            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                        >
                            <option value="Starter">Starter - $299/month</option>
                            <option value="Professional">Professional - $999/month</option>
                            <option value="Enterprise">Enterprise - Custom pricing</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Status *
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                        >
                            <option value="Active">Active</option>
                            <option value="Trial">Trial</option>
                            <option value="Suspended">Suspended</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Users Limit */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            User Limit
                        </label>
                        <input
                            type="number"
                            value={formData.userLimit || ""}
                            onChange={(e) => setFormData({ ...formData, userLimit: e.target.value })}
                            placeholder="e.g., 50"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Leave empty for unlimited users</p>
                    </div>

                    {/* Jobs Limit */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Active Jobs Limit
                        </label>
                        <input
                            type="number"
                            value={formData.jobsLimit || ""}
                            onChange={(e) => setFormData({ ...formData, jobsLimit: e.target.value })}
                            placeholder="e.g., 100"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Leave empty for unlimited jobs</p>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Admin Notes
                        </label>
                        <textarea
                            value={formData.notes || ""}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Internal notes about this company..."
                            rows={4}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent resize-none"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6B46C1] transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}