import React from 'react'
import TimeBlockingCreateLayerForm from './createLayer/TimeBlockingCreateLayerForm'
import { Box } from '@mui/material'

interface TimeBlockingLayoutProps {}

const TimeBlockingLayout: React.FC<TimeBlockingLayoutProps> = ({}) => {
  return (
    <Box mt={8}>
      <TimeBlockingCreateLayerForm />
    </Box>
  )
}

export default TimeBlockingLayout
