import React from 'react'
import CreateFab from '../../../components/atoms/navigation/CreateFab'
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { createTaskPressPath } from '../constants/path-constants'
import useAbstractDataSync from '../../../hooks/services/useAbstractDataSync'
import { useTaskPressDataStore } from '../services/stores/useTaskPressDataStore'

interface TaskPressLayoutProps {}

const TaskPressLayout: React.FC<TaskPressLayoutProps> = ({}) => {
  useAbstractDataSync(useTaskPressDataStore())

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
