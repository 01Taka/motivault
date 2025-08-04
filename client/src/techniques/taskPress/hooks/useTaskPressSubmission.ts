import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTaskPressCrudHandler from '../services/hooks/useTaskPressCrudHandler'
import type { TaskPressCreateFormState } from '../types/formState/task-press-create-form-state'

export const useTaskPressSubmission = (formState: TaskPressCreateFormState) => {
  const navigate = useNavigate()
  const { asyncStates, handleSubmit } = useTaskPressCrudHandler()

  useEffect(() => {
    if (asyncStates.submit?.status === 'success') {
      navigate('/techniques/task-press')
    }
  }, [asyncStates.submit?.status, navigate])

  const onSubmit = () => handleSubmit(formState)

  return { onSubmit }
}
