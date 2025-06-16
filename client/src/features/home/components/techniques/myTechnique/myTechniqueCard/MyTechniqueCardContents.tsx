import { Bookmark } from '@mui/icons-material'
import { Box, Stack, Typography, Chip } from '@mui/material'
import React from 'react'

interface MyTechniqueCardContentsProps {
  officialName: string
  title: string
  category: string
  iconColor: string
}

const MyTechniqueCardContents: React.FC<MyTechniqueCardContentsProps> = ({
  officialName,
  title,
  category,
  iconColor,
}) => {
  return (
    <Stack height="100%" justifyContent="space-between">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Stack mb={1}>
          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <Bookmark sx={{ color: iconColor }} fontSize="small" />
            <Typography variant="subtitle1" fontWeight="bold">
              {officialName}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            {title}
          </Typography>
        </Stack>
      </Box>

      {/* カテゴリ + 稼働タグ */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Chip
          label={`#${category}`}
          size="small"
          variant="outlined"
          color="default"
          sx={{ fontSize: '0.75rem' }}
        />
      </Box>
    </Stack>
  )
}

export default MyTechniqueCardContents
