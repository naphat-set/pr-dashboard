"use client";

import { useState } from "react";
import Sidebar from "@/shared/components/Sidebar";
import Topbar from "@/shared/components/Topbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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