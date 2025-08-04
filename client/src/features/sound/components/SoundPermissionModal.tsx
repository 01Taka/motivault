import React, { useEffect, useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  Backdrop,
  IconButton,
} from '@mui/material'
import { VolumeUp, Close, Headphones } from '@mui/icons-material'
import { useSoundStore } from '../stores/useSoundStore'

// モーダルのスタイル設定
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  maxWidth: '90vw',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  p: 0,
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.1)',
  display: 'flex',
  flexDirection: 'column',
}

const headerStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  p: 3,
  position: 'relative',
  textAlign: 'center',
}

const contentStyle = {
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  alignItems: 'center',
  flex: 1,
  overflowY: 'auto',
  maxHeight: 'calc(90vh - 120px)', // ヘッダーとボタン部分を除いた高さ
}

const stickyButtonStyle = {
  p: 3,
  pt: 2,
  backgroundColor: 'background.paper',
  borderTop: '1px solid rgba(0,0,0,0.1)',
  display: 'flex',
  gap: 2,
}

const buttonStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: 3,
  py: 1.5,
  px: 4,
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
  },
}

const emojiStyle = {
  fontSize: '3rem',
  mb: 1,
  animation: 'bounce 1s ease-in-out infinite alternate',
}

/**
 * 音声の再生許可をユーザーに求めるためのモーダルコンポーネント。
 * アプリのルートコンポーネントに配置することで、必要なときに自動で表示されます。
 */
export const SoundPermissionModal: React.FC = () => {
  const hasPendingSounds = useSoundStore((state) => state.hasPendingSounds)
  const initializeAllSounds = useSoundStore(
    (state) => state.initializeAllSounds
  )
  const setPermissionDenied = useSoundStore(
    (state) => state.setPermissionDenied
  )
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // hasPendingSoundsの状態が変更されたらモーダルの表示・非表示を切り替える
  useEffect(() => {
    setOpen(hasPendingSounds)
  }, [hasPendingSounds])

  const handleAllowSound = async () => {
    setLoading(true)
    try {
      await initializeAllSounds()
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDenySound = () => {
    setPermissionDenied(true)
    setOpen(false)
  }

  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <Modal
        open={open}
        aria-labelledby="sound-permission-modal-title"
        aria-describedby="sound-permission-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          },
        }}
      >
        <Box sx={style}>
          {/* ヘッダー部分 */}
          <Box sx={headerStyle}>
            <IconButton
              sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
              onClick={handleClose}
              size="small"
            >
              <Close />
            </IconButton>

            <Box sx={emojiStyle}>🎵</Box>

            <Typography
              id="sound-permission-modal-title"
              variant="h5"
              component="h2"
              sx={{ fontWeight: 700, mb: 0.5 }}
            >
              サウンド体験を始めよう！
            </Typography>

            <Typography sx={{ opacity: 0.9, fontSize: '0.95rem' }}>
              より楽しい体験のために
            </Typography>
          </Box>

          {/* コンテンツ部分（スクロール可能） */}
          <Box sx={contentStyle}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Headphones sx={{ fontSize: '2rem', color: '#667eea' }} />
              <VolumeUp sx={{ fontSize: '2rem', color: '#764ba2' }} />
            </Box>

            <Typography
              id="sound-permission-modal-description"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                fontSize: '1rem',
                lineHeight: 1.6,
                maxWidth: '320px',
              }}
            >
              このアプリでは効果音や通知音で、よりリッチな体験を提供します。
              音声の再生を許可していただけますか？
            </Typography>

            {/* Web標準の説明 */}
            <Box
              sx={{
                backgroundColor: 'rgba(102, 126, 234, 0.08)',
                borderRadius: 2,
                p: 2,
                mt: 1,
                border: '1px solid rgba(102, 126, 234, 0.2)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  color: 'text.secondary',
                  textAlign: 'center',
                  lineHeight: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <Box component="span" sx={{ fontSize: '1rem' }}>
                  ℹ️
                </Box>
                <Box component="span">
                  ブラウザのセキュリティ仕様により、ユーザーの操作なしでは音声を再生できません。
                  そのためアプリ起動時にこの確認が表示されます。
                </Box>
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: '0.8rem',
                color: 'text.disabled',
                textAlign: 'center',
                mt: 2,
              }}
            >
              いつでも設定から変更できます
            </Typography>
          </Box>

          {/* ボタン部分（固定） */}
          <Box sx={stickyButtonStyle}>
            <Button
              variant="outlined"
              onClick={handleDenySound}
              sx={{
                flex: 1,
                borderRadius: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#e0e0e0',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: '#bdbdbd',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              後で
            </Button>

            <Button
              variant="contained"
              onClick={handleAllowSound}
              disabled={loading}
              sx={{
                ...buttonStyle,
                flex: 2,
                animation: loading ? 'none' : 'pulse 2s ease-in-out infinite',
              }}
            >
              {loading ? '設定中...' : '🔊 音を有効にする'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
