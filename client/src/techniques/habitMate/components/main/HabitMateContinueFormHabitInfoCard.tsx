import React, { useState } from 'react'
import {
  Stack,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import UndoIcon from '@mui/icons-material/Undo'
import { Check } from '@mui/icons-material'
import type { HabitMateContinueHabitFormState } from '../../types/form/habit-continue-form'
import type { CreateInputProps } from '../../../../types/form/formState-types'

const palette = {
  mainColor: '#8A96F2',
  borderColor: '#E0E4E8',
  highlightColor: '#E0F7FA',
}

interface HabitMateContinueFormHabitInfoCardProps {
  formState: HabitMateContinueHabitFormState
  hasFormDiff: boolean
  createInputProps: CreateInputProps
  onCancelEdit: () => void
}

const HabitMateContinueFormHabitInfoCard: React.FC<
  HabitMateContinueFormHabitInfoCardProps
> = ({ formState, hasFormDiff, createInputProps, onCancelEdit }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Stack
      alignItems="center"
      spacing={1.5}
      sx={{
        p: 2,
        mt: 2,
        mb: 1,
        textAlign: 'left',
        borderRadius: 3,
        border: `1px solid ${palette.borderColor}`,
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        position: 'relative',
        bgcolor: palette.highlightColor,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: 'bold',
          color: 'text.secondary',
          textAlign: 'center',
          mb: 1,
        }}
      >
        今の習慣
      </Typography>

      {isEditing ? (
        <>
          <TextField
            label="習慣"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ mt: 2 }}
            {...createInputProps('habit')}
          />
          <TextField
            label="タイミング"
            variant="outlined"
            size="small"
            fullWidth
            {...createInputProps('timing')}
          />
          <FormControlLabel
            control={
              <Switch
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: palette.mainColor,
                    '&:hover': {
                      bgcolor: 'rgba(138, 150, 242, 0.08)',
                    },
                  },
                }}
                {...createInputProps('isExecutable', 'checkbox')}
              />
            }
            label="5分以内でできるか？"
            labelPlacement="start"
            sx={{
              justifyContent: 'space-between',
              m: 0,
              mt: 1,
              '& .MuiFormControlLabel-label': { fontSize: '0.9rem' },
            }}
          />
        </>
      ) : (
        <>
          <Typography variant="body1">
            <Typography component="span" sx={{ color: 'text.primary' }}>
              {formState.habit}
            </Typography>
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            タイミング:{' '}
            <Typography
              component="span"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              {formState.timing}
            </Typography>
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            5分でできるか:{' '}
            <Typography
              component="span"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              {formState.isExecutable ? 'はい' : 'いいえ'}
            </Typography>
          </Typography>
        </>
      )}

      {isEditing && (
        <IconButton
          onClick={() => {
            onCancelEdit()
            setIsEditing(false)
          }}
          size="small"
          sx={{ position: 'absolute', top: 0, left: 4 }}
          disabled={!hasFormDiff}
        >
          <UndoIcon sx={{ color: hasFormDiff ? 'error.main' : 'grey' }} />
        </IconButton>
      )}
      <IconButton
        onClick={() => setIsEditing((prev) => !prev)}
        size="small"
        sx={{ position: 'absolute', top: 0, right: 4 }}
      >
        {isEditing ? (
          <Check sx={{ color: palette.mainColor }} />
        ) : (
          <EditIcon sx={{ color: palette.mainColor }} />
        )}
      </IconButton>
    </Stack>
  )
}

export default HabitMateContinueFormHabitInfoCard
