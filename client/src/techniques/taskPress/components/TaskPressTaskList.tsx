import React from 'react'
import { Stack } from '@mui/material'
import TaskPressTaskCard from './card/TaskPressTaskCard'
import type {
  MergedReportStep,
  TaskPressMergedTask,
} from '../types/task-press-merge-task-types'

interface TaskPressTaskListProps {
  tasks: TaskPressMergedTask[]
  onEdit: () => void
  onPageComplete: (task: TaskPressMergedTask, page: number) => void
  onCompleteStep: (task: TaskPressMergedTask, step: MergedReportStep) => void
}

const TaskPressTaskList: React.FC<TaskPressTaskListProps> = ({
  tasks,
  onEdit,
  onPageComplete,
  onCompleteStep,
}) => {
  return (
    <Stack alignItems="center" spacing={2} sx={{ padding: 2 }}>
      {tasks.map((task) => (
        <TaskPressTaskCard
          key={task.taskDocId}
          task={task}
          onEdit={onEdit}
          onPageComplete={(page) => onPageComplete(task, page)}
          onCompleteStep={(step) => onCompleteStep(task, step)}
        />
      ))}
    </Stack>
  )
}

export default TaskPressTaskList
