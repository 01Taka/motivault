// src/components/SaveCancelButtons.tsx
import React from 'react'
import { Button, Stack } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'

interface SaveCancelButtonsProps {
  /** 未保存の変更があるかどうか (true の場合、ボタンが有効になります) */
  hasUnsavedChanges: boolean
  /** 「変更を保存」ボタンがクリックされたときのコールバック関数 */
  onSave: () => void
  /** 「変更を取り消し」ボタンがクリックされたときのコールバック関数 */
  onCancel: () => void
  /** 保存処理中かどうか (true の場合、保存ボタンが disabled になります) */
  isSaving?: boolean
}

export const SaveCancelButtons: React.FC<SaveCancelButtonsProps> = ({
  hasUnsavedChanges,
  onSave,
  onCancel,
  isSaving = false,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<CancelIcon />}
        onClick={onCancel}
        sx={{ height: 40 }}
        disabled={!hasUnsavedChanges || isSaving} // 変更がない、または保存中は無効
      >
        取り消し
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={onSave}
        sx={{ height: 40 }}
        disabled={!hasUnsavedChanges || isSaving} // 変更がない、または保存中は無効
      >
        保存
      </Button>
    </Stack>
  )
}
