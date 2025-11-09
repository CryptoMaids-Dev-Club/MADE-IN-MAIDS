'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'
import * as v from 'valibot'

export const formSchema = v.object({
  tokenId: v.pipe(v.number(), v.integer(), v.minValue(1)),
})

export type FormSchema = v.InferOutput<typeof formSchema>

export const VotingTransitionForm = () => {
  const router = useRouter()
  const form = useForm<FormSchema>({
    resolver: valibotResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    router.push(`/detail/${data.tokenId}`)
  }

  return (
    <Form {...form}>
      <form className='mt-4 space-y-2 w-40' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='tokenId'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder='TokenId' />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <Button type='submit' className='w-full'>
          Go to Voting Page
        </Button>
      </form>
    </Form>
  )
}

export default VotingTransitionForm
