"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, Bell } from "lucide-react";

type Props = {
    onOpenSidebar: () => void;
};

export default function Topbar({ onOpenSidebar }: Props) {
    const pathname = usePathname();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    const ref = useRef<HTMLDivElement>(null);

    const getTitle = () => {
        if (pathname.includes("purchase-requests")) {
            return "Purchase Requests";
        }
        return "Dashboard";
    };

    // ✅ โหลด user จาก localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ✅ ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ logout
    const handleLogout = () => {
        const confirmLogout = window.confirm("Logout now?");

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
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

                {/* User + Dropdown */}
                <div className="relative" ref={ref}>
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-800">
                                {user?.first_name || "User"}
                            </p>
                        </div>

                        <div className="w-9 h-9 bg-gray-300 rounded-xl overflow-hidden" />
                    </div>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}