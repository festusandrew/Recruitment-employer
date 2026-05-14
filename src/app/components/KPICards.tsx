import { Briefcase, Users, Calendar, FileCheck, TrendingUp, TrendingDown } from "lucide-react";

const kpiData = [
    {
        label: "Open Roles",
        value: "24",
        change: "+3",
        trend: "up",
        icon: Briefcase,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    {
        label: "Total Applicants",
        value: "1,847",
        change: "+127",
        trend: "up",
        icon: Users,
        color: "text-green-600",
        bgColor: "bg-green-50",
    },
    {
        label: "Interviews Scheduled",
        value: "38",
        change: "+12",
        trend: "up",
        icon: Calendar,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
    },
    {
        label: "Offers Pending",
        value: "7",
        change: "-2",
        trend: "down",
        icon: FileCheck,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
    },
];

export function KPICards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {kpiData.map((kpi) => {
                const Icon = kpi.icon;
                const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;

                return (
                    <div
                        key={kpi.label}
                        className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-gray-300/80 transition-all duration-200"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${kpi.bgColor} ${kpi.color} p-2.5 rounded-lg`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex items-center gap-1">
                                <TrendIcon
                                    className={`w-3.5 h-3.5 ${kpi.trend === "up" ? "text-green-600" : "text-red-600"
                                        }`}
                                />
                                <span
                                    className={`text-sm ${kpi.trend === "up" ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {kpi.change}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
                        <p className="text-gray-900">{kpi.value}</p>
                        <p className="text-xs text-gray-500 mt-2">vs last week</p>
                    </div>
                );
            })}
        </div>
    );
}