import { Camera, Mail, Phone, MapPin, Briefcase, Calendar, Award, Shield, LogOut, CheckCircle2, X, Activity, Filter, Download, Key, Lock, Smartphone, Laptop, Globe, RefreshCw, AlertTriangle, Sparkles, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProfilePageProps {
    onNavigate?: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
    // Profile State
    const [profile, setProfile] = useState({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@mployus.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        jobTitle: "Hiring Manager",
        department: "Human Resources"
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Security Modal State
    const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
    const [securityTab, setSecurityTab] = useState<"password" | "2fa" | "sessions" | "audit">("password");
    
    // Password Form State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    // 2FA State
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

    // Sessions State
    const [activeSessions, setActiveSessions] = useState([
        { id: 1, device: "Windows PC - Chrome", location: "San Francisco, USA", ip: "192.168.1.42", current: true, time: "Active now", icon: Laptop },
        { id: 2, device: "MacBook Air M2 - Safari", location: "San Francisco, USA", ip: "192.168.1.88", current: false, time: "2 hours ago", icon: Laptop },
        { id: 3, device: "iPhone 15 Pro - iOS App", location: "San Jose, USA", ip: "172.56.21.104", current: false, time: "Yesterday at 4:15 PM", icon: Smartphone },
    ]);

    // Audit Log State
    const [auditLogs, setAuditLogs] = useState([
        { event: "Successful login", device: "Chrome / Windows", ip: "192.168.1.42", time: "Today, 09:30 AM", status: "Success" },
        { event: "Password updated", device: "Chrome / Windows", ip: "192.168.1.42", time: "May 10, 2026, 04:15 PM", status: "Success" },
        { event: "2FA backup keys viewed", device: "Safari / macOS", ip: "192.168.1.88", time: "May 08, 2026, 11:20 AM", status: "Success" },
        { event: "Failed login attempt", device: "Firefox / Linux", ip: "45.132.22.19", time: "May 01, 2026, 02:40 AM", status: "Warning" },
    ]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleSaveChanges = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsEditing(false);
            showToast("Profile details updated successfully!");
        }, 800);
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            showToast("New passwords do not match!");
            return;
        }
        if (newPassword.length < 8) {
            showToast("Password must be at least 8 characters long.");
            return;
        }
        setIsUpdatingPassword(true);
        setTimeout(() => {
            setIsUpdatingPassword(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            showToast("Account password updated successfully!");
        }, 800);
    };

    const handleRevokeSession = (id: number) => {
        setActiveSessions(activeSessions.filter(s => s.id !== id));
        showToast("Device session revoked successfully.");
    };

    const activityLog = [
        { action: "Updated job posting", item: "Senior React Developer", time: "2 hours ago" },
        { action: "Scheduled interview with", item: "Sarah Johnson", time: "5 hours ago" },
        { action: "Reviewed applicant scorecard for", item: "Michael Chen", time: "1 day ago" },
        { action: "Added new team member", item: "Emily Rodriguez", time: "2 days ago" },
        { action: "Changed pipeline status for", item: "Backend Developer role", time: "3 days ago" },
    ];

    return (
        <div className="p-8 relative text-left">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        My Account Profile
                        <Sparkles className="w-5.5 h-5.5 text-indigo-600 animate-pulse" />
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Manage your personal credentials, contact info, and workspace authentication.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Profile Card */}
                    <div className="col-span-1 space-y-6">
                        {/* Profile Picture Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/80  p-6 flex flex-col items-center">
                            <div className="relative inline-block mb-4">
                                <Avatar className="w-24 h-24  border-2 border-slate-100">
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=employer" />
                                    <AvatarFallback className="font-black text-xl bg-indigo-600 text-white">
                                        {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <motion.button 
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => showToast("Avatar upload feature triggered.")}
                                    className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600   rounded-full flex items-center justify-center  cursor-pointer border border-indigo-600/15"
                                >
                                    <Camera className="w-3.5 h-3.5 text-white" />
                                </motion.button>
                            </div>
                            <h2 className="text-slate-900 font-extrabold mb-0.5 font-black text-lg">{profile.firstName} {profile.lastName}</h2>
                            <p className="text-xs text-indigo-600 mb-4 font-extrabold bg-rose-50 px-2.5 py-0.5 rounded-md border border-indigo-600/10 uppercase tracking-wider">{profile.jobTitle}</p>
                            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-150 ">
                                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                                <span>{profile.location}</span>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl border border-slate-200/80  p-6">
                            <h3 className="text-slate-900 mb-4 font-black text-sm uppercase tracking-wider">Workspace Performance</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50/50 border border-slate-100">
                                    <span className="text-xs text-slate-500 font-bold">Active Jobs Managed</span>
                                    <span className="text-slate-900 font-black bg-rose-50 px-2 py-0.5 rounded-lg border border-indigo-600/10 text-xs">12</span>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50/50 border border-slate-100">
                                    <span className="text-xs text-slate-500 font-bold">Applicants Reviewed</span>
                                    <span className="text-slate-900 font-extrabold font-black bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-150 text-xs">248</span>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50/50 border border-slate-100">
                                    <span className="text-xs text-slate-500 font-bold">Interviews Hosted</span>
                                    <span className="text-slate-900 font-extrabold font-black bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-150 text-xs">36</span>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50/50 border border-slate-100">
                                    <span className="text-xs text-slate-500 font-bold">Successful Hires</span>
                                    <span className="text-slate-900 font-extrabold font-black bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-150 text-xs">18</span>
                                </div>
                            </div>
                        </div>

                        {/* Account Actions */}
                        <div className="bg-white rounded-2xl border border-slate-200/80  p-6">
                            <h3 className="text-slate-900 mb-4 font-black text-sm uppercase tracking-wider">Account Credentials</h3>
                            <div className="space-y-2">
                                <motion.button 
                                    whileHover={{ x: 3 }}
                                    onClick={() => setIsSecurityModalOpen(true)}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-rose-50/45 rounded-xl transition-all text-left cursor-pointer border border-transparent hover:border-indigo-600/10 font-bold"
                                >
                                    <Shield className="w-4.5 h-4.5 text-indigo-600" />
                                    <span className="text-sm">Security & 2FA Keys</span>
                                </motion.button>
                                <motion.button 
                                    whileHover={{ x: 3 }}
                                    onClick={() => showToast("Sign out request initiated.")}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-left cursor-pointer font-bold border border-transparent hover:border-rose-100"
                                >
                                    <LogOut className="w-4.5 h-4.5" />
                                    <span className="text-sm">Sign Out Session</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Profile Details */}
                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="bg-white rounded-2xl border border-slate-200/80  overflow-hidden">
                            <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                                <div>
                                    <h2 className="text-slate-900 font-black text-base">Personal Details</h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Edit contact credentials and location</p>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${isEditing ? "bg-gray-100 text-slate-500 border-slate-200 hover:bg-gray-200" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-600/20 border-indigo-600/10"}`}
                                >
                                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                                </motion.button>
                            </div>
                            <form onSubmit={handleSaveChanges} className="p-6 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            value={profile.firstName}
                                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-600 ${!isEditing ? "bg-gray-50 border-slate-200 text-slate-500 font-bold cursor-not-allowed" : "bg-white border-gray-300 text-slate-900  font-bold"}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={profile.lastName}
                                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-600 ${!isEditing ? "bg-gray-50 border-slate-200 text-slate-500 font-bold cursor-not-allowed" : "bg-white border-gray-300 text-slate-900  font-bold"}`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                    <div className={`flex items-center gap-3 px-4 py-2.5 border rounded-xl transition-all ${!isEditing ? "bg-gray-50 border-slate-200 text-slate-500 cursor-not-allowed" : "bg-white border-gray-300  text-slate-900 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/20"}`}>
                                        <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            disabled={!isEditing}
                                            className="flex-1 bg-transparent outline-none text-sm font-bold"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                    <div className={`flex items-center gap-3 px-4 py-2.5 border rounded-xl transition-all ${!isEditing ? "bg-gray-50 border-slate-200 text-slate-500 cursor-not-allowed" : "bg-white border-gray-300  text-slate-900 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/20"}`}>
                                        <Phone className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            disabled={!isEditing}
                                            className="flex-1 bg-transparent outline-none text-sm font-bold"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Workspace Location</label>
                                    <div className={`flex items-center gap-3 px-4 py-2.5 border rounded-xl transition-all ${!isEditing ? "bg-gray-50 border-slate-200 text-slate-500 cursor-not-allowed" : "bg-white border-gray-300  text-slate-900 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/20"}`}>
                                        <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                        <input
                                            type="text"
                                            value={profile.location}
                                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                            disabled={!isEditing}
                                            className="flex-1 bg-transparent outline-none text-sm font-bold"
                                        />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isEditing && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="pt-4 flex items-center gap-3"
                                        >
                                            <motion.button 
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={isSaving}
                                                className="px-6 py-2.5 bg-indigo-600   text-white rounded-xl transition-all font-bold text-sm  min-w-[140px] flex items-center justify-center cursor-pointer border border-indigo-600/10"
                                            >
                                                {isSaving ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    "Save Changes"
                                                )}
                                            </motion.button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-5 py-2.5 border border-gray-300 text-slate-600 hover:bg-gray-50 rounded-xl font-bold text-sm cursor-pointer transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>

                        {/* Professional Details */}
                        <div className="bg-white rounded-2xl border border-slate-200/80  overflow-hidden">
                            <div className="p-6 border-b border-slate-100 bg-white">
                                <h2 className="text-slate-900 font-bold text-base">Workspace Permissions</h2>
                            </div>
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
                                    <div className="flex items-center gap-3 px-4 py-2.5 border border-slate-200 bg-gray-50 rounded-xl">
                                        <Briefcase className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                        <input
                                            type="text"
                                            value={profile.jobTitle}
                                            disabled
                                            className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Assign Department</label>
                                    <select 
                                        value={profile.department}
                                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white text-sm font-bold text-slate-700 cursor-pointer"
                                    >
                                        <option>Human Resources</option>
                                        <option>Engineering</option>
                                        <option>Product Development</option>
                                        <option>Sales & Success</option>
                                        <option>Marketing</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Member Since</label>
                                        <div className="flex items-center gap-3 px-4 py-2.5 border border-slate-200 bg-gray-50 rounded-xl">
                                            <Calendar className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                            <input
                                                type="text"
                                                defaultValue="January 15, 2024"
                                                disabled
                                                className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Role Permissions</label>
                                        <div className="flex items-center gap-3 px-4 py-2.5 border border-slate-200 bg-gray-50 rounded-xl">
                                            <Award className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                            <input
                                                type="text"
                                                defaultValue="Full Owner Access"
                                                disabled
                                                className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl border border-slate-200/80  overflow-hidden">
                            <div className="p-6 border-b border-slate-100 bg-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-slate-900 font-bold text-base">My Recent Actions</h2>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Audit log of your recent interactions</p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            if (onNavigate) {
                                                onNavigate("activity");
                                            }
                                        }}
                                        className="text-indigo-600 font-black hover:text-indigo-800 text-sm flex items-center gap-1 cursor-pointer"
                                    >
                                        View All Log →
                                    </button>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {activityLog.map((activity, index) => (
                                    <div key={index} className="p-4.5 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8.5 h-8.5 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-600/10 ">
                                                <Activity className="w-4 h-4 text-indigo-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-600 truncate leading-relaxed">
                                                    {activity.action} <span className="text-indigo-600 font-black">{activity.item}</span>
                                                </p>
                                                <p className="text-[10px] font-extrabold text-slate-400 mt-1 uppercase tracking-wider">{activity.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comprehensive Security Settings Modal */}
            <AnimatePresence>
                {isSecurityModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 15 }}
                            className="bg-white rounded-2xl max-w-4xl w-full p-8  border border-slate-100 max-h-[90vh] flex flex-col text-left"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 flex-shrink-0">
                                <div>
                                    <div className="flex items-center gap-2.5 mb-1">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-600/10 ">
                                            <Shield className="w-5.5 h-5.5" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900">Security Settings</h3>
                                            <p className="text-sm text-slate-500 mt-0.5 font-semibold">Manage your authentication methods and monitor active sessions.</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsSecurityModalOpen(false)}
                                    className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Navigation Tabs */}
                            <div className="flex items-center gap-2 border-b border-slate-200 mb-6 flex-shrink-0 overflow-x-auto">
                                <button
                                    onClick={() => setSecurityTab("password")}
                                    className={`px-4 py-2.5 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${securityTab === "password" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-900"}`}
                                >
                                    <Key className="w-4 h-4" /> Change Password
                                </button>
                                <button
                                    onClick={() => setSecurityTab("2fa")}
                                    className={`px-4 py-2.5 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${securityTab === "2fa" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-900"}`}
                                >
                                    <Lock className="w-4 h-4" /> Two-Factor Auth (2FA)
                                </button>
                                <button
                                    onClick={() => setSecurityTab("sessions")}
                                    className={`px-4 py-2.5 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${securityTab === "sessions" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-900"}`}
                                >
                                    <Laptop className="w-4 h-4" /> Active Devices ({activeSessions.length})
                                </button>
                                <button
                                    onClick={() => setSecurityTab("audit")}
                                    className={`px-4 py-2.5 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${securityTab === "audit" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-900"}`}
                                >
                                    <Globe className="w-4 h-4" /> Access Audit Trail
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="flex-1 overflow-y-auto pr-1.5">
                                {securityTab === "password" && (
                                    <form onSubmit={handleUpdatePassword} className="space-y-5 max-w-xl text-left">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••••••"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-semibold "
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                                            <input
                                                type="password"
                                                placeholder="Minimum 8 characters"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-semibold "
                                            />
                                            {newPassword && (
                                                <div className="mt-2.5 flex items-center gap-2">
                                                    <div className="flex-1 flex gap-1 h-1.5 bg-gray-150 rounded-full overflow-hidden">
                                                        <div className={`h-full transition-all ${newPassword.length > 7 ? "w-full bg-emerald-500" : newPassword.length > 4 ? "w-2/3 bg-amber-500" : "w-1/3 bg-rose-500"}`}></div>
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                                        {newPassword.length > 7 ? "Strong" : newPassword.length > 4 ? "Medium" : "Weak"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                                            <input
                                                type="password"
                                                placeholder="Confirm new password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-semibold "
                                            />
                                        </div>
                                        <div className="pt-2">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={isUpdatingPassword}
                                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-800 text-white font-bold rounded-xl  transition-all cursor-pointer text-sm min-w-[160px] flex items-center justify-center border border-indigo-600/10"
                                            >
                                                {isUpdatingPassword ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    "Update Password"
                                                )}
                                            </motion.button>
                                        </div>
                                    </form>
                                )}

                                {securityTab === "2fa" && (
                                    <div className="space-y-6 max-w-2xl text-left">
                                        <div className="p-5 bg-gray-50/75 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
                                            <div>
                                                <h4 className="text-base font-black text-slate-900 mb-1">Authenticator Application</h4>
                                                <p className="text-xs text-slate-500 font-semibold leading-relaxed">Use secure applications (Google Authenticator, Authy) to generate temporary OTP codes.</p>
                                            </div>
                                            <div>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        setTwoFactorEnabled(!twoFactorEnabled);
                                                        showToast(twoFactorEnabled ? "2FA has been deactivated." : "2FA activated successfully!");
                                                    }}
                                                    className={`px-5 py-2.5 font-bold rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap border ${twoFactorEnabled ? "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100" : "bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700 "}`}
                                                >
                                                    {twoFactorEnabled ? "Deactivate 2FA" : "Activate 2FA"}
                                                </motion.button>
                                            </div>
                                        </div>

                                        {twoFactorEnabled && (
                                            <div className="p-6 border border-slate-200/80 bg-indigo-50/10 rounded-2xl space-y-4 ">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 mt-0.5 border border-emerald-100">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-slate-900 text-sm">Two-Factor Key is Active</h5>
                                                        <p className="text-xs text-slate-500 mt-0.5 font-semibold">Your recruiter credentials are fully locked under OTP challenges.</p>
                                                    </div>
                                                </div>
                                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Backup Recovery Codes</span>
                                                    <button
                                                        onClick={() => showToast("Backup recovery keys saved to PDF.")}
                                                        className="text-xs font-black text-indigo-600 hover:underline cursor-pointer"
                                                    >
                                                        View / Download Keys
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-5 bg-amber-50/70 border border-amber-200/70 rounded-2xl flex items-start gap-3 text-amber-900">
                                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-700" />
                                            <div className="text-xs font-semibold leading-relaxed">
                                                <span className="font-bold block text-sm mb-1 text-amber-950 uppercase tracking-wider">Safety Disclaimer</span>
                                                Losing your active authenticator app without recovery codes will lock your access. Make sure you download and secure offline keys in a safe place.
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {securityTab === "sessions" && (
                                    <div className="space-y-4 text-left">
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">Device Sessions currently logged into MployUs</p>
                                        <div className="space-y-3">
                                            {activeSessions.map((session) => {
                                                const DeviceIcon = session.icon;
                                                return (
                                                    <div key={session.id} className="p-4 bg-gray-50/60 border border-slate-200 rounded-2xl flex items-center justify-between gap-4 ">
                                                        <div className="flex items-center gap-3.5 min-w-0">
                                                            <div className="w-10 h-10 bg-white  border border-slate-200 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                                                                <DeviceIcon className="w-5 h-5" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <h5 className="font-bold text-slate-900 text-sm truncate">{session.device}</h5>
                                                                    {session.current && (
                                                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black rounded border border-emerald-200 uppercase tracking-wider">Active Now</span>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs font-semibold text-slate-500 mt-0.5 truncate">{session.location} • IP: {session.ip}</p>
                                                                <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-wide">{session.time}</p>
                                                            </div>
                                                        </div>
                                                        {!session.current && (
                                                            <button
                                                                onClick={() => handleRevokeSession(session.id)}
                                                                className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 font-bold rounded-xl text-xs transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
                                                            >
                                                                Revoke Access
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {securityTab === "audit" && (
                                    <div className="space-y-4 text-left">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Recruiter access events and authentication checks</p>
                                            <button
                                                onClick={() => {
                                                    showToast("Security audit log refreshed.");
                                                }}
                                                className="text-xs font-black text-indigo-600 flex items-center gap-1 hover:underline cursor-pointer"
                                            >
                                                <RefreshCw className="w-3.5 h-3.5" /> Refresh Audit Trail
                                            </button>
                                        </div>
                                        <div className="border border-slate-200 rounded-2xl overflow-hidden ">
                                            <table className="w-full text-left text-xs">
                                                <thead className="bg-gray-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                                                    <tr>
                                                        <th className="px-6 py-3.5">Event Action</th>
                                                        <th className="px-6 py-3.5">Device Specs</th>
                                                        <th className="px-6 py-3.5">IP Address</th>
                                                        <th className="px-6 py-3.5">Timestamp</th>
                                                        <th className="px-6 py-3.5">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {auditLogs.map((log, index) => (
                                                        <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                                                            <td className="px-6 py-4 font-bold text-slate-900">{log.event}</td>
                                                            <td className="px-6 py-4 text-slate-500 font-semibold">{log.device}</td>
                                                            <td className="px-6 py-4 text-slate-500 font-mono font-semibold">{log.ip}</td>
                                                            <td className="px-6 py-4 text-slate-400 font-bold">{log.time}</td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${log.status === "Success" ? "bg-green-100 text-green-855" : "bg-amber-100 text-amber-855"}`}>
                                                                    {log.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 px-4 py-3 bg-gray-900 text-white rounded-xl  flex items-center gap-3 z-50 border border-white/10"
                    >
                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <p className="text-xs font-black">{toastMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}



