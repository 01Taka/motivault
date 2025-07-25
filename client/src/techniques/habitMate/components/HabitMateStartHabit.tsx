import React from 'react'
import HabitLevelNavigator from './startHabit/HabitLevelNavigator'
import { useNavigate } from 'react-router-dom'
import { habitMateCreatePath } from '../constants/path-constants'
import { habitMateLevels } from '../constants/data/habit-level-data'

interface HabitMateStartHabitProps {}

const HabitMateStartHabit: React.FC<HabitMateStartHabitProps> = ({}) => {
  const navigate = useNavigate()
  return (
    <div>
      <HabitLevelNavigator
        habitLevels={habitMateLevels.map((level) => ({
          ...level,
          src: level.startHabitBgSrc,
        }))}
        unlockedLevels={[]} // TODO
        onStartHabit={(level) =>
          navigate(`${habitMateCreatePath}/${level.level}`)
        }
      />
    </div>
  )
}

export default HabitMateStartHabit
