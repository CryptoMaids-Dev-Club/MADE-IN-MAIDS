'use client'

import { useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { useDebounce } from '@/hooks/useDebounce'
import { useMaidsPredictionSetRate } from '@/lib/generated'

const schema = z.object({
  rate: z.number().positive().int().min(1),
})

type SetRateForm = {
  id: number
}

const SetRateForm = ({ id }: SetRateForm) => {
  const [rate, setRate] = useState(0)
  const debounceRate = useDebounce(rate, 500)

  const { data, isLoading, write } = useMaidsPredictionSetRate({
    args: [BigInt(id), BigInt(debounceRate)],
  })

  const writeRateTx = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() => write()}
      fieldConfig={{
        rate: {
          inputProps: {
            placeholder: 'Rate',
          },
        },
      }}
      values={{ rate }}
      onParsedValuesChange={(values) => setRate(values.rate ?? 1)}>
      <LoadingButtonForWeb3 loading={isLoading || writeRateTx.isLoading}>Set Rate</LoadingButtonForWeb3>
    </AutoForm>
  )
}

export default SetRateForm
