'use client'

import usePredict from '@/app/(features)/prediction/_hooks/usePredict'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import usePredictionForm, { SubmitHandler } from '../_hooks/usePredictionForm'
import type { Prediction, PredictionText } from '@/app/api/prediction/prediction'

type PredictionFormProps = {
  predictionInfo: Prediction
  predictionText: PredictionText
}

const PredictionForm = ({ predictionInfo, predictionText: PredictionText }: PredictionFormProps) => {
  const form = usePredictionForm()

  const { isPredicted, isLoading, choice, buttonMessage, predictOrApprove, updateChoice, updateAmount } = usePredict(
    predictionInfo.id
  )

  const handleValid: SubmitHandler = () => {
    predictOrApprove()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleValid)} className='space-y-6'>
        <FormField
          control={form.control}
          name='choice'
          render={() => (
            <FormItem className='space-y-3'>
              <FormControl>
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>Amount</FormLabel>
              <FormControl>
                <Input
                  className='text-white'
                  {...field}
                  onChange={(event) => updateAmount(Number(event.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton className='w-full' type='submit' loading={isLoading} disabled={isPredicted}>
          {buttonMessage}
        </LoadingButton>
      </form>
    </Form>
  )
}

export default PredictionForm
