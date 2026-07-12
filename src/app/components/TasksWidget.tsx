import { CheckCircle2, Clock, AlertCircle, ArrowRight, Plus, Trash2, X } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const initialTasks = [
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

const initialAlerts = [
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
    const [tasksList, setTasksList] = useState(initialTasks);
    const [alertsList, setAlertsList] = useState(initialAlerts);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const handleToggleTask = (id: number) => {
        setTasksList(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const handleDismissAlert = (id: number) => {
        setAlertsList(prev => prev.filter(a => a.id !== id));
    };

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        const newTask = {
            id: Date.now(),
            title: newTaskTitle,
            type: "Task",
            deadline: "Today",
            priority: "medium",
            completed: false
        };
        setTasksList([newTask, ...tasksList]);
        setNewTaskTitle("");
        setShowAddForm(false);
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-premium text-left relative overflow-hidden flex flex-col justify-between h-[510px]">
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg text-slate-900 font-extrabold tracking-tight font-sans">Tasks & Alerts</h2>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">Your pending hiring actions and reminders</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="w-7 h-7 bg-indigo-50 hover:bg-indigo-100 text-indigo-650 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                        title="Add New Task"
                    >
                        {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                </div>

                {/* Inline Add Task Form */}
                <AnimatePresence>
                    {showAddForm && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            onSubmit={handleAddTask}
                            className="mb-4 p-3 bg-slate-50/65 rounded-xl border border-slate-200/50 space-y-2"
                        >
                            <input
                                type="text"
                                placeholder="What needs to be done?"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600/15 focus:border-indigo-650"
                                autoFocus
                            />
                            <div className="flex justify-end gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="px-2.5 py-1 text-[10px] text-slate-500 font-bold hover:bg-slate-100 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-2.5 py-1 text-[10px] bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-850 transition-colors"
                                >
                                    Add Task
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Alerts Section */}
                <AnimatePresence>
                    {alertsList.length > 0 && (
                        <div className="space-y-2 mb-4 pb-4 border-b border-slate-100">
                            {alertsList.map((alert) => (
                                <motion.div
                                    key={alert.id}
                                    initial={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0, padding: 0 }}
                                    className={`flex items-center justify-between gap-2.5 p-2.5 rounded-xl border shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all ${
                                        alert.type === "warning"
                                            ? "bg-amber-50/70 border-amber-200/50 text-amber-800"
                                            : "bg-indigo-50/70 border-indigo-100 text-indigo-900"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span className="text-xs font-bold tracking-wide truncate">
                                            {alert.message}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleDismissAlert(alert.id)}
                                        className="text-slate-400 hover:text-slate-650 transition-colors p-0.5 rounded-md hover:bg-black/5 cursor-pointer"
                                        title="Dismiss Alert"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                {/* Tasks List */}
                <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1 no-scrollbar">
                    {tasksList.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                                task.completed
                                    ? "bg-slate-50/50 border-slate-150 opacity-60"
                                    : "bg-white border-slate-200/70 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-indigo-600/20"
                            }`}
                        >
                            <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => handleToggleTask(task.id)}
                                className="mt-0.5 border-slate-300 rounded focus:ring-indigo-500/20 cursor-pointer"
                                id={`task-${task.id}`}
                            />

                            <div className="flex-1 min-w-0">
                                <label
                                    onClick={() => handleToggleTask(task.id)}
                                    className={`block text-xs font-bold cursor-pointer leading-tight ${
                                        task.completed
                                            ? "text-slate-400 line-through"
                                            : "text-slate-900"
                                    }`}
                                >
                                    {task.title}
                                </label>

                                <div className="flex items-center gap-2 mt-2 flex-wrap text-[10px]">
                                    <Badge
                                        variant="secondary"
                                        className="text-[9px] h-4.5 bg-slate-100 text-slate-600 border-none font-bold rounded-md px-1.5"
                                    >
                                        {task.type}
                                    </Badge>

                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                                        <Clock className="w-3 h-3 text-slate-350" />
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
                className="w-full mt-4 py-2.5 text-xs text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600/15 hover:border-indigo-600 rounded-xl transition-all duration-300 cursor-pointer font-bold bg-white flex items-center justify-center gap-1 "
            >
                <span>View All Tasks</span>
                <ArrowRight className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}


