'use client'

import usePredict from '@/app/[lang]/(features)/prediction/_hooks/usePredict'
import type { Prediction, PredictionText } from '@/app/[lang]/(features)/prediction/_types'
import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type PredictionFormProps = {
  predictionInfo: Prediction
  predictionText: PredictionText
}

const schema = z.object({
  choice: z.coerce.number().min(0),
  amount: z.coerce.number().min(100),
})

const PredictionForm = ({ predictionInfo, predictionText: PredictionText }: PredictionFormProps) => {
  const { choice, predictOrApprove, updateChoice, updateAmount, isLoading, isPredicted, buttonMessage } = usePredict(
    predictionInfo.id,
  )

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      choice,
      amount: 100,
    },
  })

  const handleSubmit = () => {
    predictOrApprove()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='p-8'>
        <FormField
          control={form.control}
          name='choice'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choice</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={PredictionText.choices[field.value]}>
                  {PredictionText.choices.map((choice) => (
                    <RadioGroupItem key={choice} value={choice}>
                      {choice}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Amount'
                  onChange={(e) => {
                    field.onChange(e)
                    updateAmount(form.getValues().amount)
                    updateChoice(form.getValues().choice)
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <LoadingButtonForWeb3 type='submit' loading={isLoading} disabled={isPredicted}>
          {buttonMessage}
        </LoadingButtonForWeb3>
      </form>
    </Form>
  )
}

export default PredictionForm
