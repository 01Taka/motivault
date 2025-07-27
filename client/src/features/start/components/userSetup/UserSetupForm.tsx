import React from 'react'
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stack,
} from '@mui/material'
import { styled } from '@mui/system' // styledをインポート
import type { UserSetupFormState } from '../../../user/types/form/user-setup-form-state'
import useFormState from '../../../../hooks/forms/base/useFormState'

// --- Styled Components ---

const ModernActionButton = styled(Button)({
  // 基本スタイル
  minWidth: '180px',
  padding: '12px 24px',
  borderRadius: '25px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',

  // グラデーション背景: より深い青に変更
  // 例: #2980b9 (落ち着いた青) から #2c3e50 (暗い青/ほぼ黒)
  background: 'linear-gradient(90deg, #2980b9 0%, #2c3e50 100%)',
  color: '#fff', // テキストカラーは白のまま

  // カスタムシャドウ: 新しいグラデーションに合わせて調整
  boxShadow: '0 4px 15px rgba(44, 62, 80, 0.4)', // 暗い青に合わせたシャドウ

  // ホバーエフェクト
  '&:hover': {
    // ホバー時にグラデーションの向きを反転、または色を少し調整
    background: 'linear-gradient(90deg, #2c3e50 0%, #2980b9 100%)',
    boxShadow: '0 6px 20px rgba(44, 62, 80, 0.6)', // ホバー時のシャドウを強調
    transform: 'translateY(-2px)',
  },

  // 無効化された状態のスタイル
  '&:disabled': {
    background: '#e0e0e0',
    color: '#a0a0a0',
    boxShadow: 'none',
    transform: 'none',
    cursor: 'not-allowed',
  },

  // トランジション
  transition: 'all 0.3s ease-in-out',
})

// --- UserSetupForm Component ---

interface UserSetupFormProps {
  disabledSubmit: boolean
  onSubmit: (data: UserSetupFormState) => void
}

const UserSetupForm: React.FC<UserSetupFormProps> = ({
  disabledSubmit,
  onSubmit,
}) => {
  const { formState, createInputProps, checkHasEmptyInput } =
    useFormState<UserSetupFormState>({
      displayName: '',
      birthdate: '2010-01-01',
      gender: 'preferNotToSay',
    })

  const handleCreateUser = () => {
    onSubmit(formState)
  }

  return (
    <Box
      sx={{
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        maxWidth: 400,
        mx: 'auto',
        p: 3,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        あなたについて教えてください。
      </Typography>

      {/* ユーザー名入力フィールド */}
      <TextField
        fullWidth
        label="公開名"
        variant="outlined"
        placeholder="例: Motivator Tarou"
        required
        {...createInputProps('displayName')}
      />

      {/* 誕生日入力フィールド */}
      <TextField
        fullWidth
        label="誕生日"
        type="date"
        variant="outlined"
        slotProps={{ inputLabel: { shrink: true } }}
        required
        {...createInputProps('birthdate')}
      />

      {/* 性別選択 (ラジオボタン) */}
      <FormControl required component="fieldset" fullWidth>
        <FormLabel component="legend">性別</FormLabel>
        <RadioGroup row {...createInputProps('gender', 'muiSelect')}>
          <FormControlLabel value="male" control={<Radio />} label="男性" />
          <FormControlLabel value="female" control={<Radio />} label="女性" />
          <FormControlLabel value="other" control={<Radio />} label="その他" />
          <FormControlLabel
            value="preferNotToSay"
            control={<Radio />}
            label="回答しない"
          />
        </RadioGroup>
      </FormControl>

      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mt: 1, textAlign: 'center' }}
      >
        これらの設定は後からいつでも変更できます。
      </Typography>

      {/* 決定ボタン */}
      <Stack
        direction="row"
        justifyContent="center"
        width="100%"
        sx={{ mt: 2 }}
      >
        <ModernActionButton
          variant="contained" // variant="contained"は残してMaterial-UIの内部スタイルを継承しつつ、カスタムスタイルで上書き
          size="large"
          disabled={checkHasEmptyInput() || disabledSubmit}
          onClick={handleCreateUser}
        >
          決定
        </ModernActionButton>
      </Stack>
    </Box>
  )
}

export default UserSetupForm
