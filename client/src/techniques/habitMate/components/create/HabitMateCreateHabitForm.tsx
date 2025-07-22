import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import { levelThemes } from '../../constants/color/start-habit-theme'
import {
  getHabitRewards,
  getLevelInfo,
} from '../../functions/constantHelpers/habit-level-data-helper'
import useFormState from '../../../../hooks/forms/base/useFormState'
import type { HabitMateHabitLevel } from '../../types/habit-level-types'

import LevelInfoCard from './LevelInfoCard'
import HabitInputForm from './HabitInputForm'
import SubmitButton from './SubmitButton'
import type { HabitMateCreateHabitFormState } from '../../types/form/habit-create-form'
import type { CreateInputProps } from '../../../../types/form/formState-types'
import useHabitMateCrudHandler from '../../services/hooks/useHabitMateCrudHandler'
import { habitMateBasePath } from '../../constants/path-constants'

const HabitMateCreateHabitForm: React.FC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const level = Number(params.level)
  const levelTheme = levelThemes[level] || levelThemes[1]
  const backgroundGradient = `linear-gradient(to bottom, ${levelTheme.primary}20, ${levelTheme.primary}05)`

  const isValidLevel = !isNaN(level) && 0 < level && level < 6
  const validLevel = (isValidLevel ? level : 1) as HabitMateHabitLevel

  const levelInfo = getLevelInfo(validLevel)
  const reward = getHabitRewards(validLevel)

  const { formState, createInputProps } =
    useFormState<HabitMateCreateHabitFormState>({
      habit: '',
      isExecutable: false,
      timing: '',
    })

  const { asyncStates, submitCreateHabit } = useHabitMateCrudHandler()

  useEffect(() => {
    if (asyncStates.createSubmit?.status === 'success') {
      navigate(habitMateBasePath)
    }
  }, [asyncStates])

  // |TODO| 未開放レベルにアクセスしようとしたら、まだ解放されていませんと表示。

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: backgroundGradient,
        overflowY: 'auto',
        py: 4,
      }}
    >
      <Stack spacing={3} sx={{ padding: 3, mx: 'auto', maxWidth: '500px' }}>
        <LevelInfoCard
          level={validLevel}
          levelTheme={levelTheme}
          levelInfo={levelInfo}
          rewardMessage={reward.message}
        />
        <HabitInputForm
          checkboxColor={levelTheme.primary}
          createInputProps={createInputProps as CreateInputProps}
        />
        <SubmitButton
          levelTheme={levelTheme}
          onClick={() => submitCreateHabit(validLevel, formState)}
          disabled={
            !formState.habit || asyncStates.createSubmit?.status === 'loading'
          }
        />
      </Stack>
    </Box>
  )
}

export default HabitMateCreateHabitForm
