import express, { Request, Response } from 'express'
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
app.use(express.json())
const googleAI = new GoogleGenAI({});

app.post("/", async (req: Request, res: Response) => {
	const age = req.body.age;
	const gender = req.body.gender;
	const income = req.body.income;
	const mStatus = req.body.mStatus;
	const occupation = req.body.occupation;
	const education = req.body.education;

	try {
		const response = await googleAI.models.generateContent({
			model: "gemini-2.5-pro",
			config: {
				responseMimeType: "application/json",
				responseSchema: {
					type: Type.OBJECT,
					properties: {
						budget: {
							type: Type.ARRAY,
							items: {
								type: Type.OBJECT,
								properties: {
									budgetName: { type: Type.STRING },
									percentage: { type: Type.NUMBER },
									budgetValue: { type: Type.NUMBER },
									explanation: { type: Type.STRING }
								},
							}
						},
						savings: {
							type: Type.OBJECT,
							properties: {
								emergencyFund: {
									type: Type.OBJECT,
									properties: {
										targetAmount: { type: Type.NUMBER },
										monthlyPayments: { type: Type.NUMBER },
										explanation: { type: Type.STRING }
									}
								},
								longTermFund: {
									type: Type.OBJECT,
									properties: {
										targetAmount: { type: Type.NUMBER },
										monthlyPayments: { type: Type.NUMBER },
										explanation: { type: Type.STRING },
									}
								},
								projection: {
									type: Type.ARRAY, 
									items: {
										type: Type.OBJECT,
										properties: {
											years: { type: Type.NUMBER },
											totalSavings: { type: Type.NUMBER }
										}
									}
								},
							}
						},
						retirement: {
							type: Type.ARRAY,
							items: {
								type: Type.OBJECT,
								properties: {
									option: { type: Type.STRING },
									monthlyPayments: { type: Type.NUMBER },
									explanation: {type: Type.STRING },
								}
							}
						},
						investments: {
							type: Type.ARRAY,
							items: {
								type: Type.OBJECT,
								properties: {
									option: { type: Type.STRING },
									returns: { type: Type.NUMBER },
									explanation: { type: Type.STRING },
									diversificationGrade: { type: Type.STRING },
									riskGrade: { type: Type.STRING },
								}
							}
						},
						goals: {
							type: Type.OBJECT,
							properties: {
								short: {
									type: Type.ARRAY,
									items: {
										type: Type.OBJECT,
										properties: {
											goal: { type: Type.STRING },
											monthlyPayments: { type: Type.NUMBER },
											targetAmount: { type: Type.NUMBER },
											explanation: { type: Type.STRING }
										}
									}
								},
								long: {
									type: Type.ARRAY,
									items: {
										type: Type.OBJECT,
										properties: {
											goal: { type: Type.STRING },
											monthlyPayments: { type: Type.NUMBER },
											targetAmount: { type: Type.NUMBER },
											explanation: { type: Type.STRING }
										}
									}
								}
							}
						}
					}
				},
				thinkingConfig: {
					thinkingBudget: 128,
				}
			},
			contents: `Age: ${age}, Gender: ${gender}, Income: ${income}/mo, marital status: ${mStatus}, job: ${occupation}, education: ${education}. Make a comprehensive financial strategy with the following information. Budget: list each budget name, the percentage it takes up of the total (no less than 5%), and an explanation. Savings: Emergency Fund, Long-term Fund, and a projection of potential savings over 30 years. Retirement: List retirement funds or other retirement options. Investment: List all investment opportunities available to me. Investment returns should be a percentage. I want to grade each investment based on diversification, and risk. For each grade, rank it \"hot\", \"neutral\", \"cold\" for best to worst. Create potential goals`,
		})
		res.send(response.text);
	} catch (error) {
		console.log(error)
		res.send({errorContext: error})
	}
})

app.listen(3000, (err?: Error) => {
	console.log("Listening on Port 3000");
})	
