import React from 'react'
import CreateFab from '../../../components/atoms/navigation/CreateFab'
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { createTaskPressPath } from '../constants/path-constants'
import { useTaskPressDataSync } from '../services/hooks/useTaskPressDataSync'

interface TaskPressLayoutProps {}

const TaskPressLayout: React.FC<TaskPressLayoutProps> = ({}) => {
  useTaskPressDataSync()

  const navigate = useNavigate()
  const location = useLocation()
  const hideFab = matchPath('/create/*', location.pathname)

  return (
    <div>
      <Outlet />
      {!hideFab && (
        <CreateFab
          onClick={() => navigate(createTaskPressPath)}
          color="primary"
        />
      )}
    </div>
  )
}

export default TaskPressLayout
