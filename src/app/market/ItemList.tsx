'use client'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { useItems } from '@/app/market/hooks/useItems'
import { useMetadata } from '@/app/market/hooks/useMetadata'
import type { ItemInfo } from '@/app/market/types'
import ItemCard from './ItemCard'

const ItemList = () => {
  const items = useItems()
  const marketItems = useMetadata(items as ItemInfo[])

  return (
    <Grid container justifyContent='center' mt='10px' spacing={2}>
      {marketItems.map((item) => (
        <Grid key={item.id} item>
          <Container>
            <ItemCard key={item.id} item={item} />
          </Container>
        </Grid>
      ))}
    </Grid>
  )
}

export default ItemList
