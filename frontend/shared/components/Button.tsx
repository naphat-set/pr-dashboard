"use client";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
    children,
    onClick,
    className = "",
    ...props
}: Props) {

    const base = "px-4 py-2 rounded-lg transition";
    const defaultStyle = "bg-green-500 text-white hover:bg-green-600";

    // 🔥 ถ้ามี bg- อยู่ใน className → ไม่ใช้ default
    const isCustom = className.includes("bg-");

    return (
        <button
            onClick={onClick}
            className={`
                ${base}
                ${isCustom ? className : `${defaultStyle} ${className}`}
            `}
            {...props}
        >
            {children}
        </button>
    );
}