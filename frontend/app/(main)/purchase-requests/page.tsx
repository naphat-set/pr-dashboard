"use client";

import { useState } from "react";
import PRTable from "@/features/purchase-requests/components/PRTable";
import PRModal from "@/features/purchase-requests/components/PRModal";
import Button from "@/shared/components/Button";

export default function Page() {
    const [open, setOpen] = useState(false);
    const [prList, setPrList] = useState<any[]>([]);

    // 🔥 เพิ่มอันนี้
    const [active, setActive] = useState("all");

    const tabs = ["all", "draft", "submitted", "approved", "rejected"];

    const handleSubmit = (data: any) => {
        setPrList((prev) => [
            ...prev,
            {
                id: `PR-${Date.now()}`,
                ...data,
            },
        ]);
        setOpen(false);
    };

    const filtered =
        active === "all"
            ? prList
            : prList.filter((i) => i.status === active);

    return (
        <div className="space-y-4 md:space-y-6">

            {/* header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-semibold">
                    Purchase Requests
                </h1>

                <Button
                    className="w-full md:w-auto"
                    onClick={() => setOpen(true)}
                >
                    + Create New PR
                </Button>
            </div>

            {/* 🔥 TABS */}
            <div className="flex gap-2 flex-wrap">
                {tabs.map((t) => (
                    <button
                        key={t}
                        onClick={() => setActive(t)}
                        className={`px-4 py-1.5 text-sm rounded-full capitalize
              ${active === t
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {t === "all"
                            ? "All PR"
                            : `${t} (${prList.filter(i => i.status === t).length})`}
                    </button>
                ))}
            </div>

            {/* 🔥 ส่ง active ไป table */}
            <PRTable data={filtered} />

            {/* modal */}
            <PRModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}