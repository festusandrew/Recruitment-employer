import { Bell, Globe, Lock, Palette, Mail, Building, CreditCard, CheckCircle2, X, Check, FileText, Download, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export function SettingsPage() {
    const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [activeModal, setActiveModal] = useState<"managePlan" | "billingHistory" | null>(null);
    const [currentPlan, setCurrentPlan] = useState<string>("Professional");
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

    const showToast = (message: string, type: "success" | "info" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSaveCompanyInfo = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            showToast("Company information saved successfully.");
        }, 600);
    };

    const handleToggle = (setting: string) => {
        showToast(`${setting} updated.`);
    };

    const handleAction = (action: string) => {
        showToast(`${action} action triggered.`, "info");
    };

    const handleSelectPlan = (planName: string) => {
        setCurrentPlan(planName);
        setActiveModal(null);
        showToast(`Successfully updated subscription to ${planName} Plan!`);
    };

    const invoices = [
        { id: "INV-2026-11", date: "Nov 28, 2026", plan: "Professional Plan", amount: "$99.00", status: "Paid" },
        { id: "INV-2026-10", date: "Oct 28, 2026", plan: "Professional Plan", amount: "$99.00", status: "Paid" },
        { id: "INV-2026-09", date: "Sep 28, 2026", plan: "Starter Plan Upgrade", amount: "$29.00", status: "Paid" },
        { id: "INV-2026-08", date: "Aug 28, 2026", plan: "Starter Plan", amount: "$29.00", status: "Paid" },
        { id: "INV-2026-07", date: "Jul 28, 2026", plan: "Starter Plan", amount: "$29.00", status: "Paid" },
    ];

    const plans = [
        {
            name: "Starter",
            priceMonthly: "$29",
            priceAnnual: "$23",
            description: "Perfect for growing teams hiring up to 5 roles simultaneously.",
            features: [
                "Up to 5 active job postings",
                "Basic candidate pipeline tracking",
                "Email template management",
                "Standard email support"
            ]
        },
        {
            name: "Professional",
            priceMonthly: "$99",
            priceAnnual: "$79",
            description: "Advanced hiring tools, live interview scorecards, and multi-user collaboration.",
            features: [
                "Unlimited active job postings",
                "Advanced live interview room & scorecards",
                "Automated email scheduling & triggers",
                "Multi-calendar scheduling views",
                "Priority 24/7 dedicated support"
            ],
            popular: true
        },
        {
            name: "Enterprise",
            priceMonthly: "$249",
            priceAnnual: "$199",
            description: "Full customization, custom API access, and dedicated customer success manager.",
            features: [
                "Everything in Professional",
                "Custom API integrations & Webhooks",
                "Advanced AI candidate recommendations",
                "Dedicated customer success manager",
                "Custom SLA & security compliance"
            ]
        }
    ];

    return (
        <div className="p-8 relative">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-gray-900 mb-2 text-2xl font-bold">Settings</h1>
                    <p className="text-gray-600">Manage your workspace preferences and configurations</p>
                </div>

                {/* Settings Categories */}
                <div className="space-y-6">
                    {/* Company Information */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#F5E6E8] rounded-lg flex items-center justify-center">
                                    <Building className="w-5 h-5 text-[#800020]" />
                                </div>
                                <div>
                                    <h2 className="text-gray-900 font-semibold">Company Information</h2>
                                    <p className="text-sm text-gray-500">Update your company details</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        defaultValue="MployUs Inc."
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                                    <input
                                        type="text"
                                        defaultValue="Technology"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                                <input
                                    type="url"
                                    defaultValue="https://mployus.com"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={handleSaveCompanyInfo}
                                disabled={isSaving}
                                className="px-5 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors font-medium flex items-center justify-center min-w-[140px] cursor-pointer"
                            >
                                {isSaving ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Bell className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-gray-900 font-semibold">Notifications</h2>
                                    <p className="text-sm text-gray-500">Configure your notification preferences</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">New Applications</p>
                                    <p className="text-xs text-gray-500 mt-1">Get notified when someone applies to your jobs</p>
                                </div>
                                <input type="checkbox" defaultChecked onChange={() => handleToggle("New Applications")} className="w-5 h-5 text-[#800020] rounded cursor-pointer accent-[#800020]" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Interview Reminders</p>
                                    <p className="text-xs text-gray-500 mt-1">Receive reminders about upcoming interviews</p>
                                </div>
                                <input type="checkbox" defaultChecked onChange={() => handleToggle("Interview Reminders")} className="w-5 h-5 text-[#800020] rounded cursor-pointer accent-[#800020]" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Task Deadlines</p>
                                    <p className="text-xs text-gray-500 mt-1">Get notified about approaching task deadlines</p>
                                </div>
                                <input type="checkbox" defaultChecked onChange={() => handleToggle("Task Deadlines")} className="w-5 h-5 text-[#800020] rounded cursor-pointer accent-[#800020]" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Team Activity</p>
                                    <p className="text-xs text-gray-500 mt-1">Updates about team member actions</p>
                                </div>
                                <input type="checkbox" onChange={() => handleToggle("Team Activity")} className="w-5 h-5 text-[#800020] rounded cursor-pointer accent-[#800020]" />
                            </div>
                        </div>
                    </div>

                    {/* Email Settings */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-gray-900 font-semibold">Email Settings</h2>
                                    <p className="text-sm text-gray-500">Manage email templates and automation</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Auto-response to Applications</p>
                                    <p className="text-xs text-gray-500 mt-1">Automatically send confirmation emails</p>
                                </div>
                                <input type="checkbox" defaultChecked onChange={() => handleToggle("Auto-response setting")} className="w-5 h-5 text-[#800020] rounded cursor-pointer accent-[#800020]" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Interview Confirmation Emails</p>
                                    <p className="text-xs text-gray-500 mt-1">Send automated interview confirmations</p>
                                </div>
                                <input type="checkbox" defaultChecked onChange={() => handleToggle("Interview confirmation setting")} className="w-5 h-5 text-[#800020] rounded cursor-pointer accent-[#800020]" />
                            </div>
                            <button
                                onClick={() => handleAction("Edit Email Templates")}
                                className="text-[#800020] font-medium hover:text-[#600018] text-sm flex items-center gap-1 cursor-pointer"
                            >
                                Edit Email Templates →
                            </button>
                        </div>
                    </div>

                    {/* Security & Privacy */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <h2 className="text-gray-900 font-semibold">Security & Privacy</h2>
                                    <p className="text-sm text-gray-500">Manage account security settings</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                                    <p className="text-xs text-gray-500 mt-1">Add an extra layer of security</p>
                                </div>
                                <button
                                    onClick={() => handleAction("Two-Factor Authentication setup")}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    Enable
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Change Password</p>
                                    <p className="text-xs text-gray-500 mt-1">Update your account password</p>
                                </div>
                                <button
                                    onClick={() => handleAction("Password Update flow")}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    Update
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Active Sessions</p>
                                    <p className="text-xs text-gray-500 mt-1">Manage your logged-in devices</p>
                                </div>
                                <button
                                    onClick={() => handleAction("Active Sessions view")}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Appearance */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Palette className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <h2 className="text-gray-900 font-semibold">Appearance</h2>
                                    <p className="text-sm text-gray-500">Customize how MployUs looks</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                                <div className="flex gap-3">
                                    <button className="flex-1 p-4 border-2 border-[#800020] rounded-lg bg-[#F5E6E8]">
                                        <p className="text-sm font-medium text-gray-900 mb-1">Light Mode</p>
                                        <p className="text-xs text-gray-500">Current theme</p>
                                    </button>
                                    <button
                                        onClick={() => handleAction("Dark Mode toggle")}
                                        className="flex-1 p-4 border-2 border-gray-300 rounded-lg bg-gray-900 hover:border-gray-400 transition-colors cursor-pointer"
                                    >
                                        <p className="text-sm font-medium text-white mb-1">Dark Mode</p>
                                        <p className="text-xs text-gray-400">Coming soon</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Billing */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <h2 className="text-gray-900 font-semibold">Billing & Subscription</h2>
                                    <p className="text-sm text-gray-500">Manage your plan and payment methods</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4 border border-gray-200/60">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-gray-900">Current Plan: {currentPlan}</p>
                                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" /> Active
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Next billing cycle renewal: Dec 28, 2026</p>
                                </div>
                                <button
                                    onClick={() => setActiveModal("managePlan")}
                                    className="px-5 py-2.5 bg-[#800020] text-white rounded-lg text-sm font-bold hover:bg-[#600018] transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                                >
                                    Manage Plan
                                </button>
                            </div>
                            <button
                                onClick={() => setActiveModal("billingHistory")}
                                className="text-[#800020] font-bold hover:text-[#600018] text-sm flex items-center gap-1 cursor-pointer"
                            >
                                View Billing History →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Manage Subscription Plan Modal */}
            {activeModal === "managePlan" && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
                    <div className="bg-white rounded-2xl max-w-5xl w-full p-8 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto text-left">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Manage Workspace Plan</h3>
                                <p className="text-sm text-gray-500 mt-1">Upgrade or scale your plan to match your team's recruitment goals.</p>
                            </div>
                            <button
                                onClick={() => setActiveModal(null)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Billing Cycle Selector */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-gray-100 p-1.5 rounded-xl flex items-center gap-2 border border-gray-200 shadow-inner">
                                <button
                                    onClick={() => setBillingCycle("monthly")}
                                    className={`px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${billingCycle === "monthly" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"}`}
                                >
                                    Monthly Billing
                                </button>
                                <button
                                    onClick={() => setBillingCycle("annual")}
                                    className={`px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${billingCycle === "annual" ? "bg-[#800020] text-white shadow-xs" : "text-gray-500 hover:text-gray-900"}`}
                                >
                                    Annual Billing <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] uppercase font-extrabold rounded-full animate-pulse">Save 20%</span>
                                </button>
                            </div>
                        </div>

                        {/* Tiers Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {plans.map((plan) => {
                                const isActivePlan = currentPlan === plan.name;
                                return (
                                    <div
                                        key={plan.name}
                                        className={`rounded-2xl p-6 border flex flex-col justify-between transition-all relative ${plan.popular ? "border-[#800020] ring-2 ring-[#800020]/20 bg-rose-50/10 shadow-md" : "border-gray-200 bg-white"}`}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#800020] text-white font-bold text-xs uppercase tracking-wide rounded-full shadow-xs">
                                                Most Popular
                                            </div>
                                        )}

                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                                                {isActivePlan && (
                                                    <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-lg border border-green-200">
                                                        Active Plan
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 min-h-[32px] mb-6">{plan.description}</p>

                                            <div className="mb-6 flex items-baseline gap-1">
                                                <span className="text-4xl font-extrabold text-gray-900">
                                                    {billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual}
                                                </span>
                                                <span className="text-xs text-gray-500 font-semibold">/ month</span>
                                            </div>

                                            <div className="space-y-3 mb-8">
                                                <p className="text-xs font-bold text-gray-900 tracking-wider uppercase">Included Features:</p>
                                                {plan.features.map((feat, idx) => (
                                                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 font-medium">
                                                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                        <span>{feat}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleSelectPlan(plan.name)}
                                            disabled={isActivePlan}
                                            className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${isActivePlan ? "bg-green-500 text-white cursor-default shadow-xs" : plan.popular ? "bg-[#800020] hover:bg-[#600018] text-white shadow-md" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
                                        >
                                            {isActivePlan ? (
                                                <>
                                                    <Check className="w-4 h-4" /> Current Selection
                                                </>
                                            ) : (
                                                <>
                                                    Select {plan.name} Plan <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* View Billing History Modal */}
            {activeModal === "billingHistory" && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
                    <div className="bg-white rounded-2xl max-w-3xl w-full p-8 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col text-left">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 flex-shrink-0">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Billing & Invoice History</h3>
                                <p className="text-sm text-gray-500 mt-1">Review your past workspace payments and download PDF receipts.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => showToast("Downloading all workspace invoices...")}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    <Download className="w-4 h-4 text-gray-500" /> Download All
                                </button>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Invoices List */}
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                            {invoices.map((inv) => (
                                <div
                                    key={inv.id}
                                    className="flex items-center justify-between p-4 bg-gray-50/80 hover:bg-gray-50 rounded-xl border border-gray-200/60 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 flex-shrink-0 border border-yellow-100">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-gray-900 text-sm">{inv.plan}</h4>
                                                <span className="text-[11px] font-mono px-2 py-0.5 bg-gray-200/80 text-gray-700 font-bold rounded">
                                                    {inv.id}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 font-medium mt-0.5">Billed on {inv.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm font-extrabold text-gray-900">{inv.amount}</p>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                                                {inv.status}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => showToast(`Receipt ${inv.id} download started.`)}
                                            className="p-2 bg-white hover:bg-gray-100 text-gray-600 rounded-lg border border-gray-200 shadow-2xs transition-colors cursor-pointer"
                                            title="Download Receipt"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium flex-shrink-0">
                            <span>Showing all 5 billing invoices</span>
                            <span>Secure payments encrypted by Stripe</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300 ease-out z-50 ${toast.type === "success" ? "bg-green-50 border border-green-200" : "bg-blue-50 border border-blue-200"
                    }`}>
                    {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    <p className={`text-sm font-medium ${toast.type === "success" ? "text-green-800" : "text-blue-800"}`}>
                        {toast.message}
                    </p>
                </div>
            )}
        </div>
    );
}