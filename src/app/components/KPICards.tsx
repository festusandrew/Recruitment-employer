import { Briefcase, Users, Calendar, FileCheck, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "motion/react";

const kpiData = [
    {
        label: "Open Roles",
        value: "24",
        change: "+3",
        trend: "up",
        icon: Briefcase,
        color: "text-[#800020]",
        bgColor: "bg-[#F5E6E8]/70",
    },
    {
        label: "Total Candidates",
        value: "1,847",
        change: "+127",
        trend: "up",
        icon: Users,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
    },
    {
        label: "Interviews Scheduled",
        value: "38",
        change: "+12",
        trend: "up",
        icon: Calendar,
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
    },
    {
        label: "Offers Pending",
        value: "7",
        change: "-2",
        trend: "down",
        icon: FileCheck,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
    },
];

export function KPICards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, idx) => {
                const Icon = kpi.icon;
                const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;

                return (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100  hover: hover:border-[#800020]/20 transition-all duration-300 text-left relative overflow-hidden group"
                    >
                        {/* Decorative background glow on hover */}
                        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-radial /5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex items-center justify-between mb-5">
                            <div className={`${kpi.bgColor} ${kpi.color} p-3 rounded-xl transition-all duration-300 group-hover:scale-110`}>
                                <Icon className="w-5 h-5" strokeWidth={2.2} />
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                kpi.trend === "up" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                            }`}>
                                <TrendIcon className="w-3.5 h-3.5" strokeWidth={2} />
                                <span>{kpi.change}</span>
                            </div>
                        </div>
                        
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{kpi.label}</p>
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">{kpi.value}</p>
                        
                        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-50 text-xs text-gray-400">
                            <span className="font-medium text-gray-500">vs last week</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>Active tracking</span>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}


