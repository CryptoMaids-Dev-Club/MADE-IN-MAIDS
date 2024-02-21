export type SolidityPrediction = {
	id: bigint
	choicesLength: bigint
	predictionURI: string
	rate: bigint
	endTime: bigint
	result: bigint
	isSettled: boolean
}

export type Prediction = {
	id: number
	choicesLength: number
	predictionURI: string
	rate: number
	endTime: number
	result: number
	isSettled: boolean
}

export type PredictionText = {
	title: string
	description: string
	choices: string[]
}

export type SolidityUserInfo = {
	amount: bigint
	choice: bigint
	isPredicted: boolean
	isClaimed: boolean
}

export type UserInfo = {
	amount: number
	choice: number
	isPredicted: boolean
	isClaimed: boolean
}

export type SolidityTopUserInfo = {
	user: string
	amount: bigint
}

export type TopUserInfo = {
	user: string
	amount: number
}
