'use client'

import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { maidsPredictionContractConfig } from '@/config/client'
import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  choiceLength: z.number().positive().int().min(1),
})

type SetChoiceLength = {
  id: number
}

const SetChoiceLength = ({ id }: SetChoiceLength) => {
  const [choiceLength, setChoiceLength] = useState(0)
  const debounceChoiceLength = useDebounce(choiceLength, 500)

  const setChoiceLengthConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'setChoicesLength',
    args: [id, debounceChoiceLength],
  }).config
  const writeChoiceLength = useContractWrite({ ...setChoiceLengthConfig })
  const writeChoiceLengthTx = useWaitForTransaction({
    hash: writeChoiceLength.data?.hash,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() => writeChoiceLength.write?.()}
      fieldConfig={{
        choiceLength: {
          inputProps: {
            placeholder: 'ChoiceLength',
          },
        },
      }}
      values={{ choiceLength }}
      onParsedValuesChange={(values) => setChoiceLength(values.choiceLength ?? 1)}>
      <LoadingButtonForWeb3 loading={writeChoiceLength.isLoading || writeChoiceLengthTx.isLoading}>
        Set ChoiceLength
      </LoadingButtonForWeb3>
    </AutoForm>
  )
}

export default SetChoiceLength
