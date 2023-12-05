import { zodResolver } from '@hookform/resolvers/zod'
import { MaidProfile } from '@prisma/client'
import {
  SubmitErrorHandler as SubmitErrorHandlerOriginal,
  SubmitHandler as SubmitHandlerOriginal,
  useForm,
} from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  character: z.string().min(1),
  description: z.string().min(1),
})

export type FormSchema = z.infer<typeof schema>

export type ProfileForm = ReturnType<typeof useProfileForm>
export type SubmitHandler = SubmitHandlerOriginal<FormSchema>
export type SubmitErrorHandler = SubmitErrorHandlerOriginal<FormSchema>

const useProfileForm = (profile: MaidProfile) => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile.name,
      character: profile.character,
      description: profile.description,
    },
  })

  return form
}

export default useProfileForm
