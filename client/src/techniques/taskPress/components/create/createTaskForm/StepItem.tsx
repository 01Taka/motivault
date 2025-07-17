import {
  Box,
  Stack,
  TextField,
  IconButton,
  Collapse,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useState } from 'react'

interface StepItemProps {
  index: number
  step: { text: string; estimatedTime: number }
  onRemove: () => void
  createInputPropsInArray: any
  isUsingTemplate: boolean
}

const StepItem: React.FC<StepItemProps> = ({
  index,
  step,
  onRemove,
  createInputPropsInArray,
  isUsingTemplate,
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Box
      sx={{
        px: 2,
        py: 0.5,
        pb: isUsingTemplate ? 2 : 0.5,
        border: '1px solid #ddd',
        borderRadius: 2,
        backgroundColor: '#fafafa',
        transition: '0.3s',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        onClick={() => setExpanded((prev) => !prev)}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="subtitle2" noWrap>
          {index + 1}. {step.text || `ステップ ${index + 1}`}
        </Typography>
        <Stack direction="row" padding={1}>
          <Typography variant="body2" color="text.secondary">
            {step.estimatedTime ?? '-'} 分
          </Typography>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Stack>
      </Stack>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Stack spacing={2} mt={2}>
          <TextField
            label="作業内容"
            multiline
            rows={2}
            fullWidth
            disabled={isUsingTemplate}
            {...createInputPropsInArray('steps', index, 'text', 'input')}
          />
          <TextField
            label="所要時間（分）"
            type="number"
            fullWidth
            disabled={isUsingTemplate}
            {...createInputPropsInArray(
              'steps',
              index,
              'estimatedTime',
              'input'
            )}
          />
          {!isUsingTemplate && (
            <IconButton
              aria-label="削除"
              onClick={onRemove}
              color="error"
              sx={{ alignSelf: 'flex-end' }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
      </Collapse>
    </Box>
  )
}

export default StepItem
