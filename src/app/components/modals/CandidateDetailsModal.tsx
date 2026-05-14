import { X, Mail, Phone, MapPin, Briefcase, GraduationCap, FileText, Calendar, Download, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
    if (!isOpen || !candidate) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-6">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="flex items-start gap-4 text-white">
                        <Avatar className="w-20 h-20 border-4 border-white/20">
                            <AvatarImage src={candidate.avatar} />
                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h2 className="text-white mb-1">{candidate.name}</h2>
                            <p className="text-blue-100 mb-3">{candidate.role}</p>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="px-3 py-1 bg-white/20 rounded-full">{candidate.status}</span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Applied {candidate.appliedDate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
                    {/* Contact Info */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="text-sm text-gray-900">{candidate.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Phone className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-xs text-gray-500">Phone</p>
                                <p className="text-sm text-gray-900">{candidate.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-xs text-gray-500">Location</p>
                                <p className="text-sm text-gray-900">{candidate.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Briefcase className="w-5 h-5 text-gray-700" />
                            <h3 className="text-gray-900">Experience</h3>
                        </div>
                        <p className="text-gray-600">{candidate.experience}</p>
                    </div>

                    {/* Education */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="w-5 h-5 text-gray-700" />
                            <h3 className="text-gray-900">Education</h3>
                        </div>
                        <p className="text-gray-600">{candidate.education}</p>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                        <h3 className="text-gray-900 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {["React", "TypeScript", "Node.js", "UI/UX Design", "Figma", "Communication"].map((skill) => (
                                <span key={skill} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Resume */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900">{candidate.name}_Resume.pdf</p>
                                    <p className="text-xs text-gray-500">2.4 MB</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Download className="w-4 h-4" />
                                <span className="text-sm">Download</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <button className="flex-1 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Schedule Interview
                        </button>
                        <button className="flex-1 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Send Message
                        </button>
                        <button className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors">
                            Move to Stage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
