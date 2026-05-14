import { X, Filter, Check } from "lucide-react";
import { useState } from "react";

interface JobFiltersModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filters: any) => void;
}

export function JobFiltersModal({ isOpen, onClose, onApplyFilters }: JobFiltersModalProps) {
    const [filters, setFilters] = useState({
        departments: [] as string[],
        locations: [] as string[],
        types: [] as string[],
        statuses: [] as string[],
        dateRange: "all",
        applicantRange: "all",
    });

    if (!isOpen) return null;

    const departments = ["Engineering", "Design", "Marketing", "Product", "Analytics", "Sales"];
    const locations = ["Remote", "New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA"];
    const types = ["Full-time", "Part-time", "Contract", "Internship"];
    const statuses = ["Active", "Draft", "On Hold", "Closed"];

    const toggleFilter = (category: keyof typeof filters, value: string) => {
        const current = filters[category] as string[];
        if (current.includes(value)) {
            setFilters({ ...filters, [category]: current.filter(v => v !== value) });
        } else {
            setFilters({ ...filters, [category]: [...current, value] });
        }
    };

    const clearFilters = () => {
        setFilters({
            departments: [],
            locations: [],
            types: [],
            statuses: [],
            dateRange: "all",
            applicantRange: "all",
        });
    };

    const handleApply = () => {
        onApplyFilters(filters);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Filter className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-gray-900">Filter Jobs</h2>
                            <p className="text-sm text-gray-500">Refine your job search</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 180px)" }}>
                    <div className="space-y-6">
                        {/* Department */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-3">Department</label>
                            <div className="grid grid-cols-3 gap-2">
                                {departments.map((dept) => (
                                    <button
                                        key={dept}
                                        onClick={() => toggleFilter("departments", dept)}
                                        className={`px-4 py-2 rounded-lg text-sm border transition-all ${filters.departments.includes(dept)
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                                            }`}
                                    >
                                        {filters.departments.includes(dept) && <Check className="w-4 h-4 inline mr-1" />}
                                        {dept}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-3">Location</label>
                            <div className="grid grid-cols-2 gap-2">
                                {locations.map((location) => (
                                    <button
                                        key={location}
                                        onClick={() => toggleFilter("locations", location)}
                                        className={`px-4 py-2 rounded-lg text-sm border transition-all ${filters.locations.includes(location)
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                                            }`}
                                    >
                                        {filters.locations.includes(location) && <Check className="w-4 h-4 inline mr-1" />}
                                        {location}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Job Type */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-3">Job Type</label>
                            <div className="grid grid-cols-4 gap-2">
                                {types.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => toggleFilter("types", type)}
                                        className={`px-4 py-2 rounded-lg text-sm border transition-all ${filters.types.includes(type)
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                                            }`}
                                    >
                                        {filters.types.includes(type) && <Check className="w-4 h-4 inline mr-1" />}
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-3">Status</label>
                            <div className="grid grid-cols-4 gap-2">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => toggleFilter("statuses", status)}
                                        className={`px-4 py-2 rounded-lg text-sm border transition-all ${filters.statuses.includes(status)
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                                            }`}
                                    >
                                        {filters.statuses.includes(status) && <Check className="w-4 h-4 inline mr-1" />}
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date Range */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-3">Posted Date</label>
                            <select
                                value={filters.dateRange}
                                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">Last 7 Days</option>
                                <option value="month">Last 30 Days</option>
                                <option value="quarter">Last 90 Days</option>
                            </select>
                        </div>

                        {/* Applicant Range */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-3">Number of Applicants</label>
                            <select
                                value={filters.applicantRange}
                                onChange={(e) => setFilters({ ...filters, applicantRange: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">Any</option>
                                <option value="0-10">0-10</option>
                                <option value="11-25">11-25</option>
                                <option value="26-50">26-50</option>
                                <option value="51+">51+</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={clearFilters}
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Clear all filters
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApply}
                                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
