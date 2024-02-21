'use client'

import { useState } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'
import { z } from 'zod'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { useDebounce } from '@/hooks/useDebounce'
import { useWriteMaidsPredictionSettle } from '@/lib/generated'

const schema = z.object({
	choice: z.number().int().min(0).optional(),
})

type SettleForm = {
	id: number
}

const SettleForm = ({ id }: SettleForm) => {
	const [choice, setChoice] = useState(0)
	const debounceChoice = useDebounce(choice, 500)

	const { data, isPending, writeContract } = useWriteMaidsPredictionSettle({})

	const settleTx = useWaitForTransactionReceipt({
		hash: data,
	})

	return (
		<AutoForm
			formSchema={schema}
			onSubmit={() =>
				writeContract({
					args: [BigInt(id), BigInt(debounceChoice)],
				})
			}
			fieldConfig={{
				choice: {
					inputProps: {
						placeholder: 'Settle',
					},
				},
			}}
			values={{ choice }}
			onParsedValuesChange={(values) => setChoice(values.choice ?? 1)}
		>
			<LoadingButtonForWeb3 loading={isPending || settleTx.isLoading}>
				Settle
			</LoadingButtonForWeb3>
		</AutoForm>
	)
}

export default SettleForm
