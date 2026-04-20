"use client";

import { useState, useEffect } from "react";
import PRTable from "@/features/purchase-requests/components/PRTable";
import PRModal from "@/features/purchase-requests/components/PRModal";
import Button from "@/shared/components/Button";

import {
    getPRList,
    createPR,
    deletePR,
    updatePR,
    getPRDetail,
} from "@/features/purchase-requests/services/pr.service";

export default function Page() {
    const [open, setOpen] = useState(false);
    const [prList, setPrList] = useState<any[]>([]);
    const [active, setActive] = useState("all");

    const [editingPR, setEditingPR] = useState<any | null>(null);

    const tabs = ["all", "draft", "submitted"];

    // 🔥 LOAD DATA
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getPRList();

            // 🔥 map backend → UI
            const mapped = data.map((i: any) => ({
                id: i.id,
                name: i.title,
                department: i.department,
                requester: `${i.first_name} ${i.last_name}`,
                amount: i.total,
                status: i.status,
                items: i.items || [],
            }));

            setPrList(mapped);
        } catch (err) {
            console.error("Fetch PR error:", err);
        }
    };

    // 🔥 CREATE
    const handleCreate = async (data: any) => {
        try {
            const payload = {
                title: data.name,
                department: data.department,
                priority: data.priority.toLowerCase(),
                status: data.status,
                items: data.items.map((i: any) => ({
                    description: i.name,
                    quantity: i.qty,
                    price: i.price || 0,
                })),
            };

            await createPR(payload);

            await fetchData(); // reload

            setOpen(false);
        } catch (err) {
            console.error("Create error:", err);
        }
    };

    // 🔥 DELETE
    const handleDelete = async (id: number) => {
        try {
            await deletePR(id);
            await fetchData();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // 🔥 EDIT (open modal)
    const handleEdit = async (item: any) => {
        try {
            const detail = await getPRDetail(item.id);

            const mapped = {
                id: detail.id,
                name: detail.title,
                department: detail.department,
                requester: `${detail.first_name} ${detail.last_name}`,
                amount: detail.total,
                status: detail.status,

                // 🔥 KEY FIX
                items: detail.items.map((i: any) => ({
                    name: i.description,
                    qty: i.quantity,
                    price: i.price,
                })),
            };

            setEditingPR(mapped);
            setOpen(true);
        } catch (err) {
            console.error("Edit load error:", err);
        }
    };

    // 🔥 UPDATE (API connected)
    const handleUpdate = async (data: any) => {
        try {
            const payload = {
                title: data.name,
                department: data.department,
                priority: data.priority.toLowerCase(),
                status: data.status,
                items: data.items.map((i: any) => ({
                    description: i.name,
                    quantity: i.qty,
                    price: i.price || 0,
                })),
            };

            await updatePR(editingPR.id, payload);

            await fetchData();

            setEditingPR(null);
            setOpen(false);
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // 🔥 FILTER
    const filtered =
        active === "all"
            ? prList
            : prList.filter((i) => i.status === active);

    return (
        <div className="space-y-4 md:space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-semibold">
                    Purchase Requests
                </h1>

                <Button
                    className="w-full md:w-auto"
                    onClick={() => {
                        setEditingPR(null);
                        setOpen(true);
                    }}
                >
                    + Create New PR
                </Button>
            </div>

            {/* TABS */}
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

            {/* TABLE */}
            <PRTable
                data={filtered}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            {/* MODAL */}
            <PRModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setEditingPR(null);
                }}
                onSubmit={editingPR ? handleUpdate : handleCreate}
                initialData={editingPR}
            />
        </div>
    );
}