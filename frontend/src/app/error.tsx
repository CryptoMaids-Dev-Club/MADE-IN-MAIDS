'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export default function Error({
	error,
	reset,
}: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<>
			<Typography>Ooops, something went wrong. Please refresh.</Typography>
			<Button className='mt-4' onClick={() => reset()}>
				Refresh
			</Button>
		</>
	)
}
