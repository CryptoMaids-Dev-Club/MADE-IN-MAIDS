import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	client: {
		NEXT_PUBLIC_NETWORK: z.string().min(1),
		NEXT_PUBLIC_WALLET_CONNECT_ID: z.string().min(32),
		NEXT_PUBLIC_INFURA_API_KEY: z.string().min(1),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
		NEXT_PUBLIC_WALLET_CONNECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
		NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
	},
})
