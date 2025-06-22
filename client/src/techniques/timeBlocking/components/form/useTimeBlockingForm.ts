import { useState } from 'react'
import type { TimeBlockingTaskData } from '../../types/documents/task-documents'

export const useTimeBlockingForm = () => {
  const [formData, setFormData] = useState<Omit<TimeBlockingTaskData, 'id'>>({
    title: '',
    startTime: 480,
    duration: 30,
    tagId: '',
    completed: false,
    repeat: 'none',
  })

  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleTimeChange = (value: string) => {
    const [h, m] = value.split(':').map(Number)
    handleChange('startTime', h * 60 + m)
  }

  const displayTime = () => {
    const h = Math.floor(formData.startTime / 60)
    const m = formData.startTime % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  }

  return { formData, handleChange, handleTimeChange, displayTime }
}
