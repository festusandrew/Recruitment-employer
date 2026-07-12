import { useState } from "react";
import { Plus, CheckCircle2, Circle, Clock, Search, Filter, AlertCircle, Calendar, Trash2, CheckSquare, X, AlertTriangle, Sparkles } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "motion/react";

interface TasksPageProps {
    onAddTask: () => void;
}

const initialTasks = [
    {
        id: 1,
        title: "Review technical assignment for Michael Chen",
        type: "Evaluation",
        applicant: "Michael Chen",
        job: "Product Designer",
        deadline: "Today, 3:00 PM",
        priority: "high",
        completed: false,
        created: "Yesterday",
    },
    {
        id: 2,
        title: "Interview: Sarah Johnson - Technical Round",
        type: "Interview",
        applicant: "Sarah Johnson",
        job: "Senior Frontend Developer",
        deadline: "Today, 4:30 PM",
        priority: "high",
        completed: false,
        created: "2 days ago",
    },
    {
        id: 3,
        title: "Follow up with Emma Davis on salary negotiations",
        type: "Follow-up",
        applicant: "Emma Davis",
        job: "DevOps Engineer",
        deadline: "Tomorrow",
        priority: "medium",
        completed: false,
        created: "3 days ago",
    },
    {
        id: 4,
        title: "Update hiring scorecard template for design roles",
        type: "Template",
        applicant: null,
        job: "All Design Roles",
        deadline: "Friday, May 19",
        priority: "low",
        completed: false,
        created: "May 10",
    },
    {
        id: 5,
        title: "Prepare interview questions for Product Designer role",
        type: "Preparation",
        applicant: null,
        job: "Product Designer",
        deadline: "Nov 27",
        priority: "medium",
        completed: true,
        created: "May 8",
    },
    {
        id: 6,
        title: "Send onboarding kit requirements to HR",
        type: "Onboarding",
        applicant: "Sophia Martinez",
        job: "Marketing Manager",
        deadline: "Monday, May 22",
        priority: "high",
        completed: true,
        created: "May 5",
    },
    {
        id: 7,
        title: "Sync with engineering leads regarding Q3 headcount",
        type: "Planning",
        applicant: null,
        job: "Engineering",
        deadline: "May 25",
        priority: "medium",
        completed: false,
        created: "May 1",
    },
];

