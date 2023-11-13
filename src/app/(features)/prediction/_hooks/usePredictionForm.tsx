import { zodResolver } from '@hookform/resolvers/zod'
import {
  SubmitErrorHandler as SubmitErrorHandlerOriginal,
  SubmitHandler as SubmitHandlerOriginal,
  useForm,
  UseFormRegisterReturn,
} from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  amount: z.number().min(100),
})
type FormSchema = z.infer<typeof schema>
const defaultValues: FormSchema = { amount: 100 } as const

export type PredictionForm = ReturnType<typeof usePredictionForm>
export type SubmitHandler = SubmitHandlerOriginal<FormSchema>
export type SubmitErrorHandler = SubmitErrorHandlerOriginal<FormSchema>

const usePredictionForm = () => {
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
    fieldValues: { amount: convert(register('amount', { valueAsNumber: true })) },
  }
}

function convert({ ref, ...others }: UseFormRegisterReturn) {
  return { inputRef: ref, ...others }
}

export default usePredictionForm
