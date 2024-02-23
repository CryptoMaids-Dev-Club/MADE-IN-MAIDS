'use client'

import { useState } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'
import { z } from 'zod'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { useDebounce } from '@/hooks/useDebounce'
import { useWriteMaidsPredictionSetEndTime } from '@/lib/generated'

const schema = z.object({
  endTime: z.number().positive().int().min(1),
})

type SetEndTimeForm = {
  id: number
}

const SetEndTimeForm = ({ id }: SetEndTimeForm) => {
  const [endTime, setEndTime] = useState(0)
  const debounceEndTime = useDebounce(endTime, 500)

  const { data, isPending, writeContract } = useWriteMaidsPredictionSetEndTime()

  const writeEndTimeTx = useWaitForTransactionReceipt({
    hash: data,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() =>
        writeContract({
          args: [BigInt(id), BigInt(debounceEndTime)],
        })
      }
      fieldConfig={{
        endTime: {
          inputProps: {
            placeholder: 'EndTime',
          },
        },
      }}
      values={{ endTime }}
      onParsedValuesChange={(values) => setEndTime(values.endTime ?? 1)}>
      <LoadingButtonForWeb3 loading={isPending || writeEndTimeTx.isLoading}>Set EndTime</LoadingButtonForWeb3>
    </AutoForm>
  )
}

export default SetEndTimeForm
