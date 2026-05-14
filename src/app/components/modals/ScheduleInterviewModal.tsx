import { X, Calendar, Clock, Video, MapPin, Users, Mail } from "lucide-react";
import { useState } from "react";

interface ScheduleInterviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ScheduleInterviewModal({ isOpen, onClose }: ScheduleInterviewModalProps) {
    const [formData, setFormData] = useState({
        candidate: "",
        date: "",
        time: "",
        duration: "30",
        type: "video",
        location: "",
        interviewers: "",
        notes: "",
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Interview scheduled:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-gray-900">Schedule Interview</h2>
                            <p className="text-sm text-gray-500">Set up a new interview</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    <div className="space-y-5">
                        {/* Candidate */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Candidate *</label>
                            <select
                                required
                                value={formData.candidate}
                                onChange={(e) => setFormData({ ...formData, candidate: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select a candidate</option>
                                <option>Sarah Chen - Senior Product Designer</option>
                                <option>Michael Torres - Frontend Developer</option>
                                <option>Emily Watson - Marketing Manager</option>
                                <option>David Kim - Data Analyst</option>
                            </select>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    Time *
                                </label>
                                <input
                                    type="time"
                                    required
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Duration & Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Duration *</label>
                                <select
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="45">45 minutes</option>
                                    <option value="60">1 hour</option>
                                    <option value="90">1.5 hours</option>
                                    <option value="120">2 hours</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Interview Type *</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="video">Video Call</option>
                                    <option value="phone">Phone Call</option>
                                    <option value="onsite">On-site</option>
                                </select>
                            </div>
                        </div>

                        {/* Location/Link */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                {formData.type === "video" ? (
                                    <><Video className="w-4 h-4 inline mr-1" />Meeting Link</>
                                ) : (
                                    <><MapPin className="w-4 h-4 inline mr-1" />Location</>
                                )}
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder={formData.type === "video" ? "Zoom/Teams meeting link" : "Office address or phone number"}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Interviewers */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                <Users className="w-4 h-4 inline mr-1" />
                                Interviewers *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.interviewers}
                                onChange={(e) => setFormData({ ...formData, interviewers: e.target.value })}
                                placeholder="Enter interviewer names or emails"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Interview Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Add any notes or special instructions..."
                                rows={4}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Send Calendar Invite */}
                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <input
                                type="checkbox"
                                id="sendInvite"
                                defaultChecked
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="sendInvite" className="flex items-center gap-2 text-sm text-gray-700">
                                <Mail className="w-4 h-4 text-blue-600" />
                                Send calendar invite to candidate and interviewers
                            </label>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Schedule Interview
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
