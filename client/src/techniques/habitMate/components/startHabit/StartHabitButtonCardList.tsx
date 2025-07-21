// src/components/StartHabitButtonCardList.tsx
import { Stack, Box } from '@mui/material' // Boxも忘れずにインポート
import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import StartHabitButtonCard from './StartHabitButtonCard'
import type { LevelInfo } from '../../types/habit-types'

export interface StartHabitCardListHandle {
  scrollToLevel: (levelIndex: number) => void
}

interface StartHabitButtonCardListProps {
  habitLevels: (LevelInfo & { src: string })[]
  onStartHabit: (level: LevelInfo) => void
}

const StartHabitButtonCardList = forwardRef<
  StartHabitCardListHandle,
  StartHabitButtonCardListProps
>(({ habitLevels, onStartHabit }, ref) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useImperativeHandle(ref, () => ({
    scrollToLevel: (levelIndex: number) => {
      const cardElement = cardRefs.current[levelIndex]
      if (cardElement) {
        cardElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        })
      }
    },
  }))

  useEffect(() => {
    // habitLevelsの変更に合わせてrefの配列の長さを調整
    cardRefs.current = cardRefs.current.slice(0, habitLevels.length)
  }, [habitLevels])

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ width: '98vw', overflowX: 'auto', py: 2 }}
    >
      {habitLevels.map((levelInfo, index) => {
        // React.RefCallback<HTMLDivElement> 型を明示的に指定
        const setRef: React.RefCallback<HTMLDivElement> = (el) => {
          cardRefs.current[index] = el
        }

        return (
          <Box
            key={levelInfo.level}
            ref={setRef} // 型が期待されるものと一致するようになった
            sx={{ flexShrink: 0 }}
          >
            <StartHabitButtonCard
              src={levelInfo.src}
              levelInfo={levelInfo}
              onStartHabit={() => onStartHabit(levelInfo)}
            />
          </Box>
        )
      })}
    </Stack>
  )
})

export default StartHabitButtonCardList
