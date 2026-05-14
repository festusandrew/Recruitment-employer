import { MessageCircle, Mail, Phone, Clock, CheckCircle, AlertCircle } from "lucide-react";

export function SupportPage() {
    const tickets = [
        {
            id: "#TKT-1245",
            subject: "Issue with candidate email notifications",
            status: "open",
            priority: "high",
            date: "Nov 27, 2025",
            lastUpdate: "2 hours ago",
        },
        {
            id: "#TKT-1238",
            subject: "Question about analytics export",
            status: "in-progress",
            priority: "medium",
            date: "Nov 25, 2025",
            lastUpdate: "1 day ago",
        },
        {
            id: "#TKT-1220",
            subject: "Feature request: Bulk candidate actions",
            status: "resolved",
            priority: "low",
            date: "Nov 20, 2025",
            lastUpdate: "5 days ago",
        },
    ];

    return (
        <div className="p-8">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-gray-900 mb-2">Support Center</h1>
                    <p className="text-gray-600">Get help from our dedicated support team</p>
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="w-12 h-12 bg-[#F5E6E8] rounded-lg flex items-center justify-center mb-4">
                            <MessageCircle className="w-6 h-6 text-[#800020]" />
                        </div>
                        <h3 className="text-gray-900 mb-2">Live Chat</h3>
                        <p className="text-sm text-gray-500 mb-4">Chat with our support team in real-time</p>
                        <button className="w-full px-4 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors">
                            Start Chat
                        </button>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-gray-900 mb-2">Email Support</h3>
                        <p className="text-sm text-gray-500 mb-4">We'll respond within 24 hours</p>
                        <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Send Email
                        </button>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <Phone className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-gray-900 mb-2">Phone Support</h3>
                        <p className="text-sm text-gray-500 mb-4">Available Mon-Fri, 9am-6pm EST</p>
                        <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Call Us
                        </button>
                    </div>
                </div>

                {/* Support Hours */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-gray-900 mb-2">Support Hours</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                                <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                                <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                                <p>Sunday: Closed (Email support available)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create New Ticket */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-gray-900">Submit a Support Request</h2>
                        <p className="text-sm text-gray-500 mt-1">Our team typically responds within 2-4 hours</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Subject</label>
                            <input
                                type="text"
                                placeholder="Brief description of your issue"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Category</label>
                            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent">
                                <option>Technical Issue</option>
                                <option>Feature Request</option>
                                <option>Billing Question</option>
                                <option>Account Access</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Priority</label>
                            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent">
                                <option>Low - General question</option>
                                <option>Medium - Issue affecting work</option>
                                <option>High - Critical issue</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Description</label>
                            <textarea
                                rows={5}
                                placeholder="Please provide detailed information about your issue..."
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent resize-none"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-6 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors">
                                Submit Request
                            </button>
                            <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                {/* Your Support Tickets */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-gray-900">Your Support Tickets</h2>
                                <p className="text-sm text-gray-500 mt-1">Track and manage your support requests</p>
                            </div>
                            <button className="text-[#800020] hover:text-[#600018] text-sm">
                                View All →
                            </button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sm text-gray-500">{ticket.id}</span>
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs ${ticket.status === "open"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : ticket.status === "in-progress"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {ticket.status === "open" ? "Open" : ticket.status === "in-progress" ? "In Progress" : "Resolved"}
                                            </span>
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs ${ticket.priority === "high"
                                                        ? "bg-red-100 text-red-700"
                                                        : ticket.priority === "medium"
                                                            ? "bg-orange-100 text-orange-700"
                                                            : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                                            </span>
                                        </div>
                                        <h3 className="text-gray-900 mb-2">{ticket.subject}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>Created: {ticket.date}</span>
                                            <span>•</span>
                                            <span>Last update: {ticket.lastUpdate}</span>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-6 bg-gradient-to-br from-[#800020] to-[#600018] rounded-xl text-white">
                        <CheckCircle className="w-8 h-8 mb-3" />
                        <h3 className="mb-2">Knowledge Base</h3>
                        <p className="text-sm text-gray-200 mb-4">Find answers in our help documentation</p>
                        <button className="text-sm text-white hover:text-gray-200">
                            Browse Articles →
                        </button>
                    </div>

                    <div className="p-6 bg-gray-900 rounded-xl text-white">
                        <AlertCircle className="w-8 h-8 mb-3" />
                        <h3 className="mb-2">System Status</h3>
                        <p className="text-sm text-gray-300 mb-4">Check platform status and uptime</p>
                        <button className="text-sm text-white hover:text-gray-300">
                            View Status →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
