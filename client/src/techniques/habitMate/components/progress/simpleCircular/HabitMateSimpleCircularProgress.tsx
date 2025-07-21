// src/components/HabitMateDetailedCircularProgress.tsx
import React from 'react'
import ProgressCircleBase from './ProgressCircleBase'
import { Box, Typography } from '@mui/material'
import type { HabitDisplayProps } from '../../../types/habit-types'

/**
 * スクリーンショットのデザインに基づく詳細な円形プログレスコンポーネント
 * @param props HabitDisplayProps
 */
const HabitMateDetailedCircularProgress: React.FC<HabitDisplayProps> = (
  props
) => {
  const {
    taskName,
    isTodayCompleted,
    currentCount,
    intermediateMilestones,
    goalCount,
    passedMilestoneCount, // 新しいプロパティ
    totalMilestones, // 新しいプロパティ
    currentLevelInfo,
    onToggleCompletion,
  } = props

  // --- 中央のプログレスバー表示の計算 ---
  let percentage = 0
  let mainDisplayText = '' // 円の中心に表示する主要テキスト
  let overallDiffText = '' // 右肩の「+全体のカウントの差分」

  const isGoalUnlimited = goalCount === 'unlimited'

  // 次の中間地点のカウントを特定
  let nextIntermediateGoal: number | 'unlimited' = 'unlimited'
  if (intermediateMilestones.length > 0) {
    // 現在のカウントより大きい最初の中間地点を探す
    const foundNext = intermediateMilestones.find(
      (milestone) => currentCount < milestone
    )
    if (foundNext !== undefined) {
      nextIntermediateGoal = foundNext
    } else {
      // 全ての中間地点を通過している場合、最終ゴールが次の目標
      nextIntermediateGoal = isGoalUnlimited ? 'unlimited' : goalCount
    }
  } else {
    // 中間地点が設定されていない場合、最終ゴールが次の目標
    nextIntermediateGoal = isGoalUnlimited ? 'unlimited' : goalCount
  }

  // 円の中心の表示テキスト
  if (typeof nextIntermediateGoal === 'number') {
    // 「現在の合計カウント / 次の中間地点のカウント」
    mainDisplayText = `${currentCount} / ${nextIntermediateGoal}`
    // 円のプログレス割合は、現在のカウントから次の中間地点までの進捗で計算
    percentage = (currentCount / nextIntermediateGoal) * 100
  } else {
    // 無期限の場合、円の中心には「現在の合計カウント」のみ
    mainDisplayText = `${currentCount}`
    percentage = 100 // 無期限の場合は常に100%表示
  }

  // 「+全体のカウントの差分」の計算
  if (!isGoalUnlimited && typeof nextIntermediateGoal === 'number') {
    const overallRemaining = (goalCount as number) - nextIntermediateGoal
    if (overallRemaining > 0) {
      overallDiffText = `+${overallRemaining}`
    }
  } else if (isGoalUnlimited && typeof nextIntermediateGoal === 'number') {
    // 無期限かつ次の中間地点が数字の場合、ここでの「差分」は意味をなさないか、
    // スクリーンショットの意図と異なる可能性があるので表示しない。
    // もし必要であれば、例えば「最終目標まで無限」のような表示も検討可能。
    overallDiffText = ''
  }

  // --- プログレスバーの色 ---
  const displayColor = isTodayCompleted
    ? currentLevelInfo.themeColor
    : 'text.disabled'

  // --- 全体の中間地点チップの表示 ---
  const chipSize = 16 // チップのサイズ

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row', // 円グラフとチップを横並びに
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        width: '100%',
        boxSizing: 'border-box',
        // このコンポーネント自体には背景やボーダーはつけない
      }}
    >
      {/* メインのプログレスサークル */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <ProgressCircleBase
          percentage={percentage}
          // メイン表示テキストと右肩テキストを組み合わせてdisplayTextに渡す
          displayText={`${mainDisplayText}${overallDiffText ? `\n\n+${overallDiffText}` : ''}`}
          color={displayColor}
          size={250} // 大きめに表示
          thickness={15} // 太さも調整
          onClick={onToggleCompletion}
          clickable={true}
        />
        {/* 「習慣カウント」のテキストはProgressCircleBaseのdisplayTextに含めるか、別途配置 */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            position: 'absolute',
            bottom: '15%', // 円の中の下部に配置
            fontSize: '0.9rem',
          }}
        >
          習慣カウント
        </Typography>
      </Box>

      {/* 右側の円Chip集 */}
      <Box
        sx={{
          ml: 4, // 円グラフとの間隔
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(2, ${chipSize}px)`, // 2列で表示
            gap: '8px', // チップ間の間隔
            p: 1, // 周囲のパディング
            border: '1px solid #e0e0e0', // チップ集合の枠線
            borderRadius: '8px',
            backgroundColor: '#f5f5f5', // チップ集合の背景色
          }}
        >
          {Array.from({ length: totalMilestones }).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: chipSize,
                height: chipSize,
                borderRadius: '50%',
                backgroundColor:
                  index < passedMilestoneCount ? '#FFEB3B' : '#bdbdbd', // 黄色またはグレー
                border: '1px solid #e0e0e0',
              }}
            />
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {`${passedMilestoneCount}/${totalMilestones}`}
        </Typography>
      </Box>
    </Box>
  )
}

export default HabitMateDetailedCircularProgress
