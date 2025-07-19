// src/hooks/useTaskEditing.ts
import { useState, useEffect, useCallback } from 'react'
import type { TaskPressMergedTask } from '../../types/task-press-merge-task-types'

export const useTaskEditing = <T extends TaskPressMergedTask>(
  initialTask: T,
  onUpdateTask: (updatedTask: T) => void
) => {
  const [editedFields, setEditedFields] = useState<Partial<T>>(initialTask)

  // Update editedFields when initialTask changes (e.g., when a new task is loaded into the modal)
  useEffect(() => {
    setEditedFields(initialTask)
  }, [initialTask])

  const handleFieldChange = useCallback((field: keyof T, value: any) => {
    setEditedFields((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const handleSave = useCallback(() => {
    onUpdateTask({ ...initialTask, ...editedFields })
  }, [initialTask, editedFields, onUpdateTask])

  return { editedFields, handleFieldChange, handleSave }
}
