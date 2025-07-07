import { Typography, IconButton, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

interface FeynmanDetailHeaderProps {
  title: string
  onEdit?: () => void
}

const FeynmanDetailHeader: React.FC<FeynmanDetailHeaderProps> = ({
  title,
  onEdit,
}) => (
  <Stack direction="row" justifyContent="space-between" width="100%">
    <Typography
      variant="h6"
      fontWeight="bold"
      sx={{ color: 'text.primary', flexGrow: 1 }}
    >
      {title}
    </Typography>
    <IconButton onClick={onEdit} size="small" aria-label="edit">
      <EditIcon fontSize="small" />
    </IconButton>
  </Stack>
)

export default FeynmanDetailHeader
