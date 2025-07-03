import React from 'react'
import { Tabs, Tab } from '@mui/material'

interface VersionTabsProps {
  versions: string[]
  selectedIndex: number
  onChange: (index: number) => void
}

const VersionTabs: React.FC<VersionTabsProps> = ({
  versions,
  selectedIndex,
  onChange,
}) => {
  return (
    <Tabs
      value={selectedIndex}
      onChange={(_, newIndex) => onChange(newIndex)}
      variant="scrollable"
      scrollButtons="auto"
      textColor="primary"
      indicatorColor="primary"
      sx={{ px: 1, minHeight: 32 }}
    >
      {versions.map((v, idx) => (
        <Tab
          key={idx}
          label={v}
          sx={{
            minHeight: 32,
            minWidth: 60,
            px: 1.5,
            py: 0.5,
            fontSize: '0.75rem',
            textTransform: 'none',
          }}
        />
      ))}
    </Tabs>
  )
}

export default VersionTabs
