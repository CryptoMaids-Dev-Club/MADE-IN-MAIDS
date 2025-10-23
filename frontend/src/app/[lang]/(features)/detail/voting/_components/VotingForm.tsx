'use client'

import useVote from '@/app/[lang]/(features)/detail/voting/_hooks/useVote'
import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { FormControl, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Form, useForm } from 'react-hook-form'
import * as v from 'valibot'

const schema = v.object({
  num: v.pipe(v.number(), v.integer(), v.minValue(1)),
})

type VotingFormProps = {
  id: number
}

const VotingForm = ({ id }: VotingFormProps) => {
  const handleSubmit = (data: v.InferOutput<typeof schema>) => {
    voteOrApprove(data.num)
  }

  const { voteOrApprove, isLoading, allowance } = useVote(id)

  const form = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      num: 0,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='num'
          render={({ field }) => (
            <FormControl>
              <FormLabel htmlFor='num'>Amount</FormLabel>
              <Input {...field} placeholder='Amount' />
            </FormControl>
          )}
        />
        <LoadingButtonForWeb3 className='mt-2 w-full' loading={isLoading}>
          {allowance && allowance > Number(form.getValues) ? `Vote` : `Approve $MAIDS`}
        </LoadingButtonForWeb3>
      </form>
    </Form>
  )
}

export default VotingForm
