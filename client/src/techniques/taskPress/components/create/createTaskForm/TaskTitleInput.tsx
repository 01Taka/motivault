import React, { useCallback, useState } from 'react'
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  type TextFieldProps,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type TaskTitleInputProps = TextFieldProps & {
  // 表示・入力するテキスト
  value: string
  // 選択肢のリスト（docIdの配列を想定）
  choices: string[]
  // docIdをラベルに変換する関数
  getOptionLabel: (docId: string) => string
  // クリアボタンが押されたときに呼び出される関数
  onClear: () => void
  // リストのアイテムがクリックされたときに呼び出される関数
  onSelectChoices: (docId: string) => void
}

const TaskTitleInput: React.FC<TaskTitleInputProps> = ({
  value,
  choices,
  getOptionLabel,
  onClear,
  onSelectChoices,
  ...textFieldProps
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleClearClick = useCallback(() => {
    onClear()
  }, [onClear])

  const handleItemClick = useCallback(
    (docId: string) => {
      onSelectChoices(docId)
      setIsFocused(false)
    },
    [onSelectChoices]
  )

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    // 少し遅延させてクリックイベントを処理できるようにする
    setTimeout(() => {
      setIsFocused(false)
    }, 150)
  }, [])

  const showChoices = isFocused && choices.length > 0

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        InputProps={{
          endAdornment: value && (
            <IconButton
              onClick={handleClearClick}
              size="small"
              sx={{
                opacity: 0.7,
                '&:hover': { opacity: 1 },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: showChoices ? '4px 4px 0 0' : '4px',
          },
        }}
        {...textFieldProps}
      />

      {showChoices && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1300,
            maxHeight: 240,
            overflow: 'hidden',
            borderRadius: '0 0 4px 4px',
            border: '1px solid',
            borderColor: 'divider',
            borderTop: 'none',
          }}
        >
          <List
            dense
            sx={{
              maxHeight: 240,
              overflow: 'auto',
              py: 0,
              '& .MuiListItem-root': {
                cursor: 'pointer',
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': {
                  borderBottom: 'none',
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                transition: 'background-color 0.15s ease',
                px: 2,
                py: 1,
              },
            }}
          >
            {choices.map((choiceId) => (
              <ListItem
                key={choiceId}
                onClick={() => handleItemClick(choiceId)}
              >
                <ListItemText
                  primary={getOptionLabel(choiceId)}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      lineHeight: 1.4,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  )
}

export default TaskTitleInput
