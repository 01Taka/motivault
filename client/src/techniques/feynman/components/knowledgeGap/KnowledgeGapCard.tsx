import { Box, Button } from '@mui/material'
import AnimatedArrow from './card/AnimatedArrow'
import CardContentSection from './card/CardContentSection'
import { cardContainerStyle } from './card/cardStyles'

interface KnowledgeGapCardProps {
  index: number
  title: string
  date: number
  contents: string
  onClick: () => void
}

const KnowledgeGapCard: React.FC<KnowledgeGapCardProps> = ({
  index,
  title,
  date,
  contents,
  onClick,
}) => {
  return (
    <Button
      sx={{
        position: 'relative',
        pl: 5,
        width: '100%',
        textTransform: 'none',
        color: 'black',
        textAlign: 'start',
        borderRadius: 3,
      }}
      onClick={onClick}
    >
      <AnimatedArrow index={index} />

      <Box sx={cardContainerStyle}>
        <CardContentSection title={title} date={date} content={contents} />
      </Box>
    </Button>
  )
}

export default KnowledgeGapCard
