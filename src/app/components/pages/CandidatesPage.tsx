import { Search, Filter, Download, Mail, MapPin, Briefcase, LayoutGrid, List, Check, Plus, FolderHeart, Star } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BulkMessageModal } from "../modals/BulkMessageModal";
import { motion, AnimatePresence } from "motion/react";

const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", location: "San Francisco, CA", experience: "8 years", status: "In Pipeline", activeJob: "Senior Product Designer", applied: "2 days ago", match: 95 },
    { id: 2, name: "Michael Torres", role: "Frontend Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael", location: "Remote", experience: "5 years", status: "In Pipeline", activeJob: "Frontend Developer", applied: "3 days ago", match: 88 },
    { id: 3, name: "Emily Watson", role: "Marketing Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily", location: "New York, NY", experience: "7 years", status: "Placed", activeJob: "Marketing Manager", applied: "1 week ago", match: 92 },
    { id: 4, name: "David Kim", role: "Data Analyst", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david", location: "Austin, TX", experience: "4 years", status: "Sourced", activeJob: null, applied: "5 days ago", match: 85 },
    { id: 5, name: "Jessica Martinez", role: "UX Researcher", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica", location: "Remote", experience: "6 years", status: "In Pipeline", activeJob: "UX Researcher", applied: "4 days ago", match: 90 },
    { id: 6, name: "Ryan Patel", role: "Product Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan", location: "Seattle, WA", experience: "9 years", status: "Sourced", activeJob: null, applied: "1 week ago", match: 87 },
    { id: 7, name: "Amanda Lee", role: "Content Writer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amanda", location: "Remote", experience: "3 years", status: "Active", activeJob: null, applied: "2 days ago", match: 82 },
    { id: 8, name: "Chris Johnson", role: "DevOps Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris", location: "Boston, MA", experience: "6 years", status: "Archived", activeJob: "DevOps Engineer", applied: "2 weeks ago", match: 75 },
];

interface CandidatesPageProps {
    onViewCandidate: (candidate: any) => void;
}

export function CandidatesPage({ onViewCandidate }: CandidatesPageProps) {
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
    const [isBulkMessageModalOpen, setIsBulkMessageModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>("All");

    const toggleCandidateSelection = (candidateId: number) => {
        if (selectedCandidates.includes(candidateId)) {
            setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
        } else {
            setSelectedCandidates([...selectedCandidates, candidateId]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedCandidates.length === filteredCandidates.length) {
            setSelectedCandidates([]);
        } else {
            setSelectedCandidates(filteredCandidates.map(c => c.id));
        }
    };

    const getSelectedCandidatesData = () => {
        return candidates.filter(c => selectedCandidates.includes(c.id));
    };

    const filteredCandidates = candidates.filter(c => {
        if (activeFilter === "All") return true;
        return c.status.toLowerCase() === activeFilter.toLowerCase() || 
               (activeFilter === "Active" && (c.status === "Active" || c.status === "In Pipeline"));
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Placed":
                return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
            case "In Pipeline":
                return "bg-indigo-50 text-indigo-700 border-indigo-200/60";
            case "Sourced":
                return "bg-amber-50 text-amber-700 border-amber-200/60";
            case "Active":
                return "bg-blue-50 text-blue-700 border-blue-200/60";
            case "Archived":
                default:
                return "bg-gray-50 text-slate-600 border-slate-200";
        }
    };

    return (
        <>
            <div className="p-8 bg-gray-50/30 min-h-full">
                <div className="max-w-[1600px] mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-left">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Talent Pool</h1>
                            <p className="text-sm text-slate-500 mt-0.5">Browse and manage your general candidate database</p>
                        </div>
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            {selectedCandidates.length > 0 && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-[#E9967A]/20">
                                    <Check className="w-3.5 h-3.5" />
                                    <span>{selectedCandidates.length} Selected</span>
                                </div>
                            )}
                            <button className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-gray-50 transition-all text-xs font-semibold  bg-white">
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                            <button
                                onClick={() => {
                                    if (selectedCandidates.length > 0) {
                                        setIsBulkMessageModalOpen(true);
                                    }
                                }}
                                disabled={selectedCandidates.length === 0}
                                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all text-xs font-semibold  ${
                                    selectedCandidates.length > 0
                                        ? "bg-indigo-600 text-white hover:bg-indigo-800"
                                        : "bg-gray-200 text-slate-400 cursor-not-allowed"
                                }`}
                            >
                                <Mail className="w-4 h-4" />
                                Message ({selectedCandidates.length})
                            </button>
                        </div>
                    </div>

                    {/* Search & Filters */}
                    <div className="bg-white rounded-2xl border border-gray-150  p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search candidates by name, role, skills, or location..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white transition-all"
                                />
                            </div>
                            <button className="flex items-center justify-center gap-1.5 px-5 py-3 border border-slate-200 rounded-xl hover:bg-gray-50 text-slate-700 transition-all text-xs font-semibold bg-white ">
                                <Filter className="w-4 h-4" />
                                Advanced Filters
                            </button>
                        </div>

                        {/* Talent Status Quick Filters */}
                        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-gray-50">
                            {[
                                { id: "All", label: "All Candidates" },
                                { id: "Active", label: "Active Pool" },
                                { id: "Sourced", label: "Sourced Only" },
                                { id: "In Pipeline", label: "In Pipeline" },
                                { id: "Placed", label: "Placed / Hired" },
                                { id: "Archived", label: "Archived" }
                            ].map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => {
                                        setActiveFilter(filter.id);
                                        setSelectedCandidates([]);
                                    }}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                        activeFilter === filter.id
                                            ? "bg-indigo-600 text-white "
                                            : "bg-gray-50 text-slate-600 hover:bg-gray-100 border border-transparent hover:border-slate-200"
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Select All & View Toggle */}
                    <div className="flex items-center justify-between mb-4 text-left">
                        {filteredCandidates.length > 0 ? (
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={selectedCandidates.length === filteredCandidates.length}
                                    onChange={toggleSelectAll}
                                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600/20"
                                />
                                <span className="text-xs font-semibold text-slate-500">
                                    Select all {filteredCandidates.length} candidates
                                </span>
                            </label>
                        ) : (
                            <span className="text-xs font-semibold text-slate-400">No candidates found matching filter</span>
                        )}

                        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 ">
                            <button
                                onClick={() => setViewMode("list")}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                                    viewMode === "list"
                                        ? "bg-indigo-600 text-white"
                                        : "text-slate-600 hover:bg-gray-50"
                                }`}
                            >
                                <List className="w-3.5 h-3.5" />
                                <span>List</span>
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                                    viewMode === "grid"
                                        ? "bg-indigo-600 text-white"
                                        : "text-slate-600 hover:bg-gray-50"
                                }`}
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                                <span>Grid</span>
                            </button>
                        </div>
                    </div>

                    {/* Candidates List View (Table card) */}
                    <AnimatePresence mode="wait">
                        {viewMode === "list" ? (
                            <motion.div
                                key="list-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white rounded-2xl border border-gray-150  overflow-hidden text-left"
                            >
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-gray-50/50">
                                                <th className="p-4 w-12 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                                                        onChange={toggleSelectAll}
                                                        className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600/20"
                                                    />
                                                </th>
                                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate Info</th>
                                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Talent Status</th>
                                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Active Application</th>
                                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Match Score</th>
                                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Experience & Location</th>
                                                <th className="p-4 w-28 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredCandidates.map((candidate) => (
                                                <tr
                                                    key={candidate.id}
                                                    className={`hover:bg-gray-50/40 transition-colors ${
                                                        selectedCandidates.includes(candidate.id) ? "bg-indigo-600/2" : ""
                                                    }`}
                                                >
                                                    <td className="p-4 text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCandidates.includes(candidate.id)}
                                                            onChange={() => toggleCandidateSelection(candidate.id)}
                                                            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600/20"
                                                        />
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="w-10 h-10 border border-slate-100">
                                                                <AvatarFallback className="font-bold text-xs bg-indigo-50 text-indigo-700">
                                                                    {candidate.name.split(' ').map(n => n[0]).join('')}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h4 className="text-slate-900 font-bold text-sm leading-tight">{candidate.name}</h4>
                                                                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{candidate.role}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${getStatusColor(candidate.status)}`}>
                                                            {candidate.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        {candidate.activeJob ? (
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-semibold text-gray-850 leading-normal">{candidate.activeJob}</span>
                                                                <span className="text-[9px] text-slate-400 font-medium">Applied {candidate.applied}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-slate-400 font-semibold italic">No active applications</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={`w-2 h-2 rounded-full ${candidate.match >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                            <span className="text-xs font-bold text-slate-900">{candidate.match}% match</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col gap-0.5 text-xs text-slate-500 font-semibold">
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                                {candidate.location}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                                                                {candidate.experience} exp
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <button
                                                            onClick={() => onViewCandidate(candidate)}
                                                            className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-800 transition-colors  cursor-pointer"
                                                        >
                                                            Profile
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ) : (
                            /* Grid View */
                            <motion.div
                                key="grid-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left"
                            >
                                {filteredCandidates.map((candidate) => (
                                    <motion.div
                                        key={candidate.id}
                                        whileHover={{ y: -3 }}
                                        className={`bg-white rounded-2xl border ${
                                            selectedCandidates.includes(candidate.id) ? "border-indigo-600/40 " : "border-gray-150 "
                                        } transition-all duration-300 p-5 relative flex flex-col justify-between`}
                                    >
                                        <div>
                                            {/* Checkbox */}
                                            <div className="absolute top-4 left-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCandidates.includes(candidate.id)}
                                                    onChange={() => toggleCandidateSelection(candidate.id)}
                                                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600/20"
                                                />
                                            </div>

                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border ${getStatusColor(candidate.status)}`}>
                                                    {candidate.status}
                                                </span>
                                            </div>

                                            {/* Avatar Area */}
                                            <div className="flex flex-col items-center mt-3 mb-4">
                                                <Avatar className="w-16 h-16 border-2 border-slate-100  mb-3">
                                                    <AvatarFallback className="font-extrabold text-base bg-indigo-50 text-indigo-700 flex items-center justify-center">
                                                        {candidate.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <h3 className="text-slate-900 font-bold text-sm text-center leading-tight">{candidate.name}</h3>
                                                <p className="text-[10px] text-slate-500 font-semibold mt-0.5 text-center">{candidate.role}</p>
                                            </div>

                                            {/* Middle stats */}
                                            <div className="space-y-2 py-3 border-y border-gray-50 my-4 text-xs font-semibold text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                    <span className="truncate">{candidate.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                    <span>{candidate.experience} experience</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FolderHeart className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                    {candidate.activeJob ? (
                                                        <span className="truncate text-slate-700 font-bold">App: {candidate.activeJob}</span>
                                                    ) : (
                                                        <span className="italic text-slate-400">No applications</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer action and score */}
                                        <div className="flex items-center justify-between gap-3 mt-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 fill-emerald-500 stroke-emerald-500" />
                                                <span className="text-[10px] font-bold text-slate-900">{candidate.match}% match</span>
                                            </div>
                                            <button
                                                onClick={() => onViewCandidate(candidate)}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-800 transition-colors  cursor-pointer"
                                            >
                                                View Profile
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bulk Message Modal */}
            <BulkMessageModal
                isOpen={isBulkMessageModalOpen}
                onClose={() => {
                    setIsBulkMessageModalOpen(false);
                }}
                selectedCandidates={getSelectedCandidatesData()}
            />
        </>
    );
}



