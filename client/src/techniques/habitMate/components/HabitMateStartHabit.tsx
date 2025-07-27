import React, { useMemo } from 'react'
import HabitLevelNavigator from './startHabit/HabitLevelNavigator'
import { useNavigate } from 'react-router-dom'
import { habitMateCreatePath } from '../constants/path-constants'
import { habitMateLevels } from '../constants/data/habit-level-data'
import { useTechniqueMetadataDataStore } from '../../../features/technique/services/stores/useTechniqueMetadataDataStore'

interface HabitMateStartHabitProps {}

const HabitMateStartHabit: React.FC<HabitMateStartHabitProps> = ({}) => {
  const navigate = useNavigate()
  const { metadata } = useTechniqueMetadataDataStore()

  const habitMateMetadata = useMemo(
    () => metadata.find((data) => data.techniqueId === 'habitMate'),
    [metadata]
  )

  return (
    <div>
      <HabitLevelNavigator
        habitLevels={habitMateLevels.map((level) => ({
          ...level,
          src: level.startHabitBgSrc,
        }))}
        currentHabitLevel={habitMateMetadata?.currentHabitLevel ?? 1}
        onStartHabit={(level) =>
          navigate(`${habitMateCreatePath}/${level.level}`)
        }
      />
    </div>
  )
}

export default HabitMateStartHabit
