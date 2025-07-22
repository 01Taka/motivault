import React from 'react'
import { Stepper, Step, StepLabel, Box } from '@mui/material'
import {
  defaultLevelTheme,
  levelThemes,
} from '../../constants/color/start-habit-theme'

interface HabitLevelStepperProps {
  activeStep: number
  levels: { label: string; isUnlocked: boolean; description?: string }[]
  onStepClick: (step: number) => void
}

const HabitLevelStepper: React.FC<HabitLevelStepperProps> = ({
  activeStep,
  levels,
  onStepClick,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        mb: 4,
        overflowX: 'auto', // ステッパー項目が多い場合に横スクロールを可能にする
        py: 2, // 上下のパディング
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {levels.map((level, index) => {
          const isCompleted = level.isUnlocked
          const isActive = index === activeStep // 現在のステップかどうか

          // レベルのテーマカラーを取得 (levelThemesは0-indexedではなく1-indexedなので index + 1 を使用)
          const currentTheme = levelThemes[index + 1] || defaultLevelTheme

          const currentColor = isCompleted
            ? currentTheme.primary // 達成済みまたは現在地はテーマカラー
            : 'text.disabled'

          return (
            <Step key={level.label} completed={isCompleted}>
              <StepLabel
                onClick={() => onStepClick(index)}
                sx={{
                  cursor: 'pointer',
                  // アクティブなステップのスタイル（スケールとトランジション）
                  transform: isActive ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                  display: 'flex', // アイコンとラベルを中央に揃えるため
                  flexDirection: 'column', // アイコンとラベルを縦に並べるため
                  alignItems: 'center', // 中央揃え
                  WebkitTapHighlightColor: 'transparent',
                  // StepLabel内のテキストのスタイル
                  '& .MuiStepLabel-label': {
                    color: currentColor,
                    fontWeight: isActive ? 'bold' : 'normal', // 現在地は太字
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }, // レスポンシブなフォントサイズ
                  },

                  // StepIconのスタイル（アイコンの色付け）
                  '& .MuiStepIcon-root': {
                    color: currentColor, // 未達成はMUIのデフォルト灰色
                  },
                  '&.Mui-active': {
                    color: currentColor,
                  },
                  '&.Mui-completed': {
                    color: currentColor,
                  },
                }}
              >
                {level.label}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}

export default HabitLevelStepper
