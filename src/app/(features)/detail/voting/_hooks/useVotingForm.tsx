import { zodResolver } from '@hookform/resolvers/zod'
import {
  SubmitErrorHandler as SubmitErrorHandlerOriginal,
  SubmitHandler as SubmitHandlerOriginal,
  useForm,
} from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  num: z.number().positive().int().min(1),
})

export type FormSchema = z.infer<typeof schema>

const defaultValues: FormSchema = { num: 1 } as const

export type VotingForm = ReturnType<typeof useVotingForm>
export type SubmitHandler = SubmitHandlerOriginal<FormSchema>
export type SubmitErrorHandler = SubmitErrorHandlerOriginal<FormSchema>

const useVotingForm = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues,
  })

  return form
}

export default useVotingForm
