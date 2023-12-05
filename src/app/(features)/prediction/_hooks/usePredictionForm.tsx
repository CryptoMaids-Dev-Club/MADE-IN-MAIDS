import { zodResolver } from '@hookform/resolvers/zod'
import {
  SubmitErrorHandler as SubmitErrorHandlerOriginal,
  SubmitHandler as SubmitHandlerOriginal,
  useForm,
} from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  choice: z.coerce.number().min(0),
  amount: z.coerce.number().min(100),
})
type FormSchema = z.infer<typeof schema>
const defaultValues: FormSchema = { choice: 0, amount: 100 }

export type PredictionForm = ReturnType<typeof usePredictionForm>
export type SubmitHandler = SubmitHandlerOriginal<FormSchema>
export type SubmitErrorHandler = SubmitErrorHandlerOriginal<FormSchema>

const usePredictionForm = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues,
  })

  // const handleSubmit = (onValid: SubmitHandler, onInvalid: SubmitErrorHandler) => {
  //   handleSubmitOriginal(onValid, onInvalid)()
  // }

  return form
}

// function convert({ ref, ...others }: UseFormRegisterReturn) {
//   return { inputRef: ref, ...others }
// }

export default usePredictionForm
