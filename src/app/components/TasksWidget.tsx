import { CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

const tasks = [
    {
        id: 1,
        title: "Review feedback for Michael Chen",
        type: "Feedback",
        deadline: "Today, 3:00 PM",
        priority: "high",
        completed: false,
    },
    {
        id: 2,
        title: "Interview: Sarah Johnson - Technical Round",
        type: "Interview",
        deadline: "Today, 4:30 PM",
        priority: "high",
        completed: false,
    },
    {
        id: 3,
        title: "Follow up with Emma Davis on offer",
        type: "Follow-up",
        deadline: "Tomorrow",
        priority: "medium",
        completed: false,
    },
    {
        id: 4,
        title: "Update job description for DevOps role",
        type: "Task",
        deadline: "Nov 26",
        priority: "low",
        completed: false,
    },
    {
        id: 5,
        title: "Prepare interview questions for Product Designer",
        type: "Task",
        deadline: "Nov 27",
        priority: "medium",
        completed: true,
    },
];

const overdueAlerts = [
    {
        id: 1,
        message: "3 candidates awaiting feedback",
        type: "warning",
    },
    {
        id: 2,
        message: "2 interviews need scheduling",
        type: "info",
    },
];

export function TasksWidget({ onViewAll }: { onViewAll?: () => void }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100  text-left relative overflow-hidden flex flex-col justify-between h-[510px]">
            <div>
                <div className="mb-5">
                    <h2 className="text-lg text-gray-900 font-bold tracking-tight">Tasks & Alerts</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Your pending hiring actions and reminders</p>
                </div>

                {/* Alerts Section */}
                <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                    {overdueAlerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl border shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all ${
                                alert.type === "warning"
                                    ? "bg-orange-50/70 border-orange-200/50 text-orange-800"
                                    : "bg-rose-50/70 border-rose-100 text-[#800020]"
                            }`}
                        >
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs font-bold tracking-wide">
                                {alert.message}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Tasks List */}
                <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1 no-scrollbar">
                    {tasks.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                                task.completed
                                    ? "bg-gray-50/50 border-gray-100 opacity-60"
                                    : "bg-white border-gray-200/70 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#800020]/20"
                            }`}
                        >
                            <Checkbox
                                checked={task.completed}
                                className="mt-0.5 border-gray-300 rounded focus:ring-[#800020]/20"
                                id={`task-${task.id}`}
                            />

                            <div className="flex-1 min-w-0">
                                <label
                                    htmlFor={`task-${task.id}`}
                                    className={`block text-xs font-bold cursor-pointer leading-tight ${
                                        task.completed
                                            ? "text-gray-400 line-through"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {task.title}
                                </label>

                                <div className="flex items-center gap-2 mt-2 flex-wrap text-[10px]">
                                    <Badge
                                        variant="secondary"
                                        className="text-[9px] h-4.5 bg-gray-100 text-gray-600 border-none font-bold rounded-md px-1.5"
                                    >
                                        {task.type}
                                    </Badge>

                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                                        <Clock className="w-3 h-3 text-gray-350" />
                                        <span>{task.deadline}</span>
                                    </div>

                                    {task.priority === "high" && !task.completed && (
                                        <Badge
                                            variant="outline"
                                            className="text-[9px] h-4.5 bg-red-50 text-red-700 border-red-200 font-bold px-1.5 rounded-md ml-auto"
                                        >
                                            High
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <button 
                onClick={onViewAll}
                className="w-full mt-4 py-2.5 text-xs text-[#800020] hover:text-white hover:bg-[#800020] border border-[#800020]/15 hover:border-[#800020] rounded-xl transition-all duration-300 cursor-pointer font-bold bg-white flex items-center justify-center gap-1 "
            >
                <span>View All Tasks</span>
                <ArrowRight className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}


