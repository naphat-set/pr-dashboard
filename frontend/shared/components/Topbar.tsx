"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";

type Props = {
    onOpenSidebar: () => void;
};

export default function Topbar({ onOpenSidebar }: Props) {
    const pathname = usePathname();

    const getTitle = () => {
        if (pathname.includes("purchase-requests")) {
            return "Purchase Requests";
        }
        return "Dashboard";
    };

    return (
        <div className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
            {/* Left */}
            <div className="flex items-center gap-3">
                <button className="md:hidden" onClick={onOpenSidebar}>
                    <Menu size={20} />
                </button>

                <h2 className="font-semibold text-gray-800">
                    {getTitle()}
                </h2>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Bell */}
                <Bell className="text-gray-500" size={18} />

                {/* Divider */}
                <div className="h-6 w-px bg-gray-200" />

                {/* User */}
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-800">
                            xxxxxxxxxxxxxx
                        </p>
                        <p className="text-xs text-gray-400">
                            Supervisor
                        </p>
                    </div>

                    <div className="w-9 h-9 bg-gray-300 rounded-xl overflow-hidden" />
                </div>
            </div>
        </div>
    );
}