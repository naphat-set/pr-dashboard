//เส้น
"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

// mock data
const data = [
    { time: "14:00", output: 30 },
    { time: "15:00", output: 45 },
    { time: "16:00", output: 40 },
    { time: "17:00", output: 55 },
    { time: "18:00", output: 60 },
    { time: "NOW", output: 48 },
];

export default function LineChartCard() {
    return (
        <div className="bg-white rounded-xl p-4 shadow h-[300px]">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold">
                    GENERATOR REAL-TIME OUTPUT
                </h3>

                <span className="text-xs text-gray-400">
                    Peak: 48.2 MW
                </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12 }}
                    />

                    <YAxis hide />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="output"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}