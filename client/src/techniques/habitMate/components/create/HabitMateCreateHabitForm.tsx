import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Stack, useTheme } from '@mui/material'
import {
  getHabitRewards,
  getLevelInfo,
} from '../../functions/constantHelpers/habit-level-data-helper'
import useFormState from '../../../../hooks/forms/base/useFormState'
import type { HabitMateHabitLevel } from '../../types/data/habit-level-types'

import LevelInfoCard from './LevelInfoCard'
import HabitInputForm from './HabitInputForm'
import SubmitButton from './SubmitButton'
import type { HabitMateCreateHabitFormState } from '../../types/form/habit-create-form'
import type { CreateInputProps } from '../../../../types/form/formState-types'
import useHabitMateCrudHandler from '../../services/hooks/useHabitMateCrudHandler'
import { habitMateBasePath } from '../../constants/path-constants'
import { getLevelColor } from '../../functions/components/level-color-utils'

const HabitMateCreateHabitForm: React.FC = () => {
  const navigate = useNavigate()
  const { palette } = useTheme()
  const params = useParams()
  const level = Number(params.level)
  const levelTheme = getLevelColor(level, palette)
  const backgroundGradient = `linear-gradient(to bottom, ${levelTheme?.primary}20, ${levelTheme?.primary}05)`

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
        widows: '100%',
        height: '100%',
        background: backgroundGradient,
        overflowY: 'auto',
      }}
    >
      <Stack spacing={3} sx={{ padding: 3, mx: 'auto', maxWidth: '500px' }}>
        <LevelInfoCard
          level={validLevel}
          levelColor={levelTheme?.primary ?? ''}
          levelInfo={levelInfo}
          rewardMessage={reward.message}
        />
        <HabitInputForm
          checkboxColor={levelTheme?.primary ?? ''}
          createInputProps={createInputProps as CreateInputProps}
        />
        <SubmitButton
          backgroundColor={levelTheme?.primary ?? ''}
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
