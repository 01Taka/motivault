import React, { useEffect, useMemo } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import type { TaskPressMergedTask } from '../../types/task-press-merge-task-types'
import ProblemSetDetail from './ProblemSetDetail'
import ReportDetail from './ReportDetail'
import useFormState from '../../../../hooks/forms/base/useFormState'
import type { TaskPressUpdateFormState } from '../../types/formState/task-press-create-form-state'
import type { CreateInputProps } from '../../../../types/form/formState-types'
import EditMetadata from './EditMetadata'
import { useCompletion } from '../../hooks/detail/useCompletion'
import { MINUTES_IN_MS } from '../../../../constants/datetime-constants'

interface TaskDetailScreenProps {
  task: TaskPressMergedTask
  subjects: string[]
  onUpdateTask: (updatedTask: Partial<TaskPressUpdateFormState>) => void
  onCompletionDifferencesChange: (diffs: Record<string, boolean>) => void
}

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  task,
  subjects,
  onUpdateTask,
  onCompletionDifferencesChange,
}) => {
  const {
    formState,
    createInputProps,
    getFormDiff,
    hasFormDiff,
    resetFormState,
    updateInitialState,
  } = useFormState<TaskPressUpdateFormState>({
    title: task.title,
    subject: task.subject,
    deadline: task.deadline,
    // ProblemSet
    timePerPage:
      task.type === 'problemSet'
        ? Math.floor(task.timePerPage / MINUTES_IN_MS)
        : 0,
    pages: task.type === 'problemSet' ? task.pages : [],
    // Report
    steps: task.type === 'report' ? task.steps : [],
  })

  useEffect(() => {
    updateInitialState({
      title: task.title,
      subject: task.subject,
      deadline: task.deadline,
      // ProblemSet
      timePerPage:
        task.type === 'problemSet'
          ? Math.floor(task.timePerPage / MINUTES_IN_MS)
          : 0,
      pages: task.type === 'problemSet' ? task.pages : [],
      // Report
      steps: task.type === 'report' ? task.steps : [],
    })
  }, [task])

  const completionData = useMemo(
    () =>
      task.type === 'problemSet'
        ? { items: task.pages, completedItems: task.completedPages }
        : {
            items: task.steps.map((step) => step.order),
            completedItems: task.steps
              .filter((step) => step.completed)
              .map((step) => step.order),
          },
    [task]
  )

  const {
    items,
    toggleCompletion,
    completionDifferences,
    resetDifferences,
    setAllCompletion,
  } = useCompletion(completionData)

  useEffect(() => {
    onCompletionDifferencesChange(completionDifferences)
  }, [completionDifferences])

  return (
    <Box
      sx={{
        p: 2,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '75vh',
        maxWidth: '80vw',
        overflowY: 'auto',
        bgcolor: 'white',
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {task.title}
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <EditMetadata
          type={task.type}
          formState={formState}
          hasUnsavedChanges={hasFormDiff()}
          subjects={subjects}
          onSave={() => onUpdateTask(getFormDiff())}
          onCancel={() => resetFormState()}
          createInputProps={createInputProps as CreateInputProps}
        />
        <Divider sx={{ padding: 1 }} />

        {task.type === 'problemSet' ? (
          <ProblemSetDetail
            pages={items.map(({ id, isCompleted }) => ({
              page: Number(id),
              isCompleted,
            }))}
            pageStateDifferences={completionDifferences}
            onTogglePageCompletion={toggleCompletion}
            resetDifferences={resetDifferences}
            onAllCompleted={() => setAllCompletion(true)}
          />
        ) : (
          <ReportDetail
            steps={task.steps.map((step) => ({
              ...step,
              completed: completionDifferences[step.order] ?? step.completed,
            }))}
            stepStateDifferences={completionDifferences}
            onToggleStepCompletion={toggleCompletion}
            resetDifferences={resetDifferences}
            onAllCompleted={() => setAllCompletion(true)}
          />
        )}
      </Box>
    </Box>
  )
}

export default TaskDetailScreen
