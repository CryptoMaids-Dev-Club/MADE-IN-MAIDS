import * as v from 'valibot'
import { MaidProfileSchema } from 'prisma/generated/zod'

export const maidProfileUpdateSchema = v.merge([
  MaidProfileSchema,
  v.object({
    imageUrl: v.string(),
    address: v.string(),
    signature: v.string(),
  }),
])

export type MaidProfileUpdateSchema = v.InferOutput<typeof maidProfileUpdateSchema>
