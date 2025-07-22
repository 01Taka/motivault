import type {
  HabitMateHabitLevel,
  HabitMateLevelInfo,
} from '../../types/habit-level-types'
import Emergence from '../../../../assets/images/techniques/habit-mate/emergence.png'
import LushRiverValley from '../../../../assets/images/techniques/habit-mate/lush-river-valley.png'
import EchoesOfDusk from '../../../../assets/images/techniques/habit-mate/echoes-of-dusk.png'
import TwilightDreamscape from '../../../../assets/images/techniques/habit-mate/twilight-dreamscape.png'
import RhoenixReborn from '../../../../assets/images/techniques/habit-mate/rhoenix-reborn.png'

export const habitMateLevels: HabitMateLevelInfo[] = [
  {
    level: 1,
    name: 'お試しスタート',
    milestoneIntervalDays: 2,
    maxDays: 7,
    startHabitBgSrc: Emergence,
  },
  {
    level: 2,
    name: '習慣ビルダー',
    milestoneIntervalDays: 3,
    maxDays: 15,
    startHabitBgSrc: LushRiverValley,
  },
  {
    level: 3,
    name: 'マスターチャレンジャー',
    milestoneIntervalDays: 5,
    maxDays: 30,
    startHabitBgSrc: EchoesOfDusk,
  },
  {
    level: 4,
    name: 'レジェンド',
    milestoneIntervalDays: 5,
    maxDays: 50,
    startHabitBgSrc: TwilightDreamscape,
  },
  {
    level: 5,
    name: 'アルティメット',
    milestoneIntervalDays: 5,
    maxDays: 'unlimited', // 無期限の場合
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
