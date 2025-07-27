// src/layouts/AppStartLayout.tsx (または元のAppStart.tsx)
import React, { useState, useEffect } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import AppTitle from '../components/shared/AppTitle' // AppTitleのパスを確認してください
import AppStartStepper from '../components/AppStartStepper' // 新しいコンポーネントをインポート
import { Outlet, useLocation } from 'react-router-dom' // useLocationをインポート

// --- AppStartLayout Component ---

const AppStartLayout: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['認証', 'ユーザー作成', 'チュートリアル']
  const location = useLocation() // 現在のURLパスを取得

  // URLに基づいてactiveStepを更新するロジック
  useEffect(() => {
    const pathSegments = location.pathname.split('/')
    const currentStepParam = pathSegments[pathSegments.length - 1] // 例: /start/auth -> 'auth'

    const stepIndexMap: { [key: string]: number } = {
      auth: 0, // /start/auth
      'user-setup': 1, // /start/user-setup
      tutorial: 2, // /start/tutorial
      // indexルート (例: /start/) の場合
      start: 0, // デフォルトのルートが/start/の時に認証ステップにマッピング
    }

    const newActiveStep =
      stepIndexMap[currentStepParam] !== undefined
        ? stepIndexMap[currentStepParam]
        : 0 // マッチしない場合は0（認証）にフォールバック

    setActiveStep(newActiveStep)
  }, [location.pathname, steps]) // URLパスが変更されたときに実行

  return (
    <Box
      sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: '20px' }}
    >
      {/* タイトルエリア */}
      <AppTitle />

      {/* ステッパー - activeStepとstepsをAppStartStepperに渡す */}
      <AppStartStepper activeStep={activeStep} steps={steps} />

      {/* ネストされたルーティングのコンテンツ */}
      <Stack justifyContent="center" textAlign="center" width="100%">
        <Outlet />
      </Stack>

      {/* 説明部分 */}
      <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          自分だけの習慣化・勉強サポートアプリ。あなたの理想の自分に近づく手助けをします。
        </Typography>
      </Box>
    </Box>
  )
}

export default AppStartLayout
