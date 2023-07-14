import { Image } from 'mui-image'
import useMediaQuery from '@mui/material/useMediaQuery'

type NFTImageProps = {
  url: string
}

export const NFTImage = ({ url }: NFTImageProps) => {
  const matches = useMediaQuery('(min-width: 560px)')

  return <Image src={url} width={matches ? '400' : window.innerWidth * 0.69} />
}

export default NFTImage
