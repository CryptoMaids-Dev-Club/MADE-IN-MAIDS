'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { maidsPredictionContractConfig } from '@/config/client'
import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  choiceLength: z.number().positive().int().min(1),
  predictionURI: z.string().url(),
  rate: z.number().positive().int().min(1),
  endTime: z.number().positive().int().min(1),
})
type FormSchema = z.infer<typeof schema>

const AdminPredictionFactory = () => {
  const [choiceLength, setChoiceLength] = useState(0)
  const [predictionURI, setPredictionURI] = useState('')
  const [rate, setRate] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const debounceChoiceLength = useDebounce(choiceLength, 500)
  const debouncePredictionURI = useDebounce(predictionURI, 500)
  const debounceRate = useDebounce(rate, 500)
  const debounceEndTime = useDebounce(endTime, 500)

  const predictionConfig = usePrepareContractWrite({
    ...maidsPredictionContractConfig,
    functionName: 'createPrediction',
    args: [debounceChoiceLength, debouncePredictionURI, debounceRate, debounceEndTime],
  }).config
  const createPrediction = useContractWrite({ ...predictionConfig })

  const createPredictionTx = useWaitForTransaction({
    hash: createPrediction.data?.hash,
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  return (
    <div className='container mx-auto my-8 max-w-6xl'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => createPrediction.write?.())} className='w-56'>
          <FormField
            control={form.control}
            name='choiceLength'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ChoiceLength</FormLabel>
                <FormControl>
                  <Input {...field} onChange={(event) => setChoiceLength(Number(event.target.value))} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='predictionURI'
            render={({ field }) => (
              <FormItem>
                <FormLabel>PredictionURI</FormLabel>
                <FormControl>
                  <Input {...field} onChange={(event) => setPredictionURI(event.target.value)} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input {...field} onChange={(event) => setRate(Number(event.target.value))} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel>EndTime</FormLabel>
                <FormControl>
                  <Input {...field} onChange={(event) => setEndTime(Number(event.target.value))} />
                </FormControl>
              </FormItem>
            )}
          />
          <LoadingButton loading={createPredictionTx.isLoading} className='mt-2 w-56' type='submit'>
            Create Prediction
          </LoadingButton>
        </form>
      </Form>
    </div>
  )
}

export default AdminPredictionFactory
