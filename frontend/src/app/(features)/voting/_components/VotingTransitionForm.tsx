'use client'

import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import AutoForm from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'

export const formSchema = z.object({
  num: z.coerce.number().positive().int().min(1),
})

export type FormSchema = z.infer<typeof formSchema>

export const VotingTransitionForm = () => {
  const router = useRouter()
  const handleSubmit: SubmitHandler<FormSchema> = (data) => {
    router.push(`/detail/${data.num}`)
  }

  return (
    <AutoForm
      formSchema={formSchema}
      onSubmit={(data) => handleSubmit(data)}
      fieldConfig={{
        num: {
          inputProps: {
            placeholder: 'TokenID',
          },
        },
      }}>
      <Button type='submit' className='w-full'>
        Go to Voting Page
      </Button>
    </AutoForm>
  )
}

export default VotingTransitionForm
