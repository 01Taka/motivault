import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import type { HabitMateHabitRead } from '../../services/documents/habit-mate-habit-document'
import HabitMateContinueFormHabitInfoCard from './HabitMateContinueFormHabitInfoCard'
import HabitMateContinueFormActionButtons from './HabitMateContinueFormActionButtons'
import useFormState from '../../../../hooks/forms/base/useFormState'
import type { CreateInputProps } from '../../../../types/form/formState-types'
import type { HabitMateContinueHabitFormState } from '../../types/form/habit-continue-form'

interface Props {
  habitData: HabitMateHabitRead
  continuedCount: number
  onStartNewHabit: () => void
  onContinue: (formState: HabitMateContinueHabitFormState | undefined) => void
}

export const DecisionModalContent: React.FC<Props> = ({
  habitData,
  continuedCount,
  onStartNewHabit,
  onContinue,
}) => {
  const { palette } = useTheme()
  const { formState, createInputProps, resetFormState, hasFormDiff } =
    useFormState<HabitMateContinueHabitFormState>({
      habit: habitData.habit,
      isExecutable: habitData.isExecutable,
      timing: habitData.timing,
    })

  const handleContinue = () => {
    onContinue(hasFormDiff() ? formState : undefined)
  }

  return (
    <Box
      sx={{
        p: 3,
        textAlign: 'center',
        bgcolor: palette.background.paper,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h6"
        component="h3"
        sx={{
          color: palette.emotionStatus?.positive.main,
          mb: 1,
          fontWeight: 'bold',
        }}
      >
        すごい！*{continuedCount}日*も続いてるの？🎉
      </Typography>

      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        この習慣を続ける？🤔
      </Typography>

      <HabitMateContinueFormHabitInfoCard
        formState={formState}
        hasFormDiff={hasFormDiff()}
        createInputProps={createInputProps as CreateInputProps}
        onCancelEdit={() => resetFormState()}
      />

      <HabitMateContinueFormActionButtons
        onContinue={handleContinue}
        onStartNewHabit={onStartNewHabit}
      />
    </Box>
  )
}
