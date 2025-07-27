import React from 'react'
import { Box, Typography, Button, Stack, Divider } from '@mui/material'
import { styled } from '@mui/system'
import type { UserRead } from '../../../user/services/documents/user-document'

// ModernActionButtonのスタイルを再利用または適切に調整
const ModernActionButton = styled(Button)({
  minWidth: '180px',
  padding: '12px 24px',
  borderRadius: '25px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  background: 'linear-gradient(90deg, #2980b9 0%, #2c3e50 100%)',
  color: '#fff',
  boxShadow: '0 4px 15px rgba(44, 62, 80, 0.4)',
  '&:hover': {
    background: 'linear-gradient(90deg, #2c3e50 0%, #2980b9 100%)',
    boxShadow: '0 6px 20px rgba(44, 62, 80, 0.6)',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    background: '#e0e0e0',
    color: '#a0a0a0',
    boxShadow: 'none',
    transform: 'none',
    cursor: 'not-allowed',
  },
  transition: 'all 0.3s ease-in-out',
})

// セカンダリボタンのスタイル（例：ログアウト、チュートリアル）
const SecondaryActionButton = styled(Button)({
  minWidth: '180px',
  padding: '12px 24px',
  borderRadius: '25px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  background: 'transparent',
  color: '#2980b9',
  border: '1px solid #2980b9',
  boxShadow: 'none',
  '&:hover': {
    background: 'rgba(41, 128, 185, 0.1)',
    color: '#2c3e50',
    borderColor: '#2c3e50',
    transform: 'translateY(-1px)',
  },
  '&:disabled': {
    color: '#a0a0a0',
    borderColor: '#e0e0e0',
  },
  transition: 'all 0.3s ease-in-out',
})

interface AppUserExistsScreenProps {
  /**
   * 既に存在するユーザーのデータ。
   */
  userData: UserRead
  /**
   * ログアウト処理を実行するハンドラー。
   */
  onLogout: () => void
  /**
   * アプリのメイン画面へ遷移するハンドラー。
   */
  onGoToApp: () => void
  /**
   * チュートリアル画面へ遷移するハンドラー。
   */
  onGoToTutorial: () => void
}

const AppUserExistsScreen: React.FC<AppUserExistsScreenProps> = ({
  userData,
  onLogout,
  onGoToApp,
  onGoToTutorial,
}) => {
  // genderの表示名を調整するヘルパー関数
  const getGenderDisplay = (gender: string): string => {
    switch (gender) {
      case 'male':
        return '男性'
      case 'female':
        return '女性'
      case 'other':
        return 'その他'
      case 'prefer_not_to_say':
        return '回答しない'
      default:
        return '不明'
    }
  }

  return (
    <Box
      sx={{
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        ようこそ、おかえりなさい！
      </Typography>

      <Typography variant="body1">ユーザー情報は登録済みです。</Typography>

      {/* ユーザー情報表示エリア - ボーダーと影を削除 */}
      <Box
        sx={{
          width: '100%',
          p: 3,
          borderRadius: 1, // ユーザー情報表示ボックスの角の丸みは残しても良い
          border: '1px solid transparent', // 見えないボーダーでレイアウトのずれを防ぐ
        }}
      >
        <Typography variant="h6" gutterBottom>
          {userData.displayName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          誕生日: {userData.birthdate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          性別: {getGenderDisplay(userData.gender)}
        </Typography>
      </Box>

      <Divider sx={{ width: '80%', mb: 3 }} />

      {/* アクションボタン */}
      <Stack spacing={2} sx={{ width: '100%' }}>
        <ModernActionButton variant="contained" onClick={onGoToApp}>
          アプリへ移動
        </ModernActionButton>
        <SecondaryActionButton variant="outlined" onClick={onGoToTutorial}>
          チュートリアルを見る
        </SecondaryActionButton>
        <SecondaryActionButton
          variant="outlined"
          color="error"
          onClick={onLogout}
        >
          ログアウト
        </SecondaryActionButton>
      </Stack>
    </Box>
  )
}

export default AppUserExistsScreen
