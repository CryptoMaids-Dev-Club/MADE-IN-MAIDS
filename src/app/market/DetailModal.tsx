'use client'

import { Close } from '@mui/icons-material'
import { Box, Button, Grid, Typography, Modal, IconButton, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { MarketItemInfo } from './types'
import { PurchaseForm } from './PurchaseForm'

type ModalProps = {
  item: MarketItemInfo
}

const DetailModal = ({ item }: ModalProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const matches = useMediaQuery('(min-width: 560px)')

  const closeButtonStyle = {
    height: 0,
    textAlign: 'right',
  }

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: matches ? 900 : window.innerWidth - 30,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <>
      <Button onClick={handleOpen}>View Details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Box sx={closeButtonStyle}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Grid container justifyContent='center'>
            <Grid item md={6} sm={12}>
              <img
                src={item.nsfw ? item.external_url : item.image}
                alt='nft'
                width={matches ? '400' : window.innerWidth - 200}
              />
            </Grid>
            <Grid item md={6}>
              <Grid>
                <Typography variant={matches ? 'h4' : 'h5'} component='span' sx={{ color: 'black' }}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid sx={{ overflow: 'auto', maxHeight: matches ? 300 : 100 }}>
                <Typography variant='h6' component='span' sx={{ color: 'black' }}>
                  {item.description}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant='h6' component='span' sx={{ color: 'black' }}>
                  {`Supply: ${item.supply}`}
                </Typography>
              </Grid>
            </Grid>
            <PurchaseForm item={item} />
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default DetailModal
