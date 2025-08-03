import { Button, Box, Paper, Typography } from '@mui/material'
import React from 'react'
import TimeControlSection from './TimeControlSection'
import { Add } from '@mui/icons-material'

interface CreateNewBlockFormProps {
  name: string
  textColor: string
  bgColor: string
  enterButtonColor: string
  startAtLabel: string
  endAtLabel: string
  startAt: string
  endAt: string
  onIncrementStart?: () => void
  onDecrementStart?: () => void
  onIncrementEnd?: () => void
  onDecrementEnd?: () => void
  onEnter?: () => void
  disableDecrementStart?: boolean
  disableIncrementStart?: boolean
  disableDecrementEnd?: boolean
  disableIncrementEnd?: boolean
  disableEnter?: boolean
}

const CreateNewBlockForm: React.FC<CreateNewBlockFormProps> = ({
  name,
  textColor,
  bgColor,
  enterButtonColor,
  startAtLabel,
  endAtLabel,
  startAt,
  endAt,
  onDecrementStart,
  onIncrementStart,
  onIncrementEnd,
  onDecrementEnd,
  onEnter,
  disableDecrementStart = false,
  disableIncrementStart = false,
  disableDecrementEnd = false,
  disableIncrementEnd = false,
  disableEnter = false,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        borderRadius: 3,
        backgroundColor: bgColor,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: textColor,
            fontSize: '1.25rem',
          }}
        >
          {name}
        </Typography>
      </Box>

      <TimeControlSection
        label={startAtLabel}
        value={startAt}
        onIncrement={onIncrementStart}
        onDecrement={onDecrementStart}
        disableIncrement={disableIncrementStart}
        disableDecrement={disableDecrementStart}
        textColor={textColor}
      />

      <TimeControlSection
        label={endAtLabel}
        value={endAt}
        onIncrement={onIncrementEnd}
        onDecrement={onDecrementEnd}
        disableIncrement={disableIncrementEnd}
        disableDecrement={disableDecrementEnd}
        textColor={textColor}
      />

      <Box sx={{ mt: 3 }}>
        <Button
          onClick={onEnter}
          disabled={disableEnter}
          variant="contained"
          fullWidth
          startIcon={<Add />}
          sx={{ bgcolor: enterButtonColor }}
        >
          追加
        </Button>
      </Box>
    </Paper>
  )
}

export default CreateNewBlockForm
