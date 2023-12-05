'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import { maidsPredictionContractConfig } from '@/config/client'
import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  choiceLength: z.number().positive().int().min(1),
})
type FormSchema = z.infer<typeof schema>

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

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => writeChoiceLength.write?.())} className='w-56'>
        <FormField
          control={form.control}
          name='choiceLength'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ChoiceLength</FormLabel>
              <FormControl>
                <Input {...field} onChange={(event) => setChoiceLength(Number(event.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={writeChoiceLength.isLoading || writeChoiceLengthTx.isLoading}>
          Set ChoiceLength
        </LoadingButton>
      </form>
    </Form>
  )
}

export default SetChoiceLength
