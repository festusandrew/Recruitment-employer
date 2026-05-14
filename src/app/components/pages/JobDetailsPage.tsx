import { ArrowLeft, MapPin, Building2, Clock, DollarSign, Users, Briefcase, Calendar, Edit, Pause, Play, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";

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

    const content = (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-[1600px] mx-auto px-8 py-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#800020] transition-colors mb-4 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Jobs
                    </button>

                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${job.status === "Active" || job.status === "Live"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-orange-50 text-orange-700 border-orange-200"
                                    }`}>
                                    {job.status}
                                </span>
                                <span className="text-sm text-gray-500">Posted {job.posted || "3 days ago"}</span>
                            </div>
                            <div className="flex items-center gap-6 text-gray-600 mt-4">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    {job.department}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {job.type || "Full-time"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={onEdit}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
                            >
                                <Edit className="w-4 h-4" />
                                Edit
                            </button>
                            <button 
                                onClick={onTogglePause}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
                            >
                                {job.status === "Active" || job.status === "Live" ? (
                                    <>
                                        <Pause className="w-4 h-4" />
                                        Pause
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4" />
                                        Activate
                                    </>
                                )}
                            </button>
                            <button
                                onClick={onViewApplicants}
                                className="px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
                            >
                                <Users className="w-4 h-4" />
                                View Candidates
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Details & Description */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-5 h-5 text-[#800020]" />
                                    <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{job.applicants}</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-5 h-5 text-yellow-600" />
                                    <p className="text-sm font-medium text-gray-600">In Review</p>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">24</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    <p className="text-sm font-medium text-gray-600">Interviewed</p>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">8</p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <Briefcase className="w-5 h-5 text-green-600" />
                                    <p className="text-sm font-medium text-gray-600">Hired</p>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">2</p>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
                            <div className="prose max-w-none text-gray-600 text-sm leading-relaxed space-y-4">
                                <p>{job.description || "We are looking for an experienced professional to join our team. The ideal candidate will have strong technical skills and a passion for innovation. You will be responsible for leading key initiatives and collaborating with cross-functional teams to deliver high-quality results."}</p>
                                <p>This role requires excellent communication skills and the ability to work collaboratively in a fast-paced environment. You'll be joining a team of dedicated individuals who are committed to making an impact.</p>

                                <h4 className="text-gray-900 font-medium text-base mt-6 mb-2">Requirements</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>{job.experience || "5+ years"} of relevant experience in the field</li>
                                    <li>Strong analytical and problem-solving skills</li>
                                    <li>Excellent communication and teamwork abilities</li>
                                    <li>Proven track record of delivering successful projects</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        {/* Job Information */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-5">Job Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                                        <DollarSign className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Salary Range</p>
                                        <p className="text-sm font-medium text-gray-900">{job.salary || "€120,000 - €180,000"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                                        <Briefcase className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Experience Level</p>
                                        <p className="text-sm font-medium text-gray-900">{job.experience || "5+ years"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                                        <Clock className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Job Type</p>
                                        <p className="text-sm font-medium text-gray-900">{job.type || "Full-time"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pipeline Progress */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-5">Pipeline Progress</h3>
                            <div className="space-y-5">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Applications</span>
                                        <span className="text-sm font-medium text-gray-900">127</span>
                                    </div>
                                    <Progress value={100} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Screening</span>
                                        <span className="text-sm font-medium text-gray-900">45</span>
                                    </div>
                                    <Progress value={35} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Interview</span>
                                        <span className="text-sm font-medium text-gray-900">12</span>
                                    </div>
                                    <Progress value={9} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Offer</span>
                                        <span className="text-sm font-medium text-gray-900">3</span>
                                    </div>
                                    <Progress value={2} className="h-2" />
                                </div>
                            </div>
                        </div>

                        {/* Recent Applicants */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Applicants</h3>
                                <button
                                    onClick={onViewApplicants}
                                    className="text-sm font-medium text-[#800020] hover:text-[#600018] transition-colors"
                                >
                                    View all →
                                </button>
                            </div>
                            <div className="space-y-3">
                                {recentApplicants.map((applicant) => (
                                    <div key={applicant.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                                        <Avatar className="w-10 h-10 border border-gray-200">
                                            <AvatarImage src={applicant.avatar} />
                                            <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{applicant.name}</p>
                                            <p className="text-xs text-gray-500 truncate">Applied {applicant.time}</p>
                                        </div>
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-xs font-medium text-gray-700">{applicant.match}%</span>
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