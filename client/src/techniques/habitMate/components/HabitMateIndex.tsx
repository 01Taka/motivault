import React from 'react'
import { Skeleton, Stack } from '@mui/material'
import HabitMateHabitProgress from './progress/HabitMateHabitProgress'
import Confetti from 'react-confetti'
import { useNavigate } from 'react-router-dom'
import useWindowSize from '../../../hooks/system/useWindowSize'
import { useActiveHabitData } from '../hooks/useActiveHabitData'
import { useHabitProgressHandler } from '../hooks/useHabitProgressHandler'
import { DecisionModalContent } from './main/DecisionModalContent'
import Popup from '../../../components/utils/Popup'
import type { HabitMateContinueHabitFormState } from '../types/form/habit-continue-form'
import useQueuedDelayedState from '../../../hooks/components/useQueuedDelayedState'

const HabitMateIndex: React.FC = () => {
  const [tryOpenContinueForm, setTryOpenContinueForm] =
    useQueuedDelayedState(true)

  const { listenerStatus, activeHabit, progressDataProps, isCompletedToday } =
    useActiveHabitData()
  const { width, height } = useWindowSize()
  const { progressActionProps, updateNextTargetCount } =
    useHabitProgressHandler(activeHabit?.docId, isCompletedToday, () =>
      setTryOpenContinueForm(true, 800)
    )
  const navigate = useNavigate()

  const newHabitButtonProps = {
    text: '新しい習慣を始める',
    onCreate: () => navigate('start-habit'),
  }

  const handleContinueHabit = (
    formState: HabitMateContinueHabitFormState | undefined
  ) => {
    if (activeHabit) {
      updateNextTargetCount(activeHabit.docId, formState)
      setTryOpenContinueForm(false)
    }
  }

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      {listenerStatus.habits === 'listening' ? (
        <HabitMateHabitProgress
          componentId="circularWithMilestoneChips"
          hasProgressHabit={!!activeHabit}
          progressProps={{
            ...progressDataProps,
            ...progressActionProps,
          }}
          newHabitButtonProps={newHabitButtonProps}
        />
      ) : (
        <Skeleton variant="circular" sx={{ width: '90vw', height: '90vw' }} />
      )}
      <Popup
        open={
          tryOpenContinueForm &&
          !!activeHabit &&
          progressDataProps.currentCount ===
            progressDataProps.nextMilestoneAbsoluteCount
        }
        hideCloseButton
      >
        {activeHabit && (
          <DecisionModalContent
            habitData={activeHabit}
            continuedCount={progressDataProps.currentCount}
            onStartNewHabit={() => {}}
            onContinue={(formState) => handleContinueHabit(formState)}
          />
        )}
      </Popup>
      {isCompletedToday && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          gravity={0.1}
          recycle={false}
        />
      )}
    </Stack>
  )
}

export default HabitMateIndex
