'use client'

import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import AutoForm from '@/components/ui/auto-form'
import { LoadingButton } from '@/components/ui/loading-button'
import { maidsPredictionContractConfig } from '@/config/client'
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

  const setEndTimeConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'setEndTime',
    args: [id, debounceEndTime],
  }).config
  const writeEndTime = useContractWrite({ ...setEndTimeConfig })
  const writeEndTimeTx = useWaitForTransaction({
    hash: writeEndTime.data?.hash,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() => writeEndTime.write?.()}
      fieldConfig={{
        endTime: {
          inputProps: {
            placeholder: 'EndTime',
          },
        },
      }}
      values={{ endTime }}
      onParsedValuesChange={(values) => setEndTime(values.endTime ?? 1)}>
      <LoadingButton loading={writeEndTime.isLoading || writeEndTimeTx.isLoading}>Set EndTime</LoadingButton>
    </AutoForm>
  )
}

export default SetEndTimeForm
