import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { GrayscaleImage } from '../../../../components/image/GrayscaleImage'
import {
  levelThemes,
  defaultLevelTheme,
} from '../../constants/color/start-habit-theme'
import type {
  HabitMateHabitLevel,
  HabitMateLevelInfo,
} from '../../types/data/habit-level-types'
import { getHabitRewards } from '../../functions/constantHelpers/habit-level-data-helper'

interface StartHabitButtonCardProps {
  levelInfo: HabitMateLevelInfo
  unlockedLevels: HabitMateHabitLevel[]
  src: string
  onStartHabit: (level: number) => void
}

const StartHabitButtonCard: React.FC<StartHabitButtonCardProps> = ({
  levelInfo,
  unlockedLevels,
  src,
  onStartHabit,
}) => {
  const isUnlocked = unlockedLevels.includes(levelInfo.level)
  const unlockCondition = `${levelInfo.level - 1}クリアで解放`
  const buttonText = isUnlocked ? '始める' : unlockCondition
  const reward = getHabitRewards(levelInfo.level)

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
        grayscale={isUnlocked ? 0 : 0.9}
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
            Interval: {levelInfo.milestoneIntervalCount}
          </Typography>
          <Typography variant="body2">
            Max Days:{' '}
            {levelInfo.targetCount.type === 'fixed'
              ? levelInfo.targetCount.count
              : '∞'}
          </Typography>
          {reward.message && (
            <Typography variant="body2">Reward: {reward.message}</Typography>
          )}
        </Stack>

        <Button
          variant="contained"
          onClick={() => onStartHabit(levelInfo.level)}
          disabled={!isUnlocked}
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
