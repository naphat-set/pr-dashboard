"use client";

import { useState } from "react";

export default function PRTable({ data = [] }: any) {
    const [active, setActive] = useState("all");

    const filtered =
        active === "all"
            ? data
            : data.filter((i: any) => i.status === active);

    const tabs = ["all", "draft", "submitted", "approved", "rejected"];

    return (
        <div className="bg-white rounded-xl border shadow-sm">

            {/* 🟢 tabs */}
            <div className="px-6 pt-4 flex gap-2 flex-wrap">
                {tabs.map((t) => (
                    <button
                        key={t}
                        onClick={() => setActive(t)}
                        className={`px-3 py-1 text-sm rounded-full capitalize
              ${active === t
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {t === "all" ? "All PR" : t}
                    </button>
                ))}
            </div>

            {/* 🟢 table */}
            <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full text-sm mt-4">

                    {/* 🟢 header FIX */}
                    <thead className="bg-gray-50 text-gray-500 text-left">
                        <tr>
                            <th className="px-6 py-3">PR ID</th>
                            <th className="px-6">Name</th>
                            <th className="px-6">Department</th>
                            <th className="px-6">Requester</th>
                            <th className="px-6">Amount</th>
                            <th className="px-6">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((item: any, i: number) => (
                            <tr key={i} className="border-t">

                                <td className="px-6 py-4">{item.id}</td>

                                <td className="px-6">{item.name}</td>

                                <td className="px-6">{item.department}</td>

                                <td className="px-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gray-300 rounded-full" />
                                        {item.requester}
                                    </div>
                                </td>

                                <td className="px-6">
                                    {item.amount.toLocaleString()} THB
                                </td>

                                {/* 🟢 status badge */}
                                <td className="px-6">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full capitalize
                      ${item.status === "approved"
                                                ? "bg-green-100 text-green-600"
                                                : item.status === "submitted"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : item.status === "rejected"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-gray-200 text-gray-600"
                                            }
                    `}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🟢 footer */}
            <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-500">
                <p>Showing {filtered.length} requests</p>

                <div className="flex gap-2">
                    <button className="px-3 py-1 border rounded">
                        Previous
                    </button>
                    <button className="px-3 py-1 bg-green-500 text-white rounded">
                        1
                    </button>
                    <button className="px-3 py-1 border rounded">
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
}