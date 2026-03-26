"use client";

import { useState } from "react";
import PRTable from "@/features/purchase-requests/components/PRTable";
import PRModal from "@/features/purchase-requests/components/PRModal";
import Button from "@/shared/components/Button";

export default function Page() {
    const [open, setOpen] = useState(false);
    const [prList, setPrList] = useState<any[]>([]);

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

            {/* table */}
            <PRTable data={prList} />

            {/* modal */}
            <PRModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}