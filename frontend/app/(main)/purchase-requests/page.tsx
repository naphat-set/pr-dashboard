"use client";

import { useState } from "react";
import PRTable from "@/features/purchase-requests/components/PRTable";
import PRModal from "@/features/purchase-requests/components/PRModal";

export default function PurchaseRequestsPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-4 md:p-6">
            <PRTable onCreate={() => setOpen(true)} />


            <PRModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
}