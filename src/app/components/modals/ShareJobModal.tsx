import { X, Share2, Copy, Check, Linkedin, Facebook, Twitter, Mail } from "lucide-react";
import { useState } from "react";

interface ShareJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle?: string;
}

export function ShareJobModal({ isOpen, onClose, jobTitle }: ShareJobModalProps) {
    const [copied, setCopied] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const jobUrl = `https://mployus.com/jobs/${jobTitle?.toLowerCase().replace(/\s+/g, "-")}`;

    if (!isOpen) return null;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(jobUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailSent(true);
        setTimeout(() => {
            setEmailSent(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200 flex-none">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F5E6E8] rounded-lg flex items-center justify-center">
                            <Share2 className="w-5 h-5 text-[#800020]" />
                        </div>
                        <div>
                            <h2 className="text-gray-900 text-lg font-semibold">Share Job</h2>
                            <p className="text-xs text-gray-500">{jobTitle || "Job Posting"}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-5 overflow-y-auto space-y-5 flex-1 text-left">
                    {/* Copy Link */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Job Link</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={jobUrl}
                                readOnly
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:outline-none"
                            />
                            <button
                                onClick={handleCopyLink}
                                className={`px-4 py-2 rounded-lg transition-all text-xs font-medium flex items-center gap-1.5 ${copied
                                    ? "bg-green-600 text-white"
                                    : "bg-[#800020] text-white hover:bg-[#600018]"
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5" /> Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" /> Copy
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Social Media Share */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Share on Social Media</label>
                        <div className="grid grid-cols-3 gap-2.5">
                            <button className="flex flex-col items-center gap-1.5 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#800020]/30 transition-colors">
                                <div className="w-8 h-8 bg-[#800020] rounded-lg flex items-center justify-center">
                                    <Linkedin className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-xs text-gray-700 font-medium">LinkedIn</span>
                            </button>
                            <button className="flex flex-col items-center gap-1.5 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#800020]/30 transition-colors">
                                <div className="w-8 h-8 bg-[#800020] rounded-lg flex items-center justify-center">
                                    <Twitter className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-xs text-gray-700 font-medium">Twitter</span>
                            </button>
                            <button className="flex flex-col items-center gap-1.5 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#800020]/30 transition-colors">
                                <div className="w-8 h-8 bg-[#800020] rounded-lg flex items-center justify-center">
                                    <Facebook className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-xs text-gray-700 font-medium">Facebook</span>
                            </button>
                        </div>
                    </div>

                    {/* Email Share */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Share via Email</label>
                        <form onSubmit={handleShareEmail} className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter email addresses (comma separated)"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                            />
                            <textarea
                                placeholder="Add a personal message (optional)"
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent resize-none"
                            />
                            <button
                                type="submit"
                                disabled={emailSent}
                                className={`w-full py-2 rounded-lg transition-colors text-xs font-medium flex items-center justify-center gap-1.5 ${emailSent
                                    ? "bg-green-600 text-white"
                                    : "bg-[#800020] text-white hover:bg-[#600018]"
                                    }`}
                            >
                                {emailSent ? (
                                    <>
                                        <Check className="w-3.5 h-3.5" /> Sent!
                                    </>
                                ) : (
                                    <>
                                        <Mail className="w-3.5 h-3.5" /> Send Email
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Job Boards */}
                    <div className="pt-4 border-t border-gray-100">
                        <label className="block text-xs font-medium text-gray-700 mb-2">Post to Job Boards</label>
                        <div className="space-y-1.5">
                            <button className="w-full flex items-center justify-between p-2.5 border border-gray-200 rounded-lg hover:bg-[#F5E6E8]/50 transition-colors">
                                <span className="text-xs text-gray-700 font-medium">Indeed</span>
                                <span className="text-xs text-[#800020] font-medium">Post →</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-2.5 border border-gray-200 rounded-lg hover:bg-[#F5E6E8]/50 transition-colors">
                                <span className="text-xs text-gray-700 font-medium">Glassdoor</span>
                                <span className="text-xs text-[#800020] font-medium">Post →</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-2.5 border border-gray-200 rounded-lg hover:bg-[#F5E6E8]/50 transition-colors">
                                <span className="text-xs text-gray-700 font-medium">ZipRecruiter</span>
                                <span className="text-xs text-[#800020] font-medium">Post →</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
