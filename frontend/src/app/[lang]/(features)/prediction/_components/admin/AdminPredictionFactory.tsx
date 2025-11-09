'use client'

import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useWriteMaidsPredictionCreatePrediction } from '@/lib/generated'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Form, useForm } from 'react-hook-form'
import { useWaitForTransactionReceipt } from 'wagmi'
import * as v from 'valibot'

const schema = v.object({
  choiceLength: v.pipe(v.number(), v.integer(), v.minValue(1)),
  predictionURI: v.pipe(v.string(), v.url()),
  rate: v.pipe(v.number(), v.integer(), v.minValue(1)),
  endTime: v.pipe(v.number(), v.integer(), v.minValue(1)),
})
type PredictionInfo = v.InferOutput<typeof schema>

const AdminPredictionFactory = () => {
  const { data: createPredictionData, writeContract: createPrediction } = useWriteMaidsPredictionCreatePrediction()

  const createPredictionTx = useWaitForTransactionReceipt({
    hash: createPredictionData,
  })

  const form = useForm({
    resolver: valibotResolver(schema),
  })

  const onClick = (values: PredictionInfo) => {
    createPrediction({
      args: [BigInt(values.choiceLength), values.predictionURI, BigInt(values.rate), BigInt(values.endTime)],
    })
  }

  return (
    <div className='container mx-auto my-8 max-w-6xl'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => onClick(data as PredictionInfo))} className='p-8'>
          <FormField
            control={form.control}
            name='choiceLength'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ChoiceLength</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='ChoiceLength' />
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
                  <Input {...field} placeholder='PredictionURI' />
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
                  <Input {...field} placeholder='Rate' />
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
                  <Input {...field} placeholder='EndTime' />
                </FormControl>
              </FormItem>
            )}
          />
          <LoadingButtonForWeb3 loading={createPredictionTx.isLoading} className='mt-2 w-56' type='submit'>
            Create Prediction
          </LoadingButtonForWeb3>
        </form>
      </Form>
    </div>
  )
}

export default AdminPredictionFactory
