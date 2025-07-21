import React from 'react'
import { habitLevels } from '../constants/sample-data'
import HabitLevelNavigator from './startHabit/HabitLevelNavigator'

interface HabitMateStartHabitProps {}

const HabitMateStartHabit: React.FC<HabitMateStartHabitProps> = ({}) => {
  return (
    <div>
      <HabitLevelNavigator
        habitLevels={habitLevels.map((level) => ({ ...level, src: '' }))}
        onStartHabit={() => {}}
      />
    </div>
  )
}

export default HabitMateStartHabit
