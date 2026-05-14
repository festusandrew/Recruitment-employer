import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

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
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-sm text-left">
            <div className="mb-6">
                <h2 className="text-lg text-gray-900 font-semibold">Tasks & Alerts</h2>
                <p className="text-sm text-gray-600 mt-0.5">Your pending actions</p>
            </div>

            {/* Alerts Section */}
            <div className="space-y-2 mb-6 pb-6 border-b border-gray-100">
                {overdueAlerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`flex items-center gap-3 p-3 rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.04)] ${alert.type === "warning"
                                ? "bg-orange-50 border border-orange-200/70"
                                : "bg-[#F5E6E8] border border-[#E9967A]"
                            }`}
                    >
                        <AlertCircle
                            className={`w-4 h-4 flex-shrink-0 ${alert.type === "warning" ? "text-orange-600" : "text-[#800020]"
                                }`}
                        />
                        <span
                            className={`text-sm font-medium ${alert.type === "warning" ? "text-orange-900" : "text-[#4A0D0D]"
                                }`}
                        >
                            {alert.message}
                        </span>
                    </div>
                ))}
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`flex items-start gap-3 p-3.5 rounded-lg border hover:bg-gray-50 transition-colors ${task.completed
                                ? "bg-gray-50 border-gray-200/60 opacity-75"
                                : "bg-white border-gray-200/70 shadow-sm"
                            }`}
                    >
                        <Checkbox
                            checked={task.completed}
                            className="mt-0.5"
                            id={`task-${task.id}`}
                        />

                        <div className="flex-1 min-w-0">
                            <label
                                htmlFor={`task-${task.id}`}
                                className={`block text-sm font-medium cursor-pointer ${task.completed
                                        ? "text-gray-500 line-through"
                                        : "text-gray-900"
                                    }`}
                            >
                                {task.title}
                            </label>

                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <Badge
                                    variant="secondary"
                                    className="text-xs h-5 bg-gray-100 text-gray-600 font-medium"
                                >
                                    {task.type}
                                </Badge>

                                <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    <span>{task.deadline}</span>
                                </div>

                                {task.priority === "high" && !task.completed && (
                                    <Badge
                                        variant="outline"
                                        className="text-xs h-5 bg-red-50 text-red-700 border-red-200 font-medium ml-auto"
                                    >
                                        High Priority
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={onViewAll}
                className="w-full mt-6 py-2.5 text-sm text-[#800020] hover:text-white hover:bg-[#800020] border border-[#800020]/20 hover:border-[#800020] rounded-lg transition-colors cursor-pointer font-medium"
            >
                View all tasks
            </button>
        </div>
    );
}