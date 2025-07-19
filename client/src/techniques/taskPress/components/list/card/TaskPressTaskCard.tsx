import React from 'react'
import TaskPressTaskCardHeader from './TaskPressTaskCardHeader'
import ProblemSetTaskQuickCompletion from './ProblemSetTaskQuickCompletion'
import { Stack, Typography } from '@mui/material'
import TaskProgressSummary from './TaskProgressSummary'
import ReportTaskQuickCompletion from './ReportTaskQuickCompletion'
import type {
  MergedReportStep,
  TaskPressMergedTask,
} from '../../../types/task-press-merge-task-types'
import useTaskPressTaskCardProps from '../../../hooks/useTaskPressTaskCardProps'

interface TaskPressTaskCardProps {
  task: TaskPressMergedTask
  onEdit: () => void
  onPageComplete: (page: number) => void
  onCompleteStep: (step: MergedReportStep) => void
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
  const {
    nextPages,
    nextStep,
    animatingPages,
    completedStepOrdersCache,
    remainingDays,
    dailyEstimatedTime,
    remainingCount,
    handlePageComplete,
    handleStepComplete,
  } = useTaskPressTaskCardProps({ task })

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        boxShadow: 3,
        padding: 1,
        width: '100%',
        maxWidth: 480,
      }}
    >
      <Stack
        spacing={2}
        justifyContent="space-around"
        sx={{
          padding: 1,
          flex: 1,
          width: '70%',
        }}
      >
        <TaskPressTaskCardHeader title={task.title} onEdit={onEdit} />
        <Stack alignItems="center" spacing={1}>
          <Typography sx={{ color: 'GrayText' }}>次のおすすめ</Typography>
          {task.type === 'problemSet' ? (
            <ProblemSetTaskQuickCompletion
              nextPages={nextPages}
              timePerPage={task.timePerPage}
              animatingPages={animatingPages}
              onPageComplete={(delay, page) => {
                onPageComplete(page)
                handlePageComplete(delay, [page])
              }}
            />
          ) : (
            <ReportTaskQuickCompletion
              nextStep={nextStep}
              isCompleted={
                !!nextStep && completedStepOrdersCache.includes(nextStep.order)
              }
              onCompleteStep={(delay, step) => {
                if (step) {
                  onCompleteStep(step)
                  handleStepComplete(delay, [step])
                }
              }}
            />
          )}
        </Stack>
      </Stack>
      <TaskProgressSummary
        remainingDays={remainingDays}
        dailyEstimatedTime={Math.round(dailyEstimatedTime)}
        remainingCount={remainingCount}
        countLabel={task.type === 'problemSet' ? 'ページ' : '段階'}
      />
    </Stack>
  )
}

export default TaskPressTaskCard
