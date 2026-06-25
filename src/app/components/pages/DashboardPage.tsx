import { KPICards } from "../KPICards";
import { ActiveJobs } from "../ActiveJobs";
import { PipelineSnapshot } from "../PipelineSnapshot";
import { ActivityFeed } from "../ActivityFeed";
import { TasksWidget } from "../TasksWidget";
import { LayoutDashboard } from "lucide-react";
import { motion } from "motion/react";

interface DashboardPageProps {
    onNavigate: (page: string) => void;
    onViewPipeline?: (job: any) => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export function DashboardPage({ onNavigate, onViewPipeline }: DashboardPageProps) {
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="min-h-full bg-gray-50/30"
        >
            <div className="max-w-[1600px] mx-auto p-6 md:p-8">
                {/* Page Header */}
                <motion.div variants={itemVariants} className="mb-8 text-left">
                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 bg-[#800020] rounded-xl flex items-center justify-center  border border-white/10">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-955 tracking-tight leading-none">Recruitment Overview</h1>
                            <p className="text-xs md:text-sm text-gray-500 mt-1.5 font-medium">
                                Welcome back! Here is a summary of your hiring activities, active jobs, and task checklist.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* KPI Summary Cards */}
                <motion.div variants={itemVariants} className="mb-8">
                    <KPICards />
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                    {/* Left/Center Column - Spans 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div variants={itemVariants}>
                            <ActiveJobs onViewAllJobs={() => onNavigate("jobs")} onViewPipeline={onViewPipeline} />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <PipelineSnapshot onViewCandidates={() => onNavigate("pipeline")} />
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <motion.div variants={itemVariants}>
                            <ActivityFeed onViewAll={() => onNavigate("activity")} />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <TasksWidget onViewAll={() => onNavigate("tasks")} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}



