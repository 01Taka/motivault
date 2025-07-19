import { TextField, type TextFieldProps } from '@mui/material'
import type { CreateInputProps } from '../../../../../types/form/formState-types'
import type React from 'react'

interface DeadlineInputProps {
  createInputProps: CreateInputProps
  props?: TextFieldProps
}

const DeadlineInput: React.FC<DeadlineInputProps> = ({
  createInputProps,
  props,
}) => {
  return (
    <TextField
      label="締め切り"
      type="date"
      InputLabelProps={{ shrink: true }}
      fullWidth
      {...props}
      {...createInputProps('deadline')}
    />
  )
}

export default DeadlineInput
