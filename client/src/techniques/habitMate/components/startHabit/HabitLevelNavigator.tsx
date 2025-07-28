// src/components/HabitLevelNavigator.tsx
import React, { useState, useRef } from 'react'
import { Box } from '@mui/material'
import HabitLevelStepper from './HabitLevelStepper'
import StartHabitButtonCardList, {
  type StartHabitCardListHandle,
} from './StartHabitButtonCardList'
import type {
  HabitMateHabitLevel,
  HabitMateLevelInfo,
} from '../../types/data/habit-level-types'

interface HabitLevelNavigatorProps {
  habitLevels: (HabitMateLevelInfo & { src: string })[]
  currentHabitLevel: HabitMateHabitLevel
  onStartHabit: (level: HabitMateLevelInfo) => void
}

const HabitLevelNavigator: React.FC<HabitLevelNavigatorProps> = ({
  habitLevels,
  currentHabitLevel,
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
    isUnlocked: level.level <= currentHabitLevel,
    description: level.name,
  }))

  return (
    <Box mt={1}>
      <HabitLevelStepper
        activeStep={activeStep}
        levels={stepperLevels}
        onStepClick={handleStepClick}
      />
      <StartHabitButtonCardList
        ref={cardListRef}
        currentHabitLevel={currentHabitLevel}
        habitLevels={habitLevels}
        onStartHabit={onStartHabit}
      />
    </Box>
  )
}

export default HabitLevelNavigator
