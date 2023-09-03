import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import getMarketItems from '@/app/api/marketItems/getMarketItems'
import ItemCard from './ItemCard'

const ItemList = async () => {
  const marketItems = await getMarketItems()

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
