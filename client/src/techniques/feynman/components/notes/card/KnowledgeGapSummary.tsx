import React from 'react'
import { Stack, Typography, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

interface KnowledgeGapSummaryProps {
  unresolved: number
  resolved: number
}

const KnowledgeGapSummary: React.FC<KnowledgeGapSummaryProps> = ({
  unresolved,
  resolved,
}) => (
  <Stack direction="row" spacing={2}>
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Tooltip title="未解決の疑問">
        <HelpOutlineIcon fontSize="small" color="warning" />
      </Tooltip>
      <Typography variant="body2">× {unresolved}</Typography>
    </Stack>
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Tooltip title="解決済みの疑問">
        <CheckCircleOutlineIcon fontSize="small" color="success" />
      </Tooltip>
      <Typography variant="body2">× {resolved}</Typography>
    </Stack>
  </Stack>
)

export default KnowledgeGapSummary
