'use client'

import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import AutoForm from '@/components/ui/auto-form'
import { LoadingButton } from '@/components/ui/loading-button'
import { maidsPredictionContractConfig } from '@/config/client'
import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  choice: z.number().int().min(0).optional(),
})

type SettleForm = {
  id: number
}

const SettleForm = ({ id }: SettleForm) => {
  const [choice, setChoice] = useState(0)
  const debounceChoice = useDebounce(choice, 500)

  // Settle
  const settleConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'settle',
    args: [id, debounceChoice],
  }).config
  const settle = useContractWrite({ ...settleConfig })
  const settleTx = useWaitForTransaction({
    hash: settle.data?.hash,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() => settle.write?.()}
      fieldConfig={{
        choice: {
          inputProps: {
            placeholder: 'Settle',
          },
        },
      }}
      values={{ choice }}
      onParsedValuesChange={(values) => setChoice(values.choice ?? 1)}>
      <LoadingButton loading={settle.isLoading || settleTx.isLoading}>Settle</LoadingButton>
    </AutoForm>
  )
}

export default SettleForm
