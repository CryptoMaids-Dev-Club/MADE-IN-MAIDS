'use client'

import { z } from 'zod'
import usePredict from '@/app/(features)/prediction/_hooks/usePredict'
import LoadingButtonForWeb3 from '@/app/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import AutoForm from '@/components/ui/auto-form'
import { FormItem, FormControl, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { Prediction, PredictionText } from '@/app/(features)/prediction/_types'

type PredictionFormProps = {
  predictionInfo: Prediction
  predictionText: PredictionText
}

const schema = z.object({
  choice: z.coerce.number().min(0),
  amount: z.coerce.number().min(100),
})

const PredictionForm = ({ predictionInfo, predictionText: PredictionText }: PredictionFormProps) => {
  const { isPredicted, isLoading, choice, buttonMessage, predictOrApprove, updateChoice, updateAmount } = usePredict(
    predictionInfo.id
  )

  const handleSubmit = () => {
    predictOrApprove()
  }

  return (
    <AutoForm
      formSchema={schema}
      onSubmit={handleSubmit}
      fieldConfig={{
        choice: {
          fieldType: () => (
            <RadioGroup
              onValueChange={(value) => updateChoice(PredictionText.choices.indexOf(value))}
              defaultValue={PredictionText.choices[choice]}
              className='flex flex-col space-y-1'>
              {PredictionText.choices.map((choice) => (
                <FormItem key={choice} className='flex items-center space-x-3 space-y-0'>
                  <FormControl>
                    <RadioGroupItem value={choice} />
                  </FormControl>
                  <FormLabel className='text-white'>{choice}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          ),
        },
        amount: {
          inputProps: {
            placeholder: 'Amount',
          },
        },
      }}
      values={{ choice, amount: 100 }}
      onParsedValuesChange={(values) => {
        updateChoice(values.choice ?? 0)
        updateAmount(values.amount ?? 100)
      }}>
      <LoadingButtonForWeb3 className='w-full' type='submit' loading={isLoading} disabled={isPredicted}>
        {buttonMessage}
      </LoadingButtonForWeb3>
    </AutoForm>
  )
}

export default PredictionForm
