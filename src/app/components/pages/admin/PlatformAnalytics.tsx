import {
    TrendingUp, Users, Briefcase, DollarSign, Activity,
    ArrowUpRight, ArrowDownRight
} from "lucide-react";

export function PlatformAnalytics() {
    const metrics = [
        {
            label: "Platform Growth",
            value: "+23.5%",
            subtext: "vs last month",
            trend: "up",
            icon: TrendingUp,
            color: "bg-green-500",
        },
        {
            label: "User Engagement",
            value: "87.3%",
            subtext: "active users",
            trend: "up",
            icon: Activity,
            color: "bg-blue-500",
        },
        {
            label: "Job Posting Rate",
            value: "+12.8%",
            subtext: "vs last month",
            trend: "up",
            icon: Briefcase,
            color: "bg-purple-500",
        },
        {
            label: "Revenue Growth",
            value: "+31.2%",
            subtext: "vs last month",
            trend: "up",
            icon: DollarSign,
            color: "bg-[#800020]",
        },
    ];

    const monthlyData = [
        { month: "Jan", companies: 1020, jobs: 7800, revenue: 245000 },
        { month: "Feb", companies: 1105, jobs: 8200, revenue: 268000 },
        { month: "Mar", companies: 1284, jobs: 8942, revenue: 284920 },
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl text-gray-900 mb-2">Platform Analytics</h1>
                <p className="text-gray-600">Comprehensive insights into platform performance</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {metric.trend === 'up' ? (
                                        <ArrowUpRight className="w-4 h-4" />
                                    ) : (
                                        <ArrowDownRight className="w-4 h-4" />
                                    )}
                                    {metric.value}
                                </span>
                            </div>
                            <p className="text-sm text-gray-900 mb-1">{metric.label}</p>
                            <p className="text-xs text-gray-500">{metric.subtext}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Monthly Growth Chart */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg text-gray-900 mb-6">Monthly Growth Trends</h3>
                    <div className="space-y-4">
                        {monthlyData.map((data, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{data.month}</span>
                                    <span className="text-gray-900">{data.companies} companies</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-[#800020] h-2 rounded-full transition-all"
                                        style={{ width: `${(data.companies / 1500) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg text-gray-900 mb-6">Revenue Breakdown</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600">Enterprise Plans</p>
                                <p className="text-xl text-gray-900 mt-1">$156,320</p>
                            </div>
                            <div className="text-sm text-purple-600">54.9%</div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600">Professional Plans</p>
                                <p className="text-xl text-gray-900 mt-1">$89,450</p>
                            </div>
                            <div className="text-sm text-blue-600">31.4%</div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600">Starter Plans</p>
                                <p className="text-xl text-gray-900 mt-1">$39,150</p>
                            </div>
                            <div className="text-sm text-gray-600">13.7%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Stats Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg text-gray-900">Detailed Monthly Statistics</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Month
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    New Companies
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Total Jobs Posted
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Revenue
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Growth Rate
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {monthlyData.map((data, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {data.month} 2024
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {data.companies}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {data.jobs.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${data.revenue.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1 text-sm text-green-600">
                                            <ArrowUpRight className="w-4 h-4" />
                                            {index === 0 ? "8.3%" : index === 1 ? "9.6%" : "12.5%"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
