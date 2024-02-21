'use client'

import { z } from 'zod'
import useVote from '@/app/(features)/detail/voting/_hooks/useVote'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'

const schema = z.object({
	num: z.coerce.number().positive().int().min(1),
})

type VotingFormProps = {
	id: number
}

const VotingForm = ({ id }: VotingFormProps) => {
	const handleSubmit = () => {
		voteOrApprove()
	}

	const { amount, updateAmount, voteOrApprove, isLoading, allowance } =
		useVote(id)

	return (
		<AutoForm
			formSchema={schema}
			fieldConfig={{
				num: {
					inputProps: {
						placeholder: 'Amount',
					},
				},
			}}
			onSubmit={handleSubmit}
			values={{ num: amount }}
			onParsedValuesChange={(values) => updateAmount(values.num ?? 1)}
		>
			<LoadingButtonForWeb3 className='mt-2 w-full' loading={isLoading}>
				{allowance && allowance > Number(amount) ? `Vote` : `Approve $MAIDS`}
			</LoadingButtonForWeb3>
		</AutoForm>
	)
}

export default VotingForm
