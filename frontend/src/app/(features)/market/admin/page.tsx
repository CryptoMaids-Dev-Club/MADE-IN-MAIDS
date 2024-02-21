'use client'

import { useState } from 'react'
import { z } from 'zod'
import AutoForm from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { useWriteMaidsMarketCreateMarketItem } from '@/lib/generated'

const schema = z.object({
	price: z.coerce.number().min(1).optional(),
	supply: z.coerce.number().min(1).optional(),
	tokenURI: z.coerce.string().min(1).optional(),
	startTime: z.coerce.number().min(1).optional(),
	limitPerWallet: z.coerce.number().min(1).optional(),
})

const ItemCreate = () => {
	const [itemInfo, setItemInfo] = useState<z.infer<typeof schema>>({
		price: 0,
		supply: 0,
		tokenURI: '',
		startTime: 0,
		limitPerWallet: 0,
	})

	const { writeContract } = useWriteMaidsMarketCreateMarketItem()

	const handleSubmit = () => {
		writeContract({
			args: [
				{
					...itemInfo,
					price: BigInt(itemInfo.price ?? 0),
					supply: BigInt(itemInfo.supply ?? 0),
					tokenURI: itemInfo.tokenURI ?? '',
					startTime: BigInt(itemInfo.startTime ?? 0),
					limitPerWallet: BigInt(itemInfo.limitPerWallet ?? 0),
				},
			],
		})
	}

	return (
		<AutoForm
			formSchema={schema}
			fieldConfig={{
				price: {
					inputProps: {
						placeholder: 'Price',
					},
				},
				supply: {
					inputProps: {
						placeholder: 'Supply',
					},
				},
				tokenURI: {
					inputProps: {
						placeholder: 'TokenURI',
					},
				},
				startTime: {
					inputProps: {
						placeholder: 'StartTime',
					},
				},
				limitPerWallet: {
					inputProps: {
						placeholder: 'LimitPerWallet',
					},
				},
			}}
			onSubmit={handleSubmit}
			values={itemInfo}
			onParsedValuesChange={(values) => setItemInfo(values)}
		>
			<Button type='submit'>Create</Button>
		</AutoForm>
	)
}

export default ItemCreate
