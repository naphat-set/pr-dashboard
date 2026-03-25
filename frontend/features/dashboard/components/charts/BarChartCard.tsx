//แท่ง
export default function BarChartCard() {
    return (
        <div className="bg-white rounded-xl p-4 shadow h-[250px]">
            <h3 className="text-sm font-semibold mb-2">
                Steam Turbine Performance
            </h3>

            <div className="h-full flex items-end gap-2">
                {[40, 60, 50, 70, 80].map((h, i) => (
                    <div
                        key={i}
                        className="bg-green-400 w-full"
                        style={{ height: `${h}%` }}
                    />
                ))}
            </div>
        </div>
    );
}