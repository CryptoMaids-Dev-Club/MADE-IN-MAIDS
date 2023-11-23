import { zodResolver } from '@hookform/resolvers/zod'
import {
  SubmitErrorHandler as SubmitErrorHandlerOriginal,
  SubmitHandler as SubmitHandlerOriginal,
  useForm,
  UseFormRegisterReturn,
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
  const {
    register,
    handleSubmit: handleSubmitOriginal,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = (onValid: SubmitHandler, onInvalid: SubmitErrorHandler) => {
    handleSubmitOriginal(onValid, onInvalid)()
  }

  return {
    handleSubmit,
    errors,
    fieldValues: { num: convert(register('num', { valueAsNumber: true })) },
  }
}

function convert({ ref, ...others }: UseFormRegisterReturn) {
  return { inputRef: ref, ...others }
}

export default useVotingForm
