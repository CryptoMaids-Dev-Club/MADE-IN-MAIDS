import { z } from 'zod'
import { MaidProfileSchema } from 'prisma/generated/zod'

export const maidProfileUpdateSchema = MaidProfileSchema.merge(
	z.object({
		imageUrl: z.string(),
		address: z.string(),
		signature: z.string(),
	}),
)

export type MaidProfileUpdateSchema = z.infer<typeof maidProfileUpdateSchema>
