import React from 'react'
import { Stack, Typography } from '@mui/material'
import AutorenewIcon from '@mui/icons-material/Autorenew'

interface RewriteInfoProps {
  count: number
}

const RewriteInfo: React.FC<RewriteInfoProps> = ({ count }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <AutorenewIcon fontSize="small" color="action" />
    <Typography variant="body2" color="text.secondary">
      {count} 回リライト
    </Typography>
  </Stack>
)

export default RewriteInfo
