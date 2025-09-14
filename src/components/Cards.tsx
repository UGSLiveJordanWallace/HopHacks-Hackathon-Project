import { Pie, PieChart, ResponsiveContainer } from "recharts";

export default function PieGraphCard({
    data,
    fillColor,
    children,
}: {
    data: { name: string; value: number }[];
    fillColor: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-rows-1 grid-cols-2 p-3">
            <div>
                <ResponsiveContainer width={"95%"} height={400}>
                    <PieChart width={0.95} height={400}>
                        <Pie
                            data={data}
                            dataKey={"value"}
                            nameKey={"name"}
                            innerRadius={60}
                            outerRadius={80}
                            fill={fillColor}
                            label
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div>{children}</div>
        </div>
    );
}
