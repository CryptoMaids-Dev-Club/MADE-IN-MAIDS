'use client'

import { useState } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'
import { z } from 'zod'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { useDebounce } from '@/hooks/useDebounce'
import { useWriteMaidsPredictionCreatePrediction } from '@/lib/generated'

const schema = z.object({
	choiceLength: z.number().positive().int().min(1),
	predictionURI: z.string().url(),
	rate: z.number().positive().int().min(1),
	endTime: z.number().positive().int().min(1),
})

const AdminPredictionFactory = () => {
	const [choiceLength, setChoiceLength] = useState(0)
	const [predictionURI, setPredictionURI] = useState('')
	const [rate, setRate] = useState(0)
	const [endTime, setEndTime] = useState(0)
	const debounceChoiceLength = useDebounce(choiceLength, 500)
	const debouncePredictionURI = useDebounce(predictionURI, 500)
	const debounceRate = useDebounce(rate, 500)
	const debounceEndTime = useDebounce(endTime, 500)

	const { data: createPredictionData, writeContract: createPrediction } =
		useWriteMaidsPredictionCreatePrediction()

	const createPredictionTx = useWaitForTransactionReceipt({
		hash: createPredictionData,
	})

	return (
		<div className='container mx-auto my-8 max-w-6xl'>
			<AutoForm
				formSchema={schema}
				onSubmit={() =>
					createPrediction({
						args: [
							BigInt(debounceChoiceLength),
							debouncePredictionURI,
							BigInt(debounceRate),
							BigInt(debounceEndTime),
						],
					})
				}
				fieldConfig={{
					choiceLength: {
						inputProps: {
							placeholder: 'ChoiceLength',
						},
					},
					predictionURI: {
						inputProps: {
							placeholder: 'PredictionURI',
						},
					},
					rate: {
						inputProps: {
							placeholder: 'Rate',
						},
					},
					endTime: {
						inputProps: {
							placeholder: 'EndTime',
						},
					},
				}}
				values={{ choiceLength, predictionURI, rate, endTime }}
				onParsedValuesChange={(values) => {
					setChoiceLength(values.choiceLength ?? 0)
					setPredictionURI(values.predictionURI ?? '')
					setRate(values.rate ?? 0)
					setEndTime(values.endTime ?? 0)
				}}
			>
				<LoadingButtonForWeb3
					loading={createPredictionTx.isLoading}
					className='mt-2 w-56'
					type='submit'
				>
					Create Prediction
				</LoadingButtonForWeb3>
			</AutoForm>
		</div>
	)
}

export default AdminPredictionFactory
