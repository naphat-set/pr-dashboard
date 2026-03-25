type Props = {
    title: string;
    value: string;
    status: string;
};

export default function StatCard({ title, value, status }: Props) {
    return (
        <div className="bg-white p-4 md:p-5 rounded-xl shadow w-full">
            <p className="text-xs md:text-sm text-gray-500">
                {title}
            </p>

            <h2 className="text-lg md:text-xl font-bold mt-1">
                {value}
            </h2>

            <p className="text-xs text-green-500 mt-1">
                {status}
            </p>
        </div>
    );
}