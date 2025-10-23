import * as v from 'valibot'

export const maidProfileUpdateSchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  name: v.string(),
  character: v.string(),
  description: v.string(),
  imageUrl: v.pipe(v.string(), v.url()),
  address: v.string(),
  signature: v.string(),
})

export type MaidProfileUpdateSchema = v.InferOutput<typeof maidProfileUpdateSchema>
