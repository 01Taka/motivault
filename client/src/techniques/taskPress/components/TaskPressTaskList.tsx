import React from 'react'
import { Stack } from '@mui/material'
import TaskPressTaskCard from './card/TaskPressTaskCard'
import type { TaskPressMergedTask } from '../types/task-press-merge-task-types'

interface TaskPressTaskListProps {
  tasks: TaskPressMergedTask[]
}

const TaskPressTaskList: React.FC<TaskPressTaskListProps> = ({ tasks }) => {
  return (
    <Stack alignItems="center" spacing={2} sx={{ padding: 2 }}>
      {tasks.map((task) => (
        <TaskPressTaskCard
          task={task}
          onEdit={() => {}}
          onPageComplete={(pages) => {
            console.log(pages)
          }}
          onCompleteStep={(step) => {
            console.log(step)
          }}
        />
      ))}
    </Stack>
  )
}

export default TaskPressTaskList
