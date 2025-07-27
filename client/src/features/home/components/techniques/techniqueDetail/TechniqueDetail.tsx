import { Box, Paper, Stack, type SxProps } from '@mui/material'
import TechniqueActions from './TechniqueActions'
import type { TechniqueStaticInfo } from '../../../../technique/types/data/technique-static-info-types'
import TechniqueDetailParagraphRenderer from '../../searchTechnique/TechniqueDetailParagraphRenderer'
import TechniqueHeader from './TechniqueHeader'

interface TechniqueDetailProps {
  technique: TechniqueStaticInfo
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
      <TechniqueHeader
        title={technique.title}
        category={technique.tags[0]}
        imageUrl={technique.imageUrl}
      />
      <Stack spacing={2}>
        {technique.details.paragraph.map((paragraph, index) => (
          <TechniqueDetailParagraphRenderer key={index} paragraph={paragraph} />
        ))}
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
          techniqueId={technique.docId}
          onTry={onTry}
          onClose={onClose}
        />
      </Box>
    </Paper>
  )
}

export default TechniqueDetail
