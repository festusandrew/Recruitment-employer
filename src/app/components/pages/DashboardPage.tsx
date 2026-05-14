import { KPICards } from "../KPICards";
import { ActiveJobs } from "../ActiveJobs";
import { PipelineSnapshot } from "../PipelineSnapshot";
import { ActivityFeed } from "../ActivityFeed";
import { TasksWidget } from "../TasksWidget";
import { LayoutDashboard } from "lucide-react";

interface DashboardPageProps {
    onNavigate: (page: string) => void;
    onViewPipeline?: (job: any) => void;
}

export function DashboardPage({ onNavigate, onViewPipeline }: DashboardPageProps) {
    return (
        <div className="min-h-full bg-gray-50">
            <div className="max-w-[1600px] mx-auto p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#800020] rounded-xl flex items-center justify-center">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-gray-900">Dashboard</h1>
                            <p className="text-sm text-gray-600">Welcome back! Here's your recruitment overview</p>
                        </div>
                    </div>
                </div>

                {/* KPI Summary Cards */}
                <div className="mb-8">
                    <KPICards />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left/Center Column - Spans 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        <ActiveJobs onViewAllJobs={() => onNavigate("jobs")} onViewPipeline={onViewPipeline} />
                        <PipelineSnapshot onViewCandidates={() => onNavigate("candidates")} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <ActivityFeed onViewAll={() => onNavigate("activity")} />
                        <TasksWidget onViewAll={() => onNavigate("tasks")} />
                    </div>
                </div>
            </div>
        </div>
    );
}
