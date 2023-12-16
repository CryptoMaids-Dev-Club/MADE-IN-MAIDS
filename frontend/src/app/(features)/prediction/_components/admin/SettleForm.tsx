'use client'

import { useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { useDebounce } from '@/hooks/useDebounce'
import { useMaidsPredictionSettle } from '@/lib/generated'

const schema = z.object({
  choice: z.number().int().min(0).optional(),
})

type SettleForm = {
  id: number
}

const SettleForm = ({ id }: SettleForm) => {
  const [choice, setChoice] = useState(0)
  const debounceChoice = useDebounce(choice, 500)

  const { data, isLoading, write } = useMaidsPredictionSettle({
    args: [BigInt(id), BigInt(debounceChoice)],
  })

  const settleTx = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() => write()}
      fieldConfig={{
        choice: {
          inputProps: {
            placeholder: 'Settle',
          },
        },
      }}
      values={{ choice }}
      onParsedValuesChange={(values) => setChoice(values.choice ?? 1)}>
      <LoadingButtonForWeb3 loading={isLoading || settleTx.isLoading}>Settle</LoadingButtonForWeb3>
    </AutoForm>
  )
}

export default SettleForm
