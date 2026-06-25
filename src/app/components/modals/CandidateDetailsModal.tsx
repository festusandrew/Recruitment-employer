import { X, Mail, Phone, MapPin, Briefcase, GraduationCap, FileText, Calendar, Download, MessageSquare, Award, Sparkles, Send, CheckCircle2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface CandidateDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    candidate?: {
        name: string;
        role: string;
        avatar: string;
        email: string;
        phone: string;
        location: string;
        experience: string;
        education: string;
        appliedDate: string;
        status: string;
    };
}

export function CandidateDetailsModal({ isOpen, onClose, candidate }: CandidateDetailsModalProps) {
    if (!candidate) return null;

    const initials = candidate.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const getStatusStyles = (status: string) => {
        const lower = status.toLowerCase();
        if (lower.includes("hired") || lower.includes("placed")) {
            return {
                bg: "bg-emerald-50/80 backdrop-blur-xs",
                text: "text-emerald-700",
                border: "border-emerald-200/60",
                icon: CheckCircle2
            };
        } else if (lower.includes("reject") || lower.includes("archived")) {
            return {
                bg: "bg-rose-50/80 backdrop-blur-xs",
                text: "text-rose-700",
                border: "border-rose-200/60",
                icon: X
            };
        } else if (lower.includes("pipeline") || lower.includes("active")) {
            return {
                bg: "bg-indigo-50/80 backdrop-blur-xs",
                text: "text-[#800020]",
                border: "border-[#800020]/20",
                icon: Sparkles
            };
        } else {
            return {
                bg: "bg-amber-50/80 backdrop-blur-xs",
                text: "text-amber-700",
                border: "border-amber-200/60",
                icon: Star
            };
        }
    };

    const statusConfig = getStatusStyles(candidate.status);
    const StatusIcon = statusConfig.icon;

    const handleAction = (actionName: string) => {
        toast.info(`${actionName} action triggered for ${candidate.name}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 25 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 25 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white/95 border border-gray-100  w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col z-10 relative text-left"
                    >
                        {/* Header Banner */}
                        <div className="relative bg-primary  via-[#800020]  p-8 overflow-hidden">
                            {/* Decorative Grid and Glow */}
                            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                            <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-orange-400/20 blur-2xl" />
                            <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-rose-500/35 blur-3xl" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>

                            {/* Profile Information */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-white relative z-10">
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-primary from-orange-400 to-rose-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
                                    <Avatar className="w-20 h-20 rounded-2xl border-2 border-white/10 relative bg-[#800020] flex items-center justify-center">
                                        <AvatarImage src={candidate.avatar} className="object-cover" />
                                        <AvatarFallback className="bg-primary   text-white font-bold text-2xl">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 mb-1.5 justify-center sm:justify-start">
                                        <h2 className="text-xl font-extrabold text-white tracking-tight leading-none">{candidate.name}</h2>
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} self-center w-fit`}>
                                            <StatusIcon className="w-3 h-3" />
                                            {candidate.status}
                                        </span>
                                    </div>
                                    
                                    <p className="text-orange-200/90 text-sm font-semibold mb-3 tracking-wide flex items-center gap-1.5 justify-center sm:justify-start">
                                        <Briefcase className="w-4 h-4 text-orange-300" />
                                        {candidate.role}
                                    </p>

                                    <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-rose-100/90 font-medium">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-rose-300" />
                                            Sourced/Applied {candidate.appliedDate}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-rose-300" />
                                            {candidate.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 overflow-y-auto max-h-[calc(90vh-250px)] space-y-7 no-scrollbar">
                            {/* Contact Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3.5 p-4 bg-gray-50/80 hover:bg-gray-100/50 border border-gray-100 rounded-xl transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-[#800020] flex-shrink-0">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Address</p>
                                        <p className="text-xs font-bold text-gray-850 truncate">{candidate.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3.5 p-4 bg-gray-50/80 hover:bg-gray-100/50 border border-gray-100 rounded-xl transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-[#800020] flex-shrink-0">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Phone Number</p>
                                        <p className="text-xs font-bold text-gray-850 truncate">{candidate.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3.5 p-4 bg-gray-50/80 hover:bg-gray-100/50 border border-gray-100 rounded-xl transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-[#800020] flex-shrink-0">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Office Location</p>
                                        <p className="text-xs font-bold text-gray-850 truncate">{candidate.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Two-Column split for Experience & Education */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left: Experience */}
                                <div className="p-5 bg-white border border-gray-100  rounded-xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#800020]" />
                                    <div className="flex items-center gap-2 mb-3.5">
                                        <Briefcase className="w-4 h-4 text-[#800020]" />
                                        <h4 className="text-sm font-extrabold text-gray-900 tracking-tight">Professional Experience</h4>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                        {candidate.experience || "No experience summary provided."}
                                    </p>
                                </div>

                                {/* Right: Education */}
                                <div className="p-5 bg-white border border-gray-100  rounded-xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-400" />
                                    <div className="flex items-center gap-2 mb-3.5">
                                        <GraduationCap className="w-4 h-4 text-orange-500" />
                                        <h4 className="text-sm font-extrabold text-gray-900 tracking-tight">Education & Certifications</h4>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                        {candidate.education || "No education history provided."}
                                    </p>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Award className="w-4 h-4 text-[#800020]" />
                                    <h4 className="text-sm font-extrabold text-gray-950 tracking-tight">Highlighted Skills</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {["React", "TypeScript", "Node.js", "UI/UX Design", "Figma", "Tailwind CSS", "RESTful APIs"].map((skill) => (
                                        <motion.span
                                            key={skill}
                                            whileHover={{ scale: 1.05, translateY: -1 }}
                                            className="px-3 py-1.5 bg-[#F5E6E8]/70 text-[#800020] rounded-xl text-xs font-bold border border-[#E9967A]/25  hover:bg-[#800020]/5 transition-colors cursor-default"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Resume Document Card */}
                            <div className="p-4 bg-gray-50/70 border border-gray-150 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between flex-col sm:flex-row gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 bg-rose-50 rounded-xl flex items-center justify-center border border-rose-100 flex-shrink-0">
                                            <FileText className="w-5 h-5 text-[#800020]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 truncate max-w-[200px] sm:max-w-none">
                                                {candidate.name.replace(/\s+/g, "_")}_Resume.pdf
                                            </p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">PDF Document • 2.4 MB</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAction("Download CV")}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-[#800020] bg-white hover:bg-[#F5E6E8]/50 border border-gray-200 rounded-xl transition-all font-bold text-xs  cursor-pointer"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Download CV</span>
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50/70 flex flex-col sm:flex-row items-center gap-3 relative z-10">
                            <motion.button
                                whileHover={{ scale: 1.01, translateY: -1 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleAction("Schedule Interview")}
                                className="w-full sm:flex-1 py-3 bg-[#800020] hover:bg-[#600018] text-white rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-extrabold  border border-[#800020]/10 cursor-pointer"
                            >
                                <Calendar className="w-4 h-4" />
                                <span>Schedule Interview</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.01, translateY: -1 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleAction("Send Message")}
                                className="w-full sm:flex-1 py-3 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold  cursor-pointer"
                            >
                                <MessageSquare className="w-4 h-4 text-gray-400" />
                                <span>Send Message</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.01, translateY: -1 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleAction("Move to Stage")}
                                className="w-full sm:w-auto px-5 py-3 border border-gray-200 text-gray-750 bg-white hover:bg-gray-50 rounded-xl transition-all text-xs font-bold  cursor-pointer"
                            >
                                <span>Move to Stage</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}



