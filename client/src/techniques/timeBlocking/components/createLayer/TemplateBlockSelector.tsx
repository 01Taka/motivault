import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import type { TimeBlockingBlockSetting } from '../../services/documents/time-blocking-block-setting-document'
import { getSelectableColorById } from '../../../../features/color/functions/selectable-color-utils'

interface TemplateBlockSelectorProps {
  selectedId: string
  templates: TimeBlockingBlockSetting[]
  onClick: (template: TimeBlockingBlockSetting) => void
}

const TemplateBlockSelector: React.FC<TemplateBlockSelectorProps> = ({
  selectedId,
  templates,
  onClick,
}) => {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="template block selector"
      sx={{
        width: '100%', // ここで親要素の幅全体を使うように指定
        height: '100%',
        boxShadow: 'none',
        borderRadius: '12px',
        '& .MuiButtonGroup-grouped': {
          flexGrow: 1, // ここで各ボタンを均等な幅に広げる
          borderRadius: '12px',
          border: 'none',
          '&:not(:last-of-type)': {
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
          },
        },
      }}
    >
      {templates.map((template) => {
        const palette = getSelectableColorById(template.colorId)
        return (
          <Button
            key={template.docId}
            onClick={() => onClick(template)}
            sx={{
              backgroundColor:
                selectedId === template.docId
                  ? palette.background
                  : 'transparent',
              color: palette.text,
              fontWeight: 'bold',
              fontSize: '0.875rem',
              textTransform: 'none',
              padding: '8px 16px',
              width: `${100 / templates.length}%`,
              '&:hover': {
                backgroundColor:
                  selectedId === template.docId
                    ? palette.background
                    : 'rgba(255, 255, 255, 0.08)',
                opacity: 0.9,
              },
            }}
          >
            {template.name}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

export default TemplateBlockSelector
