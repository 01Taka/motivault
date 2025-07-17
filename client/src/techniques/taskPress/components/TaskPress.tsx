import React from 'react'
import TaskPressTaskList from './TaskPressTaskList'
import type { TaskPressMergedTask } from '../types/task-press-merge-task-types'

interface TaskPressProps {}
const sampleTasks: TaskPressMergedTask[] = [
  {
    type: 'problemSet',
    title: '数学 I の復習',
    subject: '数学',
    timePerPage: 15,
    pages: [1, 2, 3],
    completedPages: [1],
    deadline: '2025-08-01',
    taskDocId: 'ps-1',
    templateDocId: 'template_ps_001',
    createdById: 'user_123',
  },
  {
    type: 'problemSet',
    title: '英語 長文読解',
    subject: '英語',
    timePerPage: 20,
    pages: [10, 11, 12, 13],
    completedPages: [10, 11],
    deadline: '2025-08-05',
    taskDocId: 'ps-2',
    templateDocId: 'template_ps_002',
    createdById: 'user_789',
  },
  {
    type: 'report',
    title: '化学レポート 中和反応の考察',
    subject: '化学',
    steps: [
      { order: 1, text: '序論を書く', estimatedTime: 20, completed: true },
      {
        order: 2,
        text: '中和の定義を説明',
        estimatedTime: 30,
        completed: false,
      },
      { order: 3, text: '実験結果を考察', estimatedTime: 40, completed: false },
    ],
    deadline: '2025-08-10',
    taskDocId: 'rp-1',
    templateDocId: 'template_rp_001',
    createdById: 'user_456',
  },
  {
    type: 'report',
    title: '物理レポート 力学の基礎',
    subject: '物理',
    steps: [
      { order: 1, text: '課題文の確認', estimatedTime: 10, completed: false },
      { order: 2, text: '計算過程の記述', estimatedTime: 45, completed: true },
      { order: 3, text: '結論と考察', estimatedTime: 25, completed: false },
    ],
    deadline: '2025-08-15',
    taskDocId: 'rp-2',
    templateDocId: 'template_rp_002',
    createdById: 'user_321',
  },
]

const TaskPress: React.FC<TaskPressProps> = ({}) => {
  return (
    <div>
      <TaskPressTaskList tasks={sampleTasks} />
    </div>
  )
}

export default TaskPress
