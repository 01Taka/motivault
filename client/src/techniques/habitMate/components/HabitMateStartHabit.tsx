import React from 'react'
import { habitLevels } from '../constants/sample-data'
import HabitLevelNavigator from './startHabit/HabitLevelNavigator'
import { useNavigate } from 'react-router-dom'
import { habitMateCreatePath } from '../constants/path-constants'

interface HabitMateStartHabitProps {}

const HabitMateStartHabit: React.FC<HabitMateStartHabitProps> = ({}) => {
  const navigate = useNavigate()
  return (
    <div>
      <HabitLevelNavigator
        habitLevels={habitLevels.map((level) => ({
          ...level,
          src: level.bgSrc,
        }))}
        onStartHabit={(level) =>
          navigate(`${habitMateCreatePath}/${level.level}`)
        }
      />
    </div>
  )
}

export default HabitMateStartHabit
