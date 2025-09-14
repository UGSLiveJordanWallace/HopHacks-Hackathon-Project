import type { Context } from "../types";

export default function Goals({ data }: { data: Context["goals"] | undefined }) {
    return (
        <div className="grid grid-cols-2 gap-3 p-2 grid-row-1 w-full">
            <div className="flex flex-col justify-center items-center gap-3 w-full">
                <h1 className="text-5xl">Long Term</h1>
                {data?.long.map((val, key) => {
                    return (
                        <div
                            className="flex flex-col justify-between w-full bg-slate-50 shadow-sm p-4 rounded-md text-xl"
                            key={key}
                        >
                            <h2 className="font-bold">{val.goal}</h2>
                            <div className="flex flex-row gap-4 w-full">
                                <h2>${val.targetAmount}</h2>
                                <h2>${val.monthlyPayments}/mo</h2>
                                <h2>
                                    {Math.floor(val.targetAmount /
                                        val.monthlyPayments /
                                        12)}{" "}
                                    years
                                </h2>
                            </div>
                            <h2>{val.explanation}</h2>
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-col justify-center items-center gap-3 w-full">
                <h1 className="text-5xl">Short Term</h1>
                {data?.short.map((val, key) => {
                    return (
                        <div
                            className="flex flex-col justify-between w-full bg-slate-50 shadow-sm p-4 rounded-md text-xl"
                            key={key}
                        >
                            <h2 className="font-bold">{val.goal}</h2>
                            <div className="flex flex-row gap-4 w-full">
                                <h2>${val.targetAmount}</h2>
                                <h2>${val.monthlyPayments}/mo</h2>
                                <h2>
                                    {Math.floor(val.targetAmount /
                                        val.monthlyPayments /
                                        12)}{" "}
                                    years
                                </h2>
                            </div>
                            <h2>{val.explanation}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
