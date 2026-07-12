import { Search, BookOpen, Video, FileText, MessageCircle, Users, Zap, Shield, Mail, ExternalLink, Sparkles, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function HelpCenterPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const popularArticles = [
        { title: "Getting Started with MployUs Employer Workspace", category: "Basics", readTime: "5 min" },
        { title: "How to Create and Post Your First Job Opening", category: "Jobs", readTime: "3 min" },
        { title: "Understanding the Applicant Pipeline & Kanban Stages", category: "Pipeline", readTime: "7 min" },
        { title: "Scheduling and Coordinating Technical Interviews", category: "Interviews", readTime: "6 min" },
        { title: "Using Advanced Analytics to Track Recruiter Speeds", category: "Analytics", readTime: "8 min" },
        { title: "Team Collaboration & Workspace Access Roles", category: "Collaboration", readTime: "5 min" },
    ];

    const categories = [
        { icon: BookOpen, title: "Getting Started", count: 12, color: "bg-blue-50 text-blue-700 border-blue-100" },
        { icon: Zap, title: "Features & Automation Tools", count: 28, color: "bg-purple-50 text-purple-700 border-purple-100" },
        { icon: Users, title: "User Access Roles", count: 15, color: "bg-green-50 text-green-700 border-green-100" },
        { icon: Shield, title: "Security & Privacy Audits", count: 10, color: "bg-red-50 text-red-700 border-red-100" },
        { icon: Mail, title: "Email & Notification Logs", count: 8, color: "bg-amber-50 text-amber-700 border-amber-100" },
        { icon: FileText, title: "Billing & Workspace Licenses", count: 6, color: "bg-orange-50 text-orange-750 border-orange-100" },
    ];

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const filteredArticles = popularArticles.filter(art => 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 text-left">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="text-center mb-12 bg-indigo-600 /40 to-transparent p-10 rounded-3xl border border-indigo-600/5 ">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight flex items-center justify-center gap-2">
                            How can we help you?
                            <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
                        </h1>
                        <p className="text-sm text-slate-500 mb-8 font-semibold">Search our knowledge base or browse help categories below.</p>
                    </motion.div>

                    {/* Search Bar */}
                    <div className="max-w-[600px] mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Type keywords to search articles (e.g., pipeline, billing)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border border-gray-250 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white  transition-all"
                        />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.button 
                        whileHover={{ y: -4 }}
                        onClick={() => showToast("Opening Video Tutorial Library...")}
                        className="p-6 bg-white rounded-2xl border border-slate-200/80  hover: hover:border-indigo-600/30 transition-all group text-left cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 border border-indigo-600/10  group-hover:bg-indigo-600 transition-colors">
                            <Video className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-slate-900 font-extrabold mb-1.5 font-black text-base">Video Tutorials</h3>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Learn features visually through guided screencasts and webinars.</p>
                    </motion.button>

                    <motion.button 
                        whileHover={{ y: -4 }}
                        onClick={() => showToast("Redirecting to support ticket portal...")}
                        className="p-6 bg-white rounded-2xl border border-slate-200/80  hover: hover:border-indigo-600/30 transition-all group text-left cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 border border-indigo-600/10  group-hover:bg-indigo-600 transition-colors">
                            <MessageCircle className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-slate-900 font-extrabold mb-1.5 font-black text-base">Contact Support</h3>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Submit a ticket and get help from our technical support team.</p>
                    </motion.button>

                    <motion.button 
                        whileHover={{ y: -4 }}
                        onClick={() => showToast("Opening Technical Docs...")}
                        className="p-6 bg-white rounded-2xl border border-slate-200/80  hover: hover:border-indigo-600/30 transition-all group text-left cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 border border-indigo-600/10  group-hover:bg-indigo-600 transition-colors">
                            <FileText className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-slate-900 font-extrabold mb-1.5 font-black text-base">API Documentation</h3>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">Integrate other platforms using webhooks and custom API tokens.</p>
                    </motion.button>
                </div>

                {/* Browse by Category */}
                <div className="mb-12">
                    <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-wider">Browse Help Topics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, idx) => {
                            const Icon = category.icon;
                            return (
                                <motion.button
                                    key={category.title}
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    onClick={() => showToast(`Loading articles in "${category.title}"...`)}
                                    className="p-6 bg-white rounded-2xl border border-slate-200/80  hover: hover:border-indigo-600/25 transition-all text-left cursor-pointer flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-10 h-10 ${category.color} rounded-xl flex items-center justify-center border `}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-gray-300" />
                                        </div>
                                        <h3 className="text-slate-900 font-extrabold mb-1 font-bold text-base">{category.title}</h3>
                                    </div>
                                    <p className="text-xs text-slate-400 font-bold mt-4 uppercase tracking-wider">{category.count} Articles available</p>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Popular Articles */}
                <div>
                    <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-wider">
                        {searchQuery ? "Search Results" : "Most Popular Articles"}
                    </h2>
                    <div className="bg-white rounded-2xl border border-slate-200/80  divide-y divide-gray-100 overflow-hidden">
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.length === 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-10 text-center text-slate-400 font-bold text-sm"
                                >
                                    No articles match your query. Try different terms.
                                </motion.div>
                            ) : (
                                filteredArticles.map((article, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.03 }}
                                        onClick={() => showToast(`Loading article: "${article.title}"...`)}
                                        className="w-full p-5 flex items-center justify-between hover:bg-rose-50/15 transition-all text-left cursor-pointer group"
                                    >
                                        <div className="flex items-start gap-4 flex-1 min-w-0">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-200/60  text-slate-500 group-hover:bg-indigo-600/10 group-hover:text-indigo-600 transition-colors">
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-slate-900 font-extrabold mb-1 font-bold text-base truncate group-hover:text-indigo-600 transition-colors">{article.title}</h3>
                                                <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
                                                    <span className="text-indigo-600 bg-rose-50 px-2 py-0.5 rounded border border-indigo-600/10 text-[10px] uppercase tracking-wider">{article.category}</span>
                                                    <span>•</span>
                                                    <span>{article.readTime} reading time</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1.5 transition-all flex-shrink-0" />
                                    </motion.button>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Still Need Help */}
                <div className="mt-12 bg-indigo-600   rounded-2xl p-8 text-center text-white  border border-indigo-600/15 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black mb-2 tracking-tight">Still need assistance?</h2>
                        <p className="text-sm text-gray-200 mb-6 font-semibold max-w-md mx-auto leading-relaxed">Our support engineers are available to resolve technical issues and configure custom setups.</p>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => showToast("Redirecting to support desk...")}
                            className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-black text-sm  cursor-pointer hover:bg-gray-55 transition-all border border-white/20"
                        >
                            Contact Support Team
                        </motion.button>
                    </div>
                    {/* Background glows */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
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



