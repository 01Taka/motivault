import React from 'react'
import {
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material'
import { createJapaneseFilterOptions } from '../../functions/constantHelpers/habit-timing-suggestions-data-helper'
import type { AutocompleteOption } from '../../../../types/components/autocomplete-types'
import type { CreateInputProps } from '../../../../types/form/formState-types'
import AnimatedCheckbox from './AnimatedCheckbox'
import { HABIT_TIMING_SUGGESTIONS } from '../../constants/data/habit-timing-suggestions-data'

interface Props {
  checkboxColor: string
  createInputProps: CreateInputProps
}

const HabitInputForm: React.FC<Props> = ({
  checkboxColor,
  createInputProps,
}) => {
  const timingFilterOptions = createJapaneseFilterOptions<AutocompleteOption>([
    'label',
    'keywords',
  ])

  return (
    <Stack spacing={2.5}>
      <TextField
        label="習慣"
        fullWidth
        variant="outlined"
        placeholder="例: 毎日5分読書をする"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        {...createInputProps('habit', 'input')}
      />
      <FormControlLabel
        control={
          <AnimatedCheckbox
            color={checkboxColor}
            size="large"
            {...createInputProps('isExecutable', 'checkbox')}
          />
        }
        label={
          <Typography variant="subtitle1" sx={{ pl: 1, color: 'text.primary' }}>
            5分以内でできることです
          </Typography>
        }
        sx={{ ml: 0.5 }}
      />
      <Autocomplete
        options={HABIT_TIMING_SUGGESTIONS}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.label
        }
        filterOptions={timingFilterOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label="タイミング"
            fullWidth
            variant="outlined"
            placeholder="例: 朝食後"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            {...createInputProps('timing', 'input')}
          />
        )}
        freeSolo
        isOptionEqualToValue={(option, val) => option.label === val.label}
        {...createInputProps('timing', 'autocomplete')}
      />
    </Stack>
  )
}

export default HabitInputForm
