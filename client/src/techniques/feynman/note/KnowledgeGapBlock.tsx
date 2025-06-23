import { Paper, TextField } from '@mui/material'
import React, { type KeyboardEventHandler } from 'react'

interface KnowledgeGapBlockProps {
  content: string
  placeholder?: string
  onChange: (value: string) => void
  onKeyDown: KeyboardEventHandler<HTMLDivElement>
  onFocus: (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  inputRef: (el: HTMLTextAreaElement | null) => void
}

const KnowledgeGapBlock: React.FC<KnowledgeGapBlockProps> = ({
  content,
  placeholder,
  onChange,
  onKeyDown,
  onFocus,
  inputRef,
}) => {
  return (
    <Paper
      sx={{
        p: 1,
        my: 0.5,
        border: '1px solid #FF9100',
        bgcolor: 'white',
      }}
    >
      <TextField
        inputRef={inputRef}
        variant="standard"
        fullWidth
        multiline
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder={placeholder}
        slotProps={{
          input: {
            disableUnderline: true,
          },
        }}
      />
    </Paper>
  )
}

export default KnowledgeGapBlock
