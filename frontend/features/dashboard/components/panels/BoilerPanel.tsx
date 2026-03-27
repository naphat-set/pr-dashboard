export default function BoilerPanel() {
    return (
        <div className="bg-white rounded-xl p-4 shadow space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm">
                    BOILER MONITORING PANEL
                </h3>

                <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded">
                    STABLE
                </span>
            </div>

            {/* bars */}
            {[
                { label: "MAIN STEAM PRESSURE", value: "102.5 bar", width: "70%", color: "bg-green-500" },
                { label: "SUPERHEATER TEMP", value: "540.2 °C", width: "60%", color: "bg-orange-400" },
                { label: "STEAM FLOW", value: "145.8 t/h", width: "50%", color: "bg-green-400" },
            ].map((item, i) => (
                <div key={i}>
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>{item.label}</span>
                        <span className="text-gray-600">{item.value}</span>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded mt-1">
                        <div
                            className={`${item.color} h-2 rounded`}
                            style={{ width: item.width }}
                        />
                    </div>
                </div>
            ))}

            {/* bottom cards */}
            <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="bg-gray-50 rounded p-3 text-center">
                    <p className="text-[10px] text-gray-400">
                        FEEDWATER TEMP
                    </p>
                    <p className="font-semibold">248°C</p>
                </div>

                <div className="bg-gray-50 rounded p-3 text-center">
                    <p className="text-[10px] text-gray-400">
                        FLUE GAS O2
                    </p>
                    <p className="font-semibold">3.2%</p>
                </div>
            </div>
        </div>
    );
}