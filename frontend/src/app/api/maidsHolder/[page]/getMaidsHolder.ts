import { MaidsHolder } from './maidsHolder'

export default async function getMaidsHolder({ page }: { page: number }) {
	try {
		const res = await fetch(`/api/maidsHolder/${page}`)

		if (!res.ok) {
			throw new Error(
				'HTTP error! status: ' + res.status + ' ' + res.statusText,
			)
		}

		const holders = (await res.json()) as MaidsHolder[]

		return holders
	} catch (e) {
		console.error(e)

		return null
	}
}
