import { Button, Stack } from '@mui/material'

interface TechniqueActionsProps {
  techniqueId: string
  onTry?: (id: string) => void
  onClose?: () => void
}

const TechniqueActions: React.FC<TechniqueActionsProps> = ({
  techniqueId,
  onTry,
  onClose,
}) => (
  <Stack spacing={1}>
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      sx={{
        py: 1.5,
        fontSize: '1rem',
        borderRadius: 2,
        mb: 1.5,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      onClick={() => onTry?.(techniqueId)}
    >
      使ってみる
    </Button>

    <Button
      variant="text"
      color="inherit"
      fullWidth
      sx={{
        fontSize: '0.95rem',
        textTransform: 'none',
      }}
      onClick={onClose}
    >
      後で試す
    </Button>
  </Stack>
)

export default TechniqueActions
