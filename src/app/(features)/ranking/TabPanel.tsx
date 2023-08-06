'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Container from '@mui/material/Container'

type TabPanelProps = {
  children?: React.ReactNode
  index: number
  value: number
  other?: object
}

const TabPanel = ({ children, index, value, other }: TabPanelProps) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}>
    {value === index && (
      <Container>
        <Box>{children}</Box>
      </Container>
    )}
  </div>
)

type CenteredTabsProps = {
  labels: string[]
  children?: React.ReactNode[]
}

const CenteredTabs = ({ labels, children }: CenteredTabsProps) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Tabs value={value} onChange={handleChange} indicatorColor='primary' textColor='primary' centered>
        {labels.map((label) => (
          <Tab sx={{ color: 'white', fontSize: '24px' }} key={label} label={label} />
        ))}{' '}
      </Tabs>

      {children &&
        children.map((child, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TabPanel key={index} value={value} index={index}>
            {child}
          </TabPanel>
        ))}
    </>
  )
}

export default CenteredTabs
