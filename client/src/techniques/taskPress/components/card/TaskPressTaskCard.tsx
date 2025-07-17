import React from 'react'
import TaskPressTaskCardHeader from './TaskPressTaskCardHeader'
import ProblemSetTaskQuickCompletion from './ProblemSetTaskQuickCompletion'
import { Stack, Typography } from '@mui/material'
import TaskProgressSummary from './TaskProgressSummary'
import {
  getDailyEstimatedTime,
  getRemainingDays,
  getRemainingItemCount,
} from '../../functions/task-press-task-utils'
import ReportTaskQuickCompletion from './ReportTaskQuickCompletion'
import usePageCompletion from '../../hooks/usePageCompletion'
import useStepCompletion from '../../hooks/useStepCompletion'
import type {
  MergedReportStep,
  TaskPressMergedTask,
} from '../../types/task-press-merge-task-types'

interface TaskPressTaskCardProps {
  task: TaskPressMergedTask
  onPageComplete: (pages: number[]) => void
  onCompleteStep: (steps: MergedReportStep[]) => void
  onEdit: () => void
}

/**
 * デフォルトで取得する次のページの数
 */

const TaskPressTaskCard: React.FC<TaskPressTaskCardProps> = ({
  task,
  onEdit,
  onPageComplete,
  onCompleteStep,
}) => {
  const remainingDays = getRemainingDays(task.deadline)

  const dailyEstimatedTime = getDailyEstimatedTime(
    task,
    remainingDays > 0 ? remainingDays : 1
  )

  const { nextPages, completedPages, handlePageComplete } = usePageCompletion(
    task,
    onPageComplete
  )

  const { nextStep, handleStepComplete } = useStepCompletion(
    task,
    onCompleteStep
  )

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        boxShadow: 3,
        padding: 2,
        width: '100%',
        maxWidth: 480,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          flex: 1,
        }}
      >
        <TaskPressTaskCardHeader title={task.title} onEdit={onEdit} />
        <Stack>
          <Typography sx={{ color: 'GrayText' }}>次のおすすめ</Typography>
          {task.type === 'problemSet' ? (
            <ProblemSetTaskQuickCompletion
              nextPages={nextPages.filter(
                (page) => !completedPages.includes(page)
              )}
              onPageComplete={handlePageComplete}
            />
          ) : (
            <ReportTaskQuickCompletion
              nextStep={nextStep}
              onCompleteStep={handleStepComplete}
            />
          )}
        </Stack>
      </Stack>
      <TaskProgressSummary
        remainingDays={remainingDays}
        dailyEstimatedTime={Math.round(dailyEstimatedTime)}
        remainingCount={getRemainingItemCount(task)}
        countLabel={task.type === 'problemSet' ? 'ページ' : '段階'}
      />
    </Stack>
  )
}

export default TaskPressTaskCard
