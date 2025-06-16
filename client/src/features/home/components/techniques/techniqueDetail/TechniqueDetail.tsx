import { Box, Paper, Stack, type SxProps } from '@mui/material'
import TechniqueActions from './TechniqueActions'
import TechniqueDescription from './TechniqueDescription'
import TechniqueHeader from './TechniqueHeader'
import TechniqueReferences from './TechniqueReferences'
import TechniqueSteps from './TechniqueSteps'
import type { Technique } from '../../../types/technique-types'

interface TechniqueDetailProps {
  technique: Technique
  onTry?: (techniqueId: string) => void
  onClose?: () => void
  sx?: SxProps
}

const TechniqueDetail: React.FC<TechniqueDetailProps> = ({
  technique,
  onTry,
  onClose,
  sx,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        maxWidth: 480,
        mx: 'auto',
        backgroundColor: '#fff',
        minHeight: '60vh',
        maxHeight: '85vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      <Stack spacing={3} sx={{ flexGrow: 1 }}>
        <TechniqueHeader
          title={technique.title}
          category={technique.category}
          imageUrl={technique.imageUrl}
        />

        <TechniqueDescription
          benefits={technique.benefits}
          reason={technique.reason}
        />
        <TechniqueSteps steps={technique.steps} />
        <TechniqueReferences references={technique.references} />
      </Stack>

      <Box
        sx={{
          position: 'sticky',
          bottom: -20,
          mt: 2,
          padding: 1,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
        }}
      >
        <TechniqueActions
          techniqueId={technique.id}
          onTry={onTry}
          onClose={onClose}
        />
      </Box>
    </Paper>
  )
}

export default TechniqueDetail
