import { Search, BookOpen, Video, FileText, MessageCircle, Users, Zap, Shield, Mail, ExternalLink } from "lucide-react";

export function HelpCenterPage() {
    const popularArticles = [
        { title: "Getting Started with MployUs", category: "Basics", readTime: "5 min" },
        { title: "How to Post Your First Job", category: "Jobs", readTime: "3 min" },
        { title: "Understanding the Candidate Pipeline", category: "Pipeline", readTime: "7 min" },
        { title: "Scheduling and Managing Interviews", category: "Interviews", readTime: "6 min" },
        { title: "Using Analytics to Improve Hiring", category: "Analytics", readTime: "8 min" },
        { title: "Team Collaboration Best Practices", category: "Collaboration", readTime: "5 min" },
    ];

    const categories = [
        { icon: BookOpen, title: "Getting Started", count: 12, color: "bg-blue-100 text-blue-600" },
        { icon: Zap, title: "Features & Tools", count: 28, color: "bg-purple-100 text-purple-600" },
        { icon: Users, title: "User Management", count: 15, color: "bg-green-100 text-green-600" },
        { icon: Shield, title: "Security & Privacy", count: 10, color: "bg-red-100 text-red-600" },
        { icon: Mail, title: "Email & Notifications", count: 8, color: "bg-yellow-100 text-yellow-600" },
        { icon: FileText, title: "Billing & Plans", count: 6, color: "bg-orange-100 text-orange-600" },
    ];

    return (
        <div className="p-8">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-gray-900 mb-3">How can we help you?</h1>
                    <p className="text-gray-600 mb-6">Search our knowledge base or browse categories below</p>

                    {/* Search Bar */}
                    <div className="max-w-[600px] mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for help articles..."
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                    <button className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all hover:border-[#800020] group">
                        <div className="w-12 h-12 bg-[#F5E6E8] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#800020] transition-colors">
                            <Video className="w-6 h-6 text-[#800020] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-gray-900 mb-2">Video Tutorials</h3>
                        <p className="text-sm text-gray-500">Learn through step-by-step guides</p>
                    </button>

                    <button className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all hover:border-[#800020] group">
                        <div className="w-12 h-12 bg-[#F5E6E8] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#800020] transition-colors">
                            <MessageCircle className="w-6 h-6 text-[#800020] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-gray-900 mb-2">Contact Support</h3>
                        <p className="text-sm text-gray-500">Get help from our team</p>
                    </button>

                    <button className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all hover:border-[#800020] group">
                        <div className="w-12 h-12 bg-[#F5E6E8] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#800020] transition-colors">
                            <FileText className="w-6 h-6 text-[#800020] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-gray-900 mb-2">Documentation</h3>
                        <p className="text-sm text-gray-500">Browse technical docs</p>
                    </button>
                </div>

                {/* Browse by Category */}
                <div className="mb-12">
                    <h2 className="text-gray-900 mb-6">Browse by Category</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.title}
                                    className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all text-left hover:border-gray-300"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <h3 className="text-gray-900 mb-1">{category.title}</h3>
                                    <p className="text-sm text-gray-500">{category.count} articles</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Popular Articles */}
                <div>
                    <h2 className="text-gray-900 mb-6">Popular Articles</h2>
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm divide-y divide-gray-200">
                        {popularArticles.map((article, index) => (
                            <button
                                key={index}
                                className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-gray-900 mb-1">{article.title}</h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <span>{article.category}</span>
                                            <span>•</span>
                                            <span>{article.readTime} read</span>
                                        </div>
                                    </div>
                                </div>
                                <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Still Need Help */}
                <div className="mt-12 bg-gradient-to-br from-[#800020] to-[#600018] rounded-xl p-8 text-center">
                    <h2 className="text-white mb-3">Still need help?</h2>
                    <p className="text-gray-200 mb-6">Our support team is here to assist you</p>
                    <button className="px-6 py-3 bg-white text-[#800020] rounded-lg hover:bg-gray-100 transition-colors">
                        Contact Support Team
                    </button>
                </div>
            </div>
        </div>
    );
}
