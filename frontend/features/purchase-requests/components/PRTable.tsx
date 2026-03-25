"use client";

import { useState } from "react";
import Button from "@/shared/components/Button";

// 🟢 TYPE (mock ไปก่อน)
interface PR {
    id: string;
    description: string;
    costCenter: string;
    requester: string;
    amount: number;
    status: "approved" | "submitted" | "rejected" | "draft";
}

interface Props {
    onCreate: () => void;
}

export default function PRTable({ onCreate }: Props) {
    // 🟢 mock data
    const [data] = useState<PR[]>([
        {
            id: "PR-2023-1102",
            description: "Software License",
            costCenter: "CC-LOG-00",
            requester: "Sarah Chen",
            amount: 200000,
            status: "approved",
        },
        {
            id: "PR-2023-1103",
            description: "Office Supplies",
            costCenter: "CC-LOG-00",
            requester: "Sarah Chen",
            amount: 5000,
            status: "submitted",
        },
        {
            id: "PR-2023-1104",
            description: "Laptop",
            costCenter: "CC-IT-01",
            requester: "Sarah Chen",
            amount: 45000,
            status: "rejected",
        },
    ]);

    // 🟢 filter tab
    const [activeTab, setActiveTab] = useState("all");

    const tabs = ["all", "draft", "submitted", "approved", "rejected"];

    const filtered =
        activeTab === "all"
            ? data
            : data.filter((d) => d.status === activeTab);

    return (
        <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-lg md:text-xl font-semibold">
                        Purchase Requests
                    </h1>
                </div>

                {/* 🟢 REUSE Button */}
                <Button onClick={onCreate}>
                    + Create New PR
                </Button>
            </div>

            {/* TABS */}
            <div className="flex flex-wrap gap-2 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-full text-sm capitalize ${activeTab === tab
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="min-w-[800px] w-full text-sm">
                    <thead className="text-left text-gray-500 border-b">
                        <tr>
                            <th className="py-2">PR ID</th>
                            <th>Description</th>
                            <th>Cost Center</th>
                            <th>Requester</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-3">{item.id}</td>
                                <td>{item.description}</td>
                                <td>{item.costCenter}</td>
                                <td>{item.requester}</td>
                                <td>
                                    {item.amount.toLocaleString()} THB
                                </td>

                                {/* STATUS */}
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${item.status === "approved"
                                            ? "bg-green-100 text-green-600"
                                            : item.status === "submitted"
                                                ? "bg-blue-100 text-blue-600"
                                                : item.status === "rejected"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td className="text-right">
                                    <button className="text-green-600 text-sm">
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}