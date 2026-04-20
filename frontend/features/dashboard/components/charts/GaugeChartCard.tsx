//วงกลม
"use client";

import {
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
    PolarAngleAxis,
} from "recharts";

// mock data
const data = [
    {
        name: "Boiler",
        value: 70.2,
        fill: "#111827",
        label: "BOILER/TURBINE\nTHERMAL EFFICIENCY",
        sub: "GROSS",
    },
    {
        name: "Plant",
        value: 64.8,
        fill: "#22c55e",
        label: "PARASITIC LOAD\nDEDUCTED (8.2MW)",
        sub: "NET PLANT",
    },
];

export default function GaugeChartCard() {
    return (
        <div className="bg-white rounded-xl p-4 shadow h-[300px]">
            <h3 className="text-sm font-semibold mb-3">
                EFFICIENCY COMPARISON
            </h3>

            <div className="flex justify-around items-center h-full">
                {data.map((item, i) => (
                    <div key={i} className="text-center">
                        <div className="relative w-[120px] h-[120px]">
                            <ResponsiveContainer>
                                <RadialBarChart
                                    innerRadius="75%"
                                    outerRadius="100%"
                                    data={[item]}
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {/* scale 0-100 */}
                                    <PolarAngleAxis
                                        type="number"
                                        domain={[0, 100]}
                                        angleAxisId={0}
                                        tick={false}
                                    />

                                    <RadialBar
                                        background
                                        dataKey="value"
                                        cornerRadius={10}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>

                            {/* center text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-sm font-bold">
                                    {item.value}%
                                </p>
                                <p className="text-[10px] text-gray-400">
                                    {item.sub}
                                </p>
                            </div>
                        </div>

                        {/* label */}
                        <p className="text-[10px] text-gray-500 mt-2 whitespace-pre-line">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}