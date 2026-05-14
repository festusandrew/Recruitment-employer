import { useState } from "react";
import { Plus, CheckCircle2, Circle, Clock, Search, Filter, AlertCircle, Calendar, Trash2, CheckSquare, X, AlertTriangle } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";

interface TasksPageProps {
    onAddTask: () => void;
}

const initialTasks = [
    {
        id: 1,
        title: "Review technical assignment for Michael Chen",
        type: "Evaluation",
        candidate: "Michael Chen",
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
        candidate: "Sarah Johnson",
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
        candidate: "Emma Davis",
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
        candidate: null,
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
        candidate: null,
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
        candidate: "Sophia Martinez",
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
        candidate: null,
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

    const toggleTaskCompleted = (id: number) => {
        setTasksList(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const confirmDeleteTask = (id: number) => {
        setTasksList(prev => prev.filter(t => t.id !== id));
        setTaskToDelete(null);
    };

    const filteredTasks = tasksList.filter(task => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = !query || 
            task.title.toLowerCase().includes(query) ||
            task.type.toLowerCase().includes(query) ||
            (task.candidate && task.candidate.toLowerCase().includes(query)) ||
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
                    <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
                    <p className="text-sm text-gray-600 mt-1">Organize pending actions, interview preparation, and candidate follow-ups</p>
                </div>
                <button 
                    onClick={onAddTask}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#800020] text-white rounded-xl hover:bg-[#600018] transition-all shadow-md text-sm font-bold cursor-pointer flex-shrink-0 self-start md:self-auto border border-[#800020]/20"
                >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    Add New Task
                </button>
            </div>

            {/* System Alerts Banner */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 border border-orange-200/70 shadow-xs">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-orange-900">Immediate Attention Required</h4>
                        <p className="text-xs text-orange-800 mt-0.5">3 candidates awaiting feedback post-interview</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F5E6E8] border border-[#E9967A] shadow-xs">
                    <div className="w-10 h-10 bg-[#800020]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckSquare className="w-5 h-5 text-[#800020]" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-[#4A0D0D]">Action Items Schedule</h4>
                        <p className="text-xs text-[#800020] mt-0.5">2 interviews need immediate scheduling today</p>
                    </div>
                </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl self-start border border-gray-200 shadow-xs">
                    <button
                        onClick={() => setFilterTab("all")}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterTab === "all" ? "bg-white text-[#800020] shadow-sm border border-gray-200/80" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        All Tasks ({tasksList.length})
                    </button>
                    <button
                        onClick={() => setFilterTab("pending")}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterTab === "pending" ? "bg-white text-[#800020] shadow-sm border border-gray-200/80" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        Pending ({pendingCount})
                    </button>
                    <button
                        onClick={() => setFilterTab("high")}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${filterTab === "high" ? "bg-white text-[#800020] shadow-sm border border-gray-200/80" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        High Priority ({highPriorityCount})
                    </button>
                    <button
                        onClick={() => setFilterTab("completed")}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterTab === "completed" ? "bg-white text-[#800020] shadow-sm border border-gray-200/80" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        Completed ({completedCount})
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tasks by title, role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-80 pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#800020] shadow-xs"
                    />
                </div>
            </div>

            {/* Task Cards */}
            <div className="space-y-3">
                {filteredTasks.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center shadow-xs">
                        <p className="text-gray-500 text-sm font-medium">No tasks match your search or filter view.</p>
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <div 
                            key={task.id}
                            className={`flex items-start gap-4 p-5 rounded-xl border transition-all ${task.completed ? "bg-gray-50/80 border-gray-200/60 opacity-75" : "bg-white border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#800020]/30"}`}
                        >
                            <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => toggleTaskCompleted(task.id)}
                                className="mt-1 cursor-pointer"
                                id={`task-page-${task.id}`}
                            />

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                    <div>
                                        <label
                                            htmlFor={`task-page-${task.id}`}
                                            className={`block text-base font-semibold cursor-pointer ${task.completed ? "text-gray-500 line-through" : "text-gray-900 hover:text-[#800020]"}`}
                                        >
                                            {task.title}
                                        </label>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-600 font-medium flex-wrap">
                                            {task.candidate && (
                                                <span className="text-[#800020] font-semibold">Candidate: {task.candidate}</span>
                                            )}
                                            {task.candidate && <span className="text-gray-300">•</span>}
                                            {task.job && (
                                                <span className="text-gray-700">{task.job}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button 
                                            onClick={() => setTaskToDelete(task)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            title="Delete Task"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-gray-100">
                                    <Badge variant="secondary" className="text-xs py-1 px-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg">
                                        {task.type}
                                    </Badge>

                                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 ml-2">
                                        <Clock className="w-3.5 h-3.5 text-[#800020]" />
                                        <span>Due: {task.deadline}</span>
                                    </div>

                                    {task.priority === "high" && !task.completed && (
                                        <Badge variant="outline" className="text-xs py-1 px-2.5 bg-red-50 text-red-700 border-red-200 font-semibold ml-auto rounded-lg">
                                            High Priority
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Task Delete Confirmation Modal */}
            {taskToDelete && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 flex-shrink-0">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
                                <p className="text-xs text-gray-500">Remove task permanently</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-sm text-gray-700 mb-6 font-medium">
                            Are you sure you want to delete <span className="font-bold text-gray-900">"{taskToDelete.title}"</span>? This action cannot be undone.
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setTaskToDelete(null)}
                                className="px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 text-sm cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => confirmDeleteTask(taskToDelete.id)}
                                className="px-6 py-2.5 bg-[#800020] text-white font-semibold rounded-xl hover:bg-[#600018] text-sm shadow-sm cursor-pointer"
                            >
                                Delete Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
