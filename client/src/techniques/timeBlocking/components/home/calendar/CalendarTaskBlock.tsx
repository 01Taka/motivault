import { Box, Typography } from '@mui/material'
import type { TaskBlock } from '../../../types/time-blocking-task'

interface CalendarTaskBlockProps {
  block: TaskBlock
  startY: number
  blockHeight: number
}

const CalendarTaskBlock: React.FC<CalendarTaskBlockProps> = ({
  block,
  startY,
  blockHeight,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: startY,
        left: 4,
        width: 'calc(100% - 8px)',
        height: blockHeight,
        bgcolor: block.color,
        borderRadius: 1,
        boxShadow: 1,
        px: 0.5,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 5,
      }}
    >
      <Typography
        variant="caption"
        noWrap
        sx={{ color: '#fff', fontWeight: 500 }}
      >
        {block.label}
      </Typography>
    </Box>
  )
}

export default CalendarTaskBlock
