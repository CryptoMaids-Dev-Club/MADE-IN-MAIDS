import { z } from 'zod'

export const formSchema = z.object({
  num: z.coerce.number().positive().int().min(1),
})

export type FormSchema = z.infer<typeof formSchema>
