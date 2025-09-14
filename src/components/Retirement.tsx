import type { Context } from "../types";

export default function Retirement({ data }: { data: Context["retirement"] | undefined }) {
    return (
        <div className="p-3">
            <h1 className="text-5xl text-center">Retirement</h1>
            <div className="flex flex-col gap-3">
                {data?.map((plan, key) => {
                    return (
                        <div
                            className="bg-slate-100 shadow-sm rounded-sm p-3"
                            key={key}
                        >
                            <h2 className="font-bold text-3xl">
                                {plan.option}
                            </h2>
                            <h2 className="">${plan.monthlyPayments}/mo</h2>
                            <h2 className="text-2xl">{plan.explanation}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
