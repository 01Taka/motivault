// src/components/StepCompletionList.tsx
import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@mui/material'
import type { MergedReportStep } from '../../types/task-press-merge-task-types'
import { MINUTES_IN_MS } from '../../../../constants/datetime-constants'

interface StepCompletionListProps {
  steps: MergedReportStep[]
  stepStateDifferences: Record<string, boolean> // Key is step.order.toString()
  onToggleStepCompletion: (order: number) => void
}

const COLORS = {
  completedBg: '#BBDEFB', // 昔から完了済み（薄い青） - Previously completed (light blue)
  completedDiffBg: '#4dafff', // 新たに完了済み（濃い青） - Newly completed (dark blue)
  uncompletedDiffBg: 'rgba(255, 165, 0, 0.15)', // 新たに未完了（薄いオレンジ） - Newly uncompleted (light orange)
}

const StepCompletionList: React.FC<StepCompletionListProps> = ({
  steps,
  stepStateDifferences,
  onToggleStepCompletion,
}) => {
  return (
    <List>
      {steps.map((step) => {
        const hasDiff =
          stepStateDifferences[step.order.toString()] !== undefined

        const getBackgroundColor = (isCompleted: boolean) => {
          return isCompleted
            ? hasDiff
              ? COLORS.completedDiffBg
              : COLORS.completedBg
            : hasDiff
              ? COLORS.uncompletedDiffBg
              : undefined
        }

        return (
          <ListItem
            key={step.order}
            dense
            onClick={() => onToggleStepCompletion(step.order)}
            sx={{
              cursor: 'pointer',
              backgroundColor: getBackgroundColor(step.completed),
              padding: '8px 16px',
              transition: 'background-color 0.3s ease, border 0.3s ease', // Smooth transition for visual feedback
              '&:hover': {
                backgroundColor: getBackgroundColor(step.completed),
              },
            }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={step.completed}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              primary={step.text}
              secondary={`Est. Time: ${Math.floor(step.estimatedTime / MINUTES_IN_MS)} min`}
            />
          </ListItem>
        )
      })}
    </List>
  )
}

export default StepCompletionList
