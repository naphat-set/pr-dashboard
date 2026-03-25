"use client";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
};

export default function Button({ children, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="
        w-full
        bg-green-500
        text-white
        p-3
        rounded-lg
        hover:bg-green-600
        transition
      "
        >
            {children}
        </button>
    );
}