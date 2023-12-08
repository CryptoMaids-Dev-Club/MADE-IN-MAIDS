'use client'

import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import AutoForm from '@/components/ui/auto-form'
import { LoadingButton } from '@/components/ui/loading-button'
import { maidsPredictionContractConfig } from '@/config/client'
import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  rate: z.number().positive().int().min(1),
})

type SetRateForm = {
  id: number
}

const SetRateForm = ({ id }: SetRateForm) => {
  const [rate, setRate] = useState(0)
  const debounceRate = useDebounce(rate, 500)

  const setRateConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'setRate',
    args: [id, debounceRate],
  }).config
  const writeRate = useContractWrite({ ...setRateConfig })
  const writeRateTx = useWaitForTransaction({
    hash: writeRate.data?.hash,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() => writeRate.write?.()}
      fieldConfig={{
        rate: {
          inputProps: {
            placeholder: 'Rate',
          },
        },
      }}
      values={{ rate }}
      onParsedValuesChange={(values) => setRate(values.rate ?? 1)}>
      <LoadingButton loading={writeRate.isLoading || writeRateTx.isLoading}>Set Rate</LoadingButton>
    </AutoForm>
  )
}

export default SetRateForm
