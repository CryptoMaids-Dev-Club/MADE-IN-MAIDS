'use client'

import { useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { useDebounce } from '@/hooks/useDebounce'
import { useMaidsPredictionSetChoicesLength } from '@/lib/generated'

const schema = z.object({
  choiceLength: z.number().positive().int().min(1),
})

type SetChoiceLength = {
  id: number
}

const SetChoiceLength = ({ id }: SetChoiceLength) => {
  const [choiceLength, setChoiceLength] = useState(0)
  const debounceChoiceLength = useDebounce(choiceLength, 500)

  const {
    data: choiceLengthData,
    isLoading,
    write: writeChoiceLength,
  } = useMaidsPredictionSetChoicesLength({
    args: [BigInt(id), BigInt(debounceChoiceLength)],
  })

  const writeChoiceLengthTx = useWaitForTransaction({
    hash: choiceLengthData?.hash,
  })

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={() => writeChoiceLength()}
      fieldConfig={{
        choiceLength: {
          inputProps: {
            placeholder: 'ChoiceLength',
          },
        },
      }}
      values={{ choiceLength }}
      onParsedValuesChange={(values) => setChoiceLength(values.choiceLength ?? 1)}>
      <LoadingButtonForWeb3 loading={isLoading || writeChoiceLengthTx.isLoading}>Set ChoiceLength</LoadingButtonForWeb3>
    </AutoForm>
  )
}

export default SetChoiceLength
