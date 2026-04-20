"use client";

import PRForm from "./PRForm";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;

    // ✅ ถ้ามี = edit mode / ไม่มี = create mode
    initialData?: any;
}

export default function PRModal({
    open,
    onClose,
    onSubmit,
    initialData,
}: Props) {
    // ❗ ถ้าไม่เปิด modal → ไม่ render
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">

            {/* 🔥 overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* 🔥 modal container */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg flex flex-col max-h-[90vh]">

                    {/* HEADER */}
                    <div className="flex items-center justify-between border-b px-6 py-4">
                        <h2 className="font-semibold text-lg">

                            {/* ✅ สลับข้อความ */}
                            {initialData
                                ? "Edit Purchase Request"
                                : "Create New Purchase Request"}

                        </h2>

                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>

                    {/* BODY */}
                    <div className="overflow-y-auto px-6 py-6">

                        {/* ✅ ส่ง initialData เข้า form */}
                        <PRForm
                            onSubmit={onSubmit}
                            onClose={onClose}
                            initialData={initialData}
                        />

                    </div>

                </div>
            </div>
        </div>
    );
}