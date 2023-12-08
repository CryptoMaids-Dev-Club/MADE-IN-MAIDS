'use client'

import { z } from 'zod'
import useVote from '@/app/(features)/detail/voting/_hooks/useVote'
import AutoForm from '@/components/ui/auto-form'
import { LoadingButton } from '@/components/ui/loading-button'

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

  const { amount, updateAmount, voteOrApprove, isLoading, allowance } = useVote(id)

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
      onParsedValuesChange={(values) => updateAmount(values.num ?? 1)}>
      <LoadingButton className='mt-2 w-full' loading={isLoading}>
        {allowance && allowance > Number(amount) ? `Vote` : `Approve $MAIDS`}
      </LoadingButton>
    </AutoForm>
  )
}

export default VotingForm
