import { Box, Button } from '@mui/material'
import { motion } from 'framer-motion'
import AnimatedArrow from './AnimatedArrow'
import CardContentSection from './CardContentSection'
import { cardContainerStyle, motionHoverVariant } from './cardStyles'

interface KnowledgeGapCardProps {
  index: number
  title: string
  date: number
  contents: string
}

const KnowledgeGapCard: React.FC<KnowledgeGapCardProps> = ({
  index,
  title,
  date,
  contents,
}) => {
  return (
    <Button
      sx={{
        position: 'relative',
        pl: 4,
        mb: 3,
        textTransform: 'none',
        color: 'black',
        textAlign: 'start',
        borderRadius: 3,
      }}
    >
      <AnimatedArrow index={index} />

      <motion.div
        initial="initial"
        whileHover="hover"
        animate="initial"
        variants={motionHoverVariant}
      >
        <Box sx={cardContainerStyle}>
          <CardContentSection title={title} date={date} content={contents} />
        </Box>
      </motion.div>
    </Button>
  )
}

export default KnowledgeGapCard
