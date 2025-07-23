import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import { getLevelInfo } from '../../functions/constantHelpers/habit-level-data-helper'
import type { HabitMateCreateHabitFormState } from '../../types/form/habit-create-form'
import type { HabitMateHabitLevel } from '../../types/data/habit-level-types'
import type { HabitMateHabitWrite } from '../documents/habit-mate-habit-document'
import {
  createHabitMateHabit,
  pushHabitMateHabitWorkedDate,
  removeHabitMateHabitWorkedDate,
  toggleHabitMateHabitWorkedDate,
  updateHabitMateHabitNextTargetCount,
} from '../functions/habit-mate-habit-crud'
import { useHabitMateDataStore } from '../stores/useHabitMateDataStore'
import { createMetadataIfNeed } from '../functions/habit-mate-metadata-crud'
import type { HabitMateMetadataWrite } from '../documents/habit-mate-metadata-document'

const useHabitMateCrudHandler = () => {
  const { uid } = useCurrentUserStore()
  const { idbMetadata, idbHabit } = useHabitMateDataStore()
  const asyncKeys = [
    'createMetadata',
    'createSubmit',
    'pushWorkedDate',
    'removeWorkedDate',
    'toggleWorkedDate',
    'updateNextTargetCount',
  ] as const
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler(asyncKeys)

  const createMetadata = () => {
    if (!idbMetadata || !uid) {
      console.error('初期化未完了')
      return
    }

    const metadata: HabitMateMetadataWrite = {
      maxConcurrentHabits: 1,
      activeHabitIds: [],
    }

    callAsyncFunction('createMetadata', createMetadataIfNeed, [
      idbMetadata,
      uid,
      metadata,
    ])
  }

  const submitCreateHabit = (
    level: HabitMateHabitLevel,
    formState: HabitMateCreateHabitFormState,
    startedAt = Date.now()
  ) => {
    if (!idbMetadata || !idbHabit || !uid) {
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
      uid,
      data,
      {
        try: true,
        metadata: {
          maxConcurrentHabits: 1,
          activeHabitIds: [],
        },
      },
    ])
  }

  const pushWorkedDate = (habitId: string) => {
    if (!idbHabit || !uid) {
      console.error('初期化未完了')
      return
    }

    callAsyncFunction('pushWorkedDate', pushHabitMateHabitWorkedDate, [
      idbHabit,
      uid,
      habitId,
    ])
  }

  const removeWorkedDate = (habitId: string) => {
    if (!idbHabit || !uid) {
      console.error('初期化未完了')
      return
    }

    callAsyncFunction('removeWorkedDate', removeHabitMateHabitWorkedDate, [
      idbHabit,
      uid,
      habitId,
    ])
  }

  const toggleWorkedDate = (habitId: string) => {
    if (!idbHabit || !uid) {
      console.error('初期化未完了')
      return
    }

    callAsyncFunction('toggleWorkedDate', toggleHabitMateHabitWorkedDate, [
      idbHabit,
      uid,
      habitId,
    ])
  }

  const updateNextTargetCount = (habitId: string) => {
    if (!idbHabit || !uid) {
      console.error('初期化未完了')
      return
    }

    callAsyncFunction(
      'updateNextTargetCount',
      updateHabitMateHabitNextTargetCount,
      [idbHabit, uid, habitId]
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
