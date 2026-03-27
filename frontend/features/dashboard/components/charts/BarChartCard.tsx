"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// mock data
const data = [
    { time: "14:00", load: 40 },
    { time: "15:00", load: 60 },
    { time: "16:00", load: 50 },
    { time: "17:00", load: 70 },
    { time: "18:00", load: 80 },
    { time: "NOW", load: 85 },
];

export default function BarChartCard() {
    return (
        <div className="bg-white rounded-xl p-4 shadow h-[300px]">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold">
                    STEAM TURBINE PERFORMANCE
                </h3>

                <div className="flex gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Load (MW)
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-gray-300 rounded-full" />
                        Speed (RPM)
                    </span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Tooltip />

                    <Bar
                        dataKey="load"
                        radius={[6, 6, 0, 0]}
                        fill="#22c55e"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}