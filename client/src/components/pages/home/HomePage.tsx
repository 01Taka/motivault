import React from 'react'
import BottomNav from '../../../features/home/components/navigations/BottomNav'
import { Outlet } from 'react-router-dom'

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <div>
      <Outlet />
      <BottomNav />
    </div>
  )
}

export default HomePage
