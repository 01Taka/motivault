import React from 'react'
import type { TaskPressTask } from '../types/task-press-task-types'
import TaskPressTaskList from './TaskPressTaskList'

interface TaskPressProps {}

const taskPressTasks: TaskPressTask[] = [
  {
    id: 'task1',
    type: 'problemSet',
    title: 'Math Problem Set 1',
    deadline: '2025-07-10',
    pages: [1, 2, 3, 4],
    completedPages: [1, 3],
    timePerPage: 20,
  },
  {
    id: 'task2',
    type: 'problemSet',
    title: 'Science Problem Set 1',
    deadline: '2025-07-12',
    pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    completedPages: [2, 4],
    timePerPage: 25,
  },
  {
    id: 'task3',
    type: 'report',
    title: 'History Report',
    deadline: '2025-07-15',
    steps: [
      { order: 1, text: 'Introduction', estimatedTime: 60 },
      { order: 2, text: 'Body - Part 1', estimatedTime: 120 },
      { order: 3, text: 'Body - Part 2', estimatedTime: 100 },
      { order: 4, text: 'Conclusion', estimatedTime: 30 },
    ],
    completedStepOrders: [],
  },
  {
    id: 'task4',
    type: 'report',
    title: 'Physics Report',
    deadline: '2025-07-20',
    steps: [
      { order: 1, text: 'Introduction', estimatedTime: 50 },
      { order: 2, text: 'Experiment Setup', estimatedTime: 80 },
      { order: 3, text: 'Results Analysis', estimatedTime: 90 },
      { order: 4, text: 'Conclusion', estimatedTime: 40 },
    ],
    completedStepOrders: [2, 4],
  },
]

const TaskPress: React.FC<TaskPressProps> = ({}) => {
  return (
    <div>
      <TaskPressTaskList tasks={taskPressTasks} />
    </div>
  )
}

export default TaskPress
