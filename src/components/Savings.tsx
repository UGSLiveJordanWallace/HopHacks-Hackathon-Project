import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { Context } from "../types";

export default function Savings({ data }: { data: Context["savings"] | undefined }) {
    const graphData: { value: number; name: number }[] = [];
	if (data) {
		for (let i = 0; i < data.projection.length; i++) {
			const graphDataPoint = data.projection[i];
			graphData.push({
				name: graphDataPoint.years,
				value: graphDataPoint.totalSavings,
			});
		}
	}

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-between p-3">
                <div className="flex-shrink w-2/5">
                    <h2 className="text-3xl text-center">Emergency Fund</h2>
                    <h2>${data?.emergencyFund.targetAmount}</h2>
                    <h2>${data?.emergencyFund.monthlyPayments}/mo</h2>
                    <h2>{data?.emergencyFund.explanation}</h2>
                </div>
                <div className="flex-shrink w-2/5">
                    <h2 className="text-3xl text-center">Long-Term Fund</h2>
                    <h2>${data?.longTermFund.targetAmount}</h2>
                    <h2>${data?.longTermFund.monthlyPayments}/mo</h2>
                    <h2>{data?.longTermFund.explanation}</h2>
                </div>
            </div>
            <ResponsiveContainer width="90%" height={400} className="flex-grow">
                <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis width={90} />
                    <Tooltip />
                    <Line
                        type={"monotone"}
                        dataKey={"value"}
                        stroke="#000000"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
