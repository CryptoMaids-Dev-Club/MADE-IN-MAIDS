import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import ItemCard from './ItemCard'
import { MarketItemInfo } from '@/app/market/types'

const ItemList = ({ marketItems }: { marketItems: MarketItemInfo[] }) => {
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
