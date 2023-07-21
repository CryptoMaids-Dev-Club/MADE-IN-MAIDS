import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import ItemCard from './ItemCard'
import type { MarketItemInfo } from '@/app/api/marketItems/marketItem'

const ItemList = ({ marketItems }: { marketItems: MarketItemInfo[] }) => (
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

export default ItemList
