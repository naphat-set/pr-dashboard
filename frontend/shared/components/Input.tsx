"use client";

import React from "react";

type Props = {
    label?: string; // 🟢 label ข้างบน input
    placeholder?: string;
    type?: string;

    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    error?: string; // 🟢 แสดง error ใต้ input
    disabled?: boolean;

    className?: string; // 🟢 ใช้ปรับ layout เพิ่ม
};

export default function Input({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    error,
    disabled = false,
    className = "",
}: Props) {
    return (
        <div className={`w-full ${className}`}>
            {/* 🟢 LABEL */}
            {label && (
                <label className="block text-sm font-medium mb-1">
                    {label}
                </label>
            )}

            {/* 🟢 INPUT */}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`
          w-full
          border
          px-3 py-2 md:py-3   /* 📱 mobile / desktop spacing */
          rounded-lg
          text-sm md:text-base
          outline-none
          transition

          ${error
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-500"
                    }

          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
            />

            {/* 🟢 ERROR */}
            {error && (
                <p className="text-red-500 text-xs mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}