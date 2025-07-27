import React from 'react'
import { Typography, Stack } from '@mui/material'
import type { TechniqueDetailParagraph } from '../../../../technique/types/data/technique-static-info-types'

interface TechniqueDetailParagraphProps {
  paragraph: TechniqueDetailParagraph
}

const TechniqueDetailParagraphRenderer: React.FC<
  TechniqueDetailParagraphProps
> = ({ paragraph }) => {
  const renderHeader = () => {
    if (paragraph.isHeaderId) {
      return (
        <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 1 }}>
          {paragraph.headerId}
        </Typography>
      )
    } else {
      return (
        <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 1 }}>
          {paragraph.header}
        </Typography>
      )
    }
  }

  const renderContent = () => {
    switch (paragraph.type) {
      case 'text':
        return (
          <Typography variant="body1" sx={{ mb: 2 }}>
            {paragraph.contents}
          </Typography>
        )
      case 'ul':
        return (
          <Stack spacing={1} sx={{ pl: 2, mb: 2 }}>
            {' '}
            {/* ドットの右にテキストが来るように左パディング */}
            {paragraph.contents.map((item, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="flex-start"
                spacing={1}
              >
                {' '}
                {/* ドットとテキストを横並びに */}
                <Typography variant="body1">•</Typography> {/* ドットの表示 */}
                <Typography variant="body1">{item}</Typography>
              </Stack>
            ))}
          </Stack>
        )
      case 'ol':
        return (
          <Stack spacing={1} sx={{ pl: 2, mb: 2 }}>
            {' '}
            {/* 数字の右にテキストが来るように左パディング */}
            {paragraph.contents.map((item, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="flex-start"
                spacing={1}
              >
                {' '}
                {/* 数字とテキストを横並びに */}
                <Typography variant="body1">{index + 1}.</Typography>{' '}
                {/* 数字の表示 */}
                <Typography variant="body1">{item}</Typography>
              </Stack>
            ))}
          </Stack>
        )
      default:
        return null
    }
  }

  return (
    <Stack spacing={2}>
      {renderHeader()}
      {renderContent()}
    </Stack>
  )
}

export default TechniqueDetailParagraphRenderer
