"use client";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

export default function Button({
    children,
    onClick,
    className = "",
}: Props) {
    return (
        <button
            onClick={onClick}
            className={`
        bg-green-500
        text-white
        px-4 py-2          
        rounded-lg
        hover:bg-green-600
        transition

        ${className}       /* 🟢 allow custom */
      `}
        >
            {children}
        </button>
    );
}