import React, { useState, useEffect } from 'react'
import type { AchievementStaticInfo } from '../types/data/achievement-data-types'

// MUIコンポーネントのインポート
import { Box, Typography, Fade, useTheme, Stack } from '@mui/material'
import usePulse from '../../../hooks/components/usePulse'
import { getRarityColor } from '../../../functions/theme/rarity-color-utils'
import AchievementDetail from './achievementDetail/AchievementDetail' // 詳細表示用
import SimpleAchievement from './achievementDetail/SimpleAchievement'

interface UnlockAchievementAnimationsProps {
  title: string
  inPossessionAchievements: AchievementStaticInfo[]
  unlockedNewAchievements: AchievementStaticInfo[]
}

const UnlockAchievementAnimations: React.FC<
  UnlockAchievementAnimationsProps
> = ({ title, unlockedNewAchievements }) => {
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState<number>(0)
  const [fadePulse, startFadePulse] = usePulse({
    defaultDuration: 250,
    onPulseEnd: () => setCurrentDisplayIndex((prev) => prev + 1),
  })

  const [showList, setShowList] = useState(false) // 一覧表示切り替え用の状態

  // 現在表示中のアチーブメントを取得
  const currentDisplayAchievement =
    currentDisplayIndex < unlockedNewAchievements.length
      ? unlockedNewAchievements[currentDisplayIndex]
      : null

  // 一覧表示に切り替えたタイミングで、残りのアチーブメントを表示
  useEffect(() => {
    if (currentDisplayIndex >= unlockedNewAchievements.length) {
      setShowList(true)
    }
  }, [currentDisplayIndex, unlockedNewAchievements.length])

  const { palette } = useTheme()
  const rarityColor = getRarityColor(
    currentDisplayAchievement?.rarity ?? 'common',
    palette
  )

  return (
    <Stack
      justifyContent="start"
      alignItems="center"
      sx={{
        my: 4,
        padding: 2,
        bgcolor: rarityColor?.background, // rarityColor をバックグラウンドに適用
        width: '90vw',
        height: '65vh',
        borderRadius: 2,
      }}
    >
      <Typography mt={2}>{title}</Typography>
      <Typography
        variant="h4"
        component="h1"
        sx={{ display: 'flex', alignItems: 'center', mt: 2 }}
      >
        ✨{/* ルート側に配置した「アチーブメント獲得！」の文字 */}
        <Typography variant="h5" component="p" textAlign="center">
          アチーブメント
          <br />
          獲得！
        </Typography>
        ✨
      </Typography>

      {/* アチーブメント詳細部分 */}
      {!showList && !!currentDisplayAchievement && (
        <Fade
          in={!fadePulse && !!currentDisplayAchievement} // currentDisplayAchievement が存在すれば表示
          timeout={250}
          mountOnEnter // コンポーネントが DOM に追加されるときにマウント
          unmountOnExit // コンポーネントが DOM から削除されるときにアンマウント
          onClick={() => startFadePulse()}
        >
          <Box>
            <AchievementDetail achievement={currentDisplayAchievement} />
          </Box>
        </Fade>
      )}

      {/* 一覧表示に切り替え後、SimpleAchievementでアチーブメント一覧を表示 */}
      <Box sx={{ overflowX: 'auto', p: 2, mt: 2, maxWidth: '80vw' }}>
        {showList && (
          <Stack direction="row" alignItems="end" spacing={1}>
            {unlockedNewAchievements.map((achievement, index) => (
              <SimpleAchievement key={index} achievement={achievement} />
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  )
}

export default UnlockAchievementAnimations
