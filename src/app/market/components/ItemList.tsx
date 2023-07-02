'use client'

import { Grid, Container } from '@mui/material'
import { useItems } from '@/app/market/hooks/useItems'
import { useMetadata } from '@/app/market/hooks/useMetadata'
import type { ItemInfo } from '@/app/market/types'
import ItemCard from './ItemCard'

const ItemList = () => {
  const items = useItems()
  const itemsQuery = useMetadata(items as ItemInfo[])

  return (
    <Grid container justifyContent='center' mt='10px' spacing={2}>
      {itemsQuery.data?.map((item) => (
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
