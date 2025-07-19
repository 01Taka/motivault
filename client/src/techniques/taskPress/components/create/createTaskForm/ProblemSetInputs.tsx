import {
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
  Button,
  Grid2,
} from '@mui/material'
import { useRangeInput } from '../../../hooks/useRangeInput'
import { Add } from '@mui/icons-material'
import type { CreateInputProps } from '../../../../../types/form/formState-types'
import type React from 'react'

interface ProblemSetInputsProps {
  createInputProps: CreateInputProps
  setPages: (pages: number[]) => void
  isUsingTemplate: boolean
}

const ProblemSetInputs: React.FC<ProblemSetInputsProps> = ({
  createInputProps,
  setPages,
  isUsingTemplate,
}) => {
  const {
    value: pages,
    start,
    end,
    error,
    setStart,
    setEnd,
    addRange,
    removeValue: removePage,
    clearAll: clearPages,
    isAddDisabled,
  } = useRangeInput({ maxValue: 500, onChangeCallback: setPages })

  return (
    <Stack spacing={2}>
      <TextField
        label="1ページの所要時間 (分)"
        type="number"
        fullWidth
        disabled={isUsingTemplate}
        InputProps={{ inputProps: { min: 1 } }}
        {...createInputProps('timePerPage')}
      />

      <Box>
        <Stack spacing={1}>
          <Typography variant="subtitle1" gutterBottom>
            ページ範囲の追加
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <TextField
              label="開始ページ"
              type="number"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              disabled={isUsingTemplate}
              size="small"
              sx={{ width: '48%' }}
            />
            <TextField
              label="終了ページ"
              type="number"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              disabled={isUsingTemplate}
              size="small"
              sx={{ width: '48%' }}
              placeholder="空欄で1ページ"
            />
          </Stack>

          <Box textAlign="center">
            <Button
              variant="outlined"
              onClick={addRange}
              disabled={isUsingTemplate || isAddDisabled}
              size="small"
              startIcon={<Add />}
              sx={{
                borderRadius: 999,
                px: 'auto',
                height: 40,
                width: '90%',
                mx: 'auto',
              }}
            >
              範囲を追加
            </Button>
          </Box>

          <Stack>
            {error && (
              <Typography color="error" variant="caption" mt={0.5}>
                {error}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              ※重複は自動で取り除かれます。
            </Typography>
          </Stack>
        </Stack>

        {pages.length > 0 && (
          <Box mt={1}>
            <Grid2
              container
              spacing={1}
              sx={{ maxHeight: 300, overflowY: 'auto' }}
            >
              {pages.map((page) => (
                <Grid2 key={page}>
                  <Chip
                    label={`${page}`}
                    onDelete={
                      isUsingTemplate ? undefined : () => removePage(page)
                    }
                  />
                </Grid2>
              ))}
            </Grid2>

            <Button
              variant="text"
              size="small"
              color="error"
              onClick={clearPages}
              disabled={isUsingTemplate}
              sx={{ mb: 1, mt: 1 }}
            >
              すべて削除
            </Button>
          </Box>
        )}
      </Box>
    </Stack>
  )
}

export default ProblemSetInputs
