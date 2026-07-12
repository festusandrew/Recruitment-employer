import { ArrowLeft, MapPin, Building2, Clock, DollarSign, Users, Briefcase, Calendar, Edit, Pause, Play, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { motion } from "motion/react";

interface JobDetailsPageProps {
    job: {
        id: number;
        title: string;
        location: string;
        department: string;
        applicants: number;
        status: string;
        type?: string;
        salary?: string;
        experience?: string;
        description?: string;
        posted?: string;
    };
    onBack: () => void;
    onEdit: () => void;
    onViewApplicants: () => void;
    onTogglePause?: () => void;
    fullScreenOverlay?: boolean;
}

export function JobDetailsPage({ job, onBack, onEdit, onViewApplicants, onTogglePause, fullScreenOverlay = false }: JobDetailsPageProps) {
    const recentApplicants = [
        { id: 1, name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah5", time: "2 hours ago", match: 95 },
        { id: 2, name: "Michael Torres", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael5", time: "5 hours ago", match: 88 },
        { id: 3, name: "Emily Watson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily5", time: "1 day ago", match: 92 },
    ];

    const getStatusTheme = (status: string) => {
        return status === "Active" || status === "Live"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200/50"
            : "bg-orange-50 text-orange-700 border-orange-200/50";
    };

    const content = (
        <div className="flex flex-col h-full bg-gray-50/40 text-left">
            {/* Header */}
            <div className="bg-white border-b border-gray-150">
                <div className="max-w-[1600px] mx-auto px-8 py-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors mb-4 cursor-pointer select-none"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>BACK TO JOB DIRECTORY</span>
                    </button>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                        <div>
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">{job.title}</h1>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusTheme(job.status)}`}>
                                    {job.status}
                                </span>
                                <span className="text-xs text-slate-400 font-semibold">Posted {job.posted || "3 days ago"}</span>
                            </div>
                            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 font-semibold mt-3">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-450" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-gray-455" />
                                    {job.department}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-450" />
                                    {job.type || "Full-time"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center flex-wrap gap-3.5">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={onEdit}
                                className="px-4 py-2.5 border border-slate-200 text-slate-700 bg-white hover:bg-gray-50 rounded-xl transition-all font-bold text-xs shadow-3xs cursor-pointer flex items-center gap-2"
                            >
                                <Edit className="w-4 h-4 text-gray-450" />
                                Edit Job
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={onTogglePause}
                                className="px-4 py-2.5 border border-slate-200 text-slate-700 bg-white hover:bg-gray-50 rounded-xl transition-all font-bold text-xs shadow-3xs cursor-pointer flex items-center gap-2"
                            >
                                {job.status === "Active" || job.status === "Live" ? (
                                    <>
                                        <Pause className="w-4 h-4 text-gray-450" />
                                        Pause Listing
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 text-gray-450" />
                                        Activate Listing
                                    </>
                                )}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onViewApplicants}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl transition-all font-extrabold text-xs shadow-md border border-indigo-600/10 hover:shadow-glow-primary flex items-center justify-center gap-2 cursor-pointer tracking-wider"
                            >
                                <Users className="w-4 h-4 text-orange-300" />
                                VIEW APPLICANTS
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Details & Description */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-3xs relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
                                <div className="flex items-center gap-2.5 mb-2 text-slate-600">
                                    <Users className="w-4.5 h-4.5 text-indigo-600" />
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Applicants</p>
                                </div>
                                <p className="text-3xl font-extrabold text-slate-900 leading-none mt-1">{job.applicants}</p>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-3xs relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                                <div className="flex items-center gap-2.5 mb-2 text-slate-600">
                                    <Users className="w-4.5 h-4.5 text-amber-500" />
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">In Review</p>
                                </div>
                                <p className="text-3xl font-extrabold text-slate-900 leading-none mt-1">24</p>
                            </div>

                            <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-3xs relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
                                <div className="flex items-center gap-2.5 mb-2 text-slate-600">
                                    <Calendar className="w-4.5 h-4.5 text-blue-500" />
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Interviewed</p>
                                </div>
                                <p className="text-3xl font-extrabold text-slate-900 leading-none mt-1">8</p>
                            </div>

                            <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-3xs relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                                <div className="flex items-center gap-2.5 mb-2 text-slate-600">
                                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Placed Hires</p>
                                </div>
                                <p className="text-3xl font-extrabold text-slate-900 leading-none mt-1">2</p>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="bg-white rounded-2xl border border-gray-150 shadow-premium p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600" />
                            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Briefcase className="w-4.5 h-4.5 text-indigo-600" />
                                Job Details & Core Description
                            </h3>
                            <div className="text-sm text-slate-600 leading-relaxed space-y-4 font-medium">
                                <p>{job.description || "We are looking for an experienced professional to join our team. The ideal candidate will have strong technical skills and a passion for innovation. You will be responsible for leading key initiatives and collaborating with cross-functional teams to deliver high-quality results."}</p>
                                <p>This role requires excellent communication skills and the ability to work collaboratively in a fast-paced environment. You'll be joining a team of dedicated individuals who are committed to making an impact.</p>

                                <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider mt-6 mb-3">Key Requirements & Experience</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-650">
                                    <li>{job.experience || "5+ years"} of relevant experience in the field</li>
                                    <li>Strong analytical, communication, and problem-solving skills</li>
                                    <li>Excellent collaboration skills and experience with cross-functional initiatives</li>
                                    <li>Proven track record of delivering high-impact projects on time</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar info */}
                    <div className="space-y-8">
                        {/* Job Information */}
                        <div className="bg-white rounded-2xl border border-gray-150 shadow-premium p-6">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-5 pb-3 border-b border-slate-100">Job Specification</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                                        <DollarSign className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Salary Bandwidth</p>
                                        <p className="text-sm font-bold text-gray-850">{job.salary || "€120,000 - €180,000"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                                        <Briefcase className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Experience Level</p>
                                        <p className="text-sm font-bold text-gray-850">{job.experience || "5+ years"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                                        <Clock className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Engagement Type</p>
                                        <p className="text-sm font-bold text-gray-850">{job.type || "Full-time"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pipeline Progress */}
                        <div className="bg-white rounded-2xl border border-gray-150 shadow-premium p-6">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-5 pb-3 border-b border-slate-100">Pipeline Velocity</h3>
                            <div className="space-y-4 text-xs font-semibold text-gray-650">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span>New Submissions</span>
                                        <span className="font-bold text-slate-900">127</span>
                                    </div>
                                    <Progress value={100} className="h-1.5 bg-gray-100" style={{'--progress-background': '#005189'} as any} />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span>Phone Screened</span>
                                        <span className="font-bold text-slate-900">45</span>
                                    </div>
                                    <Progress value={35} className="h-1.5 bg-gray-100" style={{'--progress-background': '#005189'} as any} />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span>Interview Rounds</span>
                                        <span className="font-bold text-slate-900">12</span>
                                    </div>
                                    <Progress value={9} className="h-1.5 bg-gray-100" style={{'--progress-background': '#005189'} as any} />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span>Offer Letters</span>
                                        <span className="font-bold text-slate-900">3</span>
                                    </div>
                                    <Progress value={2} className="h-1.5 bg-gray-100" style={{'--progress-background': '#005189'} as any} />
                                </div>
                            </div>
                        </div>

                        {/* Recent Applicants */}
                        <div className="bg-white rounded-2xl border border-gray-150 shadow-premium p-6">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Applicants</h3>
                                <button
                                    onClick={onViewApplicants}
                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 select-none"
                                >
                                    <span>View all</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {recentApplicants.map((applicant) => (
                                    <div 
                                        key={applicant.id} 
                                        onClick={onViewApplicants}
                                        className="flex items-center gap-3 p-3 bg-gray-50/65 rounded-xl hover:bg-gray-100/50 transition-all cursor-pointer border border-transparent hover:border-slate-200"
                                    >
                                        <Avatar className="w-10 h-10 border border-white shadow-3xs flex-shrink-0">
                                            <AvatarFallback className="bg-indigo-50 text-indigo-700 font-extrabold text-xs">
                                                {applicant.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-900 truncate">{applicant.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Applied {applicant.time}</p>
                                        </div>
                                        <div className="flex items-center gap-1 flex-shrink-0 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg">
                                            <span className="text-[10px] font-bold">{applicant.match}% Match</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

    if (fullScreenOverlay) {
        return (
            <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">
                {content}
            </div>
        );
    }

    return content;
}