export function TasksPage({ onAddTask }: TasksPageProps) {
    const [tasksList, setTasksList] = useState(initialTasks);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTab, setFilterTab] = useState<"all" | "pending" | "completed" | "high">("all");
    const [taskToDelete, setTaskToDelete] = useState<any>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const toggleTaskCompleted = (id: number) => {
        setTasksList(prev => prev.map(t => {
            if (t.id === id) {
                const newState = !t.completed;
                showToast(newState ? "Task marked as completed." : "Task marked as pending.");
                return { ...t, completed: newState };
            }
            return t;
        }));
    };

    const confirmDeleteTask = (id: number) => {
        setTasksList(prev => prev.filter(t => t.id !== id));
        setTaskToDelete(null);
        showToast("Task deleted successfully.");
    };

    const filteredTasks = tasksList.filter(task => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = !query || 
            task.title.toLowerCase().includes(query) ||
            task.type.toLowerCase().includes(query) ||
            (task.applicant && task.applicant.toLowerCase().includes(query)) ||
            (task.job && task.job.toLowerCase().includes(query));

        if (!matchesSearch) return false;

        if (filterTab === "pending") return !task.completed;
        if (filterTab === "completed") return task.completed;
        if (filterTab === "high") return task.priority === "high" && !task.completed;
        return true;
    });

    const pendingCount = tasksList.filter(t => !t.completed).length;
    const completedCount = tasksList.filter(t => t.completed).length;
    const highPriorityCount = tasksList.filter(t => t.priority === "high" && !t.completed).length;

    return (
        <div className="p-8 max-w-[1400px] mx-auto text-left relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Task Management</h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Organize pending actions, interview preparation, and applicant follow-ups.</p>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onAddTask}
                    className="flex items-center gap-2 px-5 py-3 bg-indigo-600   text-white rounded-xl hover: transition-all  text-sm font-bold cursor-pointer flex-shrink-0 self-start md:self-auto border border-indigo-600/20"
                >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    Add New Task
                </motion.button>
            </div>

            {/* System Alerts Banner */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3.5 p-5 rounded-2xl bg-amber-50/70 border border-amber-200/50 "
                >
                    <div className="w-11 h-11 bg-amber-100/80 rounded-xl flex items-center justify-center flex-shrink-0 border border-amber-200/40 ">
                        <AlertCircle className="w-5.5 h-5.5 text-amber-700" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-amber-900">Immediate Attention Required</h4>
                        <p className="text-xs text-amber-800 mt-0.5 font-medium">3 active applicants awaiting interview scorecard reviews.</p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-center gap-3.5 p-5 rounded-2xl bg-rose-50/55 border border-rose-200/40 "
                >
                    <div className="w-11 h-11 bg-indigo-600/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-indigo-600/10 ">
                        <CheckSquare className="w-5.5 h-5.5 text-indigo-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-[#4A0D0D]">Upcoming Schedule</h4>
                        <p className="text-xs text-indigo-600 mt-0.5 font-medium">2 technical interview rounds require coordination today.</p>
                    </div>
                </motion.div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/60 ">
                <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl self-start border border-slate-200/50">
                    <button
                        onClick={() => setFilterTab("all")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterTab === "all" ? "bg-white text-indigo-600  border border-slate-200/80" : "text-slate-500 hover:text-slate-900"}`}
                    >
                        All Tasks ({tasksList.length})
                    </button>
                    <button
                        onClick={() => setFilterTab("pending")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterTab === "pending" ? "bg-white text-indigo-600  border border-slate-200/80" : "text-slate-500 hover:text-slate-900"}`}
                    >
                        Pending ({pendingCount})
                    </button>
                    <button
                        onClick={() => setFilterTab("high")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${filterTab === "high" ? "bg-white text-indigo-600  border border-slate-200/80" : "text-slate-500 hover:text-slate-900"}`}
                    >
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        High Priority ({highPriorityCount})
                    </button>
                    <button
                        onClick={() => setFilterTab("completed")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterTab === "completed" ? "bg-white text-indigo-600  border border-slate-200/80" : "text-slate-500 hover:text-slate-900"}`}
                    >
                        Completed ({completedCount})
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search tasks by title, role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-80 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600  transition-all"
                    />
                </div>
            </div>

            {/* Task Cards */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filteredTasks.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center "
                        >
                            <p className="text-slate-400 text-sm font-bold">No tasks match your search or filter view.</p>
                        </motion.div>
                    ) : (
                        filteredTasks.map((task, idx) => (
                            <motion.div 
                                key={task.id}
                                layout
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25, delay: idx * 0.02 }}
                                className={`flex items-start gap-4 p-5 rounded-2xl border transition-all ${task.completed ? "bg-gray-50/50 border-slate-200/50 opacity-60" : "bg-white border-slate-200/80  hover: hover:border-indigo-600/25"}`}
                            >
                                <div className="mt-1 flex-shrink-0">
                                    <Checkbox
                                        checked={task.completed}
                                        onCheckedChange={() => toggleTaskCompleted(task.id)}
                                        className="cursor-pointer border-gray-300 w-5 h-5 rounded-md text-indigo-600 focus:ring-indigo-600 accent-indigo-600"
                                        id={`task-page-${task.id}`}
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                                        <div>
                                            <label
                                                htmlFor={`task-page-${task.id}`}
                                                className={`block text-base font-bold cursor-pointer transition-colors ${task.completed ? "text-slate-400 line-through" : "text-slate-900 hover:text-indigo-600"}`}
                                            >
                                                {task.title}
                                            </label>
                                            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 font-semibold flex-wrap">
                                                {task.applicant && (
                                                    <span className="text-indigo-600 bg-rose-50 px-2 py-0.5 rounded border border-indigo-600/10 font-bold">
                                                        Applicant: {task.applicant}
                                                    </span>
                                                )}
                                                {task.applicant && <span className="text-gray-300">•</span>}
                                                {task.job && (
                                                    <span className="text-slate-600 bg-gray-50 px-2 py-0.5 rounded border border-slate-200/60 font-semibold">{task.job}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button 
                                                onClick={() => setTaskToDelete(task)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-red-100"
                                                title="Delete Task"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5 flex-wrap pt-3 border-t border-slate-100/60">
                                        <Badge variant="secondary" className="text-[10px] font-black tracking-wider uppercase py-0.5 px-2 bg-gray-100 text-slate-600 border border-slate-200/50 rounded-md">
                                            {task.type}
                                        </Badge>

                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 ml-2">
                                            <Clock className="w-3.5 h-3.5 text-indigo-600" />
                                            <span>Due: {task.deadline}</span>
                                        </div>

                                        {task.priority === "high" && !task.completed && (
                                            <Badge variant="outline" className="text-[10px] font-extrabold tracking-wide py-0.5 px-2 bg-red-50 text-red-700 border-red-200/70 ml-auto rounded-md">
                                                High Priority
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Task Delete Confirmation Modal */}
            <AnimatePresence>
                {taskToDelete && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white rounded-2xl max-w-md w-full p-6  border border-slate-100 text-left"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 flex-shrink-0 border border-rose-100">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900">Delete Action Item</h3>
                                    <p className="text-xs text-slate-400 font-bold">This action cannot be undone</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600 mb-6 font-semibold leading-relaxed">
                                Are you sure you want to delete <span className="font-bold text-slate-900">"{taskToDelete.title}"</span>?
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setTaskToDelete(null)}
                                    className="px-5 py-2.5 border border-gray-300 text-slate-500 font-bold rounded-xl hover:bg-gray-50 text-sm cursor-pointer transition-colors"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={() => confirmDeleteTask(taskToDelete.id)}
                                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-800 text-sm  cursor-pointer transition-all"
                                >
                                    Delete Task
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 px-4 py-3 bg-gray-900 text-white rounded-xl  flex items-center gap-3 z-50 border border-white/10"
                    >
                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                            <CheckSquare className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs font-black">{toastMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}



