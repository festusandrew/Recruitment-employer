import { TrendingUp, TrendingDown, Users, Briefcase, Clock, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const applicationsData = [
    { month: "Jun", applications: 45 },
    { month: "Jul", applications: 62 },
    { month: "Aug", applications: 58 },
    { month: "Sep", applications: 78 },
    { month: "Oct", applications: 89 },
    { month: "Nov", applications: 95 },
];

const hiringData = [
    { stage: "Applied", count: 245 },
    { stage: "Screening", count: 145 },
    { stage: "Interview", count: 67 },
    { stage: "Offer", count: 23 },
    { stage: "Hired", count: 15 },
];

const sourceData = [
    { name: "LinkedIn", value: 45, color: "#0A66C2" },
    { name: "Job Boards", value: 30, color: "#3B82F6" },
    { name: "Referrals", value: 15, color: "#10B981" },
    { name: "Company Website", value: 10, color: "#8B5CF6" },
];

export function AnalyticsPage() {
    return (
        <div className="p-8">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-gray-900 mb-2">Analytics & Reports</h1>
                    <p className="text-gray-600">Track your recruitment performance and metrics</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex items-center gap-1 text-green-600">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm">+12%</span>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-1">Total Applications</p>
                        <p className="text-gray-900">245</p>
                        <p className="text-xs text-gray-500 mt-2">This month</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Target className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex items-center gap-1 text-green-600">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm">+8%</span>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-1">Conversion Rate</p>
                        <p className="text-gray-900">6.1%</p>
                        <p className="text-xs text-gray-500 mt-2">Applied to hired</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex items-center gap-1 text-red-600">
                                <TrendingDown className="w-4 h-4" />
                                <span className="text-sm">-5%</span>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-1">Avg. Time to Hire</p>
                        <p className="text-gray-900">21 days</p>
                        <p className="text-xs text-gray-500 mt-2">Target: 18 days</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                                <span className="text-sm">—</span>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-1">Active Positions</p>
                        <p className="text-gray-900">12</p>
                        <p className="text-xs text-gray-500 mt-2">8 urgent</p>
                    </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Applications Trend */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                        <h3 className="text-gray-900 mb-1">Application Trends</h3>
                        <p className="text-sm text-gray-500 mb-6">Monthly application volume</p>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={applicationsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Hiring Funnel */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                        <h3 className="text-gray-900 mb-1">Hiring Funnel</h3>
                        <p className="text-sm text-gray-500 mb-6">Candidates by stage</p>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={hiringData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="stage" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Candidate Sources */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                        <h3 className="text-gray-900 mb-1">Candidate Sources</h3>
                        <p className="text-sm text-gray-500 mb-6">Where candidates are coming from</p>
                        <div className="flex items-center gap-8">
                            <ResponsiveContainer width="50%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={sourceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sourceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex-1 space-y-3">
                                {sourceData.map((source) => (
                                    <div key={source.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                                            <span className="text-sm text-gray-700">{source.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-900">{source.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Performance Summary */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                        <h3 className="text-gray-900 mb-1">Performance Summary</h3>
                        <p className="text-sm text-gray-500 mb-6">Key hiring metrics</p>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Interview Show Rate</span>
                                    <span className="text-sm text-gray-900">87%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: "87%" }}></div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Offer Acceptance Rate</span>
                                    <span className="text-sm text-gray-900">65%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }}></div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Quality of Hire Score</span>
                                    <span className="text-sm text-gray-900">8.2/10</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "82%" }}></div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Candidate Satisfaction</span>
                                    <span className="text-sm text-gray-900">4.3/5</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: "86%" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}