// src/components/HabitLevelNavigator.tsx
import React, { useState, useRef } from 'react'
import { Box } from '@mui/material'
import HabitLevelStepper from './HabitLevelStepper'
import type { LevelInfo } from '../../types/habit-types'
import StartHabitButtonCardList, {
  type StartHabitCardListHandle,
} from './StartHabitButtonCardList'

interface HabitLevelNavigatorProps {
  habitLevels: (LevelInfo & { src: string })[]
  onStartHabit: (level: LevelInfo) => void
}

const HabitLevelNavigator: React.FC<HabitLevelNavigatorProps> = ({
  habitLevels,
  onStartHabit,
}) => {
  const [activeStep, setActiveStep] = useState(0)
  const cardListRef = useRef<StartHabitCardListHandle>(null)

  // Stepperのステップがクリックされたときのハンドラ
  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex)
    if (cardListRef.current) {
      cardListRef.current.scrollToLevel(stepIndex)
    }
  }

  // スクロールイベントを監視してactiveStepを更新（オプション：より高度な実装）
  // この例では、Stepperのクリックでスクロールを制御するため、一旦省略します。
  // ユーザーが手動でスクロールした場合にStepperを同期させたい場合は、
  // Intersection Observer APIなどを使用する必要があります。

  const stepperLevels = habitLevels.map((level) => ({
    label: `Lv.${level.level}`,
    isUnlocked: level.isUnlocked,
    description: level.name,
  }))

  return (
    <Box>
      <HabitLevelStepper
        activeStep={activeStep}
        levels={stepperLevels}
        onStepClick={handleStepClick}
      />
      <StartHabitButtonCardList
        ref={cardListRef}
        habitLevels={habitLevels}
        onStartHabit={onStartHabit}
      />
    </Box>
  )
}

export default HabitLevelNavigator
