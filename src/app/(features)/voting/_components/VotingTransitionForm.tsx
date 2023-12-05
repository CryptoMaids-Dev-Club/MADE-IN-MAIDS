'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormSchema, formSchema } from '@/app/(features)/detail/voting/schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const VotingTransitionForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const router = useRouter()
  const onSubmit: SubmitHandler<FormSchema> = (data: FormSchema) => {
    router.push(`/detail/${data.num}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-56'>
        <FormField
          control={form.control}
          name='num'
          render={({ field }) => (
            <FormItem>
              <FormLabel>TokenID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='mt-2 w-56' type='submit'>
          Go to Voting Page
        </Button>
      </form>
    </Form>
  )
}

export default VotingTransitionForm
