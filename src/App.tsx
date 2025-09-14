import { useFetcher } from "react-router";
import type { Context, Status } from "./types";
import { useEffect, useState } from "react";
import TabBar from "./components/Tabs";
import Budget from "./components/Budget";
import Goals from "./components/Goals";
import Investments from "./components/Investments";
import Retirement from "./components/Retirement";
import Savings from "./components/Savings";
import { ClimbingBoxLoader } from "react-spinners";

function App() {
    const fetcher = useFetcher<Status>();
    const [screen, setScreen] = useState<number>(0);
    let isBusy: boolean = fetcher.state !== "idle";

    const tabItems: string[] = [
        "Budget",
        "Goals",
        "Investments",
        "Retirement",
        "Savings",
    ];
    const [tab, setTab] = useState<number>(0);

    useEffect(() => {
        if (!fetcher.data) {
            setScreen(0);
            return;
        }
        if (fetcher.data.status === "normal") {
            setScreen(0);
            return;
        }
		if (fetcher.data.status === 'success') {
			setScreen(1);
			return;
		}
    }, [fetcher.data]);

    return (
        <div className="text-2xl h-screen w-full">
            {screen === 0 && (
                <div className="grid grid-cols-2 grid-rows-1 w-full h-full">
                    <div className="relative flex flex-col justify-center items-center bg-gray-100 gap-4 w-full text-center overflow-hidden">
                        <h1 className="relative text-6xl drop z-1 text-white drop-shadow-lg">
                            Personal Financial Advisor
                        </h1>
                        <h2 className="relative text-3xl w-4/5 z-1 text-white drop-shadow-lg">
                            A porfolio tool for getting people started in
                            understanding thier personal finances
                        </h2>
                        <img
                            className="absolute block w-full h-full z-0 blur-sm brightness-60 object-cover scale-110"
                            src="https://images.unsplash.com/photo-1756965812897-3f4c2a6c242c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center p-3 bg-gray-100">
						{fetcher.data?.status === 'error' && <div className="bg-transparent border border-1 border-red-400 text-red-500 text-lg drop-shadow-md">
							<h2 className="font-bold">Error</h2>
							<p>{fetcher.data?.errorMessage}</p>
						</div>}
						{isBusy && (
							<>
								<ClimbingBoxLoader color="#00ccff"/>
								<h3>Currently creating your comprehensive report</h3>
								<h3>Please Wait</h3>
							</>
						)}
                        <fetcher.Form
                            method="post"
                            action=""
                            className="flex flex-col justify-center w-5/7 p-3 gap-2 bg-slate-100 rounded-sm shadow-sm"
                        >
                            <h2 className="text-4xl">Baseline Information</h2>
                            <input
                                name="age"
                                type="number"
                                placeholder="Age"
                                className="p-2 shadow-sm outline-none focus:shadow-lg"
                            />
                            <select
                                name="gender"
                                className="p-2 shadow-sm outline-none focus:shadow-lg"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <input
                                name="income"
                                type="number"
                                placeholder="Income per month"
                                className="p-2 shadow-sm outline-none focus:shadow-lg"
                            />
                            <select
                                name="mStatus"
                                className="p-2 shadow-sm outline-none focus:shadow-lg"
                            >
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                            </select>
                            <input
                                name="occupation"
                                type="text"
                                placeholder="Occupation"
                                className="p-2 shadow-sm outline-none focus:shadow-lg"
                            />
                            <select
                                name="education"
                                className="p-2 shadow-sm outline-none focus:shadow-lg"
                            >
                                <option value="no high school">
                                    No High School Diploma
                                </option>
                                <option value="high school diploma">
                                    High School Diploma
                                </option>
                                <option value="some college">
                                    At most an Associates Degree
                                </option>
                                <option value="college graduate">
                                    College Graduate
                                </option>
                            </select>
                            <input
                                type="submit"
                                value={isBusy ? "Submitting" : "Submit"}
                                className={
                                    "p-2 rounded-lg inset-shadow-sm " +
                                    (isBusy
                                        ? "bg-gray-300 text-slate-100"
                                        : "bg-gray-100 text-black")
                                }
                                disabled={isBusy}
                            />
                        </fetcher.Form>
						{fetcher.data?.context && <button className="text-blue-400 hover:text-blue-700 active:text-blue-900" onClick={() => setScreen(1)}>Current financial plan</button>}
                    </div>
                </div>
            )}
            {screen === 1 && (
                <>
                    <div className="relative">
                        <TabBar
                            tabItems={tabItems}
                            currTabItem={tab}
                            setTabItem={setTab}
                        />
                        {tab === 0 && (
                            <Budget data={fetcher.data?.context?.budget} />
                        )}
                        {tab === 1 && (
                            <Goals data={fetcher.data?.context?.goals} />
                        )}
                        {tab === 2 && (
                            <Investments
                                data={fetcher.data?.context?.investments}
                            />
                        )}
                        {tab === 3 && (
                            <Retirement
                                data={fetcher.data?.context?.retirement}
                            />
                        )}
                        {tab === 4 && (
                            <Savings data={fetcher.data?.context?.savings} />
                        )}
                    </div>
                    <button
                        className="fixed bg-white rounded-sm shadow-md p-2 top-0 right-0 m-2"
                        onClick={() => setScreen(0)}
                    >
                        Back
                    </button>
                </>
            )}
        </div>
    );
}

export async function actionGetSummary({ request }: { request: Request }) {
    const formData = await request.formData();
    const age = Number(formData.get("age") as string);
    const gender = formData.get("gender") as string;
    const income = Number(formData.get("income") as string);
    const mStatus = formData.get("mStatus") as string;
    const occupation = formData.get("occupation") as string;
    const education = formData.get("education") as string;

    const status: Status = {
        status: "normal",
    };

	if (formData.get("age") === "" || formData.get("gender") === "" || formData.get("income") === "" || formData.get("mStatus") === "" || formData.get("occupation") === "" || formData.get("education") === "") {
		status.status = "error";
		status.errorMessage = "All form fields need to be filled";
		return status;
	}

	console.log({
            age,
            gender,
            income,
            mStatus,
            occupation,
            education,
        })

	try {
		const response = await fetch("http://localhost:3000", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				age,
				gender,
				income,
				mStatus,
				occupation,
				education,
			}),
		});

		const data = await response.json();
		if (data.errorContext) {
			status.status = "error";
			status.errorMessage = "Server failed to generate financial report";
			return status;
		}

		status.context = data as Context;
		status.status = "success";
	} catch (error) {
		status.status = "error";
		status.errorMessage = "Server failure unspecified";
	}

    return status;
}

export default App;
