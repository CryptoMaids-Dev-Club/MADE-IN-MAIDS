'use client'

import * as React from 'react'
import { User } from '@prisma/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MaidsHolderTable from './MaidsHolderTable'
import NFTHolderTable from './NFTHolderTable'

type CenteredTabsProps = {
	userInfos: User[]
}

const RankingTables = ({ userInfos }: CenteredTabsProps) => {
	return (
		<Tabs defaultValue='NFT' className='w-full'>
			<TabsList className='w-full'>
				<TabsTrigger className='w-full' value='NFT'>
					NFT
				</TabsTrigger>
				<TabsTrigger className='w-full' value='$MAIDS'>
					$MAIDS
				</TabsTrigger>
			</TabsList>

			<TabsContent value='NFT'>
				<NFTHolderTable userInfos={userInfos} />
			</TabsContent>
			<TabsContent value='$MAIDS'>
				<MaidsHolderTable userInfos={userInfos} />
			</TabsContent>
		</Tabs>
	)
}

export default RankingTables
