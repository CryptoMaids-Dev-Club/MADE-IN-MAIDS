import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, styled, useTheme } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import { Balance } from '@/app/components/Elements/Balance'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

type SideDrawerProps = {
  linkNames: string[]
  linkUrls: string[]
  open: boolean
  handleDrawerClose: () => void
}

export const SideDrawer = ({ linkNames, linkUrls, open, handleDrawerClose }: SideDrawerProps) => {
  const drawerWidth = 240
  const theme = useTheme()

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}>
      <DrawerHeader>
        <Balance />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {linkNames.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component='a' href={linkUrls[index]}>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  color: 'turquoise',
                  variant: 'h5',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default SideDrawer
