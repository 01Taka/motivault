import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
} from '@mui/material'

interface TagCreateModalProps {
  open: boolean
  onClose: () => void
  onCreate: (tag: { name: string; color: string }) => void
}

const TEMPLATE_COLORS = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0']

export const TagCreateModal: React.FC<TagCreateModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000000')

  const handleSubmit = () => {
    if (name.trim()) {
      onCreate({ name, color })
      setName('')
      setColor('#000000')
      onClose()
    }
  }

  const handleColorSelect = (selected: string) => {
    setColor(selected)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>タグを作成</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="タグ名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              カラーを選択
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {TEMPLATE_COLORS.map((c) => (
                <Box
                  key={c}
                  onClick={() => handleColorSelect(c)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: c,
                    cursor: 'pointer',
                    border: c === color ? '2px solid black' : '1px solid #ccc',
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2">カスタムカラー</Typography>
            <TextField
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              inputProps={{ style: { padding: 0, height: 36, width: 48 } }}
              sx={{ width: 'fit-content' }}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSubmit} variant="contained">
          作成
        </Button>
      </DialogActions>
    </Dialog>
  )
}
