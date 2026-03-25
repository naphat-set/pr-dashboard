export default function BoilerPanel() {
    return (
        <div className="bg-white rounded-xl p-4 shadow space-y-4">
            <h3 className="font-semibold text-sm">Boiler Monitoring Panel</h3>

            {/* item */}
            <div>
                <p className="text-xs text-gray-500">Main Steam Pressure</p>
                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                    <div className="bg-green-500 h-2 rounded w-[70%]" />
                </div>
            </div>

            <div>
                <p className="text-xs text-gray-500">Superheater Temp</p>
                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                    <div className="bg-orange-400 h-2 rounded w-[60%]" />
                </div>
            </div>

            <div>
                <p className="text-xs text-gray-500">Steam Flow</p>
                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                    <div className="bg-green-400 h-2 rounded w-[50%]" />
                </div>
            </div>
        </div>
    );
}