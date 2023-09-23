import { z } from 'zod'

export const formSchema = z.object({
  num: z.number().positive().int().min(1),
})

export type FormSchema = z.infer<typeof formSchema>
