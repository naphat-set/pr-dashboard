"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    className?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            label,
            error,
            className = "",
            ...props
        },
        ref
    ) => {
        return (
            <div className={`w-full ${className}`}>
                {/* LABEL */}
                {label && (
                    <label className="block text-sm font-medium mb-1">
                        {label}
                    </label>
                )}

                {/* INPUT */}
                <input
                    ref={ref} // 🔥 สำคัญสุด
                    className={`
            w-full
            border
            px-3 py-2 md:py-3
            rounded-lg
            text-sm md:text-base
            outline-none
            transition

            ${error
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-green-500"
                        }

            ${props.disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          `}
                    {...props} // 🔥 สำคัญสุด
                />

                {/* ERROR */}
                {error && (
                    <p className="text-red-500 text-xs mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;