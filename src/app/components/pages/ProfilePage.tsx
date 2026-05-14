import { Camera, Mail, Phone, MapPin, Briefcase, Calendar, Award, Shield, LogOut, CheckCircle2, X, Activity, Filter, Download, Key, Lock, Smartphone, Laptop, Globe, RefreshCw, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";

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
    const [toast, setToast] = useState<string | null>(null);

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
    const auditLogs = [
        { event: "Successful login", device: "Chrome / Windows", ip: "192.168.1.42", time: "Today, 09:30 AM", status: "Success" },
        { event: "Password updated", device: "Chrome / Windows", ip: "192.168.1.42", time: "May 10, 2026, 04:15 PM", status: "Success" },
        { event: "2FA backup keys viewed", device: "Safari / macOS", ip: "192.168.1.88", time: "May 08, 2026, 11:20 AM", status: "Success" },
        { event: "Failed login attempt", device: "Firefox / Linux", ip: "45.132.22.19", time: "May 01, 2026, 02:40 AM", status: "Warning" },
    ];

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleSaveChanges = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsEditing(false);
            showToast("Profile details updated successfully!");
        }, 600);
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
        { action: "Reviewed candidate scorecard for", item: "Michael Chen", time: "1 day ago" },
        { action: "Added new team member", item: "Emily Rodriguez", time: "2 days ago" },
        { action: "Changed pipeline status for", item: "Backend Developer role", time: "3 days ago" },
    ];

    return (
        <div className="p-8 relative">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-gray-900 mb-2 text-2xl font-bold">My Profile</h1>
                        <p className="text-gray-600">Manage your personal information and preferences</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Profile Card */}
                    <div className="col-span-1 space-y-6">
                        {/* Profile Picture Card */}
                        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                            <div className="text-center">
                                <div className="relative inline-block mb-4">
                                    <Avatar className="w-24 h-24 shadow-md">
                                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=employer" />
                                        <AvatarFallback>{profile.firstName.charAt(0)}{profile.lastName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <button 
                                        onClick={() => showToast("Profile avatar update dialog triggered.")}
                                        className="absolute bottom-0 right-0 w-8 h-8 bg-[#800020] rounded-full flex items-center justify-center hover:bg-[#600018] transition-colors shadow-sm cursor-pointer"
                                    >
                                        <Camera className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                                <h2 className="text-gray-900 mb-1 font-bold text-lg">{profile.firstName} {profile.lastName}</h2>
                                <p className="text-sm text-gray-500 mb-4 font-medium">{profile.jobTitle}</p>
                                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 px-3 py-1 bg-gray-50 rounded-lg inline-flex mx-auto border border-gray-100">
                                    <MapPin className="w-3.5 h-3.5 text-[#800020]" />
                                    <span>{profile.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                            <h3 className="text-gray-900 mb-4 font-bold text-base">Quick Stats</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 font-medium">Active Jobs</span>
                                    <span className="text-gray-900 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100 text-xs">12</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 font-medium">Candidates Reviewed</span>
                                    <span className="text-gray-900 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100 text-xs">248</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 font-medium">Interviews Scheduled</span>
                                    <span className="text-gray-900 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 text-xs">36</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 font-medium">Hires Made</span>
                                    <span className="text-gray-900 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-100 text-xs">18</span>
                                </div>
                            </div>
                        </div>

                        {/* Account Actions */}
                        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                            <h3 className="text-gray-900 mb-4 font-bold text-base">Account</h3>
                            <div className="space-y-2">
                                <button 
                                    onClick={() => setIsSecurityModalOpen(true)}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left cursor-pointer font-medium"
                                >
                                    <Shield className="w-4 h-4 text-[#800020]" />
                                    <span className="text-sm font-bold">Security Settings</span>
                                </button>
                                <button 
                                    onClick={() => showToast("Sign out request triggered.")}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left cursor-pointer font-medium"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="text-sm">Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Profile Details */}
                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200 bg-white flex items-center justify-between">
                                <h2 className="text-gray-900 font-bold text-base">Personal Information</h2>
                                <button 
                                    onClick={() => {
                                        if (isEditing) {
                                            setIsEditing(false);
                                        } else {
                                            setIsEditing(true);
                                        }
                                    }}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${isEditing ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-[#800020]/10 text-[#800020] hover:bg-[#800020]/20"}`}
                                >
                                    {isEditing ? "Cancel Edit" : "Edit Details"}
                                </button>
                            </div>
                            <form onSubmit={handleSaveChanges} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            value={profile.firstName}
                                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm ${!isEditing ? "bg-gray-50 border-gray-200 text-gray-600 font-medium" : "bg-white border-gray-300 text-gray-900 shadow-xs font-semibold"}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={profile.lastName}
                                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm ${!isEditing ? "bg-gray-50 border-gray-200 text-gray-600 font-medium" : "bg-white border-gray-300 text-gray-900 shadow-xs font-semibold"}`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <div className={`flex items-center gap-3 px-4 py-2.5 border rounded-lg ${!isEditing ? "bg-gray-50 border-gray-200 text-gray-600" : "bg-white border-gray-300 shadow-xs text-gray-900 focus-within:border-[#800020] focus-within:ring-1 focus-within:ring-[#800020]"}`}>
                                        <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            disabled={!isEditing}
                                            className="flex-1 bg-transparent outline-none text-sm font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <div className={`flex items-center gap-3 px-4 py-2.5 border rounded-lg ${!isEditing ? "bg-gray-50 border-gray-200 text-gray-600" : "bg-white border-gray-300 shadow-xs text-gray-900 focus-within:border-[#800020] focus-within:ring-1 focus-within:ring-[#800020]"}`}>
                                        <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            disabled={!isEditing}
                                            className="flex-1 bg-transparent outline-none text-sm font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <div className={`flex items-center gap-3 px-4 py-2.5 border rounded-lg ${!isEditing ? "bg-gray-50 border-gray-200 text-gray-600" : "bg-white border-gray-300 shadow-xs text-gray-900 focus-within:border-[#800020] focus-within:ring-1 focus-within:ring-[#800020]"}`}>
                                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <input
                                            type="text"
                                            value={profile.location}
                                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                            disabled={!isEditing}
                                            className="flex-1 bg-transparent outline-none text-sm font-medium"
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="pt-4 flex items-center gap-3 animate-in fade-in duration-150">
                                        <button 
                                            type="submit"
                                            disabled={isSaving}
                                            className="px-6 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors font-bold text-sm shadow-sm cursor-pointer min-w-[140px] flex items-center justify-center"
                                        >
                                            {isSaving ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                "Save Changes"
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold text-sm cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Professional Details */}
                        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200 bg-white">
                                <h2 className="text-gray-900 font-bold text-base">Professional Details</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                                    <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg">
                                        <Briefcase className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <input
                                            type="text"
                                            value={profile.jobTitle}
                                            disabled
                                            className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-600"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                    <select 
                                        value={profile.department}
                                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white text-sm font-medium"
                                    >
                                        <option>Human Resources</option>
                                        <option>Engineering</option>
                                        <option>Product</option>
                                        <option>Sales</option>
                                        <option>Marketing</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                                        <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg">
                                            <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            <input
                                                type="text"
                                                defaultValue="January 15, 2024"
                                                disabled
                                                className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Role Permissions</label>
                                        <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg">
                                            <Award className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            <input
                                                type="text"
                                                defaultValue="Full Access"
                                                disabled
                                                className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200 bg-white">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-900 font-bold text-base">Recent Activity</h2>
                                    <button 
                                        onClick={() => {
                                            if (onNavigate) {
                                                onNavigate("activity");
                                            }
                                        }}
                                        className="text-[#800020] font-bold hover:text-[#600018] text-sm flex items-center gap-1 cursor-pointer"
                                    >
                                        View All →
                                    </button>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {activityLog.map((activity, index) => (
                                    <div key={index} className="p-4 hover:bg-gray-50/80 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-[#F5E6E8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <div className="w-2.5 h-2.5 bg-[#800020] rounded-full" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {activity.action} <span className="text-[#800020] font-bold">{activity.item}</span>
                                                </p>
                                                <p className="text-xs font-semibold text-gray-400 mt-0.5">{activity.time}</p>
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
            {isSecurityModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
                    <div className="bg-white rounded-2xl max-w-4xl w-full p-8 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col text-left">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 flex-shrink-0">
                            <div>
                                <div className="flex items-center gap-2.5 mb-1">
                                    <div className="w-10 h-10 bg-[#800020]/10 rounded-xl flex items-center justify-center text-[#800020]">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Security Settings</h3>
                                        <p className="text-sm text-gray-500">Protect your employer workspace and manage authentication methods.</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsSecurityModalOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex items-center gap-2 border-b border-gray-200 mb-6 flex-shrink-0 overflow-x-auto">
                            <button
                                onClick={() => setSecurityTab("password")}
                                className={`px-4 py-2.5 font-bold text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${securityTab === "password" ? "border-[#800020] text-[#800020]" : "border-transparent text-gray-500 hover:text-gray-900"}`}
                            >
                                <Key className="w-4 h-4" /> Password
                            </button>
                            <button
                                onClick={() => setSecurityTab("2fa")}
                                className={`px-4 py-2.5 font-bold text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${securityTab === "2fa" ? "border-[#800020] text-[#800020]" : "border-transparent text-gray-500 hover:text-gray-900"}`}
                            >
                                <Lock className="w-4 h-4" /> Two-Factor Auth (2FA)
                            </button>
                            <button
                                onClick={() => setSecurityTab("sessions")}
                                className={`px-4 py-2.5 font-bold text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${securityTab === "sessions" ? "border-[#800020] text-[#800020]" : "border-transparent text-gray-500 hover:text-gray-900"}`}
                            >
                                <Laptop className="w-4 h-4" /> Active Sessions
                            </button>
                            <button
                                onClick={() => setSecurityTab("audit")}
                                className={`px-4 py-2.5 font-bold text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${securityTab === "audit" ? "border-[#800020] text-[#800020]" : "border-transparent text-gray-500 hover:text-gray-900"}`}
                            >
                                <Globe className="w-4 h-4" /> Login History
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto pr-2">
                            {securityTab === "password" && (
                                <form onSubmit={handleUpdatePassword} className="space-y-5 max-w-xl">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••••••"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Minimum 8 characters"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm font-medium"
                                        />
                                        {newPassword && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="flex-1 flex gap-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full transition-all ${newPassword.length > 7 ? "w-full bg-emerald-500" : newPassword.length > 4 ? "w-2/3 bg-amber-500" : "w-1/3 bg-rose-500"}`}></div>
                                                </div>
                                                <span className="text-xs font-bold text-gray-500">
                                                    {newPassword.length > 7 ? "Strong" : newPassword.length > 4 ? "Medium" : "Weak"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Repeat new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm font-medium"
                                        />
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isUpdatingPassword}
                                            className="px-6 py-2.5 bg-[#800020] hover:bg-[#600018] text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer text-sm min-w-[160px] flex items-center justify-center"
                                        >
                                            {isUpdatingPassword ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                "Update Password"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {securityTab === "2fa" && (
                                <div className="space-y-6 max-w-2xl">
                                    <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between gap-4">
                                        <div>
                                            <h4 className="text-base font-bold text-gray-900 mb-1">Authenticator App</h4>
                                            <p className="text-sm text-gray-600">Use an app like Google Authenticator or Authy to generate verification codes.</p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => {
                                                    setTwoFactorEnabled(!twoFactorEnabled);
                                                    showToast(twoFactorEnabled ? "2FA disabled." : "2FA enabled successfully.");
                                                }}
                                                className={`px-5 py-2.5 font-bold rounded-xl text-sm transition-colors cursor-pointer whitespace-nowrap ${twoFactorEnabled ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200" : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"}`}
                                            >
                                                {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                                            </button>
                                        </div>
                                    </div>

                                    {twoFactorEnabled && (
                                        <div className="p-6 border border-gray-200 rounded-2xl space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 mt-0.5">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-gray-900 text-sm">Two-Factor Authentication is currently active</h5>
                                                    <p className="text-xs text-gray-500 mt-0.5">Your employer account is protected against unauthorized access.</p>
                                                </div>
                                            </div>
                                            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                                                <span className="text-xs font-bold text-gray-600">Recovery Codes</span>
                                                <button
                                                    onClick={() => showToast("Downloading backup recovery keys...")}
                                                    className="text-xs font-bold text-[#800020] hover:underline cursor-pointer"
                                                >
                                                    View / Download Backup Keys
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-900">
                                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <div className="text-xs font-medium leading-relaxed">
                                            <span className="font-bold block text-sm mb-1">Important Safety Notice</span>
                                            If you lose your device and don't have your recovery codes, you will lose access to your employer workspace. Ensure you store your recovery keys in a secure offline location.
                                        </div>
                                    </div>
                                </div>
                            )}

                            {securityTab === "sessions" && (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600 mb-4">You are currently logged into MployUs on these devices. If you do not recognize a device, revoke access immediately.</p>
                                    <div className="space-y-3">
                                        {activeSessions.map((session) => {
                                            const DeviceIcon = session.icon;
                                            return (
                                                <div key={session.id} className="p-4 bg-gray-50/80 border border-gray-200 rounded-2xl flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3.5 min-w-0">
                                                        <div className="w-10 h-10 bg-white shadow-xs border border-gray-200 rounded-xl flex items-center justify-center text-[#800020] flex-shrink-0">
                                                            <DeviceIcon className="w-5 h-5" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <h5 className="font-bold text-gray-900 text-sm truncate">{session.device}</h5>
                                                                {session.current && (
                                                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase">This Device</span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs font-medium text-gray-500 mt-0.5 truncate">{session.location} • IP: {session.ip}</p>
                                                            <p className="text-[11px] font-bold text-gray-400 mt-1">{session.time}</p>
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
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-gray-600">Recent security events and authentication verification checks.</p>
                                        <button
                                            onClick={() => showToast("Security audit log refreshed.")}
                                            className="text-xs font-bold text-[#800020] flex items-center gap-1 hover:underline cursor-pointer"
                                        >
                                            <RefreshCw className="w-3.5 h-3.5" /> Refresh Audit Trail
                                        </button>
                                    </div>
                                    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
                                                <tr>
                                                    <th className="px-6 py-3.5">Event</th>
                                                    <th className="px-6 py-3.5">Device & Browser</th>
                                                    <th className="px-6 py-3.5">IP Address</th>
                                                    <th className="px-6 py-3.5">Timestamp</th>
                                                    <th className="px-6 py-3.5">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {auditLogs.map((log, index) => (
                                                    <tr key={index} className="hover:bg-gray-50/50">
                                                        <td className="px-6 py-4 font-bold text-gray-900">{log.event}</td>
                                                        <td className="px-6 py-4 text-gray-600 font-medium">{log.device}</td>
                                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{log.ip}</td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-500">{log.time}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${log.status === "Success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
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
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-6 right-6 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300 ease-out z-50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <p className="text-sm font-medium text-emerald-800">
                        {toast}
                    </p>
                </div>
            )}
        </div>
    );
}
