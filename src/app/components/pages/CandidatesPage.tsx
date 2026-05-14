import { Search, Filter, Download, Mail, MapPin, Briefcase, LayoutGrid, List, Check } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BulkMessageModal } from "../modals/BulkMessageModal";

const candidates = [
    { id: 1, name: "Sarah Chen", role: "Senior Product Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", location: "San Francisco, CA", experience: "8 years", status: "Interview", applied: "2 days ago", match: 95 },
    { id: 2, name: "Michael Torres", role: "Frontend Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael", location: "Remote", experience: "5 years", status: "Screening", applied: "3 days ago", match: 88 },
    { id: 3, name: "Emily Watson", role: "Marketing Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily", location: "New York, NY", experience: "7 years", status: "Offer", applied: "1 week ago", match: 92 },
    { id: 4, name: "David Kim", role: "Data Analyst", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david", location: "Austin, TX", experience: "4 years", status: "Review", applied: "5 days ago", match: 85 },
    { id: 5, name: "Jessica Martinez", role: "UX Researcher", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica", location: "Remote", experience: "6 years", status: "Interview", applied: "4 days ago", match: 90 },
    { id: 6, name: "Ryan Patel", role: "Product Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan", location: "Seattle, WA", experience: "9 years", status: "Screening", applied: "1 week ago", match: 87 },
    { id: 7, name: "Amanda Lee", role: "Content Writer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amanda", location: "Remote", experience: "3 years", status: "Review", applied: "2 days ago", match: 82 },
    { id: 8, name: "Chris Johnson", role: "DevOps Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris", location: "Boston, MA", experience: "6 years", status: "Rejected", applied: "2 weeks ago", match: 75 },
];

interface CandidatesPageProps {
    onViewCandidate: (candidate: any) => void;
}

export function CandidatesPage({ onViewCandidate }: CandidatesPageProps) {
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
    const [isBulkMessageModalOpen, setIsBulkMessageModalOpen] = useState(false);

    const toggleCandidateSelection = (candidateId: number) => {
        if (selectedCandidates.includes(candidateId)) {
            setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
        } else {
            setSelectedCandidates([...selectedCandidates, candidateId]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedCandidates.length === candidates.length) {
            setSelectedCandidates([]);
        } else {
            setSelectedCandidates(candidates.map(c => c.id));
        }
    };

    const getSelectedCandidatesData = () => {
        return candidates.filter(c => selectedCandidates.includes(c.id));
    };

    return (
        <>
            <div className="p-8">
                <div className="max-w-[1600px] mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-gray-900 mb-2">All Candidates</h1>
                            <p className="text-gray-600">Browse and manage your candidate pipeline</p>
                        </div>
                        <div className="flex gap-3">
                            {selectedCandidates.length > 0 && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-[#F5E6E8] text-[#800020] rounded-lg">
                                    <Check className="w-4 h-4" />
                                    <span className="text-sm">{selectedCandidates.length} selected</span>
                                </div>
                            )}
                            <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
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
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-colors ${selectedCandidates.length > 0
                                        ? "bg-[#800020] text-white hover:bg-[#600018]"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                <Mail className="w-4 h-4" />
                                Message ({selectedCandidates.length})
                            </button>
                        </div>
                    </div>

                    {/* Search & Filters */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6 mb-6">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search candidates by name, role, or skills..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>
                        </div>

                        {/* Quick Filters */}
                        <div className="flex gap-2 mt-4">
                            <button className="px-4 py-2 bg-[#800020] text-white rounded-lg text-sm">All Candidates</button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">Review</button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">Screening</button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">Interview</button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">Offer</button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">Rejected</button>
                        </div>
                    </div>

                    {/* Select All & View Toggle */}
                    <div className="flex items-center justify-between mb-4">
                        {candidates.length > 0 && (
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCandidates.length === candidates.length}
                                    onChange={toggleSelectAll}
                                    className="w-4 h-4 text-[#800020] rounded"
                                />
                                <span className="text-sm text-gray-600">Select all candidates</span>
                            </label>
                        )}

                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode("list")}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${viewMode === "list"
                                        ? "bg-[#800020] text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <List className="w-4 h-4" />
                                <span className="text-sm">List</span>
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${viewMode === "grid"
                                        ? "bg-[#800020] text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                <span className="text-sm">Grid</span>
                            </button>
                        </div>
                    </div>

                    {/* Candidates List View */}
                    {viewMode === "list" && (
                        <div className="space-y-4">
                            {candidates.map((candidate) => (
                                <div
                                    key={candidate.id}
                                    className="bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <input
                                                type="checkbox"
                                                checked={selectedCandidates.includes(candidate.id)}
                                                onChange={() => toggleCandidateSelection(candidate.id)}
                                                className="w-5 h-5 text-[#800020] rounded"
                                            />
                                            <Avatar className="w-14 h-14">
                                                <AvatarImage src={candidate.avatar} />
                                                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-gray-900">{candidate.name}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs ${candidate.status === "Offer" ? "bg-green-100 text-green-700" :
                                                            candidate.status === "Interview" ? "bg-[#F5E6E8] text-[#800020]" :
                                                                candidate.status === "Screening" ? "bg-yellow-100 text-yellow-700" :
                                                                    candidate.status === "Review" ? "bg-purple-100 text-purple-700" :
                                                                        "bg-red-100 text-red-700"
                                                        }`}>
                                                        {candidate.status}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-xs text-gray-500">{candidate.match}% match</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 mb-2">{candidate.role}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="w-4 h-4" />
                                                        {candidate.location}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Briefcase className="w-4 h-4" />
                                                        {candidate.experience}
                                                    </span>
                                                    <span>Applied {candidate.applied}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => onViewCandidate(candidate)}
                                                className="px-4 py-2 bg-[#800020] text-white rounded-lg text-sm hover:bg-[#600018] transition-colors"
                                            >
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Candidates Grid View */}
                    {viewMode === "grid" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {candidates.map((candidate) => (
                                <div
                                    key={candidate.id}
                                    className="bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 p-6 relative"
                                >
                                    {/* Checkbox */}
                                    <div className="absolute top-4 left-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedCandidates.includes(candidate.id)}
                                            onChange={() => toggleCandidateSelection(candidate.id)}
                                            className="w-5 h-5 text-[#800020] rounded"
                                        />
                                    </div>

                                    {/* Avatar */}
                                    <div className="flex justify-center mb-4">
                                        <Avatar className="w-20 h-20">
                                            <AvatarImage src={candidate.avatar} />
                                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </div>

                                    {/* Candidate Info */}
                                    <div className="text-center mb-4">
                                        <h3 className="text-gray-900 mb-1">{candidate.name}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{candidate.role}</p>

                                        {/* Status Badge */}
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs mb-2 ${candidate.status === "Offer" ? "bg-green-100 text-green-700" :
                                                candidate.status === "Interview" ? "bg-[#F5E6E8] text-[#800020]" :
                                                    candidate.status === "Screening" ? "bg-yellow-100 text-yellow-700" :
                                                        candidate.status === "Review" ? "bg-purple-100 text-purple-700" :
                                                            "bg-red-100 text-red-700"
                                            }`}>
                                            {candidate.status}
                                        </span>

                                        {/* Match Score */}
                                        <div className="flex items-center justify-center gap-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-xs text-gray-500">{candidate.match}% match</span>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate">{candidate.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Briefcase className="w-4 h-4 flex-shrink-0" />
                                            <span>{candidate.experience}</span>
                                        </div>
                                    </div>

                                    {/* Applied Date */}
                                    <p className="text-xs text-gray-500 text-center mb-4">Applied {candidate.applied}</p>

                                    {/* Actions */}
                                    <div>
                                        <button
                                            onClick={() => onViewCandidate(candidate)}
                                            className="w-full px-4 py-2 bg-[#800020] text-white rounded-lg text-sm hover:bg-[#600018] transition-colors"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
