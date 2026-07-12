import { Bell, Globe, Lock, Palette, Mail, Building, CreditCard, CheckCircle2, X, Check, FileText, Download, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function SettingsPage() {
    const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [activeModal, setActiveModal] = useState<"managePlan" | "billingHistory" | "checkout" | null>(null);
    const [currentPlan, setCurrentPlan] = useState<string>("Professional");
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
    const [checkoutPlan, setCheckoutPlan] = useState<any>(null);
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Branding states
    const [companyName, setCompanyName] = useState(() => localStorage.getItem("mployus_company_name") || "MployUs Inc.");
    const [companyLogo, setCompanyLogo] = useState<string | null>(() => localStorage.getItem("mployus_company_logo") || null);
    const [themeColor, setThemeColor] = useState(() => localStorage.getItem("mployus_theme_color") || "#4f46e5");

    const [invoices, setInvoices] = useState([
        { id: "INV-2026-11", date: "Nov 28, 2026", plan: "Professional Plan", amount: "$99.00", status: "Paid" },
        { id: "INV-2026-10", date: "Oct 28, 2026", plan: "Professional Plan", amount: "$99.00", status: "Paid" },
        { id: "INV-2026-09", date: "Sep 28, 2026", plan: "Starter Plan Upgrade", amount: "$29.00", status: "Paid" },
        { id: "INV-2026-08", date: "Aug 28, 2026", plan: "Starter Plan", amount: "$29.00", status: "Paid" },
        { id: "INV-2026-07", date: "Jul 28, 2026", plan: "Starter Plan", amount: "$29.00", status: "Paid" },
    ]);

    // Notification toggles state
    const [notifications, setNotifications] = useState({
        applications: true,
        reminders: true,
        deadlines: true,
        activity: false,
        autoResponse: true,
        interviewConfirm: true
    });

    const showToast = (message: string, type: "success" | "info" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setCompanyLogo(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveCompanyInfo = () => {
        setIsSaving(true);
        setTimeout(() => {
            localStorage.setItem("mployus_company_name", companyName);
            if (companyLogo) {
                localStorage.setItem("mployus_company_logo", companyLogo);
            } else {
                localStorage.removeItem("mployus_company_logo");
            }
            localStorage.setItem("mployus_theme_color", themeColor);
            
            // Apply theme accent color dynamically
            document.documentElement.style.setProperty('--primary', themeColor);
            document.documentElement.style.setProperty('--primary-fifty', themeColor + '10');
            document.documentElement.style.setProperty('--primary-hundred', themeColor + '20');
            document.documentElement.style.setProperty('--primary-hover', themeColor);
            
            // Dispatch storage event to alert Sidebar
            window.dispatchEvent(new Event("storage"));
            
            setIsSaving(false);
            showToast("Company profile & branding customization saved successfully.");
        }, 800);
    };

    const handleToggle = (key: keyof typeof notifications, label: string) => {
        setNotifications(prev => {
            const nextState = !prev[key];
            showToast(`${label} ${nextState ? "enabled" : "disabled"}.`);
            return { ...prev, [key]: nextState };
        });
    };

    const handleAction = (action: string) => {
        showToast(`${action} action triggered.`, "info");
    };

    const handleSelectPlan = (plan: any) => {
        setCheckoutPlan(plan);
        setPaymentSuccess(false);
        setActiveModal("checkout");
    };

    const plans = [
        {
            name: "Starter",
            priceMonthly: "$29",
            priceAnnual: "$23",
            description: "Perfect for growing teams hiring up to 5 roles simultaneously.",
            features: [
                "Up to 5 active job postings",
                "Basic applicant pipeline tracking",
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

    // Helper component for premium custom switches
    const CustomSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
        <div 
            onClick={onChange}
            className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-200 ${checked ? "bg-indigo-600" : "bg-gray-200"}`}
        >
            <motion.div 
                layout
                className="w-5 h-5 rounded-full bg-white "
                animate={{ x: checked ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </div>
    );

    return (
        <div className="p-8 relative text-left">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Workspace Settings</h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Manage your company credentials, billing history, subscription plans, and notification routing.</p>
                </div>

                {/* Settings Categories */}
                <div className="space-y-6">
                    {/* Company Information */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 ">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-600/10">
                                    <Building className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-slate-900 font-bold text-base">Company Profile</h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Update corporate branding & website details</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white "
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Industry Sector</label>
                                    <input
                                        type="text"
                                        defaultValue="Technology & Software"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white "
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Website URL</label>
                                    <input
                                        type="url"
                                        defaultValue="https://mployus.com"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white "
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Primary Brand Color</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={themeColor}
                                            onChange={(e) => setThemeColor(e.target.value)}
                                            className="w-10 h-10 border border-slate-200 rounded-xl cursor-pointer p-0 overflow-hidden"
                                        />
                                        <div className="flex items-center gap-1.5">
                                            {[
                                                { hex: "#4f46e5", label: "Indigo" },
                                                { hex: "#0d9488", label: "Teal" },
                                                { hex: "#059669", label: "Emerald" },
                                                { hex: "#0284c7", label: "Sky" },
                                                { hex: "#ea580c", label: "Orange" },
                                                { hex: "#e11d48", label: "Rose" }
                                            ].map((color) => (
                                                <button
                                                    key={color.hex}
                                                    type="button"
                                                    onClick={() => setThemeColor(color.hex)}
                                                    className="w-6 h-6 rounded-full border border-slate-200 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                                                    style={{ backgroundColor: color.hex }}
                                                    title={color.label}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Corporate Logo Uploader */}
                            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {companyLogo ? (
                                            <img src={companyLogo} alt="Company Logo" className="w-full h-full object-contain" />
                                        ) : (
                                            <Building className="w-8 h-8 text-slate-350" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800">Corporate Branding Logo</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">JPG, PNG or SVG. Recommended size: 250x250px</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors cursor-pointer bg-white text-slate-700">
                                        Upload Logo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    {companyLogo && (
                                        <button
                                            type="button"
                                            onClick={() => setCompanyLogo(null)}
                                            className="px-4 py-2 border border-rose-250 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors cursor-pointer bg-white"
                                        >
                                            Remove Logo
                                        </button>
                                    )}
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSaveCompanyInfo}
                                disabled={isSaving}
                                className="px-5 py-3 bg-indigo-600   text-white rounded-xl hover: transition-all font-bold text-sm flex items-center justify-center min-w-[140px] cursor-pointer "
                            >
                                {isSaving ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    "Save Details"
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 ">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100">
                                    <Bell className="w-5 h-5 text-purple-700" />
                                </div>
                                <div>
                                    <h2 className="text-slate-900 font-bold text-base">Alerts & Notifications</h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Customize real-time dispatch routes</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-slate-200/60">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">New Job Applications</p>
                                    <p className="text-xs text-slate-500 mt-1 font-medium">Trigger instant alerts when applicants apply to open roles.</p>
                                </div>
                                <CustomSwitch 
                                    checked={notifications.applications} 
                                    onChange={() => handleToggle("applications", "New application alerts")} 
                                />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-slate-200/60">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Interview Reminders</p>
                                    <p className="text-xs text-slate-500 mt-1 font-medium">Receive automated reminders 15 minutes before calendar schedules.</p>
                                </div>
                                <CustomSwitch 
                                    checked={notifications.reminders} 
                                    onChange={() => handleToggle("reminders", "Interview reminders")} 
                                />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-slate-200/60">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Task Deadlines</p>
                                    <p className="text-xs text-slate-500 mt-1 font-medium">Get notified about upcoming due action items.</p>
                                </div>
                                <CustomSwitch 
                                    checked={notifications.deadlines} 
                                    onChange={() => handleToggle("deadlines", "Task deadline alerts")} 
                                />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-slate-200/60">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Recruiter Team Activity</p>
                                    <p className="text-xs text-slate-500 mt-1 font-medium">Receive weekly logs summarizing other recruiters' activities.</p>
                                </div>
                                <CustomSwitch 
                                    checked={notifications.activity} 
                                    onChange={() => handleToggle("activity", "Team activity logs")} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email Automation Settings */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 ">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center border border-green-100">
                                    <Mail className="w-5 h-5 text-green-700" />
                                </div>
                                <div>
                                    <h2 className="text-slate-900 font-bold text-base">Hiring Automation</h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Automate applicant messaging triggers</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-slate-200/60">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Auto-respond to Applications</p>
                                    <p className="text-xs text-slate-500 mt-1 font-medium">Send confirmation receipt templates instantly when a resume is submitted.</p>
                                </div>
                                <CustomSwitch 
                                    checked={notifications.autoResponse} 
                                    onChange={() => handleToggle("autoResponse", "Application auto-response")} 
                                />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-slate-200/60">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Interview Confirmation Emails</p>
                                    <p className="text-xs text-slate-500 mt-1 font-medium">Send detailed calendar specs and room URLs on coordination events.</p>
                                </div>
                                <CustomSwitch 
                                    checked={notifications.interviewConfirm} 
                                    onChange={() => handleToggle("interviewConfirm", "Interview confirmations")} 
                                />
                            </div>
                            <button
                                onClick={() => handleAction("Edit Email Templates")}
                                className="text-indigo-600 font-black hover:text-indigo-800 text-sm flex items-center gap-1 cursor-pointer w-fit mt-2 pl-1"
                            >
                                Customize Automation Templates →
                            </button>
                        </div>
                    </div>

                    {/* Security & Access Keys */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 ">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                                    <Lock className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <h2 className="text-slate-900 font-bold text-base">Security & Access Keys</h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Protect team credentials and 2FA keys</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 divide-y divide-gray-100">
                            <div className="flex items-center justify-between py-4 first:pt-0">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Two-Factor Authentication (2FA)</p>
                                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Enforce Google Authenticator keys on workspace logins.</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAction("Two-Factor Authentication setup")}
                                    className="px-4.5 py-2 border border-gray-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer "
                                >
                                    Configure 2FA
 </motion.button>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Master Password</p>
                                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Change your workspace access password.</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAction("Password Update flow")}
                                    className="px-4.5 py-2 border border-gray-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer "
                                >
                                    Update Password
                                </motion.button>
                            </div>
                            <div className="flex items-center justify-between py-4 last:pb-0">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Active Recruiter Sessions</p>
                                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Manage and revoke active logging instances on other devices.</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAction("Active Sessions view")}
                                    className="px-4.5 py-2 border border-gray-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer "
                                >
                                    Audit Devices
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Billing */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 ">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                                    <CreditCard className="w-5 h-5 text-amber-700" />
                                </div>
                                <div>
                                    <h2 className="text-slate-900 font-bold text-base">Billing & Workspace Subscription</h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Manage licenses, renewals, and payment cards</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-indigo-50/30 rounded-2xl mb-4 border border-indigo-600/10">
                                <div className="mb-4 sm:mb-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-base font-black text-slate-900">Current Plan: <span className="text-indigo-600">{currentPlan}</span></p>
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wide flex items-center gap-1 border border-emerald-200">
                                            <Sparkles className="w-3 h-3" /> Active
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1.5 font-bold">Auto-renewal payment due: Dec 28, 2026</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveModal("managePlan")}
                                    className="px-5 py-3 bg-indigo-600   text-white rounded-xl text-sm font-bold transition-all  cursor-pointer flex items-center gap-1.5 border border-indigo-600/10"
                                >
                                    Scale Workspace Plan
                                </motion.button>
                            </div>
                            <button
                                onClick={() => setActiveModal("billingHistory")}
                                className="text-indigo-600 font-black hover:text-indigo-800 text-sm flex items-center gap-1 cursor-pointer pl-1 mt-2"
                            >
                                View Invoices & Payment History →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Manage Subscription Plan Modal */}
            <AnimatePresence>
                {activeModal === "managePlan" && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 15 }}
                            className="bg-white rounded-2xl max-w-5xl w-full p-8  border border-slate-100 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                                        Scale Subscription Plan
                                        <Sparkles className="w-5 h-5 text-indigo-600" />
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1 font-semibold">Scale recruitment tools and user licenses to align with your organization hiring target.</p>
                                </div>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Billing Cycle Selector */}
                            <div className="flex justify-center mb-8">
                                <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-2 border border-slate-200 ">
                                    <button
                                        onClick={() => setBillingCycle("monthly")}
                                        className={`px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${billingCycle === "monthly" ? "bg-white text-slate-900  border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
                                    >
                                        Monthly Billing
                                    </button>
                                    <button
                                        onClick={() => setBillingCycle("annual")}
                                        className={`px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${billingCycle === "annual" ? "bg-indigo-600 text-white " : "text-slate-500 hover:text-slate-900"}`}
                                    >
                                        Annual Billing <span className="px-2 py-0.5 bg-green-500 text-white text-[9px] uppercase font-black rounded-full animate-pulse">Save 20%</span>
                                    </button>
                                </div>
                            </div>

                            {/* Tiers Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                {plans.map((plan) => {
                                    const isActivePlan = currentPlan === plan.name;
                                    return (
                                        <div
                                            key={plan.name}
                                            className={`rounded-2xl p-6 border flex flex-col justify-between transition-all relative ${plan.popular ? "border-indigo-600 ring-4 ring-indigo-600/10 bg-rose-50/5 " : "border-slate-200 bg-white"}`}
                                        >
                                            {plan.popular && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-wider rounded-full ">
                                                    Most Popular
                                                </div>
                                            )}

                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-xl font-black text-slate-900">{plan.name}</h4>
                                                    {isActivePlan && (
                                                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-md border border-emerald-200 uppercase tracking-wide">
                                                            Active Plan
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-400 min-h-[36px] mb-6 font-bold leading-relaxed">{plan.description}</p>

                                                <div className="mb-6 flex items-baseline gap-1 bg-gray-50 p-3.5 rounded-xl border border-slate-100">
                                                    <span className="text-4xl font-black text-slate-900">
                                                        {billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual}
                                                    </span>
                                                    <span className="text-xs text-slate-400 font-bold">/ month</span>
                                                </div>

                                                <div className="space-y-3 mb-8 text-left">
                                                    <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Features Included:</p>
                                                    {plan.features.map((feat, idx) => (
                                                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-semibold">
                                                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                            <span>{feat}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: isActivePlan ? 1 : 1.02 }}
                                                whileTap={{ scale: isActivePlan ? 1 : 0.98 }}
                                                onClick={() => handleSelectPlan(plan)}
                                                disabled={isActivePlan}
                                                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${isActivePlan ? "bg-green-500 text-white cursor-default  border border-green-600" : plan.popular ? "bg-indigo-600 hover:bg-indigo-800 text-white  border border-indigo-600/10" : "bg-gray-100 hover:bg-gray-200 text-slate-800"}`}
                                            >
                                                {isActivePlan ? (
                                                    <>
                                                        <Check className="w-4 h-4 stroke-[3]" /> Current Active Plan
                                                    </>
                                                ) : (
                                                    <>
                                                        Select {plan.name} <ArrowRight className="w-4 h-4" />
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Premium Upgrade Checkout Simulator Modal */}
            <AnimatePresence>
                {activeModal === "checkout" && checkoutPlan && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 15 }}
                            className="bg-white rounded-2xl max-w-lg w-full p-8 border border-slate-100 shadow-premium relative text-left"
                        >
                            {!paymentSuccess ? (
                                <div>
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                                Checkout Subscription
                                            </h3>
                                            <p className="text-xs text-slate-400 font-semibold mt-0.5">Secure payment processing simulator</p>
                                        </div>
                                        <button
                                            onClick={() => setActiveModal("managePlan")}
                                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Plan Summary */}
                                    <div className="bg-indigo-50/50 border border-indigo-600/10 rounded-2xl p-4.5 mb-6 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-950">{checkoutPlan.name} Plan</h4>
                                            <p className="text-xs text-indigo-600 font-extrabold uppercase tracking-wide mt-1">
                                                {billingCycle === "monthly" ? "Monthly Billing" : "Annual Billing"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-slate-900">
                                                {billingCycle === "monthly" ? checkoutPlan.priceMonthly : checkoutPlan.priceAnnual}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold block">/ month</span>
                                        </div>
                                    </div>

                                    {/* Mock Card Form */}
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Cardholder Name</label>
                                            <input
                                                type="text"
                                                required
                                                defaultValue="HR Workspace Account"
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-sm font-semibold bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Card Number</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    required
                                                    maxLength={19}
                                                    defaultValue="4242 •••• •••• 4242"
                                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-sm font-semibold bg-white pr-10"
                                                />
                                                <div className="absolute right-4 top-3 text-slate-400">
                                                    <CreditCard className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    required
                                                    maxLength={5}
                                                    placeholder="MM/YY"
                                                    defaultValue="12/28"
                                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-sm font-semibold bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">CVC Security Code</label>
                                                <input
                                                    type="password"
                                                    required
                                                    maxLength={3}
                                                    defaultValue="•••"
                                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-600 text-sm font-semibold bg-white"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setActiveModal("managePlan")}
                                            className="w-1/3 py-3 border border-slate-250 text-slate-700 bg-white hover:bg-gray-50 rounded-xl transition-all font-bold text-xs cursor-pointer text-center"
                                        >
                                            CANCEL
                                        </button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="button"
                                            disabled={isPaying}
                                            onClick={() => {
                                                setIsPaying(true);
                                                setTimeout(() => {
                                                    setIsPaying(false);
                                                    setPaymentSuccess(true);
                                                    setCurrentPlan(checkoutPlan.name);
                                                    // Add invoice
                                                    const nextInvId = invoices.length + 1;
                                                    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
                                                    const priceStr = billingCycle === "monthly" ? checkoutPlan.priceMonthly : checkoutPlan.priceAnnual;
                                                    const newInv = {
                                                        id: `INV-2026-${String(nextInvId).padStart(2, '0')}`,
                                                        date: dateStr,
                                                        plan: `${checkoutPlan.name} Plan Upgrade`,
                                                        amount: `${priceStr}.00`,
                                                        status: "Paid"
                                                    };
                                                    setInvoices([newInv, ...invoices]);
                                                    showToast(`Successfully upgraded to ${checkoutPlan.name}!`);
                                                }, 1500);
                                            }}
                                            className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5"
                                        >
                                            {isPaying ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                `PAY ${billingCycle === "monthly" ? checkoutPlan.priceMonthly : checkoutPlan.priceAnnual}.00`
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-premium">
                                        <Check className="w-8 h-8 stroke-[3]" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900">Upgrade Successful!</h3>
                                    <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed max-w-sm mx-auto">
                                        Your workspace subscription has been upgraded to the <span className="text-indigo-600 font-bold">{checkoutPlan.name} Plan</span>. A confirmation invoice has been generated in your history ledger.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveModal(null)}
                                        className="mt-6 px-6 py-2.5 bg-slate-900 text-white font-extrabold text-xs rounded-xl hover:bg-slate-800 cursor-pointer"
                                    >
                                        RETURN TO SETTINGS
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* View Billing History Modal */}
            <AnimatePresence>
                {activeModal === "billingHistory" && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 15 }}
                            className="bg-white rounded-2xl max-w-3xl w-full p-8  border border-slate-100 max-h-[85vh] flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 flex-shrink-0">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">Invoice Registry</h3>
                                    <p className="text-sm text-slate-500 mt-1 font-semibold">Verify past transactions and download PDF records.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => showToast("All invoices downloaded as a zip folder.")}
                                        className="px-4 py-2 border border-gray-300 text-slate-700 hover:bg-gray-50 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer "
                                    >
                                        <Download className="w-4 h-4 text-slate-500" /> Save All
                                    </button>
                                    <button
                                        onClick={() => setActiveModal(null)}
                                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Invoices List */}
                            <div className="flex-1 overflow-y-auto space-y-3 pr-1.5 text-left">
                                {invoices.map((inv) => (
                                    <div
                                        key={inv.id}
                                        className="flex items-center justify-between p-4.5 bg-gray-50/60 hover:bg-gray-50 rounded-2xl border border-slate-200/60 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700 flex-shrink-0 border border-amber-100 ">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-slate-900 text-sm">{inv.plan}</h4>
                                                    <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-200 text-slate-700 font-bold rounded">
                                                        {inv.id}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500 font-semibold mt-0.5">Paid on {inv.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm font-black text-slate-900">{inv.amount}</p>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded font-black text-[9px] bg-green-100 text-green-800 border border-green-200 uppercase tracking-wider mt-0.5">
                                                    {inv.status}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => showToast(`Receipt ${inv.id} download initiated.`)}
                                                className="p-2.5 bg-white hover:bg-gray-150 text-slate-600 rounded-xl border border-slate-200  transition-colors cursor-pointer"
                                                title="Save PDF"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-bold flex-shrink-0">
                                <span>Showing 5 invoices</span>
                                <span>Secure transaction management backed by Stripe</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl  flex items-center gap-3 z-50 ${toast.type === "success" ? "bg-gray-900 border border-white/10 text-white" : "bg-blue-50 border border-blue-200 text-blue-800"
                        }`}
                    >
                        {toast.type === "success" ? (
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                        ) : (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                        )}
                        <p className="text-xs font-black">
                            {toast.message}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


