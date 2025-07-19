import {
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from '@mui/material'
import { useState } from 'react'
import { TagCreateModal } from './TagCreateModal'
import type {
  CreateInputProps,
  KeyMirrorObject,
} from '../../../../types/form/formState-types'
import type { TimeBlockingTaskFormState } from './TimeBlockingTaskForm'
import type { TimeBlockingTags } from '../../services/documents/time-blocking-document'
import {
  DateTimePicker,
  type DateTimeValidationError,
  type PickerChangeHandlerContext,
} from '@mui/x-date-pickers'

interface Props {
  formData: TimeBlockingTaskFormState
  names: KeyMirrorObject<TimeBlockingTaskFormState>
  tags: TimeBlockingTags
  startTime: Date
  onChangeStartTime: (
    value: any,
    context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => void
  createInputProps: CreateInputProps
  onTagCreate: (tag: { name: string; color: string }) => void
}

export const TimeBlockingTaskFormBody: React.FC<Props> = ({
  formData,
  names,
  tags,
  startTime,
  onChangeStartTime,
  createInputProps,
  onTagCreate,
}) => {
  const durations = Array.from({ length: 12 }, (_, i) => (i + 1) * 5)
  const [tagModalOpen, setTagModalOpen] = useState(false)

  const handleOpenTagModal = () => setTagModalOpen(true)
  const handleCloseTagModal = () => setTagModalOpen(false)

  return (
    <Stack spacing={3} sx={{ height: '60vh', overflowY: 'auto', mt: 6 }}>
      <Typography variant="h6" fontWeight="bold">
        タスクを作成
      </Typography>

      <TextField
        label="タイトル"
        {...createInputProps(names.title)}
        fullWidth
        required
      />
      <DateTimePicker
        label="開始時間"
        value={startTime}
        onChange={onChangeStartTime}
        views={['hours', 'minutes']}
        timeSteps={{ minutes: 5 }}
      />

      <FormControl fullWidth>
        <InputLabel>所要時間（分）</InputLabel>
        <Select
          label="所要時間（分）"
          {...createInputProps(names.duration, 'muiSelect')}
        >
          {durations.map((d) => (
            <MenuItem key={d} value={d}>
              {d} 分
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack spacing={1}>
        <FormControl fullWidth>
          <InputLabel>タグ</InputLabel>
          <Select
            label="タグ"
            {...createInputProps(names.tagId, 'muiSelect')}
            sx={{
              color: formData.tagId ? tags[formData.tagId].color : 'black',
            }}
          >
            {Object.entries(tags).map(([id, tag]) => (
              <MenuItem key={id} value={id} sx={{ color: tag.color }}>
                # {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          sx={{ color: 'ButtonText' }}
          onClick={handleOpenTagModal}
          size="small"
        >
          タグを追加 +
        </Button>
      </Stack>

      <FormControl fullWidth>
        <InputLabel>繰り返し</InputLabel>
        <Select
          label="繰り返し"
          {...createInputProps(names.repeat!, 'muiSelect')}
        >
          <MenuItem value="none">なし</MenuItem>
          <MenuItem value="daily">毎日</MenuItem>
          <MenuItem value="weekly">毎週</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.completed}
            {...createInputProps(names.completed)}
          />
        }
        label="完了済み"
      />

      <TagCreateModal
        open={tagModalOpen}
        onClose={handleCloseTagModal}
        onCreate={onTagCreate}
      />
    </Stack>
  )
}
