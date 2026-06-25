import { TrendingUp, TrendingDown, Users, Briefcase, Clock, Target, Download, Calendar, Sparkles } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "motion/react";
import { useState } from "react";

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
    { name: "LinkedIn", value: 45, color: "#800020" },
    { name: "Job Boards", value: 30, color: "#A52A2A" },
    { name: "Referrals", value: 15, color: "#E9967A" },
    { name: "Company Website", value: 10, color: "#4A0D0D" },
];

export function AnalyticsPage() {
    const [timeframe, setTimeframe] = useState("Last 6 Months");
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            alert("Report downloaded successfully in PDF and CSV formats.");
        }, 800);
    };

    // Custom high-fidelity tooltip for charts
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-gray-200/80  text-left">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-sm font-black text-gray-950 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#800020]"></span>
                        {payload[0].name === "applications" ? "Applications" : "Count"}:{" "}
                        <span className="text-[#800020] font-black">{payload[0].value}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-8 text-left">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                            Recruitment Analytics
                            <Sparkles className="w-5.5 h-5.5 text-[#800020] animate-pulse" />
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Track applicant funnel metrics, conversion ratios, and source effectiveness.</p>
                    </div>

                    {/* Report actions */}
                    <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md p-2 rounded-2xl border border-gray-200/60 ">
                        <div className="relative">
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="pl-3.5 pr-8 py-2 border border-gray-200 rounded-xl text-xs font-bold appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#800020] cursor-pointer text-gray-700"
                            >
                                <option>Last 30 Days</option>
                                <option>Last 3 Months</option>
                                <option>Last 6 Months</option>
                                <option>Year to Date</option>
                            </select>
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleExport}
                            disabled={isExporting}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#800020] hover:bg-[#600018] text-white rounded-xl text-xs font-bold transition-all  cursor-pointer border border-[#800020]/10"
                        >
                            {isExporting ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Download className="w-3.5 h-3.5" /> Export Report
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card 1 */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl border border-gray-200/80  p-6 flex flex-col justify-between hover: hover:border-[#800020]/25 transition-all"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-[#F5E6E8] rounded-xl flex items-center justify-center border border-[#800020]/10 ">
                                    <Users className="w-6 h-6 text-[#800020]" />
                                </div>
                                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100 font-bold text-xs">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    <span>+12%</span>
                                </div>
                            </div>
                            <p className="text-gray-500 mb-1 font-bold text-xs uppercase tracking-wider">Total Applications</p>
                            <h2 className="text-3xl font-black text-gray-950">245</h2>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-wider">Active in this period</p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl border border-gray-200/80  p-6 flex flex-col justify-between hover: hover:border-[#800020]/25 transition-all"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 ">
                                    <Target className="w-6 h-6 text-green-700" />
                                </div>
                                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100 font-bold text-xs">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    <span>+8%</span>
                                </div>
                            </div>
                            <p className="text-gray-500 mb-1 font-bold text-xs uppercase tracking-wider">Conversion Rate</p>
                            <h2 className="text-3xl font-black text-gray-950">6.1%</h2>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-wider">Applied to hired ratio</p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl border border-gray-200/80  p-6 flex flex-col justify-between hover: hover:border-[#800020]/25 transition-all"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100 ">
                                    <Clock className="w-6 h-6 text-purple-700" />
                                </div>
                                <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-0.5 rounded-lg border border-red-100 font-bold text-xs">
                                    <TrendingDown className="w-3.5 h-3.5" />
                                    <span>-5%</span>
                                </div>
                            </div>
                            <p className="text-gray-500 mb-1 font-bold text-xs uppercase tracking-wider">Avg. Time to Hire</p>
                            <h2 className="text-3xl font-black text-gray-950">21 Days</h2>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-wider">Target timeline: 18 days</p>
                    </motion.div>

                    {/* Card 4 */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl border border-gray-200/80  p-6 flex flex-col justify-between hover: hover:border-[#800020]/25 transition-all"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100 ">
                                    <Briefcase className="w-6 h-6 text-orange-700" />
                                </div>
                                <div className="text-gray-400 font-bold text-xs">
                                    <span>—</span>
                                </div>
                            </div>
                            <p className="text-gray-500 mb-1 font-bold text-xs uppercase tracking-wider">Active Positions</p>
                            <h2 className="text-3xl font-black text-gray-950">12</h2>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-wider">8 marked as urgent</p>
                    </motion.div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Applications Trend */}
                    <div className="bg-white rounded-2xl border border-gray-200/80  p-6">
                        <h3 className="text-lg font-black text-gray-900 mb-1">Application Volume Trends</h3>
                        <p className="text-xs text-gray-400 mb-6 font-bold uppercase tracking-wider">Monthly applications received</p>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={applicationsData} margin={{ left: -15, right: 10, top: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" />
                                    <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: '11px', fontWeight: 'bold' }} />
                                    <YAxis stroke="#9ca3af" tick={{ fontSize: '11px', fontWeight: 'bold' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="applications" stroke="#800020" strokeWidth={3} dot={{ fill: '#800020', r: 5, strokeWidth: 2, stroke: '#ffffff' }} activeDot={{ r: 7 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Hiring Funnel */}
                    <div className="bg-white rounded-2xl border border-gray-200/80  p-6">
                        <h3 className="text-lg font-black text-gray-900 mb-1">Hiring Pipeline Funnel</h3>
                        <p className="text-xs text-gray-400 mb-6 font-bold uppercase tracking-wider">Active applicants by recruitment stage</p>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={hiringData} margin={{ left: -15, right: 10, top: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" />
                                    <XAxis dataKey="stage" stroke="#9ca3af" tick={{ fontSize: '11px', fontWeight: 'bold' }} />
                                    <YAxis stroke="#9ca3af" tick={{ fontSize: '11px', fontWeight: 'bold' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="count" fill="#800020" radius={[6, 6, 0, 0]} maxBarSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Candidate Sources */}
                    <div className="bg-white rounded-2xl border border-gray-200/80  p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 mb-1">Talent Acquisition Sources</h3>
                            <p className="text-xs text-gray-400 mb-6 font-bold uppercase tracking-wider">Primary applicant acquisition channels</p>
                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <div className="h-[230px] w-full sm:w-[50%] flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={sourceData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={85}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {sourceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 w-full space-y-3">
                                    {sourceData.map((source) => (
                                        <div key={source.name} className="flex items-center justify-between p-2 rounded-xl bg-gray-50/50 border border-gray-100">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-3.5 h-3.5 rounded-md  border border-white" style={{ backgroundColor: source.color }}></div>
                                                <span className="text-sm font-bold text-gray-700">{source.name}</span>
                                            </div>
                                            <span className="text-sm font-black text-gray-950">{source.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Summary */}
                    <div className="bg-white rounded-2xl border border-gray-200/80  p-6">
                        <h3 className="text-lg font-black text-gray-900 mb-1">Key Performance Funnel Metrics</h3>
                        <p className="text-xs text-gray-400 mb-6 font-bold uppercase tracking-wider">Hiring workflow satisfaction and success rates</p>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200/40">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Interview Show Rate</span>
                                    <span className="text-sm font-black text-gray-900">87%</span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-200/60 rounded-full overflow-hidden ">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "87%" }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-green-500 rounded-full "
                                    ></motion.div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200/40">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Offer Acceptance Rate</span>
                                    <span className="text-sm font-black text-gray-900">65%</span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-200/60 rounded-full overflow-hidden ">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "65%" }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
                                        className="h-full bg-[#800020] rounded-full "
                                    ></motion.div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200/40">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Quality of Hire Index</span>
                                    <span className="text-sm font-black text-gray-900">8.2 / 10</span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-200/60 rounded-full overflow-hidden ">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "82%" }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                                        className="h-full bg-purple-500 rounded-full "
                                    ></motion.div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-200/40">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Applicant Satisfaction Score</span>
                                    <span className="text-sm font-black text-gray-900">4.3 / 5</span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-200/60 rounded-full overflow-hidden ">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "86%" }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.45 }}
                                        className="h-full bg-orange-500 rounded-full "
                                    ></motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


