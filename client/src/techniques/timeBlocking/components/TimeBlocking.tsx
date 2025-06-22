import React, { useState } from 'react'
import SidebarCalendar from './home/calendar/SidebarCalendar'
import { Box } from '@mui/material'
import TodoList from './home/todo/TodoList'
import useTimeBlockingTask from '../hooks/useTimeBlockingTask'
import Popup from '../../../components/utils/Popup'
import TimeBlockingTaskForm from './form/TimeBlockingTaskForm'
import FloatingAddButton from './home/FloatingAddButton'

interface TimeBlockingProps {}

const TimeBlocking: React.FC<TimeBlockingProps> = ({}) => {
  const { tasks, tags, createTask, createTag, setTaskCompleted } =
    useTimeBlockingTask()
  const [taskStartTime, setTaskStartTime] = useState<number | null>(null)
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const brocks = tasks.map((task) => ({
    start: task.startTime,
    end: task.startTime + task.duration,
    color: tags[task.tagId]?.color ?? '',
    label: task.title,
  }))

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarCalendar
        onTimeClick={(time) => {
          setOpenCreateModal(true)
          setTaskStartTime(time)
          console.log(time)
        }}
        blocks={brocks}
      />
      <TodoList
        tasks={tasks}
        tags={tags}
        onChangeCompleted={(id, s) => setTaskCompleted(id, s)}
      />
      <Popup open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <TimeBlockingTaskForm
          defaultStartTime={taskStartTime}
          tags={tags}
          onSubmit={(data) => {
            createTask(data)
            setOpenCreateModal(false)
          }}
          onTagCreate={(tag) => createTag(tag)}
        />
      </Popup>
      <FloatingAddButton onClick={() => setOpenCreateModal(true)} />
    </Box>
  )
}

export default TimeBlocking
