import React from 'react'
import CreateNoteFab from './navigation/CreateNoteFab'
import FeynmanBottomNav from './navigation/FeynmanBottomNav'
import { useNavigate, Outlet } from 'react-router-dom'
import { useFeynmanStoreSetter } from '../hooks/useFeynmanStoreSetter'

const FeynmanTechnique: React.FC = () => {
  const navigate = useNavigate()
  useFeynmanStoreSetter()

  return (
    <div style={{ paddingBottom: 80 }}>
      <Outlet />
      <FeynmanBottomNav />
      <CreateNoteFab onClick={() => navigate('create')} />
    </div>
  )
}

export default FeynmanTechnique
