import { MessageCircle, Mail, Phone, Clock, CheckCircle, AlertCircle, Sparkles, Send, Check, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function SupportPage() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subject, setSubject] = useState("");
    const [category, setCategory] = useState("Technical Issue");
    const [priority, setPriority] = useState("Low - General question");
    const [description, setDescription] = useState("");

    const [tickets, setTickets] = useState([
        {
            id: "#TKT-1245",
            subject: "Issue with applicant email notifications",
            status: "open",
            priority: "high",
            date: "Nov 27, 2025",
            lastUpdate: "2 hours ago",
        },
        {
            id: "#TKT-1238",
            subject: "Question about analytics export formatting",
            status: "in-progress",
            priority: "medium",
            date: "Nov 25, 2025",
            lastUpdate: "1 day ago",
        },
        {
            id: "#TKT-1220",
            subject: "Feature request: Bulk applicant actions in Kanban view",
            status: "resolved",
            priority: "low",
            date: "Nov 20, 2025",
            lastUpdate: "5 days ago",
        },
    ]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleSubmitRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !description.trim()) {
            showToast("Please fill in all required fields.");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            const newTicket = {
                id: `#TKT-${Math.floor(1000 + Math.random() * 9000)}`,
                subject: subject,
                status: "open",
                priority: priority.split(" ")[0].toLowerCase(),
                date: "Today",
                lastUpdate: "Just now",
            };
            setTickets([newTicket, ...tickets]);
            setSubject("");
            setDescription("");
            showToast("Support ticket submitted successfully.");
        }, 800);
    };

    return (
        <div className="p-8 text-left">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                            Support Desk
                            <Sparkles className="w-5.5 h-5.5 text-[#800020] animate-pulse" />
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Get real-time assistance and check system metrics from our team.</p>
                    </div>
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="p-6 bg-white rounded-2xl border border-gray-200/80  flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 bg-[#F5E6E8] rounded-xl flex items-center justify-center mb-4 border border-[#800020]/10 ">
                                <MessageCircle className="w-6 h-6 text-[#800020]" />
                            </div>
                            <h3 className="text-gray-950 mb-1 font-black text-base">Live Chat</h3>
                            <p className="text-xs text-gray-500 mb-6 font-semibold leading-relaxed">Instantly connect with a dedicated support engineer in real-time.</p>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => showToast("Starting a live chat session...")}
                            className="w-full px-4 py-2.5 bg-[#800020] text-white rounded-xl hover:bg-[#600018] transition-all font-bold text-xs  cursor-pointer border border-[#800020]/10"
                        >
                            Start Chat Session
                        </motion.button>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="p-6 bg-white rounded-2xl border border-gray-200/80  flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 border border-blue-100 ">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-gray-955 mb-1 font-black text-base">Email Help Desk</h3>
                            <p className="text-xs text-gray-500 mb-6 font-semibold leading-relaxed">Submit custom queries and get replies in your inbox within 24 hours.</p>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => showToast("Opening email client...")}
                            className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold text-xs  cursor-pointer"
                        >
                            Send Email Inquiry
                        </motion.button>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="p-6 bg-white rounded-2xl border border-gray-200/80  flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 border border-green-100 ">
                                <Phone className="w-6 h-6 text-green-700" />
                            </div>
                            <h3 className="text-gray-955 mb-1 font-black text-base">Phone Hotline</h3>
                            <p className="text-xs text-gray-500 mb-6 font-semibold leading-relaxed">Available Monday to Friday, 9:00 AM - 6:00 PM EST for urgent issues.</p>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => showToast("Opening telephone dialer...")}
                            className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold text-xs  cursor-pointer"
                        >
                            Call Support Line
                        </motion.button>
                    </motion.div>
                </div>

                {/* Support Hours */}
                <div className="bg-[#F5E6E8]/30 border border-[#800020]/10 rounded-2xl p-5 mb-8 ">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white border border-[#800020]/10 rounded-xl flex items-center justify-center flex-shrink-0  text-[#800020]">
                            <Clock className="w-5.5 h-5.5" />
                        </div>
                        <div>
                            <h3 className="text-gray-950 font-black text-sm uppercase tracking-wide mb-1.5">Weekly Availability Hours</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600 font-bold">
                                <p><span className="text-[#800020]">Weekdays:</span> 9:00 AM - 6:00 PM EST</p>
                                <p><span className="text-[#800020]">Saturdays:</span> 10:00 AM - 4:00 PM EST</p>
                                <p><span className="text-gray-400">Sundays:</span> Closed (Email active)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Ticket Form */}
                <div className="bg-white rounded-2xl border border-gray-200/80  mb-8 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-white">
                        <h2 className="text-gray-900 font-black text-base">Submit a Support Ticket</h2>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Estimated response time: 2-4 hours</p>
                    </div>
                    <form onSubmit={handleSubmitRequest} className="p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Ticket Subject *</label>
                                <input
                                    type="text"
                                    placeholder="Brief summary of the issue (e.g., Cannot sync Google calendar)"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-350 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white "
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Category *</label>
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-355 rounded-xl text-xs font-black focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white text-gray-750 cursor-pointer "
                                >
                                    <option>Technical Issue</option>
                                    <option>Feature Request</option>
                                    <option>Billing & Subscription</option>
                                    <option>Account Credentials</option>
                                    <option>Other Help</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Priority Level</label>
                            <select 
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-355 rounded-xl text-xs font-black focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white text-gray-750 cursor-pointer "
                            >
                                <option>Low - General question</option>
                                <option>Medium - Issue affecting work productivity</option>
                                <option>High - Critical platform blockage</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Detailed Description *</label>
                            <textarea
                                rows={5}
                                placeholder="Please provide exact steps to reproduce the bug or details about your request..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-350 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020] resize-none text-sm font-semibold  leading-relaxed"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2.5 bg-primary   text-white rounded-xl font-bold text-sm  flex items-center gap-1.5 cursor-pointer border border-[#800020]/10"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" /> Submit Ticket
                                    </>
                                )}
                            </motion.button>
                            <button 
                                type="button"
                                onClick={() => {
                                    setSubject("");
                                    setDescription("");
                                }}
                                className="px-5 py-2.5 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl font-bold text-sm cursor-pointer transition-colors"
                            >
                                Reset Fields
                            </button>
                        </div>
                    </form>
                </div>

                {/* Your Support Tickets */}
                <div className="bg-white rounded-2xl border border-gray-200/80  overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-gray-900 font-black text-base">My Support Tickets</h2>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Track and manage your submitted support requests</p>
                            </div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        <AnimatePresence>
                            {tickets.map((ticket, idx) => (
                                <motion.div 
                                    key={ticket.id} 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                                    className="p-6 hover:bg-gray-50/40 transition-colors"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                <span className="text-xs font-bold text-gray-400">{ticket.id}</span>
                                                <span
                                                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                                                        ticket.status === "open"
                                                            ? "bg-blue-50 text-blue-700 border-blue-100"
                                                            : ticket.status === "in-progress"
                                                                ? "bg-amber-50 text-amber-700 border-amber-100"
                                                                : "bg-green-50 text-green-700 border-green-100"
                                                    }`}
                                                >
                                                    {ticket.status === "open" ? "Open" : ticket.status === "in-progress" ? "In Progress" : "Resolved"}
                                                </span>
                                                <span
                                                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                                                        ticket.priority === "high"
                                                            ? "bg-red-50 text-red-700 border-red-100 animate-pulse"
                                                            : ticket.priority === "medium"
                                                                ? "bg-orange-50 text-orange-700 border-orange-100"
                                                                : "bg-gray-50 text-gray-600 border-gray-200"
                                                    }`}
                                                >
                                                    {ticket.priority} Priority
                                                </span>
                                            </div>
                                            <h3 className="text-gray-955 mb-1.5 font-bold text-base truncate">{ticket.subject}</h3>
                                            <div className="flex items-center gap-4 text-xs text-gray-400 font-semibold">
                                                <span>Submitted: {ticket.date}</span>
                                                <span>•</span>
                                                <span className="text-[#800020]">Last Update: {ticket.lastUpdate}</span>
                                            </div>
                                        </div>
                                        <motion.button 
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => showToast(`Opening ticket details for ${ticket.id}...`)}
                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer  self-start sm:self-center"
                                        >
                                            View Details
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-primary   rounded-2xl text-white  flex flex-col justify-between">
                        <div>
                            <CheckCircle className="w-8 h-8 mb-3 text-white/90" />
                            <h3 className="mb-1 font-black text-base">Knowledge Base Guides</h3>
                            <p className="text-xs text-gray-200 font-medium leading-relaxed mb-6">Search step-by-step documentation, onboarding videos, and articles.</p>
                        </div>
                        <button className="text-xs font-black text-white hover:underline text-left cursor-pointer w-fit">
                            Browse Knowledge Base Articles →
                        </button>
                    </div>

                    <div className="p-6 bg-gray-950 rounded-2xl text-white  flex flex-col justify-between border border-white/5">
                        <div>
                            <AlertCircle className="w-8 h-8 mb-3 text-[#E9967A]" />
                            <h3 className="mb-1 font-black text-base">Platform Uptime Status</h3>
                            <p className="text-xs text-gray-350 font-medium leading-relaxed mb-6">Verify system servers, API responsiveness, and active latency metrics.</p>
                        </div>
                        <button className="text-xs font-black text-white hover:underline text-left cursor-pointer w-fit">
                            Check Platform Uptime Status →
                        </button>
                    </div>
                </div>
            </div>

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



