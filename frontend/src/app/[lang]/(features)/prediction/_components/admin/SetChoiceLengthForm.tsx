'use client'

import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useWriteMaidsPredictionSetChoicesLength } from '@/lib/generated'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { useWaitForTransactionReceipt } from 'wagmi'
import * as v from 'valibot'

const schema = v.object({
  choiceLength: v.pipe(v.number(), v.integer(), v.minValue(1)),
})

type SetChoiceLength = {
  id: number
}

const SetChoiceLength = ({ id }: SetChoiceLength) => {
  const {
    data: choiceLengthData,
    isPending,
    writeContract: writeChoiceLength,
  } = useWriteMaidsPredictionSetChoicesLength({})

  const writeChoiceLengthTx = useWaitForTransactionReceipt({
    hash: choiceLengthData,
  })

  const form = useForm({
    resolver: valibotResolver(schema),
  })

  const onClick = (values: v.InferOutput<typeof schema>) => {
    writeChoiceLength({
      args: [BigInt(id), BigInt(values.choiceLength)],
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onClick(data as v.InferOutput<typeof schema>))} className='p-8'>
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
        <LoadingButtonForWeb3 loading={isPending || writeChoiceLengthTx.isLoading}>
          Set ChoiceLength
        </LoadingButtonForWeb3>
      </form>
    </Form>
  )
}

export default SetChoiceLength
