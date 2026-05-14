import { Calendar as CalendarIcon, Clock, Video, MapPin, Users, Plus, ChevronLeft, ChevronRight, X, ExternalLink, CheckCircle, FileText, Star, Award, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";

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
    const [newDate, setNewDate] = useState("2026-05-20");
    const [newTime, setNewTime] = useState("02:00 PM");

    // Score sheet state
    const [scores, setScores] = useState({
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
        alert("Interview successfully rescheduled! Calendar invites and notifications sent to candidate and interviewer.");
    };

    const handleScoreSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedScoreInterview) return;

        setSubmittedScores(prev => ({ ...prev, [selectedScoreInterview.id]: true }));
        alert(`Evaluation successfully submitted for ${selectedScoreInterview.candidate} with recommendation: ${recommendation}!`);
        setSelectedScoreInterview(null);
    };

    return (
        <div className="p-8">
            <div className="max-w-[1600px] mx-auto relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-gray-900 mb-2 font-bold text-2xl">Interviews</h1>
                        <p className="text-gray-600 text-sm">Manage and schedule candidate interviews</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setView("list")}
                                className={`px-4 py-2 rounded text-sm transition-colors cursor-pointer ${view === "list" ? "bg-white text-gray-900 shadow-sm font-medium" : "text-gray-600"
                                    }`}
                            >
                                List View
                            </button>
                            <button
                                onClick={() => setView("calendar")}
                                className={`px-4 py-2 rounded text-sm transition-colors cursor-pointer ${view === "calendar" ? "bg-white text-gray-900 shadow-sm font-medium" : "text-gray-600"
                                    }`}
                            >
                                Calendar View
                            </button>
                        </div>
                        <button
                            onClick={onScheduleInterview}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors font-medium shadow-sm cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            Schedule Interview
                        </button>
                    </div>
                </div>

                {view === "list" ? (
                    <>
                        {/* Upcoming Interviews */}
                        <div className="mb-8">
                            <h2 className="text-gray-900 mb-4 font-semibold text-lg">Upcoming Interviews</h2>
                            <div className="space-y-4">
                                {interviewsList.map((interview) => (
                                    <div
                                        key={interview.id}
                                        className="bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 p-6"
                                    >
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                                                <Avatar className="w-14 h-14 border border-gray-100 shadow-sm flex-shrink-0">
                                                    <AvatarImage src={interview.avatar} />
                                                    <AvatarFallback className="text-lg font-bold">{interview.candidate.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-gray-900 font-bold text-base">{interview.candidate}</h3>
                                                        {submittedScores[interview.id] && (
                                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                                                                <Check className="w-3 h-3" /> Scored
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-2.5">{interview.role}</p>
                                                    <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500 font-medium">
                                                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700">
                                                            <CalendarIcon className="w-3.5 h-3.5 text-[#800020]" />
                                                            {interview.date}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700">
                                                            <Clock className="w-3.5 h-3.5 text-[#800020]" />
                                                            {interview.time} ({interview.duration})
                                                        </span>
                                                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700">
                                                            {interview.type === "Video" ? <Video className="w-3.5 h-3.5 text-blue-600" /> : <MapPin className="w-3.5 h-3.5 text-amber-600" />}
                                                            {interview.type}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700">
                                                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                                                            Interviewer: {interview.interviewer}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button 
                                                    onClick={() => setSelectedJoinInterview(interview)}
                                                    className="px-5 py-2.5 bg-[#800020] text-white rounded-lg text-sm font-medium hover:bg-[#600018] transition-colors shadow-sm cursor-pointer flex items-center gap-2"
                                                >
                                                    <Video className="w-4 h-4" />
                                                    Join / View
                                                </button>
                                                <button 
                                                    onClick={() => setSelectedRescheduleInterview(interview)}
                                                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2 bg-white"
                                                >
                                                    <Clock className="w-4 h-4 text-gray-500" />
                                                    Reschedule
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Past Interviews */}
                        <div>
                            <h2 className="text-gray-900 mb-4 font-semibold text-lg">Past Interviews</h2>
                            <div className="space-y-4">
                                <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6 opacity-70 hover:opacity-100 transition-opacity duration-200">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                                            <Avatar className="w-14 h-14 border border-gray-100 shadow-sm flex-shrink-0">
                                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=jessica2" />
                                                <AvatarFallback>JM</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h3 className="text-gray-900 font-bold text-base mb-1">Jessica Martinez</h3>
                                                <p className="text-gray-600 text-sm mb-2.5">UX Researcher</p>
                                                <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500 font-medium">
                                                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700">
                                                        <CalendarIcon className="w-3.5 h-3.5 text-gray-500" />
                                                        Nov 22
                                                    </span>
                                                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700">
                                                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                                                        2:00 PM
                                                    </span>
                                                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-lg font-semibold flex items-center gap-1">
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                        Completed
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => alert("Viewing interview feedback notes: 'Exceptional UX research portfolio, scored 4.9/5 overall. Extended offer.'")}
                                            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2 bg-white"
                                        >
                                            <FileText className="w-4 h-4 text-[#800020]" />
                                            View Feedback
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Calendar View Container */
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
                        {/* Calendar Header with Mode Toggles */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <h2 className="text-gray-900 font-bold text-xl">
                                    {calendarMode === "month" && "November 2024"}
                                    {calendarMode === "week" && "Week of Nov 24 - Nov 30, 2024"}
                                    {calendarMode === "day" && "Monday, November 25, 2024"}
                                </h2>
                                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                                    <button 
                                        onClick={() => setCalendarMode("month")}
                                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${calendarMode === "month" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"}`}
                                    >
                                        Monthly
                                    </button>
                                    <button 
                                        onClick={() => setCalendarMode("week")}
                                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${calendarMode === "week" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"}`}
                                    >
                                        Weekly
                                    </button>
                                    <button 
                                        onClick={() => setCalendarMode("day")}
                                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${calendarMode === "day" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"}`}
                                    >
                                        Daily
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                                    Today
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
                                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid Views */}
                        {calendarMode === "month" && (
                            <div className="grid grid-cols-7 gap-4 animate-in fade-in duration-200">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2 bg-gray-50 rounded-lg">
                                        {day}
                                    </div>
                                ))}
                                {Array.from({ length: 35 }, (_, i) => {
                                    const dayNum = i - 4;
                                    const hasInterview = [25, 26, 28].includes(dayNum);
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                if (dayNum > 0 && dayNum <= 30) {
                                                    setCalendarMode("day");
                                                }
                                            }}
                                            className={`min-h-[110px] border border-gray-200 rounded-xl p-3 ${dayNum > 0 && dayNum <= 30 ? "bg-white hover:bg-gray-50 cursor-pointer shadow-xs transition-all duration-150" : "bg-gray-50 opacity-40"
                                                } ${hasInterview ? "border-[#800020] bg-rose-50/30 ring-2 ring-[#800020]/10" : ""}`}
                                        >
                                            {dayNum > 0 && dayNum <= 30 && (
                                                <div className="h-full flex flex-col justify-between space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-bold text-gray-900">{dayNum}</span>
                                                        {hasInterview && <span className="w-2 h-2 rounded-full bg-[#800020]"></span>}
                                                    </div>
                                                    {hasInterview && (
                                                        <div className="space-y-1">
                                                            {dayNum === 25 && (
                                                                <>
                                                                    <div className="text-[11px] font-semibold text-[#800020] bg-white p-1.5 rounded-md border border-[#800020]/20 shadow-xs flex items-center gap-1 hover:bg-[#800020] hover:text-white transition-colors">
                                                                        <Video className="w-3 h-3 flex-shrink-0" />
                                                                        <span className="truncate">10:00 AM - Sarah C.</span>
                                                                    </div>
                                                                    <div className="text-[11px] font-semibold text-[#800020] bg-white p-1.5 rounded-md border border-[#800020]/20 shadow-xs flex items-center gap-1 hover:bg-[#800020] hover:text-white transition-colors">
                                                                        <Video className="w-3 h-3 flex-shrink-0" />
                                                                        <span className="truncate">02:00 PM - Michael T.</span>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {dayNum === 26 && (
                                                                <div className="text-[11px] font-semibold text-blue-700 bg-blue-50 p-1.5 rounded-md border border-blue-200 shadow-xs flex items-center gap-1 hover:bg-blue-600 hover:text-white transition-colors">
                                                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                                                    <span className="truncate">11:00 AM - Emily W.</span>
                                                                </div>
                                                            )}
                                                            {dayNum === 28 && (
                                                                <div className="text-[11px] font-semibold text-amber-700 bg-amber-50 p-1.5 rounded-md border border-amber-200 shadow-xs flex items-center gap-1 hover:bg-amber-600 hover:text-white transition-colors">
                                                                    <Clock className="w-3 h-3 flex-shrink-0" />
                                                                    <span className="truncate">03:30 PM - David K.</span>
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
                            <div className="animate-in fade-in duration-200 overflow-x-auto">
                                <div className="min-w-[900px] border border-gray-200 rounded-xl overflow-hidden bg-white">
                                    {/* Days Header */}
                                    <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200 text-center font-bold text-xs text-gray-700 py-3">
                                        <div className="text-gray-400 font-medium">Time Slot</div>
                                        <div>Sun Nov 24</div>
                                        <div className="text-[#800020] bg-rose-50/80 rounded-lg mx-1 py-1 border border-[#800020]/20">Mon Nov 25</div>
                                        <div>Tue Nov 26</div>
                                        <div>Wed Nov 27</div>
                                        <div>Thu Nov 28</div>
                                        <div>Fri Nov 29</div>
                                        <div>Sat Nov 30</div>
                                    </div>

                                    {/* Time Slots */}
                                    {[
                                        { time: "09:00 AM", slots: [null, null, null, null, null, null, null] },
                                        { time: "10:00 AM", slots: [null, { candidate: "Sarah Chen", role: "Product Designer", type: "Video", duration: "1h", bg: "bg-[#800020] text-white" }, null, null, null, null, null] },
                                        { time: "11:00 AM", slots: [null, null, { candidate: "Emily Watson", role: "Marketing Manager", type: "On-site", duration: "1h", bg: "bg-blue-600 text-white" }, null, null, null, null] },
                                        { time: "12:00 PM", slots: [null, null, null, null, null, null, null] },
                                        { time: "01:00 PM", slots: [null, null, null, null, null, null, null] },
                                        { time: "02:00 PM", slots: [null, { candidate: "Michael Torres", role: "Frontend Dev", type: "Video", duration: "45m", bg: "bg-[#800020] text-white" }, null, null, null, null, null] },
                                        { time: "03:00 PM", slots: [null, null, null, null, { candidate: "David Kim", role: "Data Analyst", type: "Phone", duration: "30m", bg: "bg-amber-600 text-white" }, null, null] },
                                        { time: "04:00 PM", slots: [null, null, null, null, null, null, null] },
                                        { time: "05:00 PM", slots: [null, null, null, null, null, null, null] },
                                    ].map((row, rIdx) => (
                                        <div key={rIdx} className="grid grid-cols-8 border-b border-gray-100 last:border-b-0 min-h-[70px] items-stretch">
                                            <div className="p-3 text-xs font-semibold text-gray-500 bg-gray-50/50 border-r border-gray-100 flex items-center justify-center">
                                                {row.time}
                                            </div>
                                            {row.slots.map((slot, sIdx) => (
                                                <div key={sIdx} className="border-r border-gray-100 last:border-r-0 p-1.5 hover:bg-gray-50/50 transition-colors flex flex-col justify-center">
                                                    {slot && (
                                                        <div className={`p-2.5 rounded-xl shadow-sm flex flex-col justify-between h-full ${slot.bg}`}>
                                                            <div className="flex items-center justify-between font-bold text-xs mb-1">
                                                                <span className="truncate">{slot.candidate}</span>
                                                                <span className="text-[10px] px-1.5 py-0.2 bg-white/20 rounded font-semibold">{slot.duration}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between text-[11px] opacity-90">
                                                                <span className="truncate">{slot.role}</span>
                                                                <span className="font-semibold">{slot.type}</span>
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
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Timeline schedule */}
                                    <div className="lg:col-span-2 border border-gray-200 rounded-xl overflow-hidden bg-white divide-y divide-gray-100">
                                        <div className="p-4 bg-gray-50 font-bold text-sm text-gray-700 flex justify-between items-center">
                                            <span>Hourly Schedule - Monday, Nov 25</span>
                                            <span className="px-2.5 py-1 bg-[#800020]/10 text-[#800020] rounded-lg text-xs font-semibold">2 Interviews Scheduled</span>
                                        </div>
                                        {[
                                            { time: "08:00 AM", item: null },
                                            { time: "09:00 AM", item: null },
                                            { 
                                                time: "10:00 AM", 
                                                item: { candidate: "Sarah Chen", role: "Product Designer", type: "Video Interview", interviewer: "Jane Doe", notes: "Portfolio review and whiteboard exercise", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah2" } 
                                            },
                                            { time: "11:00 AM", item: null },
                                            { time: "12:00 PM", item: { break: "Lunch Break / General Block" } },
                                            { time: "01:00 PM", item: null },
                                            { 
                                                time: "02:00 PM", 
                                                item: { candidate: "Michael Torres", role: "Frontend Developer", type: "Video Interview", interviewer: "Mike Johnson", notes: "Technical React assessment", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael2" } 
                                            },
                                            { time: "03:00 PM", item: null },
                                            { time: "04:00 PM", item: null },
                                            { time: "05:00 PM", item: null },
                                        ].map((slot, idx) => (
                                            <div key={idx} className="flex items-start p-4 hover:bg-gray-50/50 transition-colors">
                                                <div className="w-24 text-xs font-bold text-gray-500 pt-1 flex-shrink-0">
                                                    {slot.time}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {slot.item && 'break' in slot.item ? (
                                                        <div className="bg-gray-100 border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-500 text-center">
                                                            {slot.item.break}
                                                        </div>
                                                    ) : slot.item ? (
                                                        <div className="bg-[#800020]/5 border border-[#800020]/20 rounded-xl p-4 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#800020]/40 transition-colors">
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="w-10 h-10 border border-white shadow-sm">
                                                                    <AvatarImage src={slot.item.avatar} />
                                                                    <AvatarFallback>{slot.item.candidate.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 text-sm">{slot.item.candidate}</h4>
                                                                    <p className="text-xs text-gray-600 font-medium">{slot.item.role} • {slot.item.type}</p>
                                                                    <p className="text-[11px] text-gray-500 mt-0.5 italic">Interviewer: {slot.item.interviewer}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2 flex-shrink-0">
                                                                <button 
                                                                    onClick={() => setSelectedJoinInterview({ id: idx, candidate: slot.item?.candidate, role: slot.item?.role, time: slot.time, duration: "1 hour", type: "Video", interviewer: slot.item?.interviewer, avatar: slot.item?.avatar, date: "Nov 25", notes: slot.item?.notes })}
                                                                    className="px-4 py-2 bg-[#800020] text-white text-xs font-semibold rounded-lg hover:bg-[#600018] shadow-xs cursor-pointer flex items-center gap-1.5"
                                                                >
                                                                    <Video className="w-3.5 h-3.5" />
                                                                    Join Room
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="h-6 border-b border-dashed border-gray-200 flex items-center text-[11px] text-gray-400">
                                                            Available slot
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Daily overview panel */}
                                    <div className="border border-gray-200 rounded-xl p-6 bg-gray-50/50 flex flex-col justify-between space-y-6 h-fit">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-base mb-2">Daily Summary</h3>
                                            <p className="text-xs text-gray-600 leading-relaxed mb-6">
                                                You have 2 important screening interviews scheduled today. Ensure technical assessment whiteboards are prepped.
                                            </p>

                                            <div className="space-y-3">
                                                <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between shadow-xs">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                                        <span className="text-xs font-bold text-gray-700">Total Interviews</span>
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">2</span>
                                                </div>

                                                <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between shadow-xs">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                                                        <span className="text-xs font-bold text-gray-700">Completed</span>
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">0</span>
                                                </div>

                                                <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between shadow-xs">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                                                        <span className="text-xs font-bold text-gray-700">Pending</span>
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">2</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={onScheduleInterview} 
                                            className="w-full py-3 bg-[#800020] text-white rounded-xl text-xs font-bold hover:bg-[#600018] shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <Plus className="w-4 h-4" /> Schedule New Interview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* MODALS */}

                {/* Join / View Interview Room Modal */}
                {selectedJoinInterview && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#800020]/10 flex items-center justify-center text-[#800020]">
                                        <Video className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Interview Details & Room</h3>
                                        <p className="text-xs text-gray-500">Live recruitment session</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedJoinInterview(null)}
                                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6 mb-6">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-4">
                                    <Avatar className="w-16 h-16 border border-white shadow-sm flex-shrink-0">
                                        <AvatarImage src={selectedJoinInterview.avatar} />
                                        <AvatarFallback>{selectedJoinInterview.candidate.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-gray-900">{selectedJoinInterview.candidate}</h4>
                                        <p className="text-sm text-gray-600">{selectedJoinInterview.role}</p>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 font-medium">
                                            <span>Date: {selectedJoinInterview.date}</span>
                                            <span>Time: {selectedJoinInterview.time} ({selectedJoinInterview.duration})</span>
                                            <span>Interviewer: {selectedJoinInterview.interviewer}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Interview Agenda & Notes</h4>
                                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-sm text-amber-900">
                                        {selectedJoinInterview.notes || "Standard screening, technical questions, and cultural review."}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Meeting Link / Stream</h4>
                                    <div className="flex items-center justify-between bg-gray-100 p-3.5 rounded-xl border border-gray-200">
                                        <span className="text-xs text-gray-600 font-mono truncate">https://meet.recruitmentplatform.com/room-{selectedJoinInterview.id}</span>
                                        <button 
                                            onClick={() => alert(`Launching live meeting room with ${selectedJoinInterview.candidate}...`)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm flex items-center gap-1.5 cursor-pointer flex-shrink-0 ml-2"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Launch Room
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setSelectedJoinInterview(null)}
                                    className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 text-sm cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const candidateToScore = selectedJoinInterview;
                                        setSelectedJoinInterview(null);
                                        setSelectedScoreInterview(candidateToScore);
                                    }}
                                    className="px-6 py-2.5 bg-[#800020] text-white font-medium rounded-lg hover:bg-[#600018] text-sm shadow-sm cursor-pointer flex items-center gap-2"
                                >
                                    <FileText className="w-4 h-4" />
                                    Open Score Sheet
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Candidate Evaluation Score Sheet Modal */}
                {selectedScoreInterview && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Candidate Score Evaluation Sheet</h3>
                                        <p className="text-xs text-gray-500">Scoring for {selectedScoreInterview.candidate} - {selectedScoreInterview.role}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedScoreInterview(null)}
                                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleScoreSubmit} className="space-y-6 mb-6">
                                {/* Criteria scoring grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    {/* Criteria 1 */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                                            <span>Technical Capability</span>
                                            <span className="text-[#800020] font-bold">{scores.technical} / 5</span>
                                        </div>
                                        <div className="flex gap-1 pt-1">
                                            {[1, 2, 3, 4, 5].map((val) => (
                                                <button
                                                    type="button"
                                                    key={val}
                                                    onClick={() => setScores(prev => ({ ...prev, technical: val }))}
                                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${val <= scores.technical ? "bg-[#800020] text-white border-[#800020]" : "bg-white text-gray-300 border-gray-200"}`}
                                                >
                                                    <Star className="w-4 h-4 fill-current" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Criteria 2 */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                                            <span>Communication & Clarity</span>
                                            <span className="text-[#800020] font-bold">{scores.communication} / 5</span>
                                        </div>
                                        <div className="flex gap-1 pt-1">
                                            {[1, 2, 3, 4, 5].map((val) => (
                                                <button
                                                    type="button"
                                                    key={val}
                                                    onClick={() => setScores(prev => ({ ...prev, communication: val }))}
                                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${val <= scores.communication ? "bg-[#800020] text-white border-[#800020]" : "bg-white text-gray-300 border-gray-200"}`}
                                                >
                                                    <Star className="w-4 h-4 fill-current" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Criteria 3 */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                                            <span>Culture Fit & Values</span>
                                            <span className="text-[#800020] font-bold">{scores.cultureFit} / 5</span>
                                        </div>
                                        <div className="flex gap-1 pt-1">
                                            {[1, 2, 3, 4, 5].map((val) => (
                                                <button
                                                    type="button"
                                                    key={val}
                                                    onClick={() => setScores(prev => ({ ...prev, cultureFit: val }))}
                                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${val <= scores.cultureFit ? "bg-[#800020] text-white border-[#800020]" : "bg-white text-gray-300 border-gray-200"}`}
                                                >
                                                    <Star className="w-4 h-4 fill-current" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Criteria 4 */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                                            <span>Problem Solving Strategy</span>
                                            <span className="text-[#800020] font-bold">{scores.problemSolving} / 5</span>
                                        </div>
                                        <div className="flex gap-1 pt-1">
                                            {[1, 2, 3, 4, 5].map((val) => (
                                                <button
                                                    type="button"
                                                    key={val}
                                                    onClick={() => setScores(prev => ({ ...prev, problemSolving: val }))}
                                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${val <= scores.problemSolving ? "bg-[#800020] text-white border-[#800020]" : "bg-white text-gray-300 border-gray-200"}`}
                                                >
                                                    <Star className="w-4 h-4 fill-current" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Recommendation selector */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Final Hiring Recommendation</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {[
                                            { label: "Strong Hire", color: "border-green-500 text-green-700 bg-green-50" },
                                            { label: "Hire", color: "border-blue-500 text-blue-700 bg-blue-50" },
                                            { label: "Neutral / Hold", color: "border-amber-500 text-amber-700 bg-amber-50" },
                                            { label: "Reject", color: "border-rose-500 text-rose-700 bg-rose-50" },
                                        ].map((rec) => (
                                            <button
                                                type="button"
                                                key={rec.label}
                                                onClick={() => setRecommendation(rec.label)}
                                                className={`p-3 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${recommendation === rec.label ? `${rec.color} ring-2 ring-offset-2 ring-[#800020]` : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}
                                            >
                                                {rec.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Evaluation Notes */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Evaluation Summary & Key Observations</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Note candidate strengths, growth areas, and specific technical feedback..."
                                        value={scoreNotes}
                                        onChange={(e) => setScoreNotes(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedScoreInterview(null)}
                                        className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-sm cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-[#800020] text-white font-medium rounded-lg hover:bg-[#600018] text-sm shadow-sm cursor-pointer flex items-center gap-2"
                                    >
                                        <Award className="w-4 h-4" />
                                        Submit Final Evaluation
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Reschedule Interview Modal */}
                {selectedRescheduleInterview && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Reschedule Interview</h3>
                                        <p className="text-xs text-gray-500">{selectedRescheduleInterview.candidate} - {selectedRescheduleInterview.role}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedRescheduleInterview(null)}
                                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleRescheduleSubmit} className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select New Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={newDate}
                                        onChange={(e) => setNewDate(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select New Time</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. 02:00 PM, 11:30 AM"
                                        value={newTime}
                                        onChange={(e) => setNewTime(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                    />
                                </div>

                                <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl text-xs text-blue-800">
                                    Automated reschedule notifications and updated calendar invites will be sent instantly to both the candidate and the interviewer.
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedRescheduleInterview(null)}
                                        className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-sm cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-[#800020] text-white rounded-lg font-medium hover:bg-[#600018] text-sm shadow-sm cursor-pointer"
                                    >
                                        Confirm Reschedule
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
