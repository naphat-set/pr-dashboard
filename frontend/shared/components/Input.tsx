"use client";

type Props = {
    placeholder?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
    placeholder,
    type = "text",
    onChange,
}: Props) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className="
        w-full
        border
        p-3
        rounded-lg
        text-sm
        outline-none
        focus:border-green-500
      "
        />
    );
}