import React from 'react'
import CardContentSection from './CardContentSection'
import { Box } from '@mui/material'
import type { FeynmanKnowledgeGapRead } from '../../../services/documents/feynman-knowledge-gap-documents'

interface SimpleGapCardProps {
  knowledgeGap: FeynmanKnowledgeGapRead
  colorType: 'unresolved' | 'resolved'
  onClick?: () => void
}

const SimpleGapCard: React.FC<SimpleGapCardProps> = ({
  knowledgeGap,
  colorType,
  onClick,
}) => {
  const color = colorType === 'resolved' ? '#DAF7A6' : '#FF7043'
  const bgColor = colorType === 'resolved' ? '#f4ffec' : '#FFF9F2'

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2.5,
        m: 2,
        borderRadius: 3,
        backgroundColor: bgColor,
        border: `2px solid ${color}`,
        borderLeft: `3px solid ${color}`,
        transition: 'box-shadow 0.3s ease',
        boxShadow: 2,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: onClick ? 4 : 2,
        },
      }}
    >
      <CardContentSection
        title={knowledgeGap.noteTitle}
        date={knowledgeGap.createdAt}
        content={knowledgeGap.contents}
      />
    </Box>
  )
}

export default SimpleGapCard
