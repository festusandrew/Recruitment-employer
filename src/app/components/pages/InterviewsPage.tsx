import { Calendar as CalendarIcon, Clock, Video, MapPin, Users, Plus, ChevronLeft, ChevronRight, X, ExternalLink, CheckCircle, FileText, Star, Award, Check, Sparkles, StarHalf, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

const initialUpcomingInterviews = [
    { id: 1, candidate: "Sarah Chen", role: "Product Designer", time: "10:00 AM", duration: "1 hour", type: "Video", interviewer: "Jane Doe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah2", date: "Today", notes: "Portfolio review and whiteboard exercise." },
    { id: 2, candidate: "Michael Torres", role: "Frontend Developer", time: "2:00 PM", duration: "45 min", type: "Video", interviewer: "Mike Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael2", date: "Today", notes: "Technical React coding assessment." },
    { id: 3, candidate: "Emily Watson", role: "Marketing Manager", time: "11:00 AM", duration: "1 hour", type: "On-site", interviewer: "Sarah Williams", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily2", date: "Tomorrow", notes: "Culture fit and strategy overview." },
    { id: 4, candidate: "David Kim", role: "Data Analyst", time: "3:30 PM", duration: "30 min", type: "Phone", interviewer: "Tom Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david2", date: "Nov 28", notes: "Initial phone screening." },
];

interface InterviewsPageProps {
    onScheduleInterview: () => void;
}

export function InterviewsPage({ onScheduleInterview }: InterviewsPageProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<"list" | "calendar">("list");
    const [interviewsList, setInterviewsList] = useState(initialUpcomingInterviews);
    const [calendarMode, setCalendarMode] = useState<"month" | "week" | "day">("month");

    // Modal States
    const [selectedJoinInterview, setSelectedJoinInterview] = useState<any>(null);
    const [selectedRescheduleInterview, setSelectedRescheduleInterview] = useState<any>(null);
    const [selectedScoreInterview, setSelectedScoreInterview] = useState<any>(null);

    // Reschedule form
    const [newDate, setNewDate] = useState("2026-06-28");
    const [newTime, setNewTime] = useState("02:00 PM");

    // Score sheet state
    const [scores, setScores] = useState<Record<string, number>>({
        technical: 4,
        communication: 5,
        cultureFit: 4,
        problemSolving: 4,
    });
    const [scoreNotes, setScoreNotes] = useState("");
    const [recommendation, setRecommendation] = useState("Strong Hire");
    const [submittedScores, setSubmittedScores] = useState<Record<number, boolean>>({});

    const handleRescheduleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRescheduleInterview) return;

        setInterviewsList(prev => prev.map(item => 
            item.id === selectedRescheduleInterview.id 
                ? { ...item, date: newDate, time: newTime }
                : item
        ));
        setSelectedRescheduleInterview(null);
        toast.success("Interview successfully rescheduled! Notifications sent.");
    };

    const handleScoreSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedScoreInterview) return;

        setSubmittedScores(prev => ({ ...prev, [selectedScoreInterview.id]: true }));
        toast.success(`Evaluation submitted for ${selectedScoreInterview.candidate}: ${recommendation}`);
        setSelectedScoreInterview(null);
    };

    return (
        <div className="p-8 text-left bg-gray-50/40 min-h-full">
            <div className="max-w-[1600px] mx-auto space-y-6 relative">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-gray-950 font-extrabold text-2xl tracking-tight leading-none flex items-center gap-2">
                            <CalendarIcon className="w-6 h-6 text-[#800020]" />
                            Interview Scheduler
                        </h1>
                        <p className="text-xs text-gray-400 font-semibold mt-1 uppercase tracking-wider">Manage schedules, slot buffers, video interview links, and feedback cards</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex bg-gray-100/75 p-1 rounded-xl border border-gray-200/50">
                            <button
                                onClick={() => setView("list")}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    view === "list" ? "bg-white text-gray-900 " : "text-gray-500 hover:text-gray-900"
                                }`}
                            >
                                List View
                            </button>
                            <button
                                onClick={() => setView("calendar")}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    view === "calendar" ? "bg-white text-gray-900 " : "text-gray-500 hover:text-gray-900"
                                }`}
                            >
                                Calendar
                            </button>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onScheduleInterview}
                            className="flex items-center gap-2 px-5 py-3 bg-[#800020] hover:bg-[#600018] text-white rounded-xl transition-all font-extrabold text-xs  border border-[#800020]/10 hover: cursor-pointer tracking-wider"
                        >
                            <Plus className="w-4 h-4 text-orange-300" />
                            SCHEDULE INTERVIEW
                        </motion.button>
                    </div>
                </div>

                {view === "list" ? (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                        {/* Left/Middle: Lists */}
                        <div className="xl:col-span-2 space-y-6">
                            {/* Upcoming Interviews */}
                            <div>
                                <h2 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Clock className="w-4.5 h-4.5 text-[#800020]" />
                                    Upcoming Interviews
                                </h2>
                                <div className="space-y-4">
                                    {interviewsList.map((interview) => (
                                        <motion.div
                                            key={interview.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white rounded-2xl border border-gray-150  p-6 hover:border-gray-250 transition-colors"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                                    <Avatar className="w-14 h-14 border border-white  flex-shrink-0">
                                                        <AvatarImage src={interview.avatar} />
                                                        <AvatarFallback className="bg-primary   text-white font-extrabold text-lg">
                                                            {interview.candidate.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                                                            <h3 className="text-sm font-extrabold text-gray-950 truncate leading-none">{interview.candidate}</h3>
                                                            {submittedScores[interview.id] && (
                                                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase border border-emerald-100 rounded-lg flex items-center gap-1">
                                                                    <Check className="w-3 h-3" /> Evaluated
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500 font-semibold mb-3">{interview.role}</p>
                                                        <div className="flex items-center flex-wrap gap-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                                            <span className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-150 rounded-lg">
                                                                <CalendarIcon className="w-3.5 h-3.5 text-[#800020]" />
                                                                {interview.date}
                                                            </span>
                                                            <span className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-150 rounded-lg">
                                                                <Clock className="w-3.5 h-3.5 text-[#800020]" />
                                                                {interview.time} ({interview.duration})
                                                            </span>
                                                            <span className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-150 rounded-lg">
                                                                <Video className="w-3.5 h-3.5 text-blue-600" />
                                                                {interview.type} Room
                                                            </span>
                                                            <span className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-150 rounded-lg">
                                                                <Users className="w-3.5 h-3.5 text-emerald-600" />
                                                                Host: {interview.interviewer}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <motion.button 
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.99 }}
                                                        onClick={() => setSelectedJoinInterview(interview)}
                                                        className="px-4 py-2.5 bg-[#800020] hover:bg-[#600018] text-white rounded-xl text-xs font-bold transition-all  cursor-pointer flex items-center gap-1.5 tracking-wider"
                                                    >
                                                        <Video className="w-4 h-4 text-orange-300" />
                                                        JOIN ROOM
                                                    </motion.button>
                                                    <motion.button 
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.99 }}
                                                        onClick={() => setSelectedRescheduleInterview(interview)}
                                                        className="px-4 py-2.5 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-xs font-bold transition-all  cursor-pointer flex items-center gap-1.5"
                                                    >
                                                        <Clock className="w-4 h-4 text-gray-455" />
                                                        Reschedule
                                                    </motion.button>
                                                    {!submittedScores[interview.id] && (
                                                        <motion.button 
                                                            whileHover={{ scale: 1.01 }}
                                                            whileTap={{ scale: 0.99 }}
                                                            onClick={() => setSelectedScoreInterview(interview)}
                                                            className="px-4 py-2.5 border border-dashed border-[#800020]/35 text-[#800020] bg-rose-50/20 hover:bg-[#F5E6E8]/30 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                                                        >
                                                            <Award className="w-4 h-4" />
                                                            Evaluate
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Past Interviews */}
                            <div>
                                <h2 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-4.5 h-4.5 text-[#800020]" />
                                    Evaluated & Past Sessions
                                </h2>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-2xl border border-gray-150  p-6 hover:border-gray-250 transition-colors opacity-80 hover:opacity-100">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 flex-1 min-w-[280px]">
                                                <Avatar className="w-14 h-14 border border-white  flex-shrink-0">
                                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=jessica2" />
                                                    <AvatarFallback className="bg-primary from-gray-400 to-gray-500 text-white font-extrabold text-lg">JM</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="text-sm font-extrabold text-gray-900 mb-1">Jessica Martinez</h3>
                                                    <p className="text-xs text-gray-500 font-semibold mb-2.5">UX Researcher</p>
                                                    <div className="flex items-center flex-wrap gap-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                                        <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-150 rounded-lg">
                                                            <CalendarIcon className="w-3.5 h-3.5" />
                                                            Nov 22, 2024
                                                        </span>
                                                        <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-150 rounded-lg">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            2:00 PM
                                                        </span>
                                                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg font-bold flex items-center gap-1">
                                                            <CheckCircle className="w-3.5 h-3.5" />
                                                            Completed
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => toast.info("Feedback: 'Exceptional UX research portfolio, scored 4.8/5 overall. Extended offer.'")}
                                                className="px-4 py-2.5 border border-gray-200 text-gray-750 bg-white hover:bg-gray-50 rounded-xl text-xs font-bold transition-all  cursor-pointer flex items-center gap-1.5"
                                            >
                                                <FileText className="w-4 h-4 text-[#800020]" />
                                                View Evaluation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Summary Widget */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-150  p-6">
                                <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider mb-4 pb-3 border-b border-gray-100">Evaluations Summary</h3>
                                <p className="text-xs text-gray-500 leading-relaxed mb-5 font-medium">
                                    Assess candidate performance across core categories. Submit your scoring cards promptly to coordinate hiring decisions.
                                </p>
                                <div className="space-y-3 font-semibold text-xs text-gray-650">
                                    <div className="bg-gray-50/50 border border-gray-150 rounded-xl p-3.5 flex items-center justify-between">
                                        <span className="text-gray-600">Technical competency average</span>
                                        <span className="font-bold text-gray-900 bg-white border border-gray-200 px-2 py-0.5 rounded-lg">4.2 / 5.0</span>
                                    </div>
                                    <div className="bg-gray-50/50 border border-gray-150 rounded-xl p-3.5 flex items-center justify-between">
                                        <span className="text-gray-600">Communication competency</span>
                                        <span className="font-bold text-gray-900 bg-white border border-gray-200 px-2 py-0.5 rounded-lg">4.5 / 5.0</span>
                                    </div>
                                    <div className="bg-gray-50/50 border border-gray-150 rounded-xl p-3.5 flex items-center justify-between">
                                        <span className="text-gray-600">Culture fit competency</span>
                                        <span className="font-bold text-gray-900 bg-white border border-gray-200 px-2 py-0.5 rounded-lg">4.6 / 5.0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Calendar View Container */
                    <div className="bg-white rounded-2xl border border-gray-150  p-6 text-left">
                        {/* Calendar Header with Mode Toggles */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
                            <div className="flex items-center gap-4 flex-wrap">
                                <h2 className="text-gray-950 font-extrabold text-lg tracking-tight">
                                    {calendarMode === "month" && "June 2026"}
                                    {calendarMode === "week" && "Week of Jun 21 - Jun 27, 2026"}
                                    {calendarMode === "day" && "Monday, June 25, 2026"}
                                </h2>
                                <div className="flex bg-gray-100/75 p-1 rounded-xl border border-gray-200/45">
                                    {["month", "week", "day"].map((mode) => (
                                        <button 
                                            key={mode}
                                            onClick={() => setCalendarMode(mode as any)}
                                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer uppercase tracking-wider ${
                                                calendarMode === mode ? "bg-white text-gray-900 " : "text-gray-500 hover:text-gray-900"
                                            }`}
                                        >
                                            {mode}ly
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-3.5 py-1.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 bg-white hover:bg-gray-50 transition-colors cursor-pointer select-none">
                                    Today
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 border border-gray-200 cursor-pointer text-gray-500">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 border border-gray-200 cursor-pointer text-gray-500">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid Views */}
                        {calendarMode === "month" && (
                            <div className="grid grid-cols-7 gap-3 animate-in fade-in duration-200">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <div key={day} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider py-2 bg-gray-50/60 border border-gray-100 rounded-lg">
                                        {day}
                                    </div>
                                ))}
                                {Array.from({ length: 35 }, (_, i) => {
                                    const dayNum = i - 4;
                                    const hasInterview = [25, 26, 28].includes(dayNum);
                                    const isValidDay = dayNum > 0 && dayNum <= 30;
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                if (isValidDay) {
                                                    setCalendarMode("day");
                                                }
                                            }}
                                            className={`min-h-[120px] border rounded-xl p-3 flex flex-col justify-between transition-all duration-150 ${
                                                isValidDay 
                                                    ? "bg-white hover:bg-gray-50/50 cursor-pointer border-gray-200 " 
                                                    : "bg-gray-50/30 border-gray-100 opacity-40"
                                            } ${hasInterview ? "border-[#800020]/40 bg-[#800020]/2" : ""}`}
                                        >
                                            {isValidDay && (
                                                <div className="h-full flex flex-col justify-between space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs font-bold text-gray-955">{dayNum}</span>
                                                        {hasInterview && <span className="w-2 h-2 rounded-full bg-[#800020] animate-pulse"></span>}
                                                    </div>
                                                    {hasInterview && (
                                                        <div className="space-y-1">
                                                            {dayNum === 25 && (
                                                                <>
                                                                    <div className="text-[9px] font-bold text-[#800020] bg-[#800020]/5 px-2 py-1 border border-[#800020]/15 rounded-lg flex items-center gap-1 truncate">
                                                                        <Video className="w-2.5 h-2.5 flex-shrink-0" />
                                                                        <span>10am: Sarah C.</span>
                                                                    </div>
                                                                    <div className="text-[9px] font-bold text-[#800020] bg-[#800020]/5 px-2 py-1 border border-[#800020]/15 rounded-lg flex items-center gap-1 truncate">
                                                                        <Video className="w-2.5 h-2.5 flex-shrink-0" />
                                                                        <span>2pm: Michael T.</span>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {dayNum === 26 && (
                                                                <div className="text-[9px] font-bold text-blue-700 bg-blue-50/60 px-2 py-1 border border-blue-100 rounded-lg flex items-center gap-1 truncate">
                                                                    <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                                                                    <span>11am: Emily W.</span>
                                                                </div>
                                                            )}
                                                            {dayNum === 28 && (
                                                                <div className="text-[9px] font-bold text-amber-700 bg-amber-50/60 px-2 py-1 border border-amber-100 rounded-lg flex items-center gap-1 truncate">
                                                                    <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                                                                    <span>3:30pm: David K.</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Weekly View */}
                        {calendarMode === "week" && (
                            <div className="animate-in fade-in duration-200 overflow-x-auto no-scrollbar">
                                <div className="min-w-[900px] border border-gray-150 rounded-xl overflow-hidden bg-white">
                                    {/* Days Header */}
                                    <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-150 text-center font-bold text-[10px] uppercase tracking-wider text-gray-500 py-3">
                                        <div className="text-gray-400 font-medium normal-case">Time Slot</div>
                                        <div>Sun Jun 21</div>
                                        <div className="text-[#800020] bg-[#800020]/5 rounded-lg mx-1 py-1 border border-[#800020]/10 font-extrabold">Mon Jun 22</div>
                                        <div>Tue Jun 23</div>
                                        <div>Wed Jun 24</div>
                                        <div>Thu Jun 25</div>
                                        <div>Fri Jun 26</div>
                                        <div>Sat Jun 27</div>
                                    </div>

                                    {/* Time Slots */}
                                    {[
                                        { time: "09:00 AM", slots: [null, null, null, null, null, null, null] },
                                        { time: "10:00 AM", slots: [null, { candidate: "Sarah Chen", role: "Product Designer", type: "Video", duration: "1h", bg: "bg-[#800020] text-white border-[#800020]/20" }, null, null, null, null, null] },
                                        { time: "11:00 AM", slots: [null, null, { candidate: "Emily Watson", role: "Marketing Mgr", type: "On-site", duration: "1h", bg: "bg-blue-600 text-white border-blue-750/20" }, null, null, null, null] },
                                        { time: "12:00 PM", slots: [null, null, null, null, null, null, null] },
                                        { time: "01:00 PM", slots: [null, null, null, null, null, null, null] },
                                        { time: "02:00 PM", slots: [null, { candidate: "Michael Torres", role: "Frontend Dev", type: "Video", duration: "45m", bg: "bg-[#800020] text-white border-[#800020]/20" }, null, null, null, null, null] },
                                        { time: "03:00 PM", slots: [null, null, null, null, { candidate: "David Kim", role: "Data Analyst", type: "Phone", duration: "30m", bg: "bg-amber-600 text-white border-amber-700/20" }, null, null] },
                                    ].map((row, rIdx) => (
                                        <div key={rIdx} className="grid grid-cols-8 border-b border-gray-100 last:border-b-0 min-h-[75px] items-stretch">
                                            <div className="p-3 text-xs font-extrabold text-gray-400 bg-gray-50/30 border-r border-gray-100 flex items-center justify-center">
                                                {row.time}
                                            </div>
                                            {row.slots.map((slot, sIdx) => (
                                                <div key={sIdx} className="border-r border-gray-100 last:border-r-0 p-1.5 hover:bg-gray-50/30 transition-colors flex flex-col justify-center">
                                                    {slot && (
                                                        <div className={`p-3 rounded-xl  flex flex-col justify-between h-full border ${slot.bg}`}>
                                                            <div className="flex items-center justify-between font-bold text-[11px] mb-1">
                                                                <span className="truncate">{slot.candidate}</span>
                                                                <span className="text-[8px] px-1.5 py-0.2 bg-white/20 rounded font-bold uppercase tracking-wider">{slot.duration}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between text-[10px] opacity-85">
                                                                <span className="truncate">{slot.role}</span>
                                                                <span className="font-bold">{slot.type}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Daily View */}
                        {calendarMode === "day" && (
                            <div className="animate-in fade-in duration-200">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Timeline schedule */}
                                    <div className="lg:col-span-2 border border-gray-150 rounded-2xl overflow-hidden bg-white divide-y divide-gray-100 ">
                                        <div className="p-4 bg-gray-50 font-bold text-xs uppercase tracking-wider text-gray-500 flex justify-between items-center">
                                            <span>Timeline - Monday, Jun 25</span>
                                            <span className="px-2.5 py-1 bg-[#800020]/10 text-[#800020] border border-[#800020]/10 rounded-lg text-[10px] font-bold tracking-wide">2 SESSIONS SCHEDULED</span>
                                        </div>
                                        {[
                                            { time: "09:00 AM", item: null },
                                            { 
                                                time: "10:00 AM", 
                                                item: { candidate: "Sarah Chen", role: "Product Designer", type: "Video Interview", interviewer: "Jane Doe", notes: "Portfolio review and whiteboard exercise", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah2" } 
                                            },
                                            { time: "11:00 AM", item: null },
                                            { time: "12:00 PM", item: { break: "Lunch Buffer / General Sync" } },
                                            { time: "01:00 PM", item: null },
                                            { 
                                                time: "02:00 PM", 
                                                item: { candidate: "Michael Torres", role: "Frontend Developer", type: "Video Interview", interviewer: "Mike Johnson", notes: "Technical React assessment", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael2" } 
                                            },
                                            { time: "03:00 PM", item: null },
                                        ].map((slot, idx) => (
                                            <div key={idx} className="flex items-start p-4 hover:bg-gray-50/20 transition-colors">
                                                <div className="w-24 text-xs font-bold text-gray-400 pt-1.5 flex-shrink-0">
                                                    {slot.time}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {slot.item && 'break' in slot.item ? (
                                                        <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 text-xs font-semibold text-gray-400 text-center uppercase tracking-wider">
                                                            {slot.item.break}
                                                        </div>
                                                    ) : slot.item ? (
                                                        <div className="bg-[#800020]/2 border border-[#800020]/15 rounded-xl p-4  flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#800020]/30 transition-colors text-left">
                                                            <div className="flex items-center gap-3.5">
                                                                <Avatar className="w-10 h-10 border border-white  flex-shrink-0">
                                                                    <AvatarImage src={slot.item.avatar} />
                                                                    <AvatarFallback className="bg-primary   text-white font-bold text-xs">{slot.item.candidate.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <h4 className="font-extrabold text-gray-900 text-sm">{slot.item.candidate}</h4>
                                                                    <p className="text-xs text-gray-600 font-semibold mt-0.5">{slot.item.role} • {slot.item.type}</p>
                                                                    <p className="text-[10px] text-gray-450 font-bold uppercase tracking-wider mt-1">Host: {slot.item.interviewer}</p>
                                                                </div>
                                                            </div>
                                                            <motion.button 
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                onClick={() => setSelectedJoinInterview({ id: idx, candidate: slot.item?.candidate, role: slot.item?.role, time: slot.time, duration: "1 hour", type: "Video", interviewer: slot.item?.interviewer, avatar: slot.item?.avatar, date: "Jun 25", notes: slot.item?.notes })}
                                                                className="px-4 py-2 bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold rounded-xl  cursor-pointer flex items-center gap-1.5"
                                                            >
                                                                <Video className="w-3.5 h-3.5 text-orange-300" />
                                                                <span>Join Meeting</span>
                                                            </motion.button>
                                                        </div>
                                                    ) : (
                                                        <div className="h-6 border-b border-dashed border-gray-150 flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider select-none">
                                                            Available Buffer Slot
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Daily summary widget */}
                                    <div className="border border-gray-150 rounded-2xl p-6 bg-gray-50/50 flex flex-col justify-between space-y-6 h-fit  text-left">
                                        <div>
                                            <h3 className="font-extrabold text-gray-950 text-sm uppercase tracking-wider mb-2.5 pb-2 border-b border-gray-200">Daily Summary</h3>
                                            <p className="text-xs text-gray-550 leading-relaxed mb-5 font-medium">
                                                Review candidate portfolios and technical codes before join rooms. Scorecards must be submitted directly after each slot.
                                            </p>

                                            <div className="space-y-2.5 font-bold text-xs text-gray-650">
                                                <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between ">
                                                    <span className="text-gray-600">Today's Sessions</span>
                                                    <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-lg">2 Slots</span>
                                                </div>
                                                <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between ">
                                                    <span className="text-gray-600">Pending Eval</span>
                                                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">2 pending</span>
                                                </div>
                                            </div>
                                        </div>

                                        <motion.button 
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={onScheduleInterview} 
                                            className="w-full py-3 bg-[#800020] hover:bg-[#600018] text-white rounded-xl text-xs font-extrabold  flex items-center justify-center gap-2 cursor-pointer border border-[#800020]/10 tracking-wider uppercase"
                                        >
                                            <Plus className="w-4 h-4 text-orange-300" /> Schedule Interview
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* MODALS */}

                {/* Join / View Interview Room Modal */}
                <AnimatePresence>
                    {selectedJoinInterview && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                                transition={{ type: "spring", damping: 25 }}
                                className="bg-white/95 border border-gray-100 rounded-2xl max-w-2xl w-full p-6  z-10 relative text-left"
                            >
                                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#800020]/10 flex items-center justify-center text-[#800020]">
                                            <Video className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Active Interview Session</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Live video room & workspace details</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedJoinInterview(null)}
                                        className="text-gray-400 hover:text-gray-700 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-6 mb-6">
                                    <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl flex items-center gap-4">
                                        <Avatar className="w-16 h-16 border border-white  flex-shrink-0">
                                            <AvatarImage src={selectedJoinInterview.avatar} />
                                            <AvatarFallback className="bg-primary   text-white font-bold text-lg">{selectedJoinInterview.candidate.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-extrabold text-gray-900 leading-tight">{selectedJoinInterview.candidate}</h4>
                                            <p className="text-xs text-gray-500 font-semibold mt-0.5">{selectedJoinInterview.role}</p>
                                            <div className="flex items-center gap-4 mt-2.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                                <span>Date: {selectedJoinInterview.date}</span>
                                                <span>Time: {selectedJoinInterview.time} ({selectedJoinInterview.duration})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-gray-450 uppercase tracking-wider mb-2">Session Notes & Whiteboard Agenda</h4>
                                        <div className="bg-[#F5E6E8]/70 border border-[#800020]/15 p-4 rounded-xl text-xs font-semibold text-[#800020] leading-relaxed">
                                            {selectedJoinInterview.notes || "Standard screening, technical questions, and cultural review."}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-gray-450 uppercase tracking-wider mb-2">Workspace / Meeting URL</h4>
                                        <div className="flex items-center justify-between bg-gray-50/50 p-3 rounded-xl border border-gray-150">
                                            <span className="text-[11px] text-gray-600 font-mono truncate mr-4">https://meet.recruitmentplatform.com/room-{selectedJoinInterview.id}</span>
                                            <button 
                                                onClick={() => {
                                                    toast.success(`Launching meeting with ${selectedJoinInterview.candidate}...`);
                                                    setSelectedJoinInterview(null);
                                                }}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold  flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                Launch Meeting
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedJoinInterview(null)}
                                        className="px-5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-750 font-bold rounded-xl text-xs  cursor-pointer"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Reschedule Interview Modal */}
                <AnimatePresence>
                    {selectedRescheduleInterview && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                                transition={{ type: "spring", damping: 25 }}
                                className="bg-white/95 border border-gray-100 rounded-2xl max-w-md w-full p-6  z-10 relative text-left"
                            >
                                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#800020]/10 flex items-center justify-center text-[#800020]">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Reschedule Interview</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Update meeting slot details</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedRescheduleInterview(null)}
                                        className="text-gray-400 hover:text-gray-700 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleRescheduleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">New Date *</label>
                                        <input 
                                            type="date" 
                                            required 
                                            value={newDate} 
                                            onChange={(e) => setNewDate(e.target.value)} 
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] text-xs font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">New Time Slot *</label>
                                        <input 
                                            type="text" 
                                            required 
                                            value={newTime} 
                                            onChange={(e) => setNewTime(e.target.value)} 
                                            placeholder="e.g. 02:30 PM"
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] text-xs font-medium"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedRescheduleInterview(null)}
                                            className="px-5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-750 font-bold rounded-xl text-xs  cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-5 py-2.5 bg-[#800020] hover:bg-[#600018] text-white font-extrabold rounded-xl text-xs  border border-[#800020]/10 hover: cursor-pointer"
                                        >
                                            Reschedule Slot
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Score Sheet evaluation Modal */}
                <AnimatePresence>
                    {selectedScoreInterview && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                                transition={{ type: "spring", damping: 25 }}
                                className="bg-white/95 border border-gray-100 rounded-2xl max-w-lg w-full p-6  z-10 relative text-left"
                            >
                                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#800020]/10 flex items-center justify-center text-[#800020]">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Evaluate Candidate</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Submit slot scorecard & feedback</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedScoreInterview(null)}
                                        className="text-gray-400 hover:text-gray-700 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleScoreSubmit} className="space-y-5">
                                    <div className="bg-gray-50 border border-gray-150 p-3 rounded-xl flex items-center gap-3">
                                        <Avatar className="w-10 h-10 border border-white  flex-shrink-0">
                                            <AvatarImage src={selectedScoreInterview.avatar} />
                                            <AvatarFallback className="bg-primary   text-white font-bold text-xs">{selectedScoreInterview.candidate.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-900">{selectedScoreInterview.candidate}</h4>
                                            <p className="text-[10px] text-gray-550 mt-0.5">{selectedScoreInterview.role}</p>
                                        </div>
                                    </div>

                                    {/* Competency Ratings */}
                                    <div className="space-y-3.5 border-t border-b border-gray-100 py-4">
                                        {Object.keys(scores).map((key) => (
                                            <div key={key} className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-gray-700 capitalize tracking-tight">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setScores({ ...scores, [key]: star })}
                                                            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                                                                star <= scores[key] ? "text-[#800020] bg-rose-50" : "text-gray-300 hover:bg-gray-50"
                                                            }`}
                                                        >
                                                            <Star className="w-4 h-4 fill-current" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Recommendation Decision</label>
                                        <div className="relative">
                                            <select
                                                value={recommendation}
                                                onChange={(e) => setRecommendation(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 appearance-none text-xs font-semibold cursor-pointer"
                                            >
                                                <option>Strong Hire</option>
                                                <option>Hire</option>
                                                <option>Maybe / Discuss</option>
                                                <option>Reject</option>
                                            </select>
                                            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Evaluation Feedback & Notes</label>
                                        <textarea
                                            required
                                            value={scoreNotes}
                                            onChange={(e) => setScoreNotes(e.target.value)}
                                            placeholder="Summarize coding competencies, culture match, and portfolio critiques..."
                                            rows={4}
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800020]/15 focus:border-[#800020] text-xs font-medium resize-none leading-relaxed"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-5 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedScoreInterview(null)}
                                            className="px-5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-750 font-bold rounded-xl text-xs  cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-5 py-2.5 bg-[#800020] hover:bg-[#600018] text-white font-extrabold rounded-xl text-xs  border border-[#800020]/10 hover: cursor-pointer"
                                        >
                                            Submit Evaluation
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}

// Chevron Down Subcomponent if not imported
function ChevronDown(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={props.className}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}



