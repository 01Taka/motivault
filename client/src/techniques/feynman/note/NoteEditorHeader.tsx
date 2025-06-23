import { Check, CopyAll, LiveHelp } from '@mui/icons-material'
import { Box, Typography, Button, IconButton, Stack } from '@mui/material'

interface NoteEditorHeaderProps {
  title: string
  onCopyNote: () => void
  onCreateGapBlock: () => void
}

const NoteEditorHeader: React.FC<NoteEditorHeaderProps> = ({
  title,
  onCopyNote,
  onCreateGapBlock,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 2,
    }}
  >
    <Typography variant="h6">{title}</Typography>
    <Stack direction="row">
      <IconButton onClick={onCopyNote}>
        <CopyAll />
      </IconButton>
      <IconButton onClick={onCreateGapBlock}>
        <LiveHelp />
      </IconButton>
      <Button startIcon={<Check />} color="primary">
        完了
      </Button>
    </Stack>
  </Box>
)

export default NoteEditorHeader
