"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/shared/components/Sidebar";
import Topbar from "@/shared/components/Topbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/login");
        } else {
            setIsLoading(false);
        }
    }, [router]);

    // กัน flash หน้าก่อน redirect
    if (isLoading) {
        return null;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <Topbar onOpenSidebar={() => setIsSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}