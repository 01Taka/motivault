import React, { useState } from 'react'
import {
  Stack,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  IconButton,
  useTheme,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import UndoIcon from '@mui/icons-material/Undo'
import { Check } from '@mui/icons-material'
import type { HabitMateContinueHabitFormState } from '../../types/form/habit-continue-form'
import type { CreateInputProps } from '../../../../types/form/formState-types'

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
  const { palette } = useTheme()

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
        border: `1px solid ${palette.border?.main}`,
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        position: 'relative',
        bgcolor: palette.highlightColor?.main,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: 'bold',
          color: palette.text.secondary,
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
            <Typography
              component="span"
              sx={{ color: palette.highlightColor?.contrastText }}
            >
              {formState.habit}
            </Typography>
          </Typography>
          <Typography variant="body1" sx={{ color: palette.text.secondary }}>
            タイミング:{' '}
            <Typography
              component="span"
              sx={{
                fontWeight: 'bold',
                color: palette.highlightColor?.contrastText,
              }}
            >
              {formState.timing}
            </Typography>
          </Typography>
          <Typography variant="body1" sx={{ color: palette.text.secondary }}>
            5分でできるか:{' '}
            <Typography
              component="span"
              sx={{
                fontWeight: 'bold',
                color: palette.highlightColor?.contrastText,
              }}
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
          <UndoIcon
            sx={{ color: hasFormDiff ? palette.error.light : 'grey' }}
          />
        </IconButton>
      )}
      <IconButton
        onClick={() => setIsEditing((prev) => !prev)}
        size="small"
        sx={{ position: 'absolute', top: 0, right: 4 }}
      >
        {isEditing ? (
          <Check sx={{ color: palette.success.main }} />
        ) : (
          <EditIcon sx={{ color: palette.emotionStatus?.positive.main }} />
        )}
      </IconButton>
    </Stack>
  )
}

export default HabitMateContinueFormHabitInfoCard
