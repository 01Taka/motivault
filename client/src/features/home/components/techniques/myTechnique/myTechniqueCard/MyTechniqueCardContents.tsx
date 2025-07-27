import { Bookmark } from '@mui/icons-material'
import { Box, Stack, Typography, Chip } from '@mui/material'
import React from 'react'

interface MyTechniqueCardContentsProps {
  officialName: string
  title: string
  tags: string[]
  iconColor: string
}

const MyTechniqueCardContents: React.FC<MyTechniqueCardContentsProps> = ({
  officialName,
  title,
  tags, // Now an array of strings
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

      {/* Tags rendered as Chips */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={0.5}
        justifyContent="flex-start"
        alignItems="center"
      >
        {tags.map((tag) => (
          <Chip
            key={tag} // Important for list rendering in React
            label={`#${tag}`}
            size="small"
            variant="outlined"
            color="default"
            sx={{ fontSize: '0.75rem' }}
          />
        ))}
      </Box>
    </Stack>
  )
}

export default MyTechniqueCardContents
