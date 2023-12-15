'use client'

import { useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { useMaidsPredictionSetEndTime } from '@/lib/generated'
import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  endTime: z.number().positive().int().min(1),
})

type SetEndTimeForm = {
  id: number
}

const SetEndTimeForm = ({ id }: SetEndTimeForm) => {
  const [endTime, setEndTime] = useState(0)
  const debounceEndTime = useDebounce(endTime, 500)

  const { data, isLoading, write } = useMaidsPredictionSetEndTime({
    args: [BigInt(id), BigInt(debounceEndTime)],
  })

  const writeEndTimeTx = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() => write()}
      fieldConfig={{
        endTime: {
          inputProps: {
            placeholder: 'EndTime',
          },
        },
      }}
      values={{ endTime }}
      onParsedValuesChange={(values) => setEndTime(values.endTime ?? 1)}>
      <LoadingButtonForWeb3 loading={isLoading || writeEndTimeTx.isLoading}>Set EndTime</LoadingButtonForWeb3>
    </AutoForm>
  )
}

export default SetEndTimeForm
