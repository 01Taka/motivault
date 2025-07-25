import type {
  HabitMateHabitLevel,
  HabitMateLevelInfo,
} from '../../types/data/habit-level-types'
import Emergence from '../../../../assets/images/techniques/habit-mate/emergence.png'
import LushRiverValley from '../../../../assets/images/techniques/habit-mate/lush-river-valley.png'
import EchoesOfDusk from '../../../../assets/images/techniques/habit-mate/echoes-of-dusk.png'
import TwilightDreamscape from '../../../../assets/images/techniques/habit-mate/twilight-dreamscape.png'
import RhoenixReborn from '../../../../assets/images/techniques/habit-mate/rhoenix-reborn.png'

export const habitMateLevels: HabitMateLevelInfo[] = [
  {
    level: 1,
    version: 'v0.1.0',
    name: 'お試しスタート',
    milestoneIntervalCount: 2,
    targetCount: { type: 'fixed', count: 7 },
    startHabitBgSrc: Emergence,
  },
  {
    level: 2,
    version: 'v0.1.0',
    name: '習慣ビルダー',
    milestoneIntervalCount: 3,
    targetCount: { type: 'fixed', count: 15 },
    startHabitBgSrc: LushRiverValley,
  },
  {
    level: 3,
    version: 'v0.1.0',
    name: 'マスターチャレンジャー',
    milestoneIntervalCount: 5,
    targetCount: { type: 'fixed', count: 30 },
    startHabitBgSrc: EchoesOfDusk,
  },
  {
    level: 4,
    version: 'v0.1.0',
    name: 'レジェンド',
    milestoneIntervalCount: 5,
    targetCount: { type: 'fixed', count: 50 },
    startHabitBgSrc: TwilightDreamscape,
  },
  {
    level: 5,
    version: 'v0.1.0',
    name: 'アルティメット',
    milestoneIntervalCount: 5,
    targetCount: { type: 'unlimited' }, // 無期限の場合
    startHabitBgSrc: RhoenixReborn,
  },
] as const

export const concurrentHabitLevels: Record<HabitMateHabitLevel, number> = {
  1: 1,
  2: 1,
  3: 2,
  4: 3,
  5: 3,
} as const
