import { TextField } from '@mui/material'
import React, { type KeyboardEventHandler } from 'react'

interface TextBlockProps {
  text: string
  placeholder?: string
  onChange: (value: string) => void
  onKeyDown: KeyboardEventHandler<HTMLDivElement>
  onFocus: (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  inputRef: (el: HTMLTextAreaElement | null) => void
}

const TextBlock: React.FC<TextBlockProps> = ({
  text,
  placeholder,
  onChange,
  onKeyDown,
  onFocus,
  inputRef,
}) => {
  return (
    <TextField
      inputRef={inputRef}
      variant="standard"
      fullWidth
      multiline
      value={text}
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
  )
}

export default TextBlock
