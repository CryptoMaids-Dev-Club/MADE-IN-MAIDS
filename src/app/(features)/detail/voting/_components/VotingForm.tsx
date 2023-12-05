'use client'

import useVote from '@/app/(features)/detail/voting/_hooks/useVote'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import useVotingForm, { SubmitHandler } from '../_hooks/useVotingForm'

type VotingFormProps = {
  id: number
}

const VotingForm = ({ id }: VotingFormProps) => {
  const form = useVotingForm()

  const handleValid: SubmitHandler = () => {
    voteOrApprove()
  }

  const { amount, updateAmount, voteOrApprove, isLoading, allowance } = useVote(id)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleValid)} className='w-full'>
        <FormField
          control={form.control}
          name='num'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  className='w-full'
                  {...field}
                  value={amount}
                  onChange={(event) => updateAmount(Number(event.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton className='mt-2 w-full' loading={isLoading}>
          {allowance && allowance > Number(amount) ? `Vote` : `Approve $MAIDS`}
        </LoadingButton>
      </form>
    </Form>
  )
}

export default VotingForm
