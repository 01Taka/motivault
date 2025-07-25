import { manageUniqueElements } from '../../../../functions/array-object-utils/array-utils'
import { toISODate } from '../../../../functions/dateTime-utils/time-conversion'
import type { DBWriteTarget } from '../../../../types/db/db-service-interface'
import type { ISODate } from '../../../../types/utils/datetime-types'
import { getLevelInfo } from '../../functions/constantHelpers/habit-level-data-helper'
import type { HabitMateHabitLevel } from '../../types/data/habit-level-types'
import type { HabitMateHabitWrite } from '../documents/habit-mate-habit-document'
import type {
  HabitMateHabitRepository,
  HabitMateMetadataRepository,
} from '../repositories/habit-mate-repositories'

const readLevelInfo = (level: HabitMateHabitLevel) => {
  return getLevelInfo(level)
}

export const createHabitMateHabit = async (
  metadataRepo: HabitMateMetadataRepository,
  habitRepo: HabitMateHabitRepository,
  data: HabitMateHabitWrite
): Promise<DBWriteTarget> => {
  let metadata = await metadataRepo.read([])
  if (!metadata) {
    throw new Error('メタデータを初期化してください')
  }

  if (
    data.status === 'active' &&
    metadata.maxConcurrentHabits <= metadata.activeHabitIds.length
  ) {
    throw new Error(
      `アクティブな習慣が上限(${metadata.maxConcurrentHabits}つ)なので、これ以上作成できません`
    )
  }

  const result = await habitRepo.create(data, [])
  await metadataRepo.update(
    {
      activeHabitIds: [...metadata.activeHabitIds, result.id],
    },
    []
  )

  return result
}

export const updateHabitMateHabitBaseData = async (
  habitRepo: HabitMateHabitRepository,
  habitId: string,
  data: Partial<
    Pick<
      HabitMateHabitWrite,
      'level' | 'habit' | 'isExecutable' | 'timing' | 'status' | 'isFailed'
    >
  >
) => {
  const { level, habit, isExecutable, timing, status, isFailed } = data
  const filterData = { level, habit, isExecutable, timing, status, isFailed }
  return await habitRepo.update(filterData, [habitId])
}

const updateHabitMateHabitWorkedDate = async (
  repo: HabitMateHabitRepository,
  habitId: string,
  date: ISODate,
  action: 'add' | 'remove' | 'toggle'
) => {
  // 1. データの読み込み
  const data = await repo.read([habitId])

  if (!data) {
    throw new Error(`習慣データが見つかりません。`)
  }

  if (action === 'toggle') {
    const hasDate = data.workedDate.includes(date)
    action = hasDate ? 'remove' : 'add'
  }

  // 2. データの更新ロジック
  const workedDate = manageUniqueElements(data.workedDate, date, action)

  if (workedDate.length > data.nextTargetCount) {
    throw new Error('取り組んだ数が次の目標を超えています。')
  }

  // 3. データの書き込み
  // workedDate が変更されていない場合は、更新処理をスキップ
  if (workedDate === data.workedDate) {
    return null // 変更がない場合は null を返す
  }

  // 更新処理を実行
  return await repo.update({ workedDate: workedDate }, [habitId])
}

export const pushHabitMateHabitWorkedDate = async (
  repo: HabitMateHabitRepository,
  habitId: string,
  date: ISODate = toISODate(new Date())
): Promise<DBWriteTarget | null> => {
  return await updateHabitMateHabitWorkedDate(repo, habitId, date, 'add')
}

export const removeHabitMateHabitWorkedDate = async (
  repo: HabitMateHabitRepository,
  habitId: string,
  date: ISODate = toISODate(new Date())
): Promise<DBWriteTarget | null> => {
  return await updateHabitMateHabitWorkedDate(repo, habitId, date, 'remove')
}

export const toggleHabitMateHabitWorkedDate = async (
  repo: HabitMateHabitRepository,
  habitId: string,
  date: ISODate = toISODate(new Date())
): Promise<DBWriteTarget | null> => {
  return await updateHabitMateHabitWorkedDate(repo, habitId, date, 'toggle')
}

export const updateHabitMateHabitNextTargetCount = async (
  repo: HabitMateHabitRepository,
  habitId: string
) => {
  const habitKey = [habitId]
  const habitData = await repo.read(habitKey)

  if (!habitData) {
    throw new Error('Habit data not found')
  }

  const { level, workedDate, levelVersion } = habitData
  const levelInfo = readLevelInfo(level)

  if (levelInfo.version !== levelVersion) {
    throw new Error('level version does not matched')
  }

  const currentCount = workedDate.length

  const isAtMilestone = currentCount % levelInfo.milestoneIntervalCount === 0
  if (!isAtMilestone) {
    throw new Error('Milestone interval not reached')
  }

  const nextTargetCount = currentCount + levelInfo.milestoneIntervalCount
  return repo.update({ nextTargetCount }, habitKey)
}
