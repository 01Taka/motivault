import { Box, Button, Typography } from '@mui/material'
import React from 'react'

interface AutoStopNoticeContentsProps {
  onContinue: () => void
  onExitSession: () => void
}

const AutoStopNoticeContents: React.FC<AutoStopNoticeContentsProps> = ({
  onContinue,
  onExitSession,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 24px',
        borderRadius: '24px',
        background: 'linear-gradient(145deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        minWidth: '320px',
        maxWidth: '400px',
        margin: '0 auto',
        boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          zIndex: -1,
        },
      }}
    >
      {/* アイコン */}
      <Box
        sx={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          fontSize: '40px',
        }}
      >
        ⏰
      </Box>

      {/* タイトル */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          marginBottom: '8px',
          fontSize: '24px',
          textAlign: 'center',
          background: 'linear-gradient(45deg, #fff, #f0f8ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        ⚡ タイマー自動停止 ⚡
      </Typography>

      {/* メッセージ */}
      <Typography
        sx={{
          fontSize: '16px',
          textAlign: 'center',
          marginBottom: '32px',
          lineHeight: 1.6,
          opacity: 0.95,
          fontWeight: 500,
        }}
      >
        予定時間を
        <Box
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            color: '#ffd700',
            textShadow: '0 2px 4px rgba(255, 215, 0, 0.3)',
          }}
        >
          Math.floor(POMODORO_TIMER_AUTO_STOP_TIME_MS / MINUTES_IN_MS)分
        </Box>
        以上
        <br />
        オーバーしちゃいました💦
      </Typography>

      {/* ボタンエリア */}
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Button
          onClick={onContinue}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
            color: 'white',
            fontWeight: 700,
            fontSize: '16px',
            padding: '14px 28px',
            borderRadius: '16px',
            textTransform: 'none',
            boxShadow: '0 8px 20px rgba(255, 107, 107, 0.4)',
            transition: 'all 0.3s ease',
            border: 'none',
            '&:hover': {
              background: 'linear-gradient(45deg, #ff5252, #ff7979)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 24px rgba(255, 107, 107, 0.5)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          }}
        >
          🚀 続ける
        </Button>

        <Button
          onClick={onExitSession}
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            fontWeight: 600,
            fontSize: '16px',
            padding: '14px 28px',
            borderRadius: '16px',
            textTransform: 'none',
            borderWidth: '2px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.8)',
              background: 'rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          }}
        >
          📝 セッション終了
        </Button>
      </Box>

      {/* 装飾的な要素 */}
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          opacity: 0.3,
          fontSize: '12px',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { opacity: 0.3 },
            '50%': { opacity: 0.6 },
            '100%': { opacity: 0.3 },
          },
        }}
      >
        ✨
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '15px',
          left: '15px',
          opacity: 0.3,
          fontSize: '10px',
          animation: 'pulse 2s infinite 1s',
        }}
      >
        💫
      </Box>
    </Box>
  )
}

export default AutoStopNoticeContents
