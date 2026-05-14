import { useState, useRef, useEffect } from "react";
import {
    MoreVertical, Mail, Ban, Trash2, RefreshCw,
    CreditCard, FileText, Lock, Unlock
} from "lucide-react";

interface CompanyActionsMenuProps {
    company: any;
    onSendEmail?: () => void;
    onSuspend?: (id: number) => void;
    onActivate?: (id: number) => void;
    onDelete?: (id: number) => void;
    onViewBilling?: () => void;
}

export function CompanyActionsMenu({
    company,
    onSendEmail,
    onSuspend,
    onActivate,
    onDelete,
    onViewBilling
}: CompanyActionsMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleAction = (action: () => void | undefined) => {
        if (action) {
            action();
        }
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="More Actions"
            >
                <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button
                        onClick={() => handleAction(onSendEmail || (() => { }))}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Mail className="w-4 h-4" />
                        Send Email
                    </button>

                    <button
                        onClick={() => handleAction(onViewBilling || (() => { }))}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <CreditCard className="w-4 h-4" />
                        View Billing
                    </button>

                    <button
                        onClick={() => handleAction(() => { })}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <FileText className="w-4 h-4" />
                        View Activity Log
                    </button>

                    <div className="border-t border-gray-200 my-1"></div>

                    {company.status === "Active" ? (
                        <button
                            onClick={() => {
                                if (onSuspend) onSuspend(company.id);
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-yellow-700 hover:bg-yellow-50 transition-colors"
                        >
                            <Ban className="w-4 h-4" />
                            Suspend Account
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                if (onActivate) onActivate(company.id);
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-700 hover:bg-green-50 transition-colors"
                        >
                            <Unlock className="w-4 h-4" />
                            Activate Account
                        </button>
                    )}

                    <button
                        onClick={() => handleAction(() => { })}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reset Password
                    </button>

                    <div className="border-t border-gray-200 my-1"></div>

                    <button
                        onClick={() => {
                            if (onDelete) onDelete(company.id);
                            setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-700 hover:bg-red-50 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Company
                    </button>
                </div>
            )}
        </div>
    );
}