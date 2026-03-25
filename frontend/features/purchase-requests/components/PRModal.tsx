//popup
"use client";

import { ReactNode } from "react";
import PRForm from "./PRForm";

interface Props {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export default function PRModal({ open, onClose }: Props) {
    // ❗ ปิด = ไม่ render เลย (performance ดี)
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* 🔲 overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* 📦 modal container */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                    className="
            w-full 
            max-w-4xl 
            bg-white 
            rounded-xl 
            shadow-lg
            flex 
            flex-col
            max-h-[90vh]
          "
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <h2 className="font-semibold text-lg">
                            Create New Purchase Request
                        </h2>

                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>

                    {/* BODY */}
                    <div className="overflow-y-auto p-4 md:p-6">
                        <PRForm />
                    </div>

                    {/* FOOTER */}
                    <div className="border-t px-4 py-3 flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm bg-gray-100 rounded-md"
                        >
                            Cancel
                        </button>

                        <button
                            className="px-4 py-2 text-sm bg-green-500 text-white rounded-md"
                        >
                            Create PR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}