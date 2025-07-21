'use client'

import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useWriteMaidsPredictionSetChoicesLength } from '@/lib/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useWaitForTransactionReceipt } from 'wagmi'
import { z } from 'zod'

const schema = z.object({
  choiceLength: z.number().positive().int().min(1),
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
    resolver: zodResolver(schema),
  })

  const onClick = (values: z.infer<typeof schema>) => {
    writeChoiceLength({
      args: [BigInt(id), BigInt(values.choiceLength)],
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onClick(data as z.infer<typeof schema>))} className='p-8'>
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
