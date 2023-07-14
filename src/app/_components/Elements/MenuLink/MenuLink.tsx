import Typography from '@mui/material/Typography'

type MenuLinkProps = {
  text: string
  link: string
}
export const MenuLink = ({ text, link }: MenuLinkProps) => (
  <Typography
    variant='h6'
    component='span'
    sx={{
      paddingLeft: '20px',
      fontFamily: 'serif !important',
      cursor: 'pointer',
    }}
    onClick={() => window.open(link, '_blank')}>
    {text}
  </Typography>
)

export default MenuLink
