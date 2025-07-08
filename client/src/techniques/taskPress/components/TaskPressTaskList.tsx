import React from 'react'
import type { TaskPressTask } from '../types/task-press-task-types'
import { Stack } from '@mui/material'
import TaskPressTaskCard from './card/TaskPressTaskCard'

interface TaskPressTaskListProps {
  tasks: TaskPressTask[]
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
