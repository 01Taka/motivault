import { IconButton, Box, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  onSubmit: () => void
  onCancel?: () => void
  disabled?: boolean
}

export const TimeBlockingTaskFormHeader: React.FC<Props> = ({
  onCancel,
  onSubmit,
  disabled,
}) => (
  <>
    <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
      <IconButton onClick={onCancel}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
      <IconButton onClick={onSubmit} disabled={disabled} color="primary">
        <Typography variant="body1">作成 </Typography>
        <CheckIcon />
      </IconButton>
    </Box>
  </>
)
