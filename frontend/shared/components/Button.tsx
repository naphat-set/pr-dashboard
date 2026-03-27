"use client";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
    children,
    onClick,
    className = "",
    ...props
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

        ${className}
      `}
            {...props} // 🔥 สำคัญมาก
        >
            {children}
        </button>
    );
}