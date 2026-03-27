type Props = {
    title: string;
    value: string;
    status: string;
    highlight?: boolean;
};

export default function StatCard({
    title,
    value,
    status,
    highlight,
}: Props) {
    return (
        <div
            className={`
        rounded-xl p-4 md:p-5 shadow w-full relative overflow-hidden
        ${highlight ? "bg-green-500 text-white" : "bg-white"}
      `}
        >
            <p
                className={`
          text-[11px] uppercase tracking-wide
          ${highlight ? "text-white/80" : "text-gray-400"}
        `}
            >
                {title}
            </p>

            <h2 className="text-xl font-bold mt-2">
                {value}
            </h2>

            <p
                className={`
          text-xs mt-1
          ${highlight ? "text-white" : "text-green-500"}
        `}
            >
                {status}
            </p>

            {/* background glow */}
            {highlight && (
                <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            )}
        </div>
    );
}