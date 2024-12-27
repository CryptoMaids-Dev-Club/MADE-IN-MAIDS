'use client'

import useVote from '@/app/[lang]/(features)/detail/voting/_hooks/useVote'
import LoadingButtonForWeb3 from '@/app/[lang]/_components/Elements/LoadingButtonForWeb3/LoadingButtonForWeb3'
import { FormControl, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  num: z.coerce.number().positive().int().min(1),
})

type VotingFormProps = {
  id: number
}

const VotingForm = ({ id }: VotingFormProps) => {
  const handleSubmit = (data: z.infer<typeof schema>) => {
    voteOrApprove(data.num)
  }

  const { voteOrApprove, isLoading, allowance } = useVote(id)

  const form = useForm({
    resolver: zodResolver(schema),
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
