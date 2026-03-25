// 📁 features/dashboard/components/DashboardPage.tsx

import DashboardGrid from "./layout/DashboardGrid";
import StatCard from "./cards/StatCard";
import BoilerPanel from "./panels/BoilerPanel";
import BarChartCard from "./charts/BarChartCard";
import LineChartCard from "./charts/LineChartCard";
import GaugeChartCard from "./charts/GaugeChartCard";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold">
                Dashboard
            </h1>

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Power" value="1240" status="+2%" />
                <StatCard title="Fuel" value="450" status="-1%" />
                <StatCard title="Load" value="42.5" status="OK" />
                <StatCard title="Efficiency" value="99%" status="High" />
            </div>

            {/* Main Grid */}
            <DashboardGrid>
                {/* Boiler */}
                <div className="lg:col-span-4">
                    <BoilerPanel />
                </div>

                {/* Bar Chart */}
                <div className="lg:col-span-8">
                    <BarChartCard />
                </div>

                {/* Line */}
                <div className="lg:col-span-8">
                    <LineChartCard />
                </div>

                {/* Gauge */}
                <div className="lg:col-span-4">
                    <GaugeChartCard />
                </div>
            </DashboardGrid>
        </div>
    );
}