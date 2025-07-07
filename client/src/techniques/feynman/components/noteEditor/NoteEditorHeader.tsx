import { useRef, useState } from 'react'
import { Check, CopyAll, LiveHelp } from '@mui/icons-material'
import { Stack, TextField } from '@mui/material'
import { orange } from '@mui/material/colors'
import AnimatedIconButton from './AnimatedIconButton'

interface NoteEditorHeaderProps {
  title: string
  titleError: boolean
  onChangeTitle: (title: string) => void
  onCopyNote: () => void
  onCreateGapBlock: () => void
  onCompleted: () => void
}

const NoteEditorHeader: React.FC<NoteEditorHeaderProps> = ({
  title,
  titleError,
  onChangeTitle,
  onCopyNote,
  onCreateGapBlock,
  onCompleted,
}) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems={'start'}
      sx={{
        width: '100%',
      }}
    >
      <TextField
        label="タイトル"
        inputRef={inputRef}
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        size="small"
        variant="outlined"
        sx={{
          width: focused ? '100%' : 200,
          transition: 'width 0.1s linear',
          mr: 1,
        }}
        required
        error={titleError}
        helperText={titleError ? 'タイトルを入力してください' : ' '}
      />

      {!focused && (
        <Stack
          direction="row"
          justifyContent="end"
          spacing={1}
          sx={{ flexShrink: 0 }}
        >
          <AnimatedIconButton
            label="コピー"
            icon={<CopyAll />}
            onClick={onCopyNote}
          />
          <AnimatedIconButton
            label="Qブロック"
            icon={<LiveHelp sx={{ color: orange[600] }} />}
            onClick={onCreateGapBlock}
            sx={{ color: orange[800] }}
          />
          <AnimatedIconButton
            label="完了"
            icon={<Check />}
            onClick={onCompleted}
            color="primary"
          />
        </Stack>
      )}
    </Stack>
  )
}

export default NoteEditorHeader
