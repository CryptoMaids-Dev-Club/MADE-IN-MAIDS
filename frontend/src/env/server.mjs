import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		NEXT_PUBLIC_NETWORK: z.string().min(1),
		DATABASE_URL: z.string().url(),
		CHAINBASE_API_KEY: z.string().min(1),
		NEXT_PUBLIC_INFURA_API_KEY: z.string().min(1),
		POSTGRES_DATABASE: z.string().min(1),
		POSTGRES_HOST: z.string().min(1),
		POSTGRES_PASSWORD: z.string().min(1),
		POSTGRES_PRISMA_URL: z.string().min(1),
		POSTGRES_URL: z.string().min(1),
		POSTGRES_URL_NON_POOLING: z.string().min(1),
		POSTGRES_USER: z.string().min(1),
		VERCEL_WEB_ANALYTICS_ID: z.string().min(1),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
		NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
	},
})
