import { TextField } from '@mui/material'

interface Props {
  createInputProps: any
}

const DeadlineInput = ({ createInputProps }: Props) => {
  return (
    <TextField
      label="締め切り"
      type="date"
      InputLabelProps={{ shrink: true }}
      fullWidth
      {...createInputProps('deadline')}
    />
  )
}

export default DeadlineInput
