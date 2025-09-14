import type { Context } from "../types";
import GraphCard from "./Cards";

export default function Budget({
    data,
}: {
    data: Context["budget"] | undefined;
}) {
    const graphData: { name: string; value: number }[] = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            graphData.push({
                value: data[i].percentage,
                name: data[i].budgetName,
            });
        }
    }

    return (
        <>
            <GraphCard data={graphData} fillColor="#000000">
                <div className="flex flex-col gap-2">
                    {data?.map((budget, key) => {
                        return (
                            <div
                                className="flex flex-row justify-between items-center w-full"
                                key={key}
                            >
                                <span>{budget.budgetName}</span>
                                <span>{budget.percentage}</span>
                            </div>
                        );
                    })}
                </div>
            </GraphCard>
            <div className="grid grid-cols-2 gap-4">
                {data?.map((budget, key) => {
                    return (
                        <div
                            className="flex flex-col justify-between bg-stone-50 shadow-sm border border-gray-100 border-1 p-3 rounded-sm"
                            key={key}
                        >
                            <h2 className="font-bold">{budget.budgetName}</h2>
                            <div className="flex flex-row gap-4 w-full">
                                <h2>${budget.budgetValue}</h2>
                                <h2>{budget.percentage}%</h2>
                            </div>
                            <h2>{budget.explanation}</h2>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
