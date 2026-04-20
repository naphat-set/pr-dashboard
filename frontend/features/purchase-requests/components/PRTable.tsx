"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function PRTable({ data = [], onDelete, onEdit }: any) {
    const [currentPage, setCurrentPage] = useState(1);

    const [deleteId, setDeleteId] = useState<number | null>(null);

    const pageSize = 10;

    const filtered = data;

    // pagination
    const total = filtered.length;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const paginatedData = filtered.slice(start, end);

    // ✅ confirm delete
    const handleConfirmDelete = async () => {
        if (!deleteId) return;

        try {
            await onDelete(deleteId);
            setDeleteId(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white rounded-xl border shadow-sm">

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="min-w-[1000px] w-full text-sm mt-4">

                    <thead className="bg-gray-50 text-gray-500 text-left">
                        <tr>
                            {[
                                "PR ID",
                                "Name",
                                "Department",
                                "Requester",
                                "Amount",
                                "Status",
                                "Actions",
                            ].map((h) => (
                                <th key={h} className="px-6 py-3">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.map((item: any, i: number) => (
                            <tr key={i} className="border-t hover:bg-gray-50">

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

                                {/* STATUS */}
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
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                {/* ACTION */}
                                <td className="px-6">
                                    <div className="flex gap-3">

                                        {/* EDIT */}
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-gray-500 hover:text-black"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        {/* DELETE */}
                                        <button
                                            onClick={() => setDeleteId(item.id)}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-500">
                <p>
                    Showing {total === 0 ? 0 : start + 1} to{" "}
                    {Math.min(end, total)} of {total} requests
                </p>

                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        className="px-3 py-1 border rounded"
                    >
                        Previous
                    </button>

                    <button className="px-3 py-1 bg-green-500 text-white rounded">
                        {currentPage}
                    </button>

                    <button
                        onClick={() =>
                            setCurrentPage((p) =>
                                end < total ? p + 1 : p
                            )
                        }
                        className="px-3 py-1 border rounded"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* MODAL CONFIRM DELETE */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[320px] shadow-lg">

                        <h3 className="text-lg font-semibold mb-2">
                            Confirm Delete
                        </h3>

                        <p className="text-sm text-gray-500 mb-4">
                            Are you sure you want to delete this request?
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-3 py-1 text-sm border rounded-md"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirmDelete}
                                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}