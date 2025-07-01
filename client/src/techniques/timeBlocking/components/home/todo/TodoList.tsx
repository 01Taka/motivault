import React from 'react'
import { TodoTaskCard } from './TodoTaskCard'
import { Box, Stack } from '@mui/material'
import type { TimeBlockingTaskRead } from '../../../services/documents/task-documents'
import type { TimeBlockingTags } from '../../../services/documents/time-blocking-document'

interface TodoListProps {
  tasks: TimeBlockingTaskRead[]
  tags: TimeBlockingTags
  onChangeCompleted: (id: string, state: boolean) => void
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  tags,
  onChangeCompleted,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      <Stack padding={1} spacing={1}>
        {tasks.map((task) => (
          <TodoTaskCard
            key={task.docId}
            task={task}
            tags={tags}
            onChangeCompleted={(state) => onChangeCompleted(task.docId, state)}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default TodoList
