import {
    Users, Building2, Briefcase, TrendingUp, DollarSign,
    Activity, UserCheck, AlertCircle, ArrowUpRight, ArrowDownRight,
    MoreVertical, Eye, Edit, Trash2, CreditCard, TrendingDown,
    Calendar, Percent, Target, BarChart3
} from "lucide-react";
import { useState } from "react";
import { ViewCompanyModal } from "../../modals/admin/ViewCompanyModal";
import { EditCompanyModal } from "../../modals/admin/EditCompanyModal";
import { CompanyActionsMenu } from "../../modals/admin/CompanyActionsMenu";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function SuperAdminDashboard() {
    const [selectedCompany, setSelectedCompany] = useState<any>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [companies, setCompanies] = useState([
        {
            id: 1,
            name: "TechCorp Inc.",
            logo: "TC",
            email: "contact@techcorp.com",
            plan: "Enterprise",
            users: 45,
            jobs: 23,
            candidates: 456,
            revenue: "€4,500",
            status: "Active",
            joined: "2 days ago",
        },
        {
            id: 2,
            name: "StartupXYZ",
            logo: "SX",
            email: "hello@startupxyz.com",
            plan: "Professional",
            users: 12,
            jobs: 8,
            candidates: 123,
            revenue: "€1,200",
            status: "Active",
            joined: "5 days ago",
        },
        {
            id: 3,
            name: "GlobalTech Solutions",
            logo: "GT",
            email: "info@globaltech.com",
            plan: "Enterprise",
            users: 67,
            jobs: 34,
            candidates: 789,
            revenue: "€6,700",
            status: "Active",
            joined: "1 week ago",
        },
        {
            id: 4,
            name: "InnovateLabs",
            logo: "IL",
            email: "team@innovatelabs.com",
            plan: "Starter",
            users: 5,
            jobs: 3,
            candidates: 45,
            revenue: "€299",
            status: "Trial",
            joined: "2 weeks ago",
        },
    ]);

    const handleViewCompany = (company: any) => {
        setSelectedCompany(company);
        setIsViewModalOpen(true);
    };

    const handleEditCompany = (company: any) => {
        setSelectedCompany(company);
        setIsEditModalOpen(true);
    };

    const handleSaveCompany = (updatedCompany: any) => {
        setCompanies(companies.map(c =>
            c.id === updatedCompany.id ? { ...c, ...updatedCompany } : c
        ));
    };

    const handleDeleteCompany = (companyId: number) => {
        if (confirm("Are you sure you want to delete this company? This action cannot be undone.")) {
            setCompanies(companies.filter(c => c.id !== companyId));
        }
    };

    const handleSuspendCompany = (companyId: number) => {
        if (confirm("Are you sure you want to suspend this company's account?")) {
            setCompanies(companies.map(c =>
                c.id === companyId ? { ...c, status: "Suspended" } : c
            ));
        }
    };

    const handleSuspendCompanyWithReason = (companyId: number, reason: string, sendEmail: boolean) => {
        setCompanies(companies.map(c =>
            c.id === companyId ? { ...c, status: "Suspended" } : c
        ));
        console.log(`Company ${companyId} suspended. Reason: ${reason}, Send email: ${sendEmail}`);
        // You can add a toast notification here
    };

    const handleActivateCompany = (companyId: number) => {
        setCompanies(companies.map(c =>
            c.id === companyId ? { ...c, status: "Active" } : c
        ));
    };

    const platformStats = [
        {
            label: "Total Companies",
            value: "1,284",
            change: "+12.5%",
            trend: "up",
            icon: Building2,
            color: "bg-blue-500",
        },
        {
            label: "Active Jobs",
            value: "8,942",
            change: "+8.2%",
            trend: "up",
            icon: Briefcase,
            color: "bg-green-500",
        },
        {
            label: "Total Candidates",
            value: "45,231",
            change: "+15.3%",
            trend: "up",
            icon: Users,
            color: "bg-purple-500",
        },
        {
            label: "Monthly Revenue",
            value: "€284,920",
            change: "+23.1%",
            trend: "up",
            icon: DollarSign,
            color: "bg-[#7C3AED]",
        },
    ];

    const systemAlerts = [
        {
            id: 1,
            type: "warning",
            message: "Server CPU usage above 80%",
            time: "5 minutes ago",
        },
        {
            id: 2,
            type: "info",
            message: "Scheduled maintenance on Sunday 2 AM",
            time: "1 hour ago",
        },
        {
            id: 3,
            type: "success",
            message: "Database backup completed successfully",
            time: "3 hours ago",
        },
    ];

    const topPerformingCompanies = [
        {
            name: "Google Inc.",
            jobs: 156,
            candidates: 2340,
            hires: 45,
            revenue: "€12,450",
        },
        {
            name: "Microsoft",
            jobs: 134,
            candidates: 1980,
            hires: 38,
            revenue: "€10,200",
        },
        {
            name: "Amazon",
            jobs: 189,
            candidates: 2890,
            hires: 52,
            revenue: "€15,680",
        },
        {
            name: "Meta",
            jobs: 98,
            candidates: 1560,
            hires: 29,
            revenue: "€8,750",
        },
    ];

    // Revenue Analytics Data
    const revenueData = [
        { month: "Jun", revenue: 198450 },
        { month: "Jul", revenue: 215320 },
        { month: "Aug", revenue: 232180 },
        { month: "Sep", revenue: 248920 },
        { month: "Oct", revenue: 269540 },
        { month: "Nov", revenue: 284920 },
    ];

    const planDistribution = [
        { name: "Enterprise", value: 45, revenue: 156750, color: "#7C3AED" },
        { name: "Professional", value: 38, revenue: 89620, color: "#3B82F6" },
        { name: "Starter", value: 17, revenue: 38550, color: "#10B981" },
    ];

    const revenueByPlan = [
        { plan: "Enterprise", companies: 578, revenue: 156750, avgPerCompany: 271 },
        { plan: "Professional", companies: 486, revenue: 89620, avgPerCompany: 184 },
        { plan: "Starter", companies: 220, revenue: 38550, avgPerCompany: 175 },
    ];

    const financialMetrics = [
        {
            label: "MRR (Monthly Recurring Revenue)",
            value: "€284,920",
            change: "+23.1%",
            trend: "up",
            icon: DollarSign,
        },
        {
            label: "ARR (Annual Recurring Revenue)",
            value: "€3.42M",
            change: "+28.5%",
            trend: "up",
            icon: TrendingUp,
        },
        {
            label: "Average Revenue Per User",
            value: "€222",
            change: "+5.2%",
            trend: "up",
            icon: Target,
        },
        {
            label: "Churn Rate",
            value: "3.2%",
            change: "-1.8%",
            trend: "down",
            icon: TrendingDown,
        },
        {
            label: "Overdue Payments",
            value: "€12,450",
            change: "-15.3%",
            trend: "down",
            icon: CreditCard,
        },
        {
            label: "Trial Conversions",
            value: "68%",
            change: "+12.4%",
            trend: "up",
            icon: Percent,
        },
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl text-gray-900 mb-2">Platform Overview</h1>
                <p className="text-gray-600">Monitor and manage the entire MployUs platform</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {platformStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.trend === 'up' ? (
                                        <ArrowUpRight className="w-4 h-4" />
                                    ) : (
                                        <ArrowDownRight className="w-4 h-4" />
                                    )}
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Companies */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg text-gray-900">Recent Companies</h3>
                                <p className="text-sm text-gray-500 mt-1">Newly registered organizations</p>
                            </div>
                            <button className="text-sm text-[#7C3AED] hover:text-[#6B46C1]">
                                View All
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                        Plan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                        Users
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                        Jobs
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {companies.map((company) => (
                                    <tr key={company.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#9333EA] rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-sm">{company.logo}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-900">{company.name}</p>
                                                    <p className="text-xs text-gray-500">{company.joined}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${company.plan === 'Enterprise'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : company.plan === 'Professional'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {company.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {company.users}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {company.jobs}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${company.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {company.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button className="p-1 hover:bg-gray-100 rounded" title="View" onClick={() => handleViewCompany(company)}>
                                                    <Eye className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded" title="Edit" onClick={() => handleEditCompany(company)}>
                                                    <Edit className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <CompanyActionsMenu
                                                    company={company}
                                                    onDelete={handleDeleteCompany}
                                                    onSuspend={handleSuspendCompany}
                                                    onActivate={handleActivateCompany}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Alerts */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg text-gray-900">System Alerts</h3>
                        <p className="text-sm text-gray-500 mt-1">Recent system notifications</p>
                    </div>
                    <div className="p-6 space-y-4">
                        {systemAlerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`p-4 rounded-lg border ${alert.type === 'warning'
                                        ? 'bg-yellow-50 border-yellow-200'
                                        : alert.type === 'success'
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-blue-50 border-blue-200'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <AlertCircle
                                        className={`w-5 h-5 flex-shrink-0 ${alert.type === 'warning'
                                                ? 'text-yellow-600'
                                                : alert.type === 'success'
                                                    ? 'text-green-600'
                                                    : 'text-blue-600'
                                            }`}
                                    />
                                    <div className="flex-1">
                                        <p className={`text-sm ${alert.type === 'warning'
                                                ? 'text-yellow-800'
                                                : alert.type === 'success'
                                                    ? 'text-green-800'
                                                    : 'text-blue-800'
                                            }`}>
                                            {alert.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Performing Companies */}
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg text-gray-900">Top Performing Companies</h3>
                            <p className="text-sm text-gray-500 mt-1">Based on activity and revenue</p>
                        </div>
                        <button className="text-sm text-[#7C3AED] hover:text-[#6B46C1]">
                            View All
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Company Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Active Jobs
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Total Candidates
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Successful Hires
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Monthly Revenue
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {topPerformingCompanies.map((company, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400">#{index + 1}</span>
                                            <p className="text-sm text-gray-900">{company.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {company.jobs}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {company.candidates}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {company.hires}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {company.revenue}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Revenue Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Trend Chart */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg text-gray-900">Revenue Trend</h3>
                        <p className="text-sm text-gray-500 mt-1">6-month revenue growth</p>
                    </div>
                    <div className="p-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                <Tooltip
                                    formatter={(value: any) => `€${value.toLocaleString()}`}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#7C3AED"
                                    strokeWidth={3}
                                    dot={{ fill: '#7C3AED', r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Plan Distribution */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg text-gray-900">Plan Distribution</h3>
                        <p className="text-sm text-gray-500 mt-1">Revenue breakdown by subscription tier</p>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <ResponsiveContainer width="50%" height={250}>
                            <PieChart>
                                <Pie
                                    data={planDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {planDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex-1 space-y-4">
                            {planDistribution.map((plan) => (
                                <div key={plan.name} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }}></div>
                                            <span className="text-sm text-gray-700">{plan.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-900">{plan.value}%</span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        €{plan.revenue.toLocaleString()} / month
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue by Plan Table */}
            <div className="bg-white border border-gray-200 rounded-lg mb-8">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg text-gray-900">Revenue by Subscription Plan</h3>
                    <p className="text-sm text-gray-500 mt-1">Detailed revenue breakdown and company distribution</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Plan Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Companies
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Total Revenue
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Avg per Company
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                    Market Share
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {revenueByPlan.map((plan, index) => {
                                const totalRevenue = revenueByPlan.reduce((sum, p) => sum + p.revenue, 0);
                                const marketShare = ((plan.revenue / totalRevenue) * 100).toFixed(1);
                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${plan.plan === 'Enterprise'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : plan.plan === 'Professional'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                }`}>
                                                {plan.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {plan.companies.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            €{plan.revenue.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            €{plan.avgPerCompany}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                                                    <div
                                                        className="bg-purple-600 h-2 rounded-full"
                                                        style={{ width: `${marketShare}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-600 min-w-[45px]">{marketShare}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Financial Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {financialMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    const isPositive = (metric.trend === 'up' && !metric.label.includes('Churn') && !metric.label.includes('Overdue')) ||
                        (metric.trend === 'down' && (metric.label.includes('Churn') || metric.label.includes('Overdue')));
                    return (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {metric.trend === 'up' ? (
                                        <ArrowUpRight className="w-4 h-4" />
                                    ) : (
                                        <ArrowDownRight className="w-4 h-4" />
                                    )}
                                    {metric.change}
                                </span>
                            </div>
                            <p className="text-2xl text-gray-900 mb-1">{metric.value}</p>
                            <p className="text-sm text-gray-500">{metric.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Modals */}
            <ViewCompanyModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                company={selectedCompany}
                onEdit={handleEditCompany}
                onSuspend={handleSuspendCompanyWithReason}
            />
            <EditCompanyModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                company={selectedCompany}
                onSave={handleSaveCompany}
            />
        </div>
    );
}