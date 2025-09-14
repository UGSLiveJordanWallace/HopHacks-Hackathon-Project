import type { Context } from "../types";

export default function Investments({
    data,
}: {
    data: Context["investments"] | undefined
}) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-center text-5xl font-bold">Investments</h1>
            {data?.map((investment, key) => {
                return (
                    <div
                        className="flex flex-row gap-2 bg-gray-100 rounded-lg p-3 justify-between"
                        key={key}
                    >
                        <div>
                            <h2 className="font-bold text-4xl">
                                {investment.option}
                            </h2>
                            <div className="flex flex-row gap-3">
                                <h2 className="">
                                    {investment.returns}% Interest
                                </h2>
                            </div>
                            <h2 className="text-2xl">
                                {investment.explanation}
                            </h2>
                        </div>
                        <div className="flex flex-row gap-3">
                            <span className="flex flex-col gap-3 w-40">
								{investment.diversificationGrade === 'hot' && <img className="object-cover w-30 aspect-square" src="/hot badge.png" />}
								{investment.diversificationGrade === 'neutral' && <img className="object-cover w-30 aspect-square" src="/neutral badge.png" />}
								{investment.diversificationGrade === 'cold' && <img className="object-cover w-30 aspect-square" src="/cold badge.png" />}
                                <h2 className="">Diversification</h2>
                            </span>
                            <span className="flex flex-col gap-3 w-40">
								{investment.riskGrade === 'hot' && <img className="object-cover w-30 aspect-square" src="/hot badge.png" />}
								{investment.riskGrade === 'neutral' && <img className="object-cover w-30 aspect-square" src="/neutral badge.png" />}
								{investment.riskGrade === 'cold' && <img className="object-cover w-30 aspect-square" src="/cold badge.png" />}
                                <h2 className="">Risk</h2>
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
