import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import { getLevelInfo } from '../../functions/constantHelpers/habit-level-data-helper'
import type { HabitMateCreateHabitFormState } from '../../types/form/habit-create-form'
import type { HabitMateHabitLevel } from '../../types/data/habit-level-types'
import type { HabitMateHabitWrite } from '../documents/habit-mate-habit-document'
import {
  createHabitMateHabit,
  pushHabitMateHabitWorkedDate,
  removeHabitMateHabitWorkedDate,
  toggleHabitMateHabitWorkedDate,
  updateHabitMateHabitBaseData,
  updateHabitMateHabitNextTargetCount,
} from '../functions/habit-mate-habit-crud'
import { createMetadataIfNeed } from '../functions/habit-mate-metadata-crud'
import type { HabitMateMetadataWrite } from '../documents/habit-mate-metadata-document'
import type { HabitMateContinueHabitFormState } from '../../types/form/habit-continue-form'
import { useHabitMateDataStore } from '../stores/useHabitMateDataStore'

const useHabitMateCrudHandler = () => {
  const { idbMetadata, idbHabit } = useHabitMateDataStore()
  const asyncKeys = [
    'createMetadata',
    'createSubmit',
    'updateHabit',
    'pushWorkedDate',
    'removeWorkedDate',
    'toggleWorkedDate',
    'updateNextTargetCount',
  ] as const
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler(asyncKeys)

  const createMetadata = () => {
    if (!idbMetadata) {
      console.error('初期化未完了')
      return
    }

    const metadata: HabitMateMetadataWrite = {
      techniqueVersion: 'v0.1.0',
      installedAt: Date.now(),
      lastUsedAt: Date.now(),
      totalGainedExp: 0,
      unlockedAchievementIds: [],
      maxConcurrentHabits: 1,
      activeHabitIds: [],
    }

    callAsyncFunction('createMetadata', createMetadataIfNeed, [
      idbMetadata,
      metadata,
    ])
  }

  const submitCreateHabit = (
    level: HabitMateHabitLevel,
    formState: HabitMateCreateHabitFormState,
    startedAt = Date.now()
  ) => {
    if (!idbMetadata || !idbHabit) {
      console.error('初期化未完了')
      return
    }

    const levelData = getLevelInfo(level)

    const data: HabitMateHabitWrite = {
      level,
      levelVersion: levelData.version,
      ...formState,
      startedAt,
      workedDate: [],
      nextTargetCount: levelData.milestoneIntervalCount,
      isFailed: false,
      status: 'active',
      resetCount: 0,
    }

    callAsyncFunction('createSubmit', createHabitMateHabit, [
      idbMetadata,
      idbHabit,
      data,
    ])
  }

  const pushWorkedDate = (habitId: string) => {
    if (!idbHabit) {
      console.error('初期化未完了')
      return
    }

    callAsyncFunction('pushWorkedDate', pushHabitMateHabitWorkedDate, [
      idbHabit,
      habitId,
    ])
  }

  const removeWorkedDate = (habitId: string) => {
    if (!idbHabit) {
      console.error('初期化未完了')
      return
    }

    callAsyncFunction('removeWorkedDate', removeHabitMateHabitWorkedDate, [
      idbHabit,
      habitId,
    ])
  }

  const toggleWorkedDate = (habitId: string) => {
    if (!idbHabit) {
      console.error('初期化未完了')
      return
    }

    callAsyncFunction('toggleWorkedDate', toggleHabitMateHabitWorkedDate, [
      idbHabit,
      habitId,
    ])
  }

  const updateNextTargetCount = async (
    habitId: string,
    updateData?: HabitMateContinueHabitFormState
  ) => {
    if (!idbHabit) {
      console.error('初期化未完了')
      return
    }

    if (updateData) {
      const { success } = await callAsyncFunction(
        'updateHabit',
        updateHabitMateHabitBaseData,
        [idbHabit, habitId, { ...updateData }]
      )
      if (!success) {
        return
      }
    }

    callAsyncFunction(
      'updateNextTargetCount',
      updateHabitMateHabitNextTargetCount,
      [idbHabit, habitId]
    )
  }

  return {
    asyncStates,
    createMetadata,
    submitCreateHabit,
    pushWorkedDate,
    removeWorkedDate,
    toggleWorkedDate,
    updateNextTargetCount,
  }
}

export default useHabitMateCrudHandler
