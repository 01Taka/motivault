import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { GrayscaleImage } from '../../../../components/image/GrayscaleImage'
import type { LevelInfo } from '../../types/habit-types'
import {
  levelThemes,
  defaultLevelTheme,
} from '../../constants/color/start-habit-theme'

interface StartHabitButtonCardProps {
  levelInfo: LevelInfo
  src: string
  onStartHabit: (level: number) => void
}

const StartHabitButtonCard: React.FC<StartHabitButtonCardProps> = ({
  levelInfo,
  src,
  onStartHabit,
}) => {
  const buttonText = levelInfo.isUnlocked ? '始める' : levelInfo.unlockCondition

  // 現在のレベルのテーマカラーを取得
  const currentTheme = levelThemes[levelInfo.level] || defaultLevelTheme
  const textColor = currentTheme.primary

  return (
    <Box
      sx={{
        position: 'relative',
        width: '81vw',
        maxWidth: 300,
        borderRadius: 3,
        height: '135vw',
        maxHeight: 500,
        overflow: 'hidden',
        bgcolor: 'gray',
        flexShrink: 0,
      }}
    >
      {/* 背景画像（最背面） */}
      <GrayscaleImage
        src={src}
        grayscale={levelInfo.isUnlocked ? 0 : 0.9}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
        overlayColor="rgba(0,0,0,0.4)"
        borderRadius={3}
      />

      {/* テキスト・ボタン（前面） */}
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          height: '100%',
          zIndex: 100,
          position: 'relative',
          color: '#fff', // 画像の上でテキストが見えるように
          textShadow: '0 1px 3px rgba(0,0,0,0.6)', // 視認性強化
          p: 2,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: textColor,
          }} // プライマリカラーを適用
        >
          Level {levelInfo.level}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            mb: 2,
            color: textColor,
          }} // プライマリカラーを適用
        >
          {levelInfo.name}
        </Typography>

        <Stack alignItems="center" sx={{ height: 80 }}>
          <Typography variant="body2">
            Interval: {levelInfo.interval}
          </Typography>
          <Typography variant="body2">
            Max Days: {levelInfo.targetCount}
          </Typography>
          {levelInfo.reward && (
            <Typography variant="body2">Reward: {levelInfo.reward}</Typography>
          )}
        </Stack>

        <Button
          variant="contained"
          onClick={() => onStartHabit(levelInfo.level)}
          disabled={!levelInfo.isUnlocked}
          sx={{
            mt: 3,
            borderRadius: '50px',
            // プライマリカラーをボタンの背景色に適用
            bgcolor: currentTheme.primary,
            '&:hover': {
              bgcolor: currentTheme.secondary, // ホバー時にはセカンダリカラー（またはより暗い色）
            },
            color: '#fff',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            '&.Mui-disabled': {
              backgroundColor: '#ccc',
              color: '#888',
              opacity: 0.8,
            },
          }}
        >
          {buttonText}
        </Button>
      </Stack>
    </Box>
  )
}

export default StartHabitButtonCard
